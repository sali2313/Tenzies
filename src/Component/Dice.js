import React from "react"

export default function Dice(props) {
    return (
        <div onClick={props.holdDice} className={props.isHeld ? "dice-face dice-face-isHeld-True" : "dice-face"}>
            <h2 className="dice-num">{props.value}</h2>
        </div>
    )
}