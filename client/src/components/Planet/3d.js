import * as THREE from 'three';
import * as planefactory from './planefactory'
import * as starfieldFactory from './starfield';
import * as planetFactory from './planetFactory';
import * as solarSystemFactory from './solarSystemFactory';
import AvailableImages from '../../AvailableImages';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'stats.js';

var scene, renderer;
var cameras = {};
var camera;
var speedTicks;
var types = {};
var starfield = {};
var controls = {};
var stats;

init();

function init() {

	cameras.main = new THREE.PerspectiveCamera(50, 1, 1, 90);
    cameras.main.position.z = 25;
	
    cameras.side = new THREE.PerspectiveCamera(55, 1, 1, 90);
	cameras.side.position.x = 0;
	cameras.side.position.y = -29.07;
	cameras.side.position.z = 15.05;

    scene = new THREE.Scene();

	starfield = starfieldFactory.init(scene);
	
    renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance", antialias: false });
    renderer.setAnimationLoop( animation );
	renderer.shadowMap.enabled = true;
	renderer.gamaFactor = 2.2;

	controls.side = new OrbitControls( cameras.side, renderer.domElement );
	controls.side.update();

	controls.main = new OrbitControls( cameras.main, renderer.domElement );
	controls.main.update();

	stats = new Stats()
	stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild(stats.dom)
	stats.dom.style.display = 'none';
}

function animation( time ) {

	if( !renderer.domElement.parentNode ) return;
	stats.begin();

	Object.keys(types).forEach(key => types[key].animation(time, speedTicks));
	// controls.main.update();
	// controls.side.update();

	renderer.render( scene, camera );
	stats.end();
}

function resize() {
	const container = renderer.domElement.parentNode;
	if( container ) {
		const width = container.offsetWidth;
		const height = container.offsetHeight;

		renderer.setSize( width, height );

		cameras.main.aspect = width / height;
		cameras.main.updateProjectionMatrix();

		cameras.side.aspect = width / height;
		cameras.side.updateProjectionMatrix();
	}
}

window.addEventListener( 'resize', resize );

resize();

function factoryFromType(type) {
	switch (type) {
		case 'planet':
		case 'star':
		case 'moon':
			return planetFactory;
		case 'solarSystem':
			return solarSystemFactory;
		default:
			return planefactory;
	}
}

function showType(image, state) {
	Object.keys(types).filter(key => key !== image.type).forEach(key => types[key].hide(scene));
	
	if (!types[image.type]) types[image.type] = factoryFromType(image.type).init(scene);
	types[image.type].show(image, state);
	
	if (types[image.type].shouldShowStarfield) {
		starfield.show(state);
	} else {
		starfield.hide();
	}

	if (types[image.type].sideCamera) {
		camera = cameras.side;
	} else {
		// controls.main.rotation.x = 0;
		// controls.main.rotation.y = 0;
		// controls.main.rotation.z = 0;
		// controls.main.update();

		camera = cameras.main;
	}
}

function showStats(state) {
	if (state.showStats) {
		stats.dom.style.display = 'block';
	} else {
		stats.dom.style.display = 'none';
	}
	
}

export function mount(container, state, callbacks) {
	let image = AvailableImages.images.find(i => i.id === state.imageId) || {};
    let speed = AvailableImages.speeds.find(s => s.id === state.speedId) || {};

	speedTicks = speed.rotationTicks;

	if (callbacks) {
			callbacks.stuff = p => { 	
			cameras.side.rotation.x = 0.84;
			cameras.side.rotation.y = 0;
			cameras.side.rotation.z = 0;
			document.title = `Updated ${p}`
		}
	}

	console.log("mount", image, state, speedTicks)
	showType(image, state);
	showStats(state);
	
	if( container ) {
		container.insertBefore( renderer.domElement, container.firstChild );
		resize();
	} else {
		renderer.domElement.remove();
	}
}
