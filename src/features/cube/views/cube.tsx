/**
 * @file 从一个立方体开始
 * @author Flora
*/

import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import './cube.css';

export default () => {

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        // 创建场景
        const scene = new THREE.Scene();

        // 创建立方体
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        const material = new THREE.MeshLambertMaterial({color: 0x0000ff});
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // 设置光源(环境光 & 平行光源)
        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(400, 200, 300);
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight2.position.set(-400, -200, -300);
        scene.add(directionalLight2);

        // const point = new THREE.PointLight(0xffffff);
        // point.position.set(400, 200, 300);
        // scene.add(point);

        const width = window.innerWidth;
        const height = window.innerHeight;
        const k = width / height;
        const s = 150; // 三维场景显示范围控制系数，系数越大，显示的范围越大

        // 创建相机对象
        const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200);
        camera.lookAt(scene.position);

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({
            antialias: true // 开启锯齿
        });
        renderer.setSize(width, height);
        document.getElementById('threeBox')?.appendChild(renderer.domElement);

        // 渲染函数
        function render() {
            renderer.render(scene, camera);
            mesh.rotateY(0.01);
            requestAnimationFrame(render);
        }
        render();

        // 创建控件对象（监听鼠标变化，改变相机属性）
        const controls = new OrbitControls(camera, renderer.domElement);
    }

    return (
        <div id="threeBox"></div>
    );
};