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

      {/*
        TO-DO:
          Dropdown, ao clicar mostra short_description,
          Button "See More", ao clicar abre modal,
          Modal, trará o resto das infos
      */}
      {/* <MostDetails 
        steamID={game.steamID}
        completeDesc={game.complete_description}
        shortDesc={game.short_description}
        numberPlayers={game.number_players}
        background={game.media.background}
        videos={game.media.videos}
        screenshot={game.media.screenshot}
      /> */}
    </React.Fragment>
  )
}