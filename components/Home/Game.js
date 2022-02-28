import React, { useState } from "react"
import MainDetails from "./MainDetails";
import MostDetails from "./MostDetails";

import styles from "../../styles/Components/Game.module.scss"

export default function Game(props) {
  const { game, mosqueteiros } = props;

  return (
    <React.Fragment>
      {/*
        TO-DO:
          Button "See More", ao clicar abre modal,
          Modal, trará o resto das infos
      */}

      <tr className={styles.acordeonHeader}>
        <MainDetails
          banner={game.media.banner}
          name={game.name}
          price={game.prices.original}
          discountPrice={game.prices.promo}
          discount={game.prices.discount}
          steamID={game.steamID}
          mosqueteiros={mosqueteiros}
          f_ToggleAcordeon={toggleAcordeon}
        />

        <td className={styles.acordeonContent}>
          <MostDetails
            steamID={game.steamID}
            completeDesc={game.complete_description}
            shortDesc={game.short_description}
            numberPlayers={game.number_players}
            background={game.media.background}
            videos={game.media.videos}
            screenshot={game.media.screenshot}
          />
        </td>
      </tr>
    </React.Fragment>
  )


  function toggleAcordeon(acordeonHeader) {
    var columns = Array.from(acordeonHeader.querySelectorAll('td'));
        columns.pop()

    var acordeonContent = acordeonHeader.querySelector(`.${styles.acordeonContent}`);
    acordeonContent.classList.toggle(styles['acordeonContent--active'])
    acordeonHeader.classList.toggle(styles['acordeonHeader--active'])
    
    var acordeonHeight = acordeonContent.offsetHeight ;
    columns.map(column => {
      column.style = column.style.paddingBottom ? null : `padding-bottom: ${acordeonHeight}px`
    })

    var arrow = acordeonHeader.querySelector('[alt^="dropdown"');
        arrow.style
  }
}
