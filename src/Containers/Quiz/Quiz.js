import React, {Component} from "react"
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../Components/FinishedQuiz/FinishedQuiz";
import axios from "../../Axios/Axios-quiz";
import Loader from "../../Components/UI/Loader/Loader";
import {connect} from "react-redux"
import {fetchQuiz,answerClickHandler,RestartQuiz} from "../../redux/actions/quiz"

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuiz(this.props.match.params.id)
    }

    componentWillMount() {
        this.props.RestartQuiz()
    }


    render() {
        console.log(this.props.answerNumber)
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Raspunde la intrebari</h1>
            {
                this.props.loader || !this.props.quiz
                ? <Loader />
                : this.props.isFinished
                    ?
                    <FinishedQuiz
                    quiz = {this.props.quiz}
                    result = {this.props.result}
                    onClick= {this.props.RestartQuiz}
                    />
                    :
                    <ActiveQuiz
                        question = {this.props.quiz[this.props.answerNumber].question}
                        quizLength = {this.props.quiz.length}
                        answers = {this.props.quiz[this.props.answerNumber].answers}
                        answerNumber = {this.props.answerNumber + 1}
                        clickHandler = {this.props.answerClickHandler}
                        answerResult = {this.props.answerResult}
                            />
            }
                </div>
            </div>


        )
    }
}

function mapStateToProps(state) {
    return {
        isFinished: state.quiz.isFinished,
        answerResult: state.quiz.answerResult,
        answerNumber: state.quiz.answerNumber,
        result: state.quiz.result,
        quiz: state.quiz.quiz,
        loader: state.quiz.loader
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuiz: id => dispatch(fetchQuiz(id)),
        answerClickHandler: answerId => dispatch(answerClickHandler(answerId)),
        RestartQuiz: () => dispatch(RestartQuiz())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Quiz)