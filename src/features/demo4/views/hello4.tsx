/**
 * @file 正交投影摄像机与透视投影摄像机切换
 * @author Flora
*/
import React, { useEffect } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';

import './hello.css';

export default () => {
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        // 创建场景
        const scene = new THREE.Scene();
        // 创建照相机
        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = 120;
        camera.position.y = 60;
        camera.position.z = 180;
        camera.lookAt(scene.position);
        scene.add(camera);
    
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0xEEEEEE));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
    
        // 创建大地面
        const planeGeometry = new THREE.PlaneGeometry(180, 180);
        const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = 0;
        scene.add(plane);
    
        const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        for (let j = 0; j < planeGeometry.parameters.height / 5; j++) {
            for (let i = 0; i < planeGeometry.parameters.width / 5; i++) {
                let rnd = Math.random() * 0.75 + 0.25;
                let cubeMaterial = new THREE.MeshLambertMaterial();
                cubeMaterial.color = new THREE.Color(rnd, 0, 0);
                let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

                cube.position.z = -(planeGeometry.parameters.height / 2) + 2 + (j * 5);
                cube.position.x = -(planeGeometry.parameters.width / 2) + 2 + (i * 5);
                cube.position.y = 2;

                scene.add(cube);
            }
        }

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        directionalLight.position.set(-20, 40, 60);
        scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight(0x292929);
        scene.add(ambientLight);
    
        document.getElementById('threeBox')?.appendChild(renderer.domElement);
    
        const step = 0;
    
        const controls = {
            perspective: 'Perspective',
            switchCamera: function () {
                if (camera instanceof THREE.PerspectiveCamera) { // 正交
                    camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500) as any;
                    camera.position.x = 120;
                    camera.position.y = 60;
                    camera.position.z = 180;
                    camera.lookAt(scene.position);
                    this.perspective = 'Orthographic';
                } else { // 透视
                    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = 120;
                    camera.position.y = 60;
                    camera.position.z = 180;

                    camera.lookAt(scene.position);
                    this.perspective = 'Perspective';
                }
            },
        };
    
        const gui = new dat.GUI();
        gui.add(controls, 'switchCamera');
        gui.add(controls, 'perspective').listen();
    
        const render = () => {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        };
    
        render();
    }

    return (
        <>
            <div id="Stats-output"></div>
            <div id="threeBox"></div>
        </>
    );
};