import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 目标： 正确的动画使用方式：requestAnimationFrame时间参数，控制物体动画

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubaMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
const cube = new THREE.Mesh(cubeGeometry, cubaMaterial);
// 修改物体位置
// cube.position.x = 3;

// 缩放位置
// cube.scale.set(3,2,1);
// cube.scale.x = 5;
// 旋转,按照弧度转的
// cube.rotation.set(Math.PI / 4,0,0);

// 将几何体添加进场景
scene.add(cube);
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

function renderFn(time) {
    // 正确的动画使用方式
    let t = (time / 1000) % 5;
    cube.position.x = t * 1;
    // 使用渲染器，通过相机将场景渲染
    render.render(scene, camera);
    // 渲染下一帧的时候调用renderFn
    requestAnimationFrame(renderFn);
}
renderFn();
