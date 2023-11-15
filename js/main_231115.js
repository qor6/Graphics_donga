// Scene, Camera, Renderer 초기화

//pytorch3d : https://pytorch3d.org/tutorials/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 750 / 750, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new THREE.OrbitControls(camera, renderer.domElement);
var cameraIndex=0;
renderer.setSize(750, 750);
document.getElementById('canv').appendChild(renderer.domElement);

function loadOBJ(url) {
    // instantiate a loader
    const loader = new THREE.OBJLoader();
    
    // load a resource
    loader.load(
        url, // resource URL
        //비동기식 로딩
        // called when resource is loaded
        function (object) {
            scene.add(object);
        },
        // called when loading is in progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened');
        }
    );
}

// function initLight() {
//     // 전구 pointling : 한점에서 모든 방향으로 방출되는 빛, 전구에서 방출되는 빛 / 조명에 대한 색상-흰색
//     var pointLight0 = new THREE.PointLight(0xffffff);
//     // 조명에 대한 위치
//     pointLight0.position.set(10, 0, 10);
//     scene.add(pointLight0);
// }


// function initLight(color,x,y,z) {
//     // 전구 pointling : 한점에서 모든 방향으로 방출되는 빛
//     var pointLight0 = new THREE.PointLight(color);
//     // 조명에 대한 위치
//     pointLight0.position.set(x,y,z);
//     scene.add(pointLight0);
// }

//기본 과제3
function initLight1() {
    // 조명에 대한 색상-파란색
    var pointLight0 = new THREE.PointLight(0x00ffff);
    // 조명에 대한 위치 10, 0, 10
    pointLight0.position.set(3, 0, 10);
    scene.add(pointLight0);
}

function initLight2() {
    // 조명에 대한 색상-핑크색
    var pointLight0 = new THREE.PointLight(0xff00ff);
    // 조명에 대한 위치 10, 0, 10
    pointLight0.position.set(3, 10, -5);
    scene.add(pointLight0);
}


function initGeometry() {
    const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
    scene.add(axesHelper);
    loadOBJ("../models/kitten.obj");
}

// // 기본 과제4
// function initGeometry() {
//     const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
//     scene.add(axesHelper);
//     loadOBJ("../models/bunny_stanford.obj");
// }

function initRenderer() {
    // 카메라 위치 설정
    camera.position.z = 1;
    controls.update();
    renderer.setClearColor("#000000");
}

function init() {
    //조명, geometry(기하), 렌더링 초기화
    // initLight();
    initLight1();
    initLight2();
    initGeometry();
    initRenderer();
}

// 애니메이션 함수
function animate() {
    requestAnimationFrame(animate);
    
    //기본 과제1
    // Camera 이동
    cameraIndex++;
    // //기본 과제2
    // cameraIndex--;
    //100 -> 1000
    camera.position.x = Math.sin(cameraIndex/100.0);
    camera.position.z = Math.cos(cameraIndex/100.0);

    controls.update();
    renderer.render(scene, camera);
}

init();
animate();

// ---- Not used ----
//화면 크기가 변경될 때 렌더러와 카메라 조정
// window.addEventListener('resize', function() {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     renderer.setSize(width, height);
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
// });
