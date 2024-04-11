import { useCallback } from 'react';
import { mount } from './3d.js';
import './index.css';
    
export default function Planet({ state, brightness }) {

    console.log('Planet', state, brightness);
    const containerRef = useCallback((c) => mount(c, state), [state]);
	return <div className={"Cube-container " + brightness.className} ref={containerRef}></div>

}