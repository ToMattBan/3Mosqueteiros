import coopGamesList from "../public/coopGamesList.json"

function Home({ gamesList }) {
  return (
    <ul>
      {gamesList.map((game) => {
        <li>
          <b>NOME</b>
          {game.name}
        </li>
      })}
    </ul>
  )
}

export async function getStaticProps() {
  let gamesList = await coopGamesList.map(async (game) => {
    let gameDetails = await fetch(`https://store.steampowered.com/api/appdetails?cc=br&l=br&appids=${game.id}`);
        gameDetails = await gameDetails.json();
        gameDetails = gameDetails[game.id].data;

    let screenShots = gameDetails.screenshots.map(screenshot => {
      return screenshot.path_thumbnail
    });
    
    let movies = null;
    if (gameDetails.movies) {
      movies = gameDetails.movies.map(movie => {
        return movie.mp4["480"]
      });
    };

    let importanteGameDetails = {
      "name": gameDetails.name,
      "complete_description": gameDetails.detailed_description,
      "short_description": gameDetails.short_description,
      prices: {
        "original": gameDetails.price_overview.initial_formated,
        "promo": gameDetails.price_overview.final_formated,
        "discount": gameDetails.price_overview.discount_percent
      },
      media: {
        "banner": gameDetails.header_image,
        "backgound": gameDetails.backgound,
        "videos": movies ? movies : null,
        "screenshots": screenShots
      }
    };

    console.log('oi')
    return importanteGameDetails;
  })

  console.log('thcau')

  return {
    props: {
      gamesList,
    },
  }
}


export default Home