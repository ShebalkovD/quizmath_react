import React, { useState } from "react"
import SectionStart from "./components/SectionStart/SectionStart"
import SectionMain from "./components/SectionMain/SectionMain"
import SectionResult from "./components/SectionResult/SectionResult"

function App() {

    const [tab, setTab] = useState('start')
    const [score, setScore] = useState(0)

    function handleSetScore(score) {
        setScore(score + 1)
    }

    function changeTab(nextTab) {
        setTab(nextTab)
    }

    return (
        <>
            <main>
                {tab == 'start' && <SectionStart changeTab = {changeTab}/>}
                {tab == 'main' && <SectionMain changeTab = {changeTab} score = {score} handleSetScore = {handleSetScore}/>}
                {tab == 'result' && <SectionResult changeTab = {changeTab} score = {score}/>}
            </main>
        </>
    )
}

export default App
