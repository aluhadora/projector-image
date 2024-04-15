import * as THREE from 'three';

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

export function animation( time, speedTicks ) {
	// .fullSize.fastRotation {
	// 	animation: Rotating-image-spin infinite 60s linear;
	//   }
	//   .fullSize.mediumRotation {
	// 	animation: Rotating-image-spin infinite 300s linear;
	//   }
	//   .fullSize.slowRotation {
	// 	animation: Rotating-image-spin infinite 600s linear;
	//   }
	//   .crazyRotation {
	// 	animation: Rotating-image-spin infinite 10s linear;
	//   }


	if (speedTicks === 0) {
		return;
	}

	mesh.rotation.z = -time / (speedTicks || 300000);
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

export function hide(scene) {
	scene.remove(mesh);
}