import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {
  const games = await fetch(process.env.NEXT_PUBLIC_URL + '/api/games/getAllGames').then(res => res.json());

  const client = await clientPromise;
  const db = client.db('games');

  try {
    games.forEach(async game => {
      var gameDetails = await fetch(`https://store.steampowered.com/api/appdetails?cc=br&l=br&appids=${game.steamID}`).then(res => res.json());
      gameDetails = gameDetails[game.steamID].data

      if (gameDetails.movies)
        var videos = gameDetails.movies.map(video => { return video.webm["480"] })

      var screenshots = gameDetails.screenshots.map(screenshot => { return screenshot.path_thumbnail })
      
      await db.collection('games').update(
        { steamID: game.steamID },
        { $set: {
          name: gameDetails.name,
          complete_description: gameDetails.detailed_description,
          short_description: gameDetails.short_description,
          "prices.original": gameDetails.price_overview ? gameDetails.price_overview.initial : 0,
          "prices.promo": gameDetails.price_overview ? gameDetails.price_overview.final : null,
          "prices.discount": gameDetails.price_overview ? gameDetails.price_overview.discount_percent : 0,
          "media.banner": gameDetails.header_image,
          "media.background": gameDetails.background,
          "media.videos": videos || [],
          "media.screenshot": screenshots,
        } }
      )
    })
    res.json({ worked: true })
  } catch (e) {
    res.send(e)
  }

}