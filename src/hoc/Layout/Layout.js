import React, {Component} from "react"
import classes from "./Layout.module.css"
import MenuToggle from "../../Components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../Components/Navigation/Drawer/Drawer";

class Layout extends Component {
    state = {
        menu: false
    }

    menuToggleHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuClose = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <div className={classes.Layout}>


                <Drawer
                    isOpen={this.state.menu}
                    closeMenu={this.menuClose}
                />

                <MenuToggle
                    isOpen = {this.state.menu}
                    onToggle = {this.menuToggleHandler}
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export  default Layout