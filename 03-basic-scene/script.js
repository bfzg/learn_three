const scene = new THREE.Scene()

//Red cube
const gometry = new THREE.BoxGeometry(1, 1, 1)  //three parameters are width height depth  depth意为深度Z轴
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(gometry, material)
scene.add(mesh)

//Camera
const sizes = {
    width: 800,
    height: 600
};

/**four parameters
 * @type {THREE.PrespectiveCamera}
 * fov camera frustum vertical field of view 相机垂直视野
 * aspect camera frustum aspect ratio
 * near camera frustum near plane
 * far camera frustum far plane
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)