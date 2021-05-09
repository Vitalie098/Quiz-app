import React from "react"
import classes from "./FinishedQuiz.module.css"
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz = props => {


    const successResponse = Object.keys(props.result).reduce((total,key) => {
        if(props.result[key] === "success") {
            total++
        }
        return total
    },0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem,index) => {
                    const cls = ["fa",
                        props.result[quizItem.id] === "error" ? "fa-times" : "fa-check",
                        classes[props.result[quizItem.id]]
                    ]
                    return (
                    <li
                        key={index}
                    >
                        <span>
                            <strong>{index + 1}.</strong>
                            {quizItem.question}
                            <i className={cls.join(" ")}/>
                        </span>

                    </li>
                    )
                })
                }
            </ul>

            <p> {successResponse} raspunsuri corecte din {props.quiz.length}</p>

            <Button type={"success"} onClick = {props.onClick}>Restart</Button>

            <Link to={"/"}>
                <Button type={"primary"}>Lista testelor</Button>
            </Link>

        </div>
    )
}

export default FinishedQuiz