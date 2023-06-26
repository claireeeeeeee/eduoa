import React from "react";
import { Link } from "react-router-dom";

export default function KnowledgePoint( {module, admin} ) {
  let label, link, buttonLabel
  if (admin) {
    label = "Details"
    link = "qset"
    buttonLabel = "Details"
  } else {
    label = "Start Evaluation"
    link = "quiz"
    buttonLabel = "Start"
  }
  return (
    <div className="App">
      <h1 className="title">{module.name}</h1>
      {module.length === 0 ? <h1 className="card">This module has no knowledge points.</h1> :
      <table className="kpTable">
        <thead>
          <tr>
            <th>No.</th> 
            <th>Name</th> 
            <th>Difficulty</th> 
            <th>Length</th>
            <th>{label}</th>
          </tr>
        </thead>

        <tbody>
          {module.map((questionSet, index) => (
            <tr key={index}>
              <td>{questionSet.id}</td> 
              <td>{questionSet.name}</td> 
              <td>{questionSet.difficulty}</td> 
              <td>{questionSet.length}</td>
              <td>
                <Link to={`/${link}/${questionSet.id}`}>
                  <button className="startButton">{buttonLabel}</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}
