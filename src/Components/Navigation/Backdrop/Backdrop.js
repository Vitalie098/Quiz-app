import React from "react"
import classes from "./Backdrop.module.css"

const BackDrop = props => <div className={classes.BackDrop} onClick={props.closeMenu} />

export default BackDrop