import { useCallback } from 'react';
import { mount } from './saturn';
import './index.css';
    
export default function Planet({ image, speed, brightness }) {

    console.log("Planet", image, speed);
    const containerRef = useCallback((c) => mount(c, speed.rotationTicks, image), [speed, image]);
	return <div className={"Cube-container " + brightness.className} ref={containerRef}></div>

}