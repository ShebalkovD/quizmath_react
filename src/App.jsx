import React, { useState } from "react"
import SectionStart from "./components/SectionStart/SectionStart"
import SectionMain from "./components/SectionMain/SectionMain"

function App() {

    const [tab, setTab] = useState('start')

    function changeTab(nextTab) {
        setTab(nextTab)
    }

    return (
        <>
            <main>
                {tab == 'start' && <SectionStart changeTab = {changeTab}/>}
                {tab == 'main' && <SectionMain changeTab = {changeTab}/>}
            </main>
        </>
    )
}

export default App
