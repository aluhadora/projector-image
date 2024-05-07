import * as THREE from 'three';

function buildPlanetMaterial(image, radius) {
	const materials = {};

	if (image.type === 'star') {
		materials.planet = new THREE.MeshBasicMaterial();
	} else {
		materials.planet = new THREE.MeshLambertMaterial();
	}

	if (radius < 3) {
		materials.planet.map = new THREE.TextureLoader().load(image.smallflatsrc);
			
		materials.ring = new THREE.MeshBasicMaterial( { 
			side: THREE.DoubleSide, 
			transparent: true,
			opacity: 0.3
		} );
		materials.ring.map = new THREE.TextureLoader().load(image.smallringsrc);

	} else {
		materials.planet.map = new THREE.TextureLoader().load(image.flatsrc);
		if (image.bumpsrc) materials.planet.displacementMap = new THREE.TextureLoader().load(image.bumpsrc);

		materials.ring = new THREE.MeshLambertMaterial( { 
			side: THREE.DoubleSide, 
			transparent: true,
		} );

		materials.ring.map = new THREE.TextureLoader().load(image.ringsrc);
	}

	materials.planet.map.colorSpace = THREE.SRGBColorSpace;
	materials.ring.map.colorSpace = THREE.SRGBColorSpace;

	return materials;
}

function buildMeshes(materials, info) {
	const radius = info.simpleRadius || 1;
	// const radius = Math.log(info.actualRadius) / 10;
	const rotation = Math.PI * info.axialTilt / 180;
	const orbitRadius = info.simpleDistance;
	let meshes = {};
	
	const geometry = new THREE.SphereGeometry(radius, 100, 100);
	const ring = new THREE.RingGeometry( radius * 1.5, radius * 2.5, 100 );

	meshes.planet = new THREE.Mesh(geometry, materials.planet);
	meshes.planet.castShadow = true;
	// meshes.planet.receiveShadow = true;
	meshes.planet.rotation.x += Math.PI/2;
	meshes.planet.rotation.x += rotation;
	meshes.planet.position.x = orbitRadius;

	meshes.ring = new THREE.Mesh( ring, materials.ring );
	meshes.ring.receiveShadow = true;
	meshes.ring.rotation.x += rotation;
	meshes.ring.position.x = orbitRadius;

	return meshes;
}

export function init(image, scene, info) {
	const radius = info.simpleRadius || 1;

	const materials = buildPlanetMaterial(image, radius);
	
	const meshes = buildMeshes(materials, info);

	const ourPlanet = {info};
	ourPlanet.meshes = meshes;
	ourPlanet.materials = materials;
	ourPlanet.image = image;
	ourPlanet.orbitRadius = info.simpleDistance;
	ourPlanet.animation = (time, speedTicks) => animation(time, ourPlanet, speedTicks);
	ourPlanet.hide = () => hide(scene, ourPlanet);
	ourPlanet.show = () => show(scene, ourPlanet);

	console.log("planet", ourPlanet);
	return ourPlanet;
}

function animation( time, planet, speedTicks ) {
	if (speedTicks === 0) {
		return;
	}

	const dayDuration = planet.info.dayDuration * speedTicks / 10;
	const yearDuration = planet.info.yearDuration * 60 + 1;
	time = time + planet.info.timeOffset;

	planet.meshes.planet.rotation.y = time / (dayDuration);
	planet.meshes.planet.position.y = Math.sin(time / (yearDuration)) * planet.orbitRadius;
	planet.meshes.planet.position.x = Math.cos(time / (yearDuration)) * planet.orbitRadius;
	// planet.meshes.planet.position.x = Math.cos(time / (yearDuration)) * planet.orbitRadius;
	// planet.meshes.planet.position.z = -Math.sin(time / (yearDuration)) * planet.orbitRadius;

	// a and b are perpendicular unit vectors in the plane of the circle
	// c is the center of the circle, which is the body we are orbiting

	// the moon is 6.68 degrees oblique to earth
	// thus a = [cos(6.68), 0, sin(6.68)]
	// and b = [0, 1, 0]

	// let theta = 6.68 * Math.PI / 180;
	// let a = [Math.cos(theta), 0, Math.sin(theta)];

	// let phi = 315 * Math.PI / 180;
	// let b = [0, Math.cos(phi), Math.sin(phi)];
	// let c = [0, 0, 0];

	// planet.meshes.planet.position.x = c[0] + planet.orbitRadius * Math.cos(time / (yearDuration)) * a[0] + planet.orbitRadius * Math.sin(time / (yearDuration)) * b[0];
	// planet.meshes.planet.position.y = c[1] + planet.orbitRadius * Math.cos(time / (yearDuration)) * a[1] + planet.orbitRadius * Math.sin(time / (yearDuration)) * b[1];
	// planet.meshes.planet.position.z = c[2] + planet.orbitRadius * Math.cos(time / (yearDuration)) * a[2] + planet.orbitRadius * Math.sin(time / (yearDuration)) * b[2];
	
	

	// planet.meshes.ring.rotation.z = time / (dayDuration);
	planet.meshes.ring.position.y = Math.sin(time / (yearDuration)) * planet.orbitRadius;
	planet.meshes.ring.position.x = Math.cos(time / (yearDuration)) * planet.orbitRadius;
}

function hide(scene, planet) {
	scene.remove(planet.meshes.planet);
	scene.remove(planet.meshes.ring);
}

function show(scene, planet) {
	scene.add(planet.meshes.planet);
	if (planet.image.ringsrc) {
		scene.add(planet.meshes.ring);
	} else {
		scene.remove(planet.meshes.ring);
	}
}