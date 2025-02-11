import React, { useState, useRef } from "react"
import SectionStart from "./components/SectionStart/SectionStart"
import SectionMain from "./components/SectionMain/SectionMain"
import SectionResult from "./components/SectionResult/SectionResult"
import { Routes, Route } from 'react-router'

function App() {

    const [score, setScore] = useState(0)

    function handleSetScore(score) {
        setScore(score + 1)
    }

    return (
        <>
            <main>
                <Routes>
                    <Route path = "/" element = {<SectionStart />}/>
                    <Route path = "/quiz" element = {<SectionMain score = {score} handleSetScore = {handleSetScore} />}/>
                    <Route path = "/result" element = {<SectionResult score = {score} />}/>
                </Routes>
            </main>
        </>
    )
}

export default App
