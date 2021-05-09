import react from "react"
import classes from "./ActiveQuiz.module.css"
import AnswerList from "./AnswerList/AnswerList";

const ActiveQuiz = props => {

    console.log(props)
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>
                {props.answerNumber} din {props.quizLength}
            </p>

            <AnswerList
                answers = {props.answers}
                clickHandler = {props.clickHandler}
                answerResult = {props.answerResult}
            />


        </div>
    )
}



export default ActiveQuiz