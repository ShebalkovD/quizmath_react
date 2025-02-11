import React from "react"
import { Link } from "react-router"
import classes from "./Button.module.css"

export default function Button({children, url}) {
    return(
        <button className={classes.button}>
            <span><Link to={url}>{children}</Link></span>
        </button>
    )
}