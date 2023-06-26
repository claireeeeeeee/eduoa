import React from "react";
import Tree from "react-d3-tree";
import { Link } from 'react-router-dom'
import { useCallback, useState } from "react";

const LearningTree = ( {modules} ) => {

    function createTreeData(module) {
        let nextModules = module.nextModules
        if (nextModules === []) {
            return {name: `${module.name}`}
        }
        let childrenList = []
        for (let i in nextModules) {
            childrenList.push(createTreeData(nextModules[i]))
        }
        return {name: `${module.name}`, children: childrenList}
    }

    const containerStyles = {
        width: "80vw",
        height: "70vh",
        backgroundColor: "lightgrey",
        margin: "1% 10%"
    };

    const test = (n) => {
        // console.log(modules.find(m => m.name === n.name).id);
    }

    const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
        <g>
            <Link to={`/kp/${modules.find(m => m.name === nodeDatum.name).id}`}>
                <circle r="20" onClick={() => test(nodeDatum)} />
                <text fill="black" strokeWidth="1" x="0" y="-25">
                    {nodeDatum.name}
                </text>
            </Link>
            {nodeDatum.attributes?.department && (
                <text fill="black" x="15" dy="15" strokeWidth="1">
                </text>
            )}
        </g>
    );

    const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
        const [translate, setTranslate] = useState(defaultTranslate);
        const containerRef = useCallback((containerElem) => {
            if (containerElem !== null) {
                const { width, height } = containerElem.getBoundingClientRect();
                setTranslate({ x: width / 8, y: height / 2 });
            }
        }, []);
        return [translate, containerRef];
    };

    const [translate, containerRef] = useCenteredTree();

    if (modules.length === 0) {
        return <h1 className="card">No modules to show.</h1>
    }
    return (
        <div style={containerStyles} ref={containerRef}>       
            <Tree 
                data={createTreeData(modules[0])}
                translate={translate}
                renderCustomNodeElement={renderRectSvgNode}
                orientation="horizontal"
            />
        </div>
    )
}

export default LearningTree;