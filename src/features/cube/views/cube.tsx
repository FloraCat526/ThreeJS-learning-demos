/**
 * @file 从一个立方体开始
 * @author Flora
*/

import * as THREE from 'three';

export default () => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x007000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 创建材质
    const material = new THREE.LineBasicMaterial({color: 0x0f00ff});

    // 顶点数据
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // 画线
    const line = new THREE.Line(geometry, material);

    // 添加到场景中
    scene.add(line);
    renderer.render(scene, camera);

    return (
        <div>
            123
        </div>
    );
};