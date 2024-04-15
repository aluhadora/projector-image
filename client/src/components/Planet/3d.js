import * as THREE from 'three';
import * as plane from './plane'
import * as starfield from './starfield';
import * as planet from './bigplanet';
import * as lights from './lights';
import * as solarSystem from './solarsystem';
import AvailableImages from '../../AvailableImages';

var scene, renderer;
var cameras = {};
var camera;
var meshes = {};
var speedTicks;

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
	meshes.plane = plane.init();
	meshes.star = starfield.init();
	planet.init(scene);
	solarSystem.init(scene);
	lights.init(scene);
	
    renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance" });
    renderer.setAnimationLoop( animation );
	renderer.shadowMap.enabled = true;
	renderer.gamaFactor = 2.2;
}

function animation( time ) {

	if( !renderer.domElement.parentNode ) return;

	plane.animation(time, speedTicks);
	planet.animation(time, speedTicks);
	solarSystem.animation(time, speedTicks);

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

function showFlatMesh(image) {
	camera = cameras.main;
	solarSystem.hide();
	planet.hide(scene)
	starfield.hide(scene);
	scene.remove(meshes.star);
	solarSystem.hide();
	plane.show(image, mesh => scene.add(mesh));
	lights.hide();
}

function showPlanetMesh(image, state) {
	camera = cameras.main;
	scene.remove(meshes.plane);
	planet.show(image, scene);
	starfield.show(image, state, mesh => scene.add(mesh), mesh => scene.remove(mesh));
	solarSystem.hide();
	lights.show(image, state);
}

function showSolarSystem(image, state) {
	camera = cameras.side;
	starfield.show(image, state, mesh => scene.add(mesh), mesh => scene.remove(mesh));
	planet.hide(scene);
	plane.hide(scene);
	solarSystem.show();
	lights.hide();
}

export function mount(container, state) {
	let image = AvailableImages.images.find(i => i.id === state.imageId) || {};
    let speed = AvailableImages.speeds.find(s => s.id === state.speedId) || {};

	speedTicks = speed.rotationTicks;

	console.log("mount", image, state, speedTicks)
	if (!image.type || !state.show3d) {
		showFlatMesh(image);
	} else if (image.type !== 'solarSystem') {
		showPlanetMesh(image, state);
	} else {
		showSolarSystem(image, state);
	}
	
	if( container ) {
		container.insertBefore( renderer.domElement, container.firstChild );
		resize();
	} else {
		renderer.domElement.remove();
	}
}
