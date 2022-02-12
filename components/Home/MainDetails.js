import React from "react";

export default function MainDetails(props) {
  const { banner, name, price, discountPrice, discount } = props;

  return (
    <tr>
      <td><img src={banner} width="100px" /></td>
      <td>{name}</td>
      <td>{convertToReais(price)}</td>
      <td>{convertToReais(discountPrice)}</td>
      <td>{discount}%</td>
    </tr>
  )
}

function convertToReais(price) {
  if (!price) return "--"

  price = price / 100
  return price.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" })
}