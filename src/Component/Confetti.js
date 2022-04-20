import React from 'react'
import Confetti from 'react-confetti'

export default (props) => {
  return (
    <Confetti
      width={props.width}
      height={props.height}
    />
  )
}