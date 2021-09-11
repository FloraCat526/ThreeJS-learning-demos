/**
 * @file 画线
 * @author Flora
*/
import React, { useEffect } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';

import './hello.css';
import { Sphere } from '../../../libs/three';

export default () => {
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        // const initStats = () => {
        //     const stats = new Stats();
        //     stats.setMode(0);
        //     stats.domElement.style.position = 'absolute';
        //     stats.domElement.style.left = '0px';
        //     stats.domElement.style.top = '0px';
    
        //     document.getElementById('Stats-output')?.appendChild(stats.domElement);
    
        //     return stats;
        // };
    
        // const stats = initStats();
    
        // 创建场景
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 0.01, 100); // 添加雾化效果
        // scene.fog = new THREE.FogExp2(0xffffff, 0.02);

        // scene.overrideMaterial = new THREE.MeshLambertMaterial({color: 0xffffff}); // 所有物体使用统一材质
    
        // 创建照相机
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 0;
        camera.lookAt(scene.position);
        scene.add(camera);
    
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0xEEEEEE));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
    
        // 创建大地面
        const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
        const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = 0;
        scene.add(plane);
    
        // 添加环境光
        const ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);
    
        // 点光源
        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        scene.add(spotLight);
    
        document.getElementById('threeBox')?.appendChild(renderer.domElement);
    
        const step = 0;
    
        const controls = {
            rotationSpeed: 0.02,
            numberOfObjects: scene.children.length,
            removeCube: function () {
                const allChildren = scene.children;
                const lastObject = allChildren[allChildren.length - 1];
                if (lastObject instanceof THREE.Mesh) {
                    scene.remove(lastObject);
                    this.numberOfObjects = scene.children.length;
                }
            },
            addCube: function () {
                // ****** 添加球体
                // const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
                // const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff});
                // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                // sphere.castShadow = true;
                // sphere.name = 'shpere-' + scene.children.length;
                // sphere.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
                // sphere.position.y = Math.round((Math.random() * 5));
                // sphere.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
                // scene.add(sphere);

                // ***** 添加正方体
                var cubeSize = Math.ceil((Math.random() * 3));
                var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;
                cube.name = 'cube-' + scene.children.length;
                cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
                cube.position.y = Math.round((Math.random() * 5));
                cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
                scene.add(cube);

                this.numberOfObjects = scene.children.length;
            },
            outputObjects: function () {
                console.log(scene.children);
            },
        };
    
        const gui = new dat.GUI();
        gui.add(controls, 'rotationSpeed', 0, 0.5);
        gui.add(controls, 'addCube');
        gui.add(controls, 'removeCube');
        gui.add(controls, 'outputObjects');
        gui.add(controls, 'numberOfObjects').listen();
    
        const render = () => {
            scene.traverse(function (e) {
                if (e instanceof THREE.Mesh && e !== plane) {
                    e.rotation.x += controls.rotationSpeed;
                    e.rotation.y += controls.rotationSpeed;
                    e.rotation.z += controls.rotationSpeed;
                }
            });
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