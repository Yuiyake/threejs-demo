import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from "gsap";
import * as dat from 'dat.gui';

// 目标： 添加选项控制器

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

cube.rotation.set(Math.PI / 4,0,0,"XZY");

const gui = new dat.GUI();
gui.add(cube.position, 'x')
    .min(0)
    .max(5)
    .step(0.01)
    .name('x轴')
    .onChange((val) => {
        console.log('value change:', val);
    }).onFinishChange(val => {
        console.log('value finish change');
});
// 控制颜色
const colorParams = {
    color: '#ffff00',
    fn: () => {
        // 让立方体运动
        gsap.to(cube.position, { x:5, duration: 2, yoyo: true, repeat: -1 });
    },
}
gui.addColor(colorParams, 'color').onChange(val => {
    console.log('value change', val);
    cube.material.color.set(val);
});
// 设置选项框
gui.add(cube, 'visible').name('是否显示');

// 文件夹
var folder = gui.addFolder("设置立方体");
folder.add(cube.material, 'wireframe');
// 点击按钮触发某个事件
folder.add(colorParams, 'fn').name('点击运动');

// 将几何体添加进场景
scene.add(cube);
// 初始化渲染器
const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas添加到body上
document.body.appendChild(render.domElement);

// 创建轨道控制器,这个是拖动视角用的，虽然没引用但一定要加，不然不能拖动物体了
const controls = new OrbitControls(camera, render.domElement);
// 设置控制器阻尼（添加物理引擎了属于是）
controls.enableDamping = true;
// 坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

window.addEventListener("dblclick", () => {
    // 双击控制全屏和退出
    if(document.fullscreenElement) {
        document.exitFullscreen();  // 退出全屏，用document对象
    } else {
        render.domElement.requestFullscreen();  // 进入全屏，用domElement对象
    }

})

function renderFn() {
    controls.update();
    // 使用渲染器，通过相机将场景渲染
    render.render(scene, camera);
    // 渲染下一帧的时候调用renderFn
    requestAnimationFrame(renderFn);
}
renderFn();

// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
    console.log("监听画面变化");
    //  更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //  更新摄像机投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    render.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器的像素比（其实就是适配视口动态改变大小）
    render.setPixelRatio(window.devicePixelRatio);
    console.log(window.devicePixelRatio);
})


