import is from "is_js"

export function createControl(config,validation) {
    return {
        ...config,
        validation,
        touched:false,
        valid:!validation,
        value: ""
    }
}

export function validateControl(value,validation) {
    if(!validation) {
        return true
    }

    let isValid = true

    if(validation.required) {
        isValid = value.trim() != "" && isValid
    }

    if(validation.email) {

        isValid = is.email(value) && isValid
    }

    if(validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
    }

    return isValid
}

export function validateForm(formControls) {

    let isFormValid = true

    for(let control in formControls) {
        if(formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid
}