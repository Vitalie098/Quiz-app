import React, {Component} from "react"
import classes from "./QuizCreate.module.css"
import Button from "../../Components/UI/Button/Button";
import {createControl, validateControl, validateForm} from "../../form/formFramework"
import Input from "../../Components/UI/Input/Input";
import Select from "../../Components/UI/Select/Select";
import axios from "../../Axios/Axios-quiz";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../redux/actions/create";

function createOptions(num) {
    return createControl({
        label: `Varianta ${num}`,
        type: "text",
        id: num,
        errorMessage: "Campul dat nu poate fi pustiu"
    },{required: true})

}
function createFormControls() {
    return {
        question:createControl({
            label: "Introdu Intrebarea",
            type: "text",
            errorMessage: "Campul dat nu poate fi pustiu"
        },{required:true}),
        option1: createOptions(1),
        option2: createOptions(2),
        option3: createOptions(3),
        option4: createOptions(4)
    }
}

class QuizCreate extends Component {

    state = {
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const {question,option1,option2,option3,option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            rightAnswer: this.state.rightAnswerId,
            id: this.props.quiz.length + 1,
            answers: [
                {text:option1.value, id: option1.id},
                {text:option2.value, id: option2.id},
                {text:option3.value, id: option3.id},
                {text:option4.value, id: option4.id},
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
    }

    createQuizHandler = async event => {
        event.preventDefault()

        this.setState({
            quiz: [],
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })

        this.props.finishCreateQuiz()
    }

    changeHandler = (value,controlName) => {

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = value
        control.touched = true
        control.valid = validateControl(control.value,control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName,index) => {
            const control = this.state.formControls[controlName]
            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        value = {control.value}
                        touched = {control.touched}
                        type = {control.type}
                        label = {control.label}
                        valid = {control.valid}
                        ShouldValidate = {!!control.validation}
                        errorMessage = {control.errorMessage}
                        onChange = {event => this.changeHandler(event.target.value, controlName) }
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label="Alegeti raspunsul corect"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Creeaza un test</h1>
                    <form onSubmit={this.submitHandler}>

                        {this.renderInputs()}
                        {select}

                        <Button
                            type="primary"
                            disabled = {!this.state.isFormValid}
                            onClick={this.addQuestionHandler}
                        >
                            Adauga intrebarea
                        </Button>

                        <Button
                            type="success"
                            disabled = {this.props.quiz.length === 0}
                            onClick={this.createQuizHandler}
                        >
                            Creeaza testul
                        </Button>

                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizCreate)