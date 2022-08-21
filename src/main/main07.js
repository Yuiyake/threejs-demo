import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap';

// 目标： 掌握GSAP设置动画效果

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

// gsap设置动画
var animate1 = gsap.to(cube.position, {
    x: 5,
    duration: 3,
    ease: "power1.inOut",
    repeat: 2,  // 这个是设置重复次数的，如果要无限循环值为 -1 就行
    yoyo: true, // 往返运动
    delay: 2,   // 延迟时间
    onComplete:()=>{
        console.log("动画完成");
    },
    onStart: () => {
        console.log("动画开始");
    }
});
gsap.to(cube.rotation, { x: 2*Math.PI, duration: 3, ease: "power1.inOut" });

window.addEventListener("dblclick", () => {
    console.log(animate1);

    if(animate1.isActive()) animate1.pause(); // 双击暂停
    else animate1.resume(); // 双击恢复
})

function renderFn() {
    // 使用渲染器，通过相机将场景渲染
    render.render(scene, camera);
    // 渲染下一帧的时候调用renderFn
    requestAnimationFrame(renderFn);
}
renderFn();
