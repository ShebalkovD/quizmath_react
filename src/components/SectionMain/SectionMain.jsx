import React, { useEffect, useState } from "react"
import classes from './SectionMain.module.css'
import logo from '../../assets/logo.svg'
import timeImg from '../../assets/time-dark.svg'
import correctImg from '../../assets/correct-dark.svg'

export default function SectionMain ({changeTab, score, handleSetScore}) {

    // Класс вопроса
    class Question {
        constructor(question, answers) {
            this.question = question
            this.answers = answers
        }
    }

    // Получить случайное целое число от 0 до макс.
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Проверить, чтобы ответ не совпадал с другим
    function checkAnswer(currentAnswer, answers) {
        let answerValid = true // Ответ отличается от других

        answers.forEach(answer => {
            if (answer.value == currentAnswer) {
                answerValid = false
            }
        })

        return answerValid
    }

    // Перемешать массив ответов
    function mixAnswers(arr) {
        let j, temp;
        
        for(let i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
       
        return arr;
    }

    // Получить знак для вычислений
    function getOperation() {
        let num = getRandomInt(4)

        switch (num) {
            case 0:
                return '+'
            case 1:
                return '-'
            case 2:
                return '*'
            case 3:
                return '/'
            default: 
                return '+'
        }
    }

    // Сгенерировать 5 случайных вопросов
    function generateAnswers(correctAnswer) {
        let answers = []

        for (let i = 0; i < 5; i++) {
            let answer = {} // Объект ответа
            answer.id = i + 1 // id ответа

            // Первый ответ - верный, остальные - неверные
            if (i == 0) {
                answer.value = correctAnswer // Значение ответа
                answer.isCorrect = true // Правильность ответа
            }
            else {
                let answerValid = true
                // Проверить, чтобы ответ не совпадал с другими. В таком случае - заново сгенерировать ответ
                do {
                    let randNum = getRandomInt(10)
                    randNum >= 5 ? answer.value = correctAnswer + getRandomInt(10) + 1 : answer.value = correctAnswer - getRandomInt(10) + 1
                    answerValid = checkAnswer(answer.value, answers) 
                } while (!answerValid)
                answer.isCorrect = false
            }

            answers.push(answer) // Добавить ответ в список
        }

        return answers
    }

    // Создать случайный вопрос
    function createRandomQuestion() {

        // Получить знак операции вычислений
        let operator = getOperation()

        // Сохранить текст вопроса и список ответов
        let questionText = ''
        let answers = []

        // Значения для вычислений
        let x = 0
        let y = 0
        let correctAnswer = 0

        questionText = `${x} ${operator} ${y}`

        switch (operator) {
            case '+':
                x = getRandomInt(100)
                y = getRandomInt(100)
                correctAnswer = x + y

                questionText = `${x} ${operator} ${y}`
                answers = generateAnswers(correctAnswer)

                break;
            case '-':
                x = getRandomInt(100)
                y = getRandomInt(100)
                correctAnswer = x - y

                questionText = `${x} ${operator} ${y}`
                answers = generateAnswers(correctAnswer)

                break;
            case '*':
                x = getRandomInt(10)
                y = getRandomInt(10)
                correctAnswer = x * y

                questionText = `${x} ${operator} ${y}`
                answers = generateAnswers(correctAnswer)

                break;
            case '/':
                y = getRandomInt(10) + 1
                x = getRandomInt(10) * y
                correctAnswer = x / y

                questionText = `${x} ${operator} ${y}`
                answers = generateAnswers(correctAnswer)

                break;
        }

        // Перемешать ответы
        mixAnswers(answers)

        // Вернуть новый вопрос
        return new Question(questionText, answers)
    }

    // Обработать нажатие на кнопку ответа
    function handleClick(value, event) {
        if (value.isCorrect) {
            handleSetScore(score)

            // Поменять цвет на синий
            event.target.style.backgroundColor = '#009DFF'
            setTimeout(function() {
                event.target.style.backgroundColor = '' 
            }, 100)
        }else {
            // Поменять цвет на красный
            event.target.style.backgroundColor = '#FF004C'
            setTimeout(function() {
                event.target.style.backgroundColor = '' 
            }, 100)
        }

        setTimeout(function() {
            setCurrentQuestion(createRandomQuestion()) 
        }, 100)
    }

    function startTimer() {
        handleSetScore(-1)
        let counter = time
        const timer = setInterval(() => {
            if (counter > 0) {
                counter -= 1
            }
            else {
                clearInterval(timer)
                changeTab('result')
            }
            setTime(counter)
        }, 1000)
        return timer
    }
    

    const [currentQuestion, setCurrentQuestion] = useState( createRandomQuestion() )
    const [time, setTime] = useState(30)



    useEffect(() => {
        let timer = startTimer()
        return() => {
            clearInterval(timer)
        }
    }, [])

    return(
        <section className="container" style={{justifyContent: 'start', padding: '2rem'}}>
            <div className={classes.info_container}>
                <img src={logo} alt="quizmath" className={classes.logo}/>
                <p className={classes.info}>
                    <img src={timeImg} className={classes.info_img}/>
                    <span className={classes.info_text}>{time}</span> 
                </p>
                <p className={classes.info}>
                    <img src={correctImg} className={classes.info_img}/>
                    <span className={classes.info_text}>{score}</span>
                </p>
            </div>
            
            <p className = {classes.question}>{currentQuestion.question}</p>
            <div className = {classes.answer_wrapper}>
               {currentQuestion.answers.map((value) => {
                return <button onClick = {(e) => handleClick(value, e)} key = {value.id} className = {classes.answer} onMouseEnter={(e) => {e.target.style.backgroundColor = '#252938'}} onMouseLeave={(e) => {e.target.style.backgroundColor = '#222632'}}>{value.value}</button>
               })}
            </div>
        </section>
    )
}