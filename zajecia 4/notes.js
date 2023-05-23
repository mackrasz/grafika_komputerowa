import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.15);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(0,100,0)
// scene.add(directionalLight);

const pointLight = new THREE.PointLight( 0xffffff, 0.5);
pointLight.position.set(0,2,2)
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = false

const material = new THREE.MeshPhongMaterial({ 
      color: 0x00ff00,
      specular: 0xffffff } )
const geometry = new THREE.SphereGeometry(1, 10, 10)
//const material = new THREE.MeshStandardMaterial({ 
//       color: 0x00ff00})
// const sphere = new THREE.Mesh( geometry, material );
// scene.add(sphere)

const loader = new STLLoader()
loader.load(
    'models/robot1.stl',
    function (geometry) {
        const mesh = new THREE.Mesh(geometry, material)
        let scale = 0.01
        geometry.scale(scale,scale,scale)
        scene.add(mesh)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()