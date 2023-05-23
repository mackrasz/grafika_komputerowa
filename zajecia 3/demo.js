import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(20, 20, 0)
scene.add(directionalLight)

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight2.position.set(-20, 20, 0)
scene.add(directionalLight2)

const pointLight = new THREE.PointLight(0xffffff, 0)
pointLight.position.set(2, 2, -2)
scene.add(pointLight)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 5
camera.position.y = -2
camera.position.x = 2

const renderer = new THREE.WebGLRenderer({antialias: false})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = false

const material = new THREE.MeshPhongMaterial({ 
      color: 0x00ff00,
      specular: 0x008800 } )

// const geometry = new THREE.SphereGeometry(1, 100, 100)
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
        console.log("Flag 1")
    },

    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

console.log("Flag 2")


function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()