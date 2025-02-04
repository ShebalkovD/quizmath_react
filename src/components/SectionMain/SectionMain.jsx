import React, { useState } from "react"
import classes from './SectionMain.module.css'

export default function SectionMain () {

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
        let asnwerValid = true // Ответ отличается от других

        answers.forEach(answer => {
            if (answer.value == currentAnswer) {
                asnwerValid = false
            }
        })

        return asnwerValid
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
        }
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
        questionText = `${x} ${operator} ${y}`
        switch (operator) {
            case '+':
                x = getRandomInt(100)
                y = getRandomInt(100)
                questionText = `${x} ${operator} ${y}`
                // Создать 5 ответов
                for (let i = 0; i < 5; i++) {
                    let answer = {} // Объект ответа
                    answer.id = i + 1 // id ответа

                    // Первый ответ - верный, остальные - неверные
                    if (i == 0) {
                        answer.value = x + y // Значение ответа
                        answer.isCorrect = true // Правильность ответа
                    }
                    else {
                        // Проверить, чтобы ответ не совпадал с другими. В таком случае - заново сгенерировать ответ
                        do {
                            answer.value = (x + getRandomInt(10)) + (y - getRandomInt(10)) // Значение неверного ответа отличается на незначительное случайное число
                        } while (!checkAnswer(answer.value, answers))
                        answer.isCorrect = false
                    }

                    answers.push(answer) // Добавить ответ в список
                }

                break;
            case '-':
                x = getRandomInt(100)
                y = getRandomInt(100)
                questionText = `${x} ${operator} ${y}`
                // Создать 5 ответов
                for (let i = 0; i < 5; i++) {
                    let answer = {} // Объект ответа
                    answer.id = i + 1 // id ответа

                    // Первый ответ - верный, остальные - неверные
                    if (i == 0) {
                        answer.value = x - y // Значение ответа
                        answer.isCorrect = true // Правильность ответа
                    }
                    else {
                        // Проверить, чтобы ответ не совпадал с другими. В таком случае - заново сгенерировать ответ
                        do {
                            answer.value = (x + getRandomInt(10)) - (y - getRandomInt(10)) // Значение неверного ответа отличается на незначительное случайное число
                        } while (!checkAnswer(answer.value, answers))
                        answer.isCorrect = false
                    }

                    answers.push(answer) // Добавить ответ в список
                }

                break;
            case '*':
                x = getRandomInt(10)
                y = getRandomInt(10)
                questionText = `${x} ${operator} ${y}`
                // Создать 5 ответов
                for (let i = 0; i < 5; i++) {
                    let answer = {} // Объект ответа
                    answer.id = i + 1 // id ответа

                    // Первый ответ - верный, остальные - неверные
                    if (i == 0) {
                        answer.value = x * y // Значение ответа
                        answer.isCorrect = true // Правильность ответа
                    }
                    else {
                        // Проверить, чтобы ответ не совпадал с другими. В таком случае - заново сгенерировать ответ
                        do {
                            answer.value = (x + getRandomInt(3)) * (y - getRandomInt(3)) // Значение неверного ответа отличается на незначительное случайное число
                        } while (!checkAnswer(answer.value, answers))
                        answer.isCorrect = false
                    }

                    answers.push(answer) // Добавить ответ в список
                }

                break;
            case '/':
                x = getRandomInt(100)
                y = getRandomInt(10) + 2
                

                while(x % y != 0 ) {
                    x = getRandomInt(100)
                    y = getRandomInt(10) + 2
                }

                questionText = `${x} ${operator} ${y}`
                // Создать 5 ответов
                for (let i = 0; i < 5; i++) {
                    let answer = {} // Объект ответа
                    answer.id = i + 1 // id ответа

                    // Первый ответ - верный, остальные - неверные
                    if (i == 0) {
                        answer.value = x / y // Значение ответа
                        answer.isCorrect = true // Правильность ответа
                    }
                    else {
                        // Проверить, чтобы ответ не совпадал с другими. В таком случае - заново сгенерировать ответ
                        do {
                            answer.value = (getRandomInt(10)) // Значение неверного ответа отличается на незначительное случайное число
                        } while (!checkAnswer(answer.value, answers))
                        answer.isCorrect = false
                    }

                    answers.push(answer) // Добавить ответ в список
                }

                break;
        }

        // Перемешать ответы
        mixAnswers(answers)

        // Вернуть новый вопрос
        return new Question(questionText, answers)
    }

    // Обработать нажатие на кнопку ответа
    function handleClick(value) {
        if (value.isCorrect) {
            setScore(score + 1)
        }

        setCurrentQuestion(createRandomQuestion())
    }
    
    const [score, setScore] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState( createRandomQuestion() )

    return(
        <section>
            <p>Верных ответов: {score}</p>
            <p className = {classes.question}>{currentQuestion.question}</p>
            <div>
               {currentQuestion.answers.map((value) => {
                return <button onClick = {() => handleClick(value)} key = {value.id} className = {classes.answer}>{value.value}</button>
               })}
            </div>
        </section>
    )
}