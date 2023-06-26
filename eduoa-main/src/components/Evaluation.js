import { Link } from "react-router-dom";
import React from "react";

const Evaluation = () => {
    return (
        <div>
            <h1>Welcome to EdUoA</h1>
            
                <Link to="/kp/0" className="link">
                    <button className="initialQuiz">Start Initial Evaluation</button>
                </Link>
                
        </div>
    );
}
export default Evaluation;