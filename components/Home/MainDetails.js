import React from "react";
import Image from 'next/image'

import dropdownIcon from '../../public/dropdownIcon.svg'

export default function MainDetails(props) {
  const { banner, name, price, discountPrice, discount, mosqueteiros, steamID } = props;

  return (
    <tr>
      <td className="_tac"><Image src={banner} width="100px" height='50px' alt={`banner from ${name}`} /></td>
      <td>{name} {steamID}</td>
      {/* 
        TO-DO:
        Mostrar preço com desconto e o desconto
        junto com o preço normal
      */}
      {
        discountPrice ?
          (
            <td>
              {convertToReais(discountPrice)}
            </td>
          )
          :
          (
            <td>
              {convertToReais(price)}
            </td>
          )
      }
      {
        mosqueteiros.map(mosqueteiro => {
          return (
            <td className="_tac">
              <input type="checkbox" readOnly checked={mosqueteiro.games.includes(steamID)} />
            </td>
          )
        })
      }
      <td><Image src={dropdownIcon} alt="dropdown Icon" /></td>
    </tr>
  )
}

function convertToReais(price) {
  if (!price) return "--"

  price = price / 100
  return price.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" })
}