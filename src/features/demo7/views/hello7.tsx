/**
 * @file 光源(directional-light)
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
        let stopMovingLight = false;

        // 创建场景
        const scene = new THREE.Scene();
        // 创建照相机
        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = -35;
        camera.position.y = 30;
        camera.position.z = 25;
        camera.lookAt(new THREE.Vector3(10, 0, 0));
        scene.add(camera);
    
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0xEEEEEE));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;

        // 创建大地面
        const planeGeometry = new THREE.PlaneGeometry(60, 20, 20, 20);
        const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        const plane = new THREE.Mesh(planeGeometry, planeMaterial) as any;
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = -5;
        plane.position.z = 0;
        scene.add(plane);
    
        const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff3333});
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
        const ambiColor = '#1c1c1c';
        const ambientLight = new THREE.AmbientLight(ambiColor);
        scene.add(ambientLight);

        // spot-light
        const spotLight0 = new THREE.SpotLight(0xcccccc);
        spotLight0.position.set(-40, 30, -10);
        spotLight0.lookAt(plane);
        scene.add(spotLight0);

        // let target = new THREE.Object3D() as any;
        // target.position = new THREE.Vector3(5, 0, 0);

        // point
        const pointColor = '#ff5808';
        const directionalLight = new THREE.DirectionalLight(pointColor);
        directionalLight.position.set(-40, 60, -10);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.near = 2;
        directionalLight.shadow.camera.far = 200;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;

        // directionalLight.distance = 0;
        directionalLight.intensity = 0.5;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.mapSize.width = 1024;
        scene.add(directionalLight);

        const sphereLight = new THREE.SphereGeometry(0.2);
        const sphereLightMaterial = new THREE.MeshBasicMaterial({color: 0xac6c25});
        const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
        sphereLightMesh.castShadow = true;

        // sphereLightMesh.position = new THREE.Vector3(3, 20, 3);
        scene.add(sphereLightMesh);
    
        document.getElementById('threeBox')?.appendChild(renderer.domElement);
    
        let step = 0;
        let invert = 1;
        let phase = 0;
    
        const controls = {
            rotationSpeed: 0.03,
            bouncingSpeed: 0.03,
            ambientColor: ambiColor,
            pointColor: pointColor,
            intensity: 0.5,
            distance: 0,
            exponent: 30,
            angle: 0.1,
            debug: false,
            castShadow: true,
            onlyShadow: false,
            target: 'Plane'
        };
    
        const gui = new dat.GUI();
        gui.addColor(controls, 'ambientColor').onChange(function (e) {
            ambientLight.color = new THREE.Color(e);
        });
        gui.addColor(controls, 'pointColor').onChange(function (e) {
            directionalLight.color = new THREE.Color(e);
        });
        gui.add(controls, 'intensity', 0, 5).onChange(function (e) {
            directionalLight.intensity = e;
        });
        // gui.add(controls, 'distance', 0, 200).onChange(function (e) {
        //     directionalLight.distance = e;
        // });
        gui.add(controls, 'debug').onChange(function (e) {
            directionalLight.shadow.camera.visible = e;
        });
        gui.add(controls, 'castShadow').onChange(function (e) {
            directionalLight.castShadow = e;
        });
        gui.add(controls, 'target', ['Plane', 'Sphere', 'Cube']).onChange(function (e) {
            console.log(e);
            switch (e) {
                case 'Plane':
                    directionalLight.target = plane;
                    break;
                case 'Sphere':
                    directionalLight.target = sphere;
                    break;
                case 'Cube':
                    directionalLight.target = cube;
                    break;
            }
        });

        const render = () => {
            cube.rotation.x += controls.rotationSpeed;
            cube.rotation.y += controls.rotationSpeed;
            cube.rotation.z += controls.rotationSpeed;

            step += controls.bouncingSpeed;
            sphere.position.x = 20 + (10 * (Math.cos(step)));
            sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

            sphereLightMesh.position.z = -8;
            sphereLightMesh.position.y = +(27 * (Math.sin(step / 3)));
            sphereLightMesh.position.x = 10 + (26 * (Math.cos(step / 3)));

            directionalLight.position.copy(sphereLightMesh.position);

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