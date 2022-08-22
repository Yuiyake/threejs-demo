import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// 目标： 纹理常用属性

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

const texture = textureLoader.load('./textures/minecraft.png');

// 纹理常用属性
// doorTextureColor.offset.set(0.5, 0.5);  // 偏移
// doorTextureColor.center.set(0.5, 0.5);  // 旋转的中心点
// doorTextureColor.rotation = Math.PI / 4;  // 旋转
// doorTextureColor.repeat.set(2, 3);  // 纹理重复
// doorTextureColor.wrapS = THREE.MirroredRepeatWrapping;  // 纹理重复的形式（x轴）,镜像
// doorTextureColor.wrapT = THREE.RepeatWrapping;  // 纹理重复的形式（y轴）,铺满


// 添加物体
// 创建几何体
const cubeGeomery = new THREE.BoxBufferGeometry(1, 1, 1);
const basicMaterial = new THREE.MeshBasicMaterial({
  color: 'SlateGray',
  // map: doorTextureColor
  map: texture,
});
const cube = new THREE.Mesh(cubeGeomery, basicMaterial);
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

function renderFn() {
    // 使用渲染器，通过相机将场景渲染
    render.render(scene, camera);
    // 渲染下一帧的时候调用renderFn
    requestAnimationFrame(renderFn);
}
renderFn();
