import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 目标： 纹理算法

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
// console.log(doorAlphaTexture)

// 添加物体
// 创建几何体
const cubeGeomery = new THREE.BoxBufferGeometry(1, 1, 1);
const basicMaterial = new THREE.MeshBasicMaterial({
  color: '#ffff00',
  map: doorTextureColor,  // 贴图
  alphaMap: doorAlphaTexture, // 透明纹理，要配合transparent使用
  transparent: true,  // 开启透明纹理渲染
  opacity: 0.5, // 透明度
  side: THREE.DoubleSide, // 定义渲染哪一面
});
const cube = new THREE.Mesh(cubeGeomery, basicMaterial);
// 将几何体添加进场景
scene.add(cube);
// 添加平面
const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1),
  basicMaterial
)
plane.position.set(3, 0, 0)
scene.add(plane);


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
