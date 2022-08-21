import * as THREE from 'three';

// 目标： 物体显示基础

console.log(THREE)
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
// 将几何体添加进场景
scene.add(cube);
// 初始化渲染器
const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
console.log(render);
// 将webgl渲染的canvas添加到body上
document.body.appendChild(render.domElement);
// 使用渲染器，通过相机将场景渲染
render.render(scene, camera);
