import React from "react"
import classes from "./AnswerItem.module.css"

const AnswerItem = props => {
    const cls = [classes.AnswerItem]

    if(props.answerResult) {
        cls.push(classes[props.answerResult])
    }
    return (
        <li
            className={cls.join(" ")}
            onClick={() => props.clickHandler(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem