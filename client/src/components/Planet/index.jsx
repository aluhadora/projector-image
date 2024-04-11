import { useCallback } from 'react';
import { mount } from './3d.js';
import './index.css';
    
export default function Planet({ state, classNames }) {

    classNames = classNames.filter(c => !c.endsWith("Rotation"));
    const containerRef = useCallback((c) => mount(c, state), [state]);
	return <div className={"Cube-container " + classNames.join(" ")} ref={containerRef}></div>

}