import { useCallback } from 'react';
import { mount } from './3d.js';
import './index.css';
    
export default function Planet({ state, classNames, callbacks }) {

    console.log("planet", callbacks)
    classNames = classNames.filter(c => c && !c.endsWith("Rotation"));
    const containerRef = useCallback((c) => mount(c, state, callbacks), [state, callbacks]);
	return <div className={"Cube-container " + classNames.join(" ")} ref={containerRef}></div>

}