import React from "react"
import Button from '../Button/Button'
import classes from './SectionResult.module.css'
export default function SectionResult({changeTab, score}) {


    return(
        <section className="container">
            <p className = {classes.result_text}>
                Верных ответов: 
                <span className = {classes.score}>{score}</span>
            </p>
            <Button onButtonClick = {changeTab} nextTab = 'main'>Заново</Button>
        </section>
    )
}