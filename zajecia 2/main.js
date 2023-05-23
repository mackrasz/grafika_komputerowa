import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 1000)

const V = new THREE.Matrix4()
V.set(1,0,0,0,
      0,1,0,1,
      0,0,1,3,
      0,0,0,1)
camera.applyMatrix4(V)

var n = 0.1
var f = 100
var r = 2
var l = -2
var t = 2
var b = -2

const P = new THREE.Matrix4()
P.set(2/(r-l),0,0,0,
      0,2/(t-b),0,0,
      0,0,-2/(f-n),-(f+n)/(f-n),
      0,0,0,1)
camera.projectionMatrix = P

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.25);
scene.add(ambientLight);

const pointLight = new THREE.PointLight( 0xffffff, 0.5);
pointLight.position.set(0,0,5)
scene.add(pointLight);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

const M = new THREE.Matrix4()
const ax = 0.3
M.set(Math.cos(ax),0,Math.sin(ax),0,
      0,1,0,0,
      -Math.sin(ax),0,Math.cos(ax),0,
      0,0,0,1)

cube.applyMatrix4(M)
cube.rotation.x += 0.5;

scene.add( cube );

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

//animate();

renderer.render( scene, camera );
