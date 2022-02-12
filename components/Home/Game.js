import React from "react"
import MainDetails from "./MainDetails";
import MostDetails from "./MostDetails";

export default function Game(props) {
  const { game } = props;

  return (
    <React.Fragment>
      <MainDetails 
        banner={game.media.banner}
        name={game.name}
        price={game.prices.original}
        discountPrice={game.prices.promo}
        discount={game.prices.discount}
      />

      <MostDetails 
        steamID={game.steamID}
        completeDesc={game.complete_description}
        shortDesc={game.short_description}
        numberPlayers={game.number_players}
        background={game.media.background}
        videos={game.media.videos}
        screenshot={game.media.screenshot}
      />
    </React.Fragment>
  )
}