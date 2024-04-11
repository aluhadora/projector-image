import * as THREE from 'three';
import AvailableImages from '../../AvailableImages';

var camera, scene, renderer;
var speedTicks;
var lights = {}
var materials = {};
var meshes = {};

init();

function init() {

    camera = new THREE.PerspectiveCamera(50, 1, 1, 40);
    camera.position.z = 25;

    scene = new THREE.Scene();

	function loadFlatMesh() {
		var geometry = new THREE.CircleGeometry(12, 100);
		materials.plane  = new THREE.MeshBasicMaterial();
	
		materials.plane.map = new THREE.TextureLoader();
		materials.plane.map.colorSpace = THREE.SRGBColorSpace;	// ### r152 [fixed]
	
		meshes.plane = new THREE.Mesh(geometry, materials.plane);
		materials.plane.transparent = true;
		meshes.plane.castShadow = true;
		// meshes.plane.rotation.x += 0.5;
		scene.add(meshes.plane);
	}

	function loadPlanetMesh() {
		var geometry = new THREE.SphereGeometry(10, 100, 100);
		materials.planet  = new THREE.MeshLambertMaterial();
	
		meshes.planet = new THREE.Mesh(geometry, materials.planet);
		meshes.planet.castShadow = true;
		meshes.planet.rotation.x += 0.5;
		scene.add(meshes.planet);
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
	
		scene.add(meshes.ring);
	}

	function loadLights() {
		lights.ambient = new THREE.AmbientLight( 0xffffff, .00 );
		lights.point = new THREE.DirectionalLight( 0xffffff, 1 );
		lights.point.castShadow = true;
		lights.ambient.position.set(15, 15, 15);
		lights.point.position.set(50, 10, 15);
		
		scene.add(lights.ambient);
		scene.add(lights.point);
	}

	function loadSkyBox() {
		const geometry = new THREE.SphereGeometry(20, 256, 256);
		materials.star = new THREE.MeshBasicMaterial({
			side: THREE.BackSide,
		});

		materials.star.map = new THREE.TextureLoader().load('images/planets/starmap_g4k_dark.webp');
		materials.star.map.colorSpace = THREE.SRGBColorSpace;
		// materials.star.map.transparent = true;
		// materials.star.map.opacity = 0.1;
		// materials.star.opacity = 0.1;

		meshes.star = new THREE.Mesh(geometry, materials.star);
		meshes.star.rotation.y = Math.PI / 2;
		// meshes.star.opacity = 0.1;
		// meshes.star.transparent = true;

		scene.add(meshes.star);
	}

	loadFlatMesh();
	loadPlanetMesh();
	loadRingMesh();
	loadLights();
	loadSkyBox();

    renderer = new THREE.WebGLRenderer({ powerPreference: "high-performance" });
    renderer.setAnimationLoop( animation );
	renderer.shadowMap.enabled = true;
	renderer.gamaFactor = 2.2;
}

function animation( time ) {

	if( !renderer.domElement.parentNode ) return;

	meshes.planet.rotation.y = time / (speedTicks || 12000);
	meshes.plane.rotation.z = -time / (speedTicks || 12000);

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
	scene.remove(meshes.planet);
	scene.remove(meshes.ring);
	scene.remove(meshes.star);
	lights.point.intensity = 0;
	lights.ambient.intensity = 0;
	materials.plane.map = new THREE.TextureLoader().load(image.src, (texture) => {

		texture.colorSpace = THREE.SRGBColorSpace;
		
		const width = texture.image.width;
		const height = texture.image.height;

		texture.matrixAutoUpdate = false;
		texture.matrix.setUvTransform((1-(height/width))/2, 0, height/width, 1, 0, 0, 0);
	});

	scene.add(meshes.plane);
}

function showPlanetMesh(image, state) {
	scene.remove(meshes.plane);
	materials.planet.map = new THREE.TextureLoader().load(image.flatsrc);
	materials.planet.displacementMap = new THREE.TextureLoader().load(image.bumpsrc);
	materials.planet.map.colorSpace = THREE.SRGBColorSpace;

	if (state.showStarfield) {
		scene.add(meshes.star);
	} else {
		scene.remove(meshes.star);
	}

	if (state.pointLight) {
		lights.point.intensity = 1;
		lights.ambient.intensity = 0.01;
	} else {
		lights.point.intensity = 0;
		lights.ambient.intensity = 1;
	}

	scene.add(meshes.planet);
	if (image.ringsrc) {
		materials.ring.map = new THREE.TextureLoader().load(image.ringsrc);
		scene.add(meshes.ring);
	} else {
		scene.remove(meshes.ring);
	}
}

export function mount(container, state) {
	let image = AvailableImages.images.find(i => i.id === state.imageId) || {};
    let speed = AvailableImages.speeds.find(s => s.id === state.speedId) || {};

	speedTicks = speed.rotationTicks;

	if (image.type !== "planet" || !state.show3d) {
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
