import * as THREE from 'three';

let mesh = {};

export function init() {

	const geometry = new THREE.SphereGeometry(20, 256, 256);
	const material = new THREE.MeshBasicMaterial({
		side: THREE.BackSide,
	});

	material.map = new THREE.TextureLoader().load('images/planets/starmap_g4k_dark.webp');
	material.map.colorSpace = THREE.SRGBColorSpace;

	mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.y = Math.PI / 2;
}

export function hide(scene) {
	scene.remove(mesh);
}

export function show(image, state, add, remove) {
	if (state.showStarfield) {
		add(mesh);
	} else {
		remove(mesh);
	}
}