import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import * as dat from 'dat.gui';

// 目标： 聚光灯与阴影
// 首先材质要选对，要能对光照有反应
// 设置渲染器开启真实阴影计算： render.physicallyCorrectLights = true;
// distance penumbra decay 衰减距离，有三种
// angle 聚光灯角度

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

// 导入纹理加载器
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envMapTexture = cubeTextureLoader.load([
  'textures/environmentMaps/1/px.jpg',
  'textures/environmentMaps/1/nx.jpg',
  'textures/environmentMaps/1/py.jpg',
  'textures/environmentMaps/1/ny.jpg',
  'textures/environmentMaps/1/pz.jpg',
  'textures/environmentMaps/1/nz.jpg',
])

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial(
  {
    // metalness: 0.8,
    // roughness: 0.1,
    // envMap: envMapTexture,
  }
);
const sphere = new THREE.Mesh(sphereGeometry, material);
// 投射阴影
sphere.castShadow = true;
scene.add(sphere);

// 创建平面
const planeGeometry = new THREE.PlaneBufferGeometry(50, 50);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;
// 接收阴影
plane.receiveShadow = true;
scene.add(plane);

// 追加灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
// 平行光
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(5, 5, 5);
spotLight.castShadow = true;
spotLight.intensity = 2;
// 设置阴影模糊度
spotLight.shadow.radius = 20;
// 设置阴影贴图分辨率
spotLight.shadow.mapSize.set(2048, 2048);
console.log(spotLight.shadow);

// 设置透视相机属性
spotLight.target = sphere;
spotLight.angle = Math.PI / 6;
spotLight.distance = 0; // 衰减距离
spotLight.penumbra = 0; // 半衰减距离
spotLight.decay = 0; // 沿光照距离衰减

scene.add(spotLight);

// 配置gui helper
const gui = new dat.GUI();
gui.add(sphere.position, 'x').min(-5).max(5).step(0.1);
gui.add(spotLight, 'angle').min(0).max(Math.PI / 2).step(0.01);
gui.add(spotLight, 'distance').min(0).max(10).step(0.01);
gui.add(spotLight, 'penumbra').min(0).max(1).step(0.01);
gui.add(spotLight, 'decay').min(0).max(5).step(0.01);


// 初始化渲染器
const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas添加到body上
document.body.appendChild(render.domElement);
// 开启阴影渲染
render.shadowMap.enabled = true;
render.physicallyCorrectLights = true;

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
