import React, { useState } from 'react'
import LearningTree from './LearningTree'
import QuestionDatabaseItem from './QuestionDatabaseItem'

export default function QuestionDatabaseComponent( {modules, questionSets} ) {

    function toggleTreeView() {
        setTreeView(!treeView)
    }

    const [treeView, setTreeView] = useState(true)

    if (questionSets.length === 0) {
        return <h1 className="card">No question sets to show.</h1>
    }

    return (
        <>
            <div className="swap-views">
                <button className="button-switch" onClick={toggleTreeView}>{treeView ? "Switch to Grid View" : "Switch to Tree View"}</button>
            </div>
            {treeView && <LearningTree modules={modules} />}
            {!treeView && questionSets.map((questionSet, index) => (
                <QuestionDatabaseItem
                    key = {index}
                    questionSet = {questionSet}
                />
            ))}
        </>
    )
}
