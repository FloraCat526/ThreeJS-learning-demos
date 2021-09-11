/**
 * @file three.js对webgl2支持 
 * http://www.webgl3d.cn/threejs/docs/#manual/zh/introduction/How-to-use-WebGL2
*/

import { WEBGL } from '../../libs/WebGL';
import {THREE} from '../../libs/three';
import fragGLSL from './frag.glsl';
import vertGLSL from './vert.glsl';
import { Fragment } from 'react';

if (WEBGL.isWebGL2Available() === false) {
    document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
}

const canvas = document.createElement('canvas');
const context = document.getContext('webgl2', {alpha: false});
const renderer = new THREE.WebGLRenderer({canvas: canvas, context: context});


const material = new THREE.ShaderMaterial({
    vertexShader: vertGLSL,
    FragmentShader: fragGLSL
});