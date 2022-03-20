import React from "react";
import Image from 'next/image'

import dropdownIcon from '../../public/dropdownIcon.svg'
import Discount from "./Discount";

import styles from "../../styles/Components/Game.module.scss"

export default function MainDetails(props) {
  const { banner, name, price, discountPrice, discount, mosqueteiros, steamID, f_ToggleAcordeon } = props;

  return (
    <>
      <td>
        <a className="_db _1/1 _textGray _tdn" href={'https://store.steampowered.com/app/' + steamID}>
          <Image src={banner} width="100px" height='50px' alt={`banner from ${name}`} />
        </a>
      </td>

      <td>
        <a className="_db _1/1 _textGray _tdn" href={'https://store.steampowered.com/app/' + steamID}>
          <span>{name} {steamID}</span>
        </a>
      </td>

      <Discount discount={discount} price={price} discountPrice={discountPrice}/>
      {
        mosqueteiros.map(mosqueteiro => {
          return (
            <td className="_tac" key={Math.random().toString()}>
              <input type="checkbox" readOnly checked={mosqueteiro.games.includes(steamID)} />
            </td>
          )
        })
      }
      <td className="_cp" onClick={toggleAcordeon}><Image className={styles.dropdownIcon} src={dropdownIcon} alt="dropdown Icon" /></td>
    </>
  )

  function toggleAcordeon(e) {
    var _target = e.target;

    while (!_target.className.includes('acordeonHeader')) {
      _target = _target.parentElement;
    }

    f_ToggleAcordeon(_target)
  }
}