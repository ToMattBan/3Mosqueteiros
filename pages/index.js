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
          <tbody className='acordeonFather'>
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

export async function getStaticProps() {
  try {
    var update = await fetch(process.env.URL + '/api/games/updateGameInfo');
    console.log(update);

    var games = await fetch(process.env.URL + '/api/games/getAllGames').then(res => res.json());
    var mosqueteiros = await fetch(process.env.URL + '/api/games/getGamesByMosqueteiro').then(res => res.json());
  } catch (e) {
    console.error(e)
  }
  return {
    props: { games: games, mosqueteiros: mosqueteiros },
    revalidate: 60 * 60 * 12 // 12 horas
  }
}
