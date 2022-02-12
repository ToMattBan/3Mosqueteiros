import React from "react";

export default function MostDetails(props) {
  const { steamID, completeDesc, shortDesc, numberPlayers, background, videos, screenshot } = props;

  return (
    <tr className='_dn'>
      <td>Steam ID - {steamID}</td>
      <td>Descrição completa - {completeDesc}</td>
      <td>Descrição pequena - {shortDesc}</td>
      <td>Até quantos players - {numberPlayers}</td>

      <td>Background - {background}</td>
      <td>Videos - {videos}</td>
      <td>Screenshots - {screenshot}</td>
    </tr>
  )
}