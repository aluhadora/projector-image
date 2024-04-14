import * as THREE from 'three';
import * as plane from './plane'
import * as starfield from './starfield';
import * as planet from './planet';
import * as lights from './lights';
import AvailableImages from '../../AvailableImages';

var camera, scene, renderer;
var meshes = {};

init();

function init() {

    camera = new THREE.PerspectiveCamera(50, 1, 1, 40);
    camera.position.z = 25;

    scene = new THREE.Scene();
	meshes.plane = plane.init();
	meshes.star = starfield.init();
	planet.init();
	lights.init(scene);
	
    renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance" });
    renderer.setAnimationLoop( animation );
	renderer.shadowMap.enabled = true;
	renderer.gamaFactor = 2.2;
}

function animation( time ) {

	if( !renderer.domElement.parentNode ) return;

	plane.animation(time);
	planet.animation(time);

	renderer.render( scene, camera );
}

function resize() {
	const container = renderer.domElement.parentNode;
	if( container ) {
		const width = container.offsetWidth;
		const height = container.offsetHeight;

		renderer.setSize( width, height );

		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	}
}

window.addEventListener( 'resize', resize );

resize();

function showFlatMesh(image) {
	planet.hide(scene)
	starfield.hide(scene);
	scene.remove(meshes.star);
	plane.show(image, mesh => scene.add(mesh));
	lights.hide();
}

function showPlanetMesh(image, state) {
	scene.remove(meshes.plane);
	planet.show(image, scene);
	starfield.show(image, state, mesh => scene.add(mesh), mesh => scene.remove(mesh));

	lights.show(image, state);
}

export function mount(container, state) {
	let image = AvailableImages.images.find(i => i.id === state.imageId) || {};

	if (!image.type || !state.show3d) {
		showFlatMesh(image);
	} else {
		showPlanetMesh(image, state);
	}
	
	if( container ) {
		container.insertBefore( renderer.domElement, container.firstChild );
		resize();
	} else {
		renderer.domElement.remove();
	}
}
