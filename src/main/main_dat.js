import * as THREE from "three";

import gsap from "gsap";

import * as dat from "dat.gui";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

//修改物体的位置
// cube.position.set(5, 0, 0);
// cube.position.x = 4

//  设置物体的缩放
// cube.scale.set(3, 2, 1);
// cube.scale.x = 5;

// 旋转
// cube.rotation.set(Math.PI / 4, 0, 0);

// 将几何体添加进场景
scene.add(cube);
// 体验dat
const gui = new dat.GUI();

gui.add(cube.position, "x").min(0).max(5).step(0.01).name("cube_x");

// 修改物体颜色
const params = {
  color: "#ffff00",
  fn: () => {
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: 1 });
  }
};
gui.addColor(params, "color").onChange(val => {
  cube.material.color.set(val);
});

gui.add(cube, "visible").name("是否显示");

gui.add(params, "fn").name("立方体运动");

var folder = gui.addFolder("文件夹");
folder.add(cube.material, "wireframe");
// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas内容添加进body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染出来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 设置控制器阻尼
controls.enableDamping = true;
// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;

  if (!fullScreenElement) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
function render() {
  controls.update();
  renderer.render(scene, camera);
  // 渲染下一帧就会调用render函数---每帧渲染
  requestAnimationFrame(render);
}
render();

// 监听画面变化
window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
