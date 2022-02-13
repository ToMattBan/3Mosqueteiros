import Head from 'next/head';
import Game from '../components/Home/Game';

export default function Home({ games, mosqueteiros }) {

  return (
    <div className="container">
      <Head>
        <title>3 Mosqueteiros</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <table className='_tal'>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Preço Atual</th>
              {
                mosqueteiros.map(mosqueteiro => {
                  return (
                    <th className="_tac" key={Math.random().toString()}>{mosqueteiro.name}</th>
                  )
                })
              }
              <th></th>
            </tr>
            <tr></tr>
          </thead>
          <tbody>
            {
              games.map(game => {
                return (<Game game={game} mosqueteiros={mosqueteiros} key={Math.random().toString()} />)
              })
            }
          </tbody>
        </table>
      </main>
    </div>
  )
}

import clientPromise from '../lib/mongodb';

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db('games');

    var games = await db
      .collection("games")
      .find({})
      .sort({})
      .toArray();

    games.forEach(async game => {
      var gameDetails = await fetch(`https://store.steampowered.com/api/appdetails?cc=br&l=br&appids=${game.steamID}`).then(res => res.json());
      gameDetails = gameDetails[game.steamID].data

      if (gameDetails.movies)
        var videos = gameDetails.movies.map(video => { return video.webm["480"] })

      var screenshots = gameDetails.screenshots.map(screenshot => { return screenshot.path_thumbnail })

      game.name = gameDetails.name;
      game.complete_description = gameDetails.detailed_description;
      game.short_description = gameDetails.short_description;
      game.prices.original = gameDetails.price_overview ? gameDetails.price_overview.initial : 0;
      game.prices.promo = gameDetails.price_overview ? gameDetails.price_overview.final : null;
      game.prices.discount = gameDetails.price_overview ? gameDetails.price_overview.discount_percent : 0;
      game.media.banner = gameDetails.header_image;
      game.media.background = gameDetails.background;
      game.media.videos = videos || [];
      game.media.screenshot = screenshots;

      await db.collection('games').update(
        { steamID: game.steamID },
        {
          $set: {
            name: game.name,
            complete_description: game.complete_description,
            short_description: game.short_description,
            "prices.original": game.prices.original,
            "prices.promo": game.prices.promo,
            "prices.discount": game.prices.discount,
            "media.banner": game.media.banner,
            "media.background": game.media.background,
            "media.videos": game.media.videos,
            "media.screenshot": game.media.screenshot,
          }
        }
      )
    })

    var mosqueteiros = await db
      .collection("mosqueteiros")
      .find({})
      .sort({})
      .toArray();

    games = JSON.parse(JSON.stringify(games))
    mosqueteiros = JSON.parse(JSON.stringify(mosqueteiros))
  } catch (e) {
    console.error(e)
  }
  return {
    props: { games: games, mosqueteiros: mosqueteiros },
    revalidate: 60 * 60 * 12 // 12 horas
  }
}
