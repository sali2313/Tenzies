import React from "react"
import Dice from "./Component/Dice"
import { nanoid } from 'nanoid'
import Confetti from "./Component/Confetti"


    export default function App() {

    function allNewDice(){
        let diceNumArray = []
        for (let i=0;i < 10;i++){
            let num = (Math.floor(Math.random() * 6)+ 1)
            let data = {number: num , isHeld : false , id : nanoid()}
            diceNumArray.push(data)
        }
        return diceNumArray;
    }
    
    let [numbers, setNumbers] = React.useState(() => allNewDice())
    let [tenzies, wonTenzies] = React.useState(false)
    
    function newGame(){
        setNumbers(() => allNewDice())
    }
    React.useEffect(() => {
        let situation = true;
        for (let i = 0 ; i < numbers.length; i++){
            if(numbers[i].number !== numbers[0].number || numbers[i].isHeld === false ){
                situation = false
            }
        }
        return(wonTenzies(situation))
    }
    , [numbers])

    function holdDice(id) {
        let final = numbers.map(number => (
            number.id == id ? {...number , isHeld : !number.isHeld} : number
    ))
        setNumbers(final)
    }

    function rollDice() {
        setNumbers(numbers.map(number => {
            if(number.isHeld){
                return number
            }else {
                return {
                    ...number,
                    number: (Math.floor(Math.random() * 6)+ 1),
                    id: nanoid()
                }
            }
        }))
    }

    let allDices = numbers.map(number => (<Dice key={number.id} value={number.number} 
         isHeld={number.isHeld} holdDice={() => holdDice(number.id)} />))
    
    return (
        <main className="main">   
            {tenzies && <Confetti />}
            <div className="text">
                <h1>Tenzies</h1>
                <p id="text">
                    {tenzies === true ? <p className="won">YOU WON THE GAME</p> :
                    "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
                </p>
            </div>
            <div className="dice-container">
                {allDices}
            </div>
            <div>
                <button onClick={tenzies ? newGame : rollDice} className="roll-button">{tenzies ? "New Game" : "Roll"}</button>
            </div>
        </main>
    )
}