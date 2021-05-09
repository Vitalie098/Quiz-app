import React, {Component} from "react"
import classes from "./Auth.module.css"
import Button from "../../Components/UI/Button/Button";
import {createControl,validateControl,validateForm} from "../../form/formFramework"
import Input from "../../Components/UI/Input/Input"
import axios from "../../Axios/Axios-quiz";
import {connect} from "react-redux";
import {auth} from "../../redux/actions/auth";


class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email:createControl({
                label: "Email",
                type: "text",
                errorMessage: "Introdu un email valid"
            },{
                required:true,
                email: true
            }),
            password:createControl({
                label: "Password",
                type: "password",
                errorMessage: "Campul acesta nu poat fi pustiu"
            }, {
                required: true,
                minLength: 6
            })
        }
    }



    submitHandler = event => {
        event.preventDefault()
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
                    <Input
                        key = {controlName + index}
                    value = {control.value}
                    touched = {control.touched}
                    type = {control.type}
                    label = {control.label}
                    valid = {control.valid}
                    ShouldValidate = {!!control.validation}
                    errorMessage = {control.errorMessage}
                           onChange = {event => this.changeHandler(event.target.value, controlName) }
                    />
            )
        })
    }

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHandler = async () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Conecteaza-te</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderInputs()}
                        <Button
                            type="success"
                            disabled={!this.state.isFormValid}
                            onClick={this.loginHandler}
                        >
                            Conecteaza-te
                        </Button>
                        <Button
                            type="primary"
                            disabled={!this.state.isFormValid}
                            onClick={this.registerHandler}
                        >
                            Inregistreaza-te
                        </Button>

                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email,password,isLogin) => dispatch(auth(email,password,isLogin))
    }
}

export default connect(null, mapDispatchToProps())(Auth)