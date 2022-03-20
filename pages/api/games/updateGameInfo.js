const https = require('https');
import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {
  const games = await fetch(process.env.URL + '/api/games/getAllGames').then(res => res.json());

  try {
    games.forEach(async game => {
      getGameData(game.steamID)
    })
    res.json({ worked: true })
  } catch (e) {
    res.send(e)
  }
}

function getGameData(steamID) {
  var gameDetails = '';

  https.get({
    hostname: 'store.steampowered.com',
    path: `/api/appdetails?cc=br&appids=${steamID}`,
    method: 'GET',
    headers: {
      'Accept-Language': 'pt-BR',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0'
    }
  }, async (res) => {
    res.setEncoding('utf8');
    res.on('data', data => { gameDetails += data });
    res.on('end', () => { updateGameData(gameDetails, steamID) })
  })
}

async function updateGameData(gameData, steamID) {
  const gameDetails = (JSON.parse(gameData))[steamID].data

  if (gameDetails.movies)
    const videos = gameDetails.movies.map(video => { return video.webm["480"] })

  const screenshots = gameDetails.screenshots.map(screenshot => { return screenshot.path_thumbnail })

  const client = await clientPromise;
  const db = client.db('games');

  await db.collection('games').updateOne(
    { steamID: steamID },
    {
      $set: {
        name: gameDetails.name,
        complete_description: gameDetails.detailed_description,
        short_description: gameDetails.short_description,
        "prices.original": gameDetails.price_overview?.initial ?? 0,
        "prices.promo": gameDetails.price_overview?.final ?? null,
        "prices.discount": gameDetails.price_overview?.discount_percent ?? 0,
        "media.banner": gameDetails.header_image,
        "media.background": gameDetails.background,
        "media.videos": videos || [],
        "media.screenshot": screenshots,
      }
    }
  )
}