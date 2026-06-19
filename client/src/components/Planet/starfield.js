import * as THREE from 'three';
import { prefixPath } from '../../AvailableImages.js';

export function init(scene) {

	const starfield = {};
	const geometry = new THREE.SphereGeometry(30, 256, 256);
	const material = new THREE.MeshBasicMaterial({
		side: THREE.BackSide,
	});

	material.map = new THREE.TextureLoader().load(prefixPath('images/planets/starmap_g4k_dark.webp'));
	material.map.colorSpace = THREE.SRGBColorSpace;

	starfield.mesh = new THREE.Mesh(geometry, material);
	starfield.mesh.rotation.x = Math.PI / 2.5;

	starfield.hide = () => hide(starfield, scene);
	starfield.show = state => show(starfield, scene, state);

	return starfield;
}

function hide(starfield, scene) {
	scene.remove(starfield.mesh);
}

function show(starfield, scene, state) {
	if (state.showStarfield) {
		scene.add(starfield.mesh);
	} else {
		scene.remove(starfield.mesh);
	}
}