import React from "react";

export default function MostDetails(props) {
  const { completeDesc, shortDesc, numberPlayers, background, videos, screenshot } = props;

  return (
    <tr className='_dn'>
      <td>Descrição curta - {shortDesc}</td>
      <td>Descrição completa - {completeDesc}</td>
      <td>Até quantos players - {numberPlayers}</td>

      <td>Background - {background}</td>
      <td>Videos - {videos}</td>
      <td>Screenshots - {screenshot}</td>
    </tr>
  )
}