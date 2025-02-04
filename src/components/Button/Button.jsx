import React from "react"
import classes from "./Button.module.css"

export default function Button({children, onButtonClick, nextTab}) {
    return(
        <button className={classes.button} onClick = {() => onButtonClick(nextTab)}><span>{children}</span></button>
    )
}