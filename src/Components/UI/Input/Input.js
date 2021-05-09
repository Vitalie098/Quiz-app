import React from "react"
import classes from "./Input..module.css"


function isInvalid({valid,touched,ShouldValidate}) {
    return !valid && touched && ShouldValidate
}

const Input = props => {

    const cls = [classes.Input]
    const htmlFor = `${props.label}-${Math.random()}`
    const type = props.type || "text"

    if(isInvalid(props)) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(" ")}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                className={cls.join(" ")}
                id={htmlFor}
                value={props.value}
                type={type}
                onChange={props.onChange}
            />

            {isInvalid(props) ? <span>{props.errorMessage || "Introduce-ti datele corecte"}</span> : null}
        </div>
    )
}

export default Input