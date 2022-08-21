import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 目标： 使用clock对象控制时间（时钟对象）

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

// 创建轨道控制器,这个是拖动视角用的，虽然没引用但一定要加，不然不能拖动物体了
const controls = new OrbitControls(camera, render.domElement);
// 坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

function renderFn() {
    // 获取现在的时间和间隔时间
    let time = clock.getElapsedTime();
    // console.log('时钟运行总时长：', time);
    let deltaTime = clock.getDelta();
    // console.log('两次运行时间差：', deltaTime);

    // 正确的动画使用方式
    let t = time % 5;
    cube.position.x = t * 1;
    // 使用渲染器，通过相机将场景渲染
    render.render(scene, camera);
    // 渲染下一帧的时候调用renderFn
    requestAnimationFrame(renderFn);
}
renderFn();
