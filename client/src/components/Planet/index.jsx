import { useCallback } from 'react';
import { mount } from './3d2';
import './index.css';
    
export default function Planet({ image, speed }) {

    console.log("Planet", image, speed);
    const containerRef = useCallback((c) => mount(c, speed.rotationTicks, image.src), [speed, image]);
	return <div className="Cube-container" ref={containerRef}></div>

}