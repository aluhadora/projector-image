import * as THREE from 'three';

var meshes = {};
var materials = {};

init();

export function init() {

	function loadPlanetMesh() {
		var geometry = new THREE.SphereGeometry(10, 100, 100);
		materials.planet  = new THREE.MeshLambertMaterial();
	
		meshes.planet = new THREE.Mesh(geometry, materials.planet);
		meshes.planet.castShadow = true;
		meshes.planet.rotation.x += 0.5;
	}

	function loadRingMesh() {
		var ring = new THREE.RingGeometry( 10, 25, 100 );

		materials.ring = new THREE.MeshLambertMaterial( { 
			side: THREE.DoubleSide, 
			transparent: true
		} );

		meshes.ring = new THREE.Mesh( ring, materials.ring );
		meshes.ring.receiveShadow = true;
		meshes.ring.rotation.x += Math.PI/2 + 0.5;
	}

	loadPlanetMesh();
	loadRingMesh();
}

export function animation( time, speedTicks ) {
	if (speedTicks === 0) {
		return;
	}
	
	meshes.planet.rotation.y = time / (speedTicks || 12000);
}

export function hide(scene) {
	scene.remove(meshes.planet);
	scene.remove(meshes.ring);
}

export function show(image, scene) {
	materials.planet.map = new THREE.TextureLoader().load(image.flatsrc);
	materials.planet.displacementMap = new THREE.TextureLoader().load(image.bumpsrc);
	materials.planet.map.colorSpace = THREE.SRGBColorSpace;

	scene.add(meshes.planet);
	if (image.ringsrc) {
		materials.ring.map = new THREE.TextureLoader().load(image.ringsrc);
		scene.add(meshes.ring);
	} else {
		scene.remove(meshes.ring);
	}
}