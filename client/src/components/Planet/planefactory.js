import * as THREE from 'three';

export function init(scene) {

	const plane = {};

	const geometry = new THREE.CircleGeometry(12, 100);
	const material  = new THREE.MeshBasicMaterial();

	material.map = new THREE.TextureLoader();
	material.map.colorSpace = THREE.SRGBColorSpace;

	plane.mesh = new THREE.Mesh(geometry, material);
	material.transparent = true;

	plane.animation = (time, speedTicks) => animation(plane, time, speedTicks);
	plane.hide = () => hide(plane, scene);
	plane.show = (image) => show(plane, scene, image);
	plane.shouldShowStarfield = false;
	return plane;
}

export function animation(plane, time, speedTicks ) {
	if (speedTicks === 0) {
		return;
	}

	plane.mesh.rotation.z = -time / (speedTicks || 300000);
}

export function show(plane, scene, image) {
	plane.mesh.material.map = new THREE.TextureLoader().load(image.src, (texture) => {

		texture.colorSpace = THREE.SRGBColorSpace;
		
		const width = texture.image.width;
		const height = texture.image.height;

		texture.matrixAutoUpdate = false;
		texture.matrix.setUvTransform((1-(height/width))/2, 0, height/width, 1, 0, 0, 0);
	});

	scene.add(plane.mesh);
}

export function hide(plane, scene) {
	scene.remove(plane.mesh);
}