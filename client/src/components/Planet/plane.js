import * as THREE from 'three';

var speedTicks;
let mesh = null;

export function init() {

	const geometry = new THREE.CircleGeometry(12, 100);
	const material  = new THREE.MeshBasicMaterial();

	material.map = new THREE.TextureLoader();
	material.map.colorSpace = THREE.SRGBColorSpace;

	mesh = new THREE.Mesh(geometry, material);
	material.transparent = true;
	mesh.castShadow = true;
	return mesh;
}

export function animation( time ) {

	mesh.rotation.z = -time / (speedTicks || 12000);
}

export function show(image, callback) {
	mesh.material.map = new THREE.TextureLoader().load(image.src, (texture) => {

		texture.colorSpace = THREE.SRGBColorSpace;
		
		const width = texture.image.width;
		const height = texture.image.height;

		texture.matrixAutoUpdate = false;
		texture.matrix.setUvTransform((1-(height/width))/2, 0, height/width, 1, 0, 0, 0);
	});

	callback(mesh);
}