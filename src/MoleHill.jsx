import { useState } from "react"
import hillpng from './hill.png'
import hillwmolepng from './hillwmole.png'
import { useEffect } from "react"

function MoleHill(props) {
    let [moleActive, setMoleActive] = useState(false)

    function randomMessage(messages) {
        return messages[Math.floor(Math.random() * messages.length)]
    }
    
    function hillClicked() {
        if (!moleActive) {
            props.setScore(props.score -1)
            props.setMessage(["message-bad", randomMessage(props.missMessages)])

        } else if (moleActive) {
            setMoleActive(false)
            props.setScore(props.score +1)
            props.setMessage(["message-good", randomMessage(props.hitMessages)])
        } else {
            console.log("so is it active or not!? - MoleHillContainer.jsx")
        }
    }
    useEffect(() => {
        if (Math.random() < 0.5) {
            let randSeconds = Math.ceil(Math.random() * 1000)
            let otherRandSeconds = 700 +  Math.ceil(Math.random() * 1000)
            let timer = setTimeout(() => {
                setMoleActive(true)
                setTimeout(() => {
                setMoleActive(false)
            }, otherRandSeconds);
        }, randSeconds)
        return () => clearTimeout(timer)
        }
        
    })

    return (
        <div className="mole-hill">
            <img draggable="false" onClick={hillClicked} src={moleActive ? hillwmolepng : hillpng} alt={moleActive ? "A mole sprouting from a hill." : "A hill with no mole."} />
        </div>
    )
}

export default MoleHill