import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOccTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const material = new THREE.MeshPhongMaterial({})
material.shininess = 100
material.specular = new THREE.Color(0x1188ff)
material.map = heightTexture
// // material.wireframe = true
// material.transparent = true
// material.alphaMap = alphaTexture
// material.side = THREE.DoubleSide;

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 16),
    material
)
sphere.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1,0.1,16,32),
    material
)

torus.position.x = -2.5

scene.add(sphere,plane,torus)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff,0.5)    //均匀灯光照射 无光源 不能投影
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff,0.5)  //从一个点发送光，可以产生阴影
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.x = elapsedTime * 0.2;
    torus.rotation.x = elapsedTime * 0.2;
    plane.rotation.x = elapsedTime * 0.2;

    sphere.rotation.y = elapsedTime * 0.2;
    torus.rotation.y = elapsedTime * 0.2;
    plane.rotation.y = elapsedTime * 0.2;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()