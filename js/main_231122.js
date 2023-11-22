// Scene, Camera, Renderer 초기화
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 750 / 750, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new THREE.OrbitControls(camera, renderer.domElement);
var cameraIndex=0;
renderer.setSize(750, 750);
document.getElementById('canv').appendChild(renderer.domElement);

var gui = new dat.GUI();
var torus;
//Lights 조명

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // ambientlight가 없으면 암흑, color, 기본 값 intensity(0~1)
const pointLight0 = new THREE.PointLight(0xff9000, 0.9, 15, 3); // 모든 방향으로 퍼지는 조명, color, intensity, distance, decay
const pointLightHelper = new THREE.PointLightHelper(pointLight0, 1);    // light, sphere size

const pointLightR = new THREE.PointLight(0xff0000, 0.9, 15, 3); 
const pointLightHelperR = new THREE.PointLightHelper(pointLightR, 1);

const pointLightG = new THREE.PointLight(0x00ff00, 0.9, 15, 3); 
const pointLightHelperG = new THREE.PointLightHelper(pointLightG, 1);

const pointLightB = new THREE.PointLight(0x0000ff, 0.9, 15, 3); 
const pointLightHelperB = new THREE.PointLightHelper(pointLightB, 1);


function loadOBJ(url) {
    // instantiate a loader
    const loader = new THREE.OBJLoader();
    // load a resource
    loader.load(
        url, // resource URL
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

function initLight() {
    scene.add(ambientLight);
    pointLight0.position.set(-2, 2, 2);
    scene.add(pointLight0);
    scene.add(pointLightHelper);
    pointLightR.position.set(-2, -2, 2);
    scene.add(pointLightR);
    scene.add(pointLightHelperR);
    pointLightG.position.set(2, -2, 2);
    scene.add(pointLightG);
    scene.add(pointLightHelperG);
    pointLightB.position.set(2, 2, 2);
    scene.add(pointLightB);
    scene.add(pointLightHelperB);
    
}

function initGeometry() {
    const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
  scene.add(axesHelper);
    // 광택이 없는 물체 표현
  var material0 = new THREE.MeshLambertMaterial({ color: "#ffffff", side: THREE.DoubleSide });
  var geometryPlane = new THREE.PlaneGeometry(10, 10);
  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateY(5.0);
  plane.translateZ(5.0);
  plane.rotateX(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateX(5.0);
  plane.translateZ(5.0);
  plane.rotateY(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateY(-5.0);
  plane.translateZ(5.0);
  plane.rotateX(Math.PI * 0.5);
  scene.add(plane);

  var plane = new THREE.Mesh(geometryPlane, material0);
  plane.receiveShadow = true;
  plane.translateX(-5.0);
  plane.translateZ(5.0);
  plane.rotateY(Math.PI * 0.5);
  scene.add(plane);


    // 빛나는 부분까지 표현 (육사분면, 3사분면)
  var material1 = new THREE.MeshPhongMaterial({ color: "#ff0000" });
  var geoCube = new THREE.BoxGeometry();
  var cube = new THREE.Mesh(geoCube, material1);
  cube.castShadow = true;
  cube.translateX(-1.0);
  cube.translateY(-1.0);
  cube.translateZ(0.5);
  scene.add(cube);


    // 법선 벡터 (토러스, 2사분면), 조명과 상관없이 보임.
  var material2 = new THREE.MeshNormalMaterial();
  var geoTorus = new THREE.TorusGeometry(0.5, 0.2);
  torus = new THREE.Mesh(geoTorus, material2);
  torus.castShadow = true;
  torus.translateX(1.0);
  torus.translateY(1.0);
  torus.translateZ(0.5);
  scene.add(torus);

    // 사실적인 재질을 위해 물리 기반 (콘, 4사분면)
  var material3 = new THREE.MeshStandardMaterial({ color: "#fed136" });
  var geoCone = new THREE.ConeGeometry(0.5, 1);
  var cone = new THREE.Mesh(geoCone, material3);
  cone.translateX(1.0);
  cone.translateY(-1.0);
  cone.translateZ(0.5);
  cone.rotateX(Math.PI * 0.5);
  scene.add(cone);

  // 사실적인 재질을 위해 물리 기반 좀 더 사실적인 (콘, 1사분면)
  var material4 = new THREE.MeshPhysicalMaterial({ color: "#3333cc" });
  var geoCone = new THREE.SphereGeometry(0.5);
  var cone = new THREE.Mesh(geoCone, material4);
  cone.translateX(-1.0);
  cone.translateY(1.0);
  cone.translateZ(0.5);
  cone.rotateX(Math.PI * 0.5);
  scene.add(cone);
}

function initRenderer() {
    // 카메라 위치 설정
    camera.position.z = 10;
    controls.update();
    renderer.setClearColor("#000000");
}

function initGUI() {
    // gui.add(object, propert, [min], [max], [step])
    gui.add(ambientLight, "visible").name("Ambient Light"); // 주변 빛 visible : bool
    gui.add(ambientLight, "intensity", 0, 1.0); // intensity 빛의 세기(0~1) 조절이 가능함.

    gui.add(pointLight0, "visible").name("Point Light"); // 팔면체가 빛을 낸다  pointLight0 = new THREE.PointLight(0xff9000, 0.9, 15, 3);
    gui.add(pointLightR, "visible").name("Point Light R");
    gui.add(pointLightG, "visible").name("Point Light G");
    gui.add(pointLightB, "visible").name("Point Light B");
    
    // 폴더 pointLight
    const pointFolder = gui.addFolder('PointLight')
    pointFolder.add(pointLight0.position, 'x', -10, 10);
    pointFolder.add(pointLight0.position, 'y', -10, 10);
    pointFolder.add(pointLight0.position, 'z', -10, 10);
    pointFolder.add(pointLight0, 'distance', 0, 100); // 도달하는 거리(세기) 클수록 강함
    pointFolder.add(pointLight0, 'decay', 0, 10); // 감쇄

    const pointFolderR = gui.addFolder('PointLightR')
    pointFolderR.add(pointLightR.position, 'x', -10, 10);
    pointFolderR.add(pointLightR.position, 'y', -10, 10);
    pointFolderR.add(pointLightR.position, 'z', -10, 10);
    pointFolderR.add(pointLightR, 'distance', 0, 100); 
    pointFolderR.add(pointLightR, 'decay', 0, 10);

    const pointFolderG = gui.addFolder('PointLightG')
    pointFolderG.add(pointLightG.position, 'x', -10, 10);
    pointFolderG.add(pointLightG.position, 'y', -10, 10);
    pointFolderG.add(pointLightG.position, 'z', -10, 10);
    pointFolderG.add(pointLightG, 'distance', 0, 100); 
    pointFolderG.add(pointLightG, 'decay', 0, 10);

    const pointFolderB = gui.addFolder('PointLightB')
    pointFolderB.add(pointLightB.position, 'x', -10, 10);
    pointFolderB.add(pointLightB.position, 'y', -10, 10);
    pointFolderB.add(pointLightB.position, 'z', -10, 10);
    pointFolderB.add(pointLightB, 'distance', 0, 100); 
    pointFolderB.add(pointLightB, 'decay', 0, 10);

    // 폴더 토러스
    const torusFolder = gui.addFolder('torus')
    torusFolder.add(torus.position, 'x', -10, 10);
    torusFolder.add(torus.position, 'y', -10, 10);
    torusFolder.add(torus.position, 'z', -10, 10);
  }

function init() {
    initLight();
    initGeometry();
    initRenderer();
    initGUI();
}

// 애니메이션 함수
function animate() {
    requestAnimationFrame(animate);
    
    // Camera 이동
    // cameraIndex++;
    // camera.position.x = Math.sin(cameraIndex/100.0);
    // camera.position.z = Math.cos(cameraIndex/100.0);

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