import * as THREE from 'three';
import AvailableImages from '../../AvailableImages';


export function init(orbitRadius, image, scene, radius) {

	const ourPlanet = {};
	ourPlanet.info = AvailableImages.planets.find(p => p.id === image.planetId);
	var materials = {};
	var meshes = {};

	var geometry = new THREE.SphereGeometry(radius, 100, 100);
	
	if (image.type === 'star') {
		materials.planet = new THREE.MeshBasicMaterial();
	} else {
		materials.planet = new THREE.MeshLambertMaterial();
	}
	materials.planet.map = new THREE.TextureLoader().load(image.flatsrc);

	meshes.planet = new THREE.Mesh(geometry, materials.planet);
	meshes.planet.castShadow = true;
	meshes.planet.rotation.x += Math.PI/2;
	meshes.planet.position.x += Math.PI * ourPlanet.info.axialTilt / 180;
	meshes.planet.position.x = orbitRadius;

	var ring = new THREE.RingGeometry( radius * 1.5, radius * 2.5, 100 );

	materials.ring = new THREE.MeshLambertMaterial( { 
		side: THREE.DoubleSide, 
		transparent: true
	} );

	materials.ring.map = new THREE.TextureLoader().load(image.ringsrc);

	meshes.ring = new THREE.Mesh( ring, materials.ring );
	meshes.ring.receiveShadow = true;
	meshes.ring.rotation.x += Math.PI/2 + 0.5;
	meshes.ring.position.x = orbitRadius;

	ourPlanet.meshes = meshes;
	ourPlanet.materials = materials;
	ourPlanet.image = image;
	ourPlanet.orbitRadius = orbitRadius;
	ourPlanet.animation = (time, speedTicks) => animation(time, ourPlanet, speedTicks);
	ourPlanet.hide = () => hide(scene, ourPlanet);
	ourPlanet.show = () => show(scene, ourPlanet);

	return ourPlanet;
}

export function animation( time, planet, speedTicks ) {
	if (speedTicks === 0) {
		return;
	}

	const dayDuration = planet.info.dayDuration * speedTicks / 10;
	const yearDuration = planet.info.yearDuration * 60 + 1;
	time = time + planet.info.timeOffset;

	planet.meshes.planet.rotation.y = time / (dayDuration);
	planet.meshes.planet.position.y = Math.sin(time / (yearDuration)) * planet.orbitRadius;
	planet.meshes.planet.position.x = Math.cos(time / (yearDuration)) * planet.orbitRadius;
	planet.meshes.ring.position.y = Math.sin(time / (yearDuration)) * planet.orbitRadius;
	planet.meshes.ring.position.x = Math.cos(time / (yearDuration)) * planet.orbitRadius;
}

function hide(scene, planet) {
	if (!scene) return;
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