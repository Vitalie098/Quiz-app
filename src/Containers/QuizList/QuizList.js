import React, {Component} from "react"
import classes from "./QuizList.module.css"
import {NavLink} from "react-router-dom";
import axios from "../../Axios/Axios-quiz";
import Loader from "../../Components/UI/Loader/Loader";
import {connect} from "react-redux"
import {fetchQuizes}from "../../redux/actions/quiz";

class QuizList extends Component {

    renderTests = () => {
        return this.props.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink
                        to={"/quiz/" + quiz.id}
                    >
                        {quiz.name}
                    </NavLink>
                </li>
            )

        })
    }

    async componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Lista testelor</h1>
                    {
                        this.props.loader
                        ? <Loader />
                        : <ul>
                                {this.renderTests()}
                          </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loader: state.quiz.loader
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizList)