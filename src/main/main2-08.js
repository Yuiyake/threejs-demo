import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 目标： 标准材质，环境光，直线光（注意：标准材质如果没有任何光是全黑的）

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);

// 导入纹理
const textureLoader = new THREE.TextureLoader();
const doorTextureColor = textureLoader.load('./textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');
// console.log(doorAlphaTexture)

// 添加物体
// 创建几何体
const cubeGeomery = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: '#ffff00',
  map: doorTextureColor,  // 贴图
  alphaMap: doorAlphaTexture, // 透明纹理，要配合transparent使用
  transparent: true,  // 开启透明纹理渲染
  aoMap: doorAoTexture, // 纹理ao贴图用的，要用第二组uv渲染阴影（我是这么理解的）
  aoMapIntensity: 1, // 设置烘焙强度
});
const cube = new THREE.Mesh(cubeGeomery, material);
// 将几何体添加进场景
scene.add(cube);
// 给cube添加第二组uv
cubeGeomery.setAttribute(
  'uv2', 
  new THREE.BufferAttribute(cubeGeomery.attributes.uv.array, 2)
)


// 添加平面
const planeGeometry = new THREE.PlaneBufferGeometry(1, 1);
const plane = new THREE.Mesh(
  planeGeometry,
  material
)
plane.position.set(3, 0, 0)
scene.add(plane);

// 设置第二组uv贴图，其实就是给右边的门加阴影光啦..
planeGeometry.setAttribute(
  'uv2', 
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
)
// 追加灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// 初始化渲染器
const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas添加到body上
document.body.appendChild(render.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, render.domElement);
// 轨道控制
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper);

function renderFn() {
    // 使用渲染器，通过相机将场景渲染
    render.render(scene, camera);
    // 渲染下一帧的时候调用renderFn
    requestAnimationFrame(renderFn);
}
renderFn();
