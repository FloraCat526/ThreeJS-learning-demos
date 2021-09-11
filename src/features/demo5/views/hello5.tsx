/**
 * @file 光源(环境光)
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
        const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
        const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;
        scene.add(plane);
    
        const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;
        scene.add(cube);

        const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = 20;
        sphere.position.y = 0;
        sphere.position.z = 2;
        sphere.castShadow = true;
        scene.add(sphere);

        // 环境光
        const ambiColor = '#0c0c0c';
        const ambientLight = new THREE.AmbientLight(ambiColor);
        scene.add(ambientLight);

        // 点光源（阴影）
        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);
    
        document.getElementById('threeBox')?.appendChild(renderer.domElement);
    
        let step = 0;
    
        const controls = {
            rotationSpeed: 0.02,
            bouncingSpeed: 0.03,
            ambientColor: ambiColor,
            disableSpotlight: false,
        };
    
        const gui = new dat.GUI();
        gui.addColor(controls, 'ambientColor').onChange(function (e) {
            ambientLight.color = new THREE.Color(e);
        });
        gui.add(controls, 'disableSpotlight').onChange(function (e) {
            spotLight.visible = !e;
        });

        const render = () => {
            cube.rotation.x += controls.rotationSpeed;
            cube.rotation.y += controls.rotationSpeed;
            cube.rotation.z += controls.rotationSpeed;

            step += controls.bouncingSpeed;
            sphere.position.x = 20 + (10 * (Math.cos(step)));
            sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

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