import React from "react";
import Image from 'next/image'

import dropdownIcon from '../../public/dropdownIcon.svg'

export default function MainDetails(props) {
  const { banner, name, price, discountPrice, discount } = props;

  return (
    <tr>
      <td><Image src={banner} width="100px" height='50px' alt={`banner from ${name}`}/></td>
      <td>{name}</td>
      <td>{convertToReais(price)}</td>
      <td>{convertToReais(discountPrice)}</td>
      <td>{discount}%</td>
      <td><Image src={dropdownIcon}/></td>
    </tr>
  )
}

function convertToReais(price) {
  if (!price) return "--"

  price = price / 100
  return price.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" })
}