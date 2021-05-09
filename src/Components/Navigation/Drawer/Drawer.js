import React, {Component} from "react"
import classes from "./Drawer.module.css"
import BackDrop from "../Backdrop/Backdrop";
import {NavLink} from "react-router-dom"

const links = [
    {to: "/", label: "Lista testelor", exact: true},
    {to: "/quiz-create", label: "Creeaza test", exact: false},
    {to: "/auth", label: "Autentificare", exact: false},
]

class Drawer extends Component {

    renderLinks() {
        return links.map((link,index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.props.closeMenu}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {

        const cls = [classes.Drawer]

        if(!this.props.isOpen) {
            cls.push(classes.close)
        }
        return (
            <React.Fragment>
                <nav className={cls.join(" ")}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop closeMenu = {this.props.closeMenu}/> : null}
            </React.Fragment>

        )
    }
}

export default Drawer