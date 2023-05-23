// Import Three.js library and OrbitControls
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Load vertex shader from an external file
const vertexShaderLoader = new THREE.FileLoader();
vertexShaderLoader.load('vertexShader_light4.glsl', function (vertexShader) {
    // Load fragment shader from an external file
    const fragmentShaderLoader = new THREE.FileLoader();
    fragmentShaderLoader.load('fragmentShader_light4.glsl', function (fragmentShader) {
        // Create material with loaded shaders
        const material = new THREE.ShaderMaterial({
            uniforms: {
                ambientLightColor: { value: new THREE.Color(0x004f00) },
                specularLightColor: { value: new THREE.Color(0xffffff) },
                directionalLightColor: { value: new THREE.Color(0x007f00) },
                directionalLightDirection: { value: new THREE.Vector3(1, 1, 1).normalize() }
            },

            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });

        // Create a sphere geometry
        const geometry = new THREE.SphereGeometry(1, 16, 16);

        // Create a mesh using the geometry and material
        const sphere = new THREE.Mesh(geometry, material);

        // Add the sphere to the scene
        scene.add(sphere);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Render the scene with the camera
            renderer.render(scene, camera);
        }

        // Start the animation loop
        animate();
    });
});