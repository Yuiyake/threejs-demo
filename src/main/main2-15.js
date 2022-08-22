import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

// 加载hdr环境图 
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync('textures/hdr/002.hdr').then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

// 目标： hdr环境图加载（感觉是鱼眼图，做全景的）
// 用到： RGBELoader hdr环境图
// rgbeLoader.loadAsync 异步加载，.then获取返回值加到场景的background里
// scene.background 场景的背景贴图
// scene.environment 场景的物体的背景映射

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
    metalness: 0.8,
    roughness: 0.1,
    // envMap: envMapTexture,
  }
);
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);
// 添加环境贴图
scene.background = envMapTexture; // 给场景添加背景
scene.environment = envMapTexture;  // 给场景的物体添加默认环境贴图，和上面的envMap一个效果

var div = document.createElement("div");
div.style.width = '200px';
div.style.height = '200px';
div.style.position = 'fixed';
div.style.right = '0px';
div.style.top = '0px';
div.style.color = '#fff';
document.body.appendChild(div);

// 单张纹理图加载情况(不常用)
let event = {};
event.onLoad = function() {
  console.log('pic loading finish');
}
event.onProgress = function(url, num, total) {
  let persent = ((num / total) * 100).toFixed(2) + '%';
  console.log('pic loading ...', persent);
  div.innerHTML = persent;
}
event.onError = function(url, num, total) {
  console.log('pic error! ', url, num, total);
}

// 设置加载管理器
const loadingManager = new THREE.LoadingManager(
  event.onLoad,
  event.onProgress,
  event.onError
);

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
