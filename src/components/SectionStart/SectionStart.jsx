import React from "react"
import logo from '../../assets/logo.svg'
import time from '../../assets/time.svg'
import correct from '../../assets/correct.svg'
import result from '../../assets/result.svg'
import classes from './SectionStart.module.css'
import Button from '../Button/Button.jsx'

export default function SectionStart({changeTab}) {
    
    return (
        <section className="container">
            <img src={logo} className={classes.logo} alt="quizmath" />

            <div className={classes.wrapper}>
                <h2 className={classes.subtitle}>Тренируйте знания математики и реакцию</h2>

                <p className={classes.rule}>
                    <img src={time} className={classes.rule_img}/>
                    <span className={classes.rule_text}>Следите за временем</span>
                </p>

                <p className={classes.rule}> 
                    <img src={correct} className={classes.rule_img}/>
                    <span className={classes.rule_text}>Дайте макc. количество ответов</span>
                </p>

                <p className={classes.rule}>
                    <img src={result}className={classes.rule_img} />
                    <span className={classes.rule_text}>Получите результат</span>
                </p>
            </div>

            <Button onButtonClick = {changeTab} nextTab = 'main'>Начать</Button>
        </section>
    )
}