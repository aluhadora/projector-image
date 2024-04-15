import * as THREE from 'three';
import * as planefactory from './planefactory'
import * as starfieldFactory from './starfield';
import * as planetFactory from './planetFactory';
import * as solarSystemFactory from './solarSystemFactory';
import AvailableImages from '../../AvailableImages';

var scene, renderer;
var cameras = {};
var camera;
var speedTicks;
var types = {};
var starfield = {};

init();

function init() {

	cameras.main = new THREE.PerspectiveCamera(50, 1, 1, 50);
    cameras.main.position.z = 25;
	
    cameras.side = new THREE.PerspectiveCamera(50, 1, 1, 90);
    cameras.side.position.z = 15;
	cameras.side.position.y = -30;

	cameras.side.lookAt(0, 0, 0);
	cameras.side.position.z = 12;

    scene = new THREE.Scene();

	starfield = starfieldFactory.init(scene);
	
    renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance", antialias: true});
    renderer.setAnimationLoop( animation );
	renderer.shadowMap.enabled = true;
	renderer.gamaFactor = 2.2;
}

function animation( time ) {

	if( !renderer.domElement.parentNode ) return;

	Object.keys(types).forEach(key => types[key].animation(time, speedTicks));

	renderer.render( scene, camera );
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
	types[image.type].show(image);
	
	if (types[image.type].shouldShowStarfield) {
		starfield.show(state);
	} else {
		starfield.hide();
	}

	if (types[image.type].sideCamera) {
		camera = cameras.side;
	} else {
		camera = cameras.main;
	}
}

export function mount(container, state) {
	let image = AvailableImages.images.find(i => i.id === state.imageId) || {};
    let speed = AvailableImages.speeds.find(s => s.id === state.speedId) || {};

	speedTicks = speed.rotationTicks;

	console.log("mount", image, state, speedTicks)
	showType(image, state);
	
	if( container ) {
		container.insertBefore( renderer.domElement, container.firstChild );
		resize();
	} else {
		renderer.domElement.remove();
	}
}
