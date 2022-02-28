export default function Discount(props) {
  const { discount, price, discountPrice } = props;

  return (
    <>
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
    </>
  )
  
  function convertToReais(price) {
    if (!price) return "--"

    price = price / 100
    return price.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" })
  }
}