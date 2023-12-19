import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as CANNON from 'cannon-es'
import CannonUtils from 'CannonUtils'
import CannonDebugRenderer from 'CannonDebugRenderer'

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(120, 1.0, 0.1, 100);
camera.position.set(0, 13, 16);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(750, 750);
document.getElementById('canv').appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
//scene.add(ambientLight);
const pointLight1 = new THREE.PointLight("red", 0.9, 15, 3);
const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, 1);
const pointLight2 = new THREE.PointLight("green", 0.9, 15, 3);
const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
const pointLight3 = new THREE.PointLight("blue", 0.9, 15, 3);
const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1);
const pointLight4 = new THREE.PointLight("white", 0.9, 15, 3);
const pointLightHelper4 = new THREE.PointLightHelper(pointLight4, 1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.y = 0.5;

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

const normalMaterial = new THREE.MeshNormalMaterial();
const phongMaterial = new THREE.MeshPhongMaterial();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMesh = new THREE.Mesh(cubeGeometry, normalMaterial);
cubeMesh.position.x = 0;
cubeMesh.position.y = 3;
cubeMesh.castShadow = true;
scene.add(cubeMesh);
const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
const cubeBody = new CANNON.Body({
        mass: 1
});
cubeBody.addShape(cubeShape);
cubeBody.position.x = cubeMesh.position.x;
cubeBody.position.y = cubeMesh.position.y;
cubeBody.position.z = cubeMesh.position.z;
world.addBody(cubeBody);

const sphereGeometry = new THREE.SphereGeometry();
//console.log(sphereGeometry)
const sphereMesh = new THREE.Mesh(sphereGeometry, normalMaterial);
sphereMesh.position.x = 0;
sphereMesh.position.y = 5;
sphereMesh.castShadow = true;
scene.add(sphereMesh);
const sphereShape = new CANNON.Sphere(1);
const sphereBody = new CANNON.Body({
        mass: 1
});
sphereBody.addShape(sphereShape);
sphereBody.position.x = sphereMesh.position.x;
sphereBody.position.y = sphereMesh.position.y;
sphereBody.position.z = sphereMesh.position.z;
world.addBody(sphereBody);

//Shpere Array
var sphereMeshArray = new Array(36);
var sphereBodyArray = new Array(36);
 //For Random
 for(let i=0;i<36;i++){
        sphereMeshArray[i] = new THREE.Mesh(sphereGeometry, normalMaterial);
        sphereBodyArray[i] = new CANNON.Body({
                mass :1
        });
        
        if(i >= 0 && i <6) {
                sphereMeshArray[i].position.x = -5
        }
        else if(i >= 6 && i <12) {
                sphereMeshArray[i].position.x = -3
        }
        else if(i >= 12 && i <18) {
                sphereMeshArray[i].position.x = -1
        }
        else if(i >= 18 && i <24) {
                sphereMeshArray[i].position.x = 1
        }
        else if(i >= 24 && i <30) {
                sphereMeshArray[i].position.x = 3
        }
        else if(i >= 30 && i <36) {
                sphereMeshArray[i].position.x = 5
        }
        sphereMeshArray[i].position.y = 10
        if(i % 6 == 0) {
                sphereMeshArray[i].position.z = -5
        }
        else if(i % 6 == 1) {
                sphereMeshArray[i].position.z = -3
        }
        else if(i % 6 == 2) {
                sphereMeshArray[i].position.z = -1
        }
        else if(i % 6 == 3) {
                sphereMeshArray[i].position.z = 1
        }
        else if(i % 6 == 4) {
                sphereMeshArray[i].position.z = 3
        }
        else if(i % 6 == 5) {
                sphereMeshArray[i].position.z = 5
        }
        
        scene.add(sphereMeshArray[i]);
        sphereBodyArray[i].addShape(sphereShape);
        sphereBodyArray[i].position.x = sphereMeshArray[i].position.x;
        sphereBodyArray[i].position.y = sphereMeshArray[i].position.y;
        sphereBodyArray[i].position.z = sphereMeshArray[i].position.z;
        world.addBody(sphereBodyArray[i]);
        
}

const planeGeometry = new THREE.PlaneGeometry(25, 25);
const planeMesh = new THREE.Mesh(planeGeometry, phongMaterial);
planeMesh.position.y = -0.01;
planeMesh.rotateX(-Math.PI / 2);
planeMesh.receiveShadow = true;
scene.add(planeMesh);
const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({
        mass: 0
});
planeBody.addShape(planeShape);
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(planeBody);

const stats = Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
gui.add(pointLight1, "visible").name("Point Light1");
gui.add(pointLight2, "visible").name("Point Light2");
gui.add(pointLight3, "visible").name("Point Light3");
gui.add(pointLight4, "visible").name("Point Light4");

const clock = new THREE.Clock();
let delta;

const cannonDebugRenderer = new CannonDebugRenderer(scene, world);

function initLight() {
        scene.add(ambientLight);
        pointLight1.position.set(3, 3, 3);
        scene.add(pointLight1);
        //scene.add(pointLightHelper1);
        pointLight2.position.set(-3, 3, 3);
        scene.add(pointLight2);
        //scene.add(pointLightHelper2);
        pointLight3.position.set(-3, 3, -3);
        scene.add(pointLight3);
        //scene.add(pointLightHelper3);
        pointLight4.position.set(3, 3, -3);
        scene.add(pointLight4);
        //scene.add(pointLightHelper4);
    }

function animate() {
        requestAnimationFrame(animate);

        controls.update();

        delta = Math.min(clock.getDelta(), 0.1);
        world.step(delta);

        cannonDebugRenderer.update();

        // Copy coordinates from Cannon to Three.js
        cubeMesh.position.set(cubeBody.position.x, cubeBody.position.y, cubeBody.position.z);
        cubeMesh.quaternion.set(
                cubeBody.quaternion.x,
                cubeBody.quaternion.y,
                cubeBody.quaternion.z,
                cubeBody.quaternion.w
        );
        sphereMesh.position.set(sphereBody.position.x, sphereBody.position.y, sphereBody.position.z);
        sphereMesh.quaternion.set(
                sphereBody.quaternion.x,
                sphereBody.quaternion.y,
                sphereBody.quaternion.z,
                sphereBody.quaternion.w
        );
        for(let i= 0; i<36;i++){
                sphereMeshArray[i].position.set(sphereBodyArray[i].position.x, sphereBodyArray[i].position.y, sphereBodyArray[i].position.z);
                sphereMeshArray[i].quaternion.set(
                sphereBodyArray[i].quaternion.x,
                sphereBodyArray[i].quaternion.y,
                sphereBodyArray[i].quaternion.z,
                sphereBodyArray[i].quaternion.w
        );      
        }

        render();

        stats.update();
}

function render() {
        renderer.render(scene, camera);
}

initLight();

animate();
