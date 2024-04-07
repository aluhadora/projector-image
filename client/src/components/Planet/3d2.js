import * as THREE from 'three';

var camera, scene, renderer;
var mesh;
var speedTicks;
var imageSrc;

init();

function init() {


    camera = new THREE.PerspectiveCamera(50, 1, 1, 100);
    camera.position.z = 25;

    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry(10, 100, 100);
    var material  = new THREE.MeshPhongMaterial();

    THREE.ImageUtils.crossOrigin = '';
    material.map    = new THREE.TextureLoader().load('images/Pictures-Map--huge.jpg')

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x += 0.5;
    scene.add(mesh);

    var light1 = new THREE.AmbientLight( 0xffffff );
    light1.position.set(100, 50, 100);
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
	imageSrc = image;
	console.log("Does this call more than once?", rotationTicks)
	if( container ) {
		container.insertBefore( renderer.domElement, container.firstChild );
		resize();
	} else {
		renderer.domElement.remove();
	}
}
