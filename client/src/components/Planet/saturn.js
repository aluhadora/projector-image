import * as THREE from 'three';

var camera, scene, renderer, material, ringMaterial;
var mesh;
var speedTicks;
var imageSrc;

init();

function init() {


    camera = new THREE.PerspectiveCamera(50, 1, 1, 100);
    camera.position.z = 25;

    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry(10, 100, 100);
	var ring = new THREE.RingGeometry( 15, 18, 100 );
    material  = new THREE.MeshPhongMaterial();

    material.map    = new THREE.TextureLoader().load('images/Pictures-Map--huge.jpg');
	ringMaterial = new THREE.MeshBasicMaterial( { color: 0x888888, 
		side: THREE.DoubleSide, 
		transparent: true,
	    wrapS: THREE.RepeatWrapping,
    	wrapT: THREE.RepeatWrapping
	} );
	// const ringMaterial = new THREE.MeshPhongMaterial();

    mesh = new THREE.Mesh(geometry, material);
	const ringMesh = new THREE.Mesh( ring, ringMaterial );
    mesh.rotation.x += 0.5;
	ringMesh.rotation.x += 2;
    scene.add(mesh);
	scene.add(ringMesh);

    var light1 = new THREE.AmbientLight( 0xffffff );
	// var light1 = new THREE.PointLight( 0xffffff, 150 );
    light1.position.set(15, 15, 15);
    scene.add(light1);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setAnimationLoop( animation );
}

function animation( time ) {

	// do not render if not in DOM:

	if( !renderer.domElement.parentNode ) return;

	// mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / (speedTicks || 12000);

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

export function mount(container, rotationTicks, image) {
	speedTicks = rotationTicks;
	material.map = new THREE.TextureLoader().load(image.flatsrc);
	if (image.ringsrc) {
		ringMaterial.map = new THREE.TextureLoader().load(image.ringsrc);
		ringMaterial.opacity = 1;
	} else {
		ringMaterial.map = null;
		ringMaterial.opacity = 0;
	}
	console.log("Does this call more than once?", rotationTicks, image, image.ringsrc)
	if( container ) {
		container.insertBefore( renderer.domElement, container.firstChild );
		resize();
	} else {
		renderer.domElement.remove();
	}
}
