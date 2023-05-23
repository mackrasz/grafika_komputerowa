import * as THREE from 'three';

const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 1000)

var w = window.innerWidth
var h = window.innerHeight
const P = new THREE.Matrix4()
var n = 0.1
var f = 1000
P.set(0.5,    0,    0,          0,
      0,    0.5*w/h,    0,          0,
      0,    0,    -2*n/(f-n), -(f+n)/(f-n),
      0,    0,    0,         1)
camera.projectionMatrix = P

var eye = new THREE.Vector3(0,0,10)
var target = new THREE.Vector3(0,0,-2)
var up = new THREE.Vector3(0,1,0)

var V = new THREE.Matrix4()
V.lookAt(eye, target, up)
camera.applyMatrix4(V)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.15);
scene.add(ambientLight);

const pointLight = new THREE.PointLight( 0xffffff, 1);
pointLight.position.set(0,0,5)
scene.add(pointLight);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

var My = new THREE.Matrix4()
var ay = 0.7
var cy = Math.cos(ay)
var sy = Math.sin(ay)
My.set(cy,    0,   sy,     0,
        0,    1,    0,     0,
      -sy,    0,   cy,     0,
        0,    0,    0,     1)

var Mx = new THREE.Matrix4()
var ax = 0.7
var cx = Math.cos(ax)
var sx = Math.sin(ax)
Mx.set(1,    0,  0,     0,
      0,    cx, sx,     0,
      0,   -sx, cx,     0,
      0,    0,  0,      1)

var T = new THREE.Matrix4()
T.set(1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, -2,
      0, 0, 0, 1)

cube.applyMatrix4(Mx)
cube.applyMatrix4(My)
cube.applyMatrix4(T)

scene.add(cube);

renderer.render(scene, camera);

// function animate() {
// 	requestAnimationFrame( animate );

// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );
// }

// animate();