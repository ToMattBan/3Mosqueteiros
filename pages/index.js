import Head from 'next/head';
import styles from '../styles/Home.module.scss'
import Game from '../components/Home/Game';

export default function Home({ games }) {
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
              <th>Preço</th>
              <th>Preço promocional</th>
              <th>Desconto</th>
              {/* 
                TO-DO:
                  <th>Players</th>
                  Mostrar lista com quem tem
                  Um embaixo do outro com checkbox:
                    [x] Matt
                    [ ] Melissa
                    [x] Dino
              */}
              <th></th>
            </tr>
            <tr></tr>
          </thead>
          <tbody>
            {
              games.map((game, index) => {
                return (<Game game={game} />)
              })
            }
          </tbody>
        </table>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  //updateGames();

  try {
    var games = await fetch(process.env.URL + '/api/games/getAllGames').then(res => res.json());
  } catch (e) {
    console.error(e)
  }
  return {
    props: { games: games },
    revalidate: 60 * 60 * 12 // 12 horas
  }
}