import React from "react";

export default function MostDetails(props) {
  const { completeDesc, shortDesc, numberPlayers, background, videos, screenshot } = props;

  return (
    <>
      <div>{shortDesc}</div>
      {/* <div>Descrição completa - {completeDesc}</div>
      <div>Até quantos players - {numberPlayers}</div>

      <div>Background - {background}</div>
      <div>Videos - {videos}</div>
      <div>Screenshots - {screenshot}</div> */}
    </>
  )
}