import React from "react";
import Image from 'next/image'

import dropdownIcon from '../../public/dropdownIcon.svg'

export default function MainDetails(props) {
  const { banner, name, price, discountPrice, discount, mosqueteiros, steamID } = props;

  return (
    <tr>
      <td className="_tac"><Image src={banner} width="100px" height='50px' alt={`banner from ${name}`} /></td>
      <td>{name}</td>
      {
        discount != 0 ?
          (
            <td className="_df _aic">
              <span className="_lh-solid _mrxxs _tac">
                <small className="_tdl">{convertToReais(price)}</small>
                <div>{convertToReais(discountPrice)}</div>
              </span>
              <span className="_bggreen _phxxs _white _fz20">{discount}%</span>
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
            <td className="_tac" key={Math.random().toString()}>
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