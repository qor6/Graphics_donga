let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let xValue = 50;
let yValue = 200;

let boxPts = [];


boxPts.push(new THREE.Vector2(150, 150));
boxPts.push(new THREE.Vector2(350, 350));

boxPts.push(new THREE.Vector2(xValue, yValue));
boxPts.push(new THREE.Vector2(xValue + 50, yValue + 50));


function draw_box(minPt, maxPt, isFill) {
    ctx.beginPath();
    ctx.rect(minPt.x, minPt.y, maxPt.x - minPt.x, maxPt.y - minPt.y);

    if (isFill)
        ctx.fill();
    else
        ctx.stroke();
}

//circle center(x,y), rad
//arc 호 그리는 함수 각도가 필요함 360도=2xPI
function draw_circle(ctr, rad, isFill) {
    ctx.beginPath();
    ctx.arc(ctr.x, ctr.y, rad,0, 2 * Math.PI);
    if (isFill)
        ctx.fill();
    else
        ctx.stroke();
}

function draw_image() {
    let isFill = false; //충돌하는지 안 하는지
    if (box_box_collision(boxPts[0], boxPts[1], boxPts[2], boxPts[3]))
        isFill = true;

    ctx.strokeStyle = "green";  //선
    ctx.fillStyle = "green"     //도형 내부
    draw_box(boxPts[0], boxPts[1], isFill)

    ctx.strokeStyle = "red"
    ctx.fillStyle = "red"
    draw_box(boxPts[2], boxPts[3], isFill)

    // //도전과제
    // ctx.strokeStyle = "blue"
    // ctx.fillStyle = "blue"
    // circleCtr = new THREE.Vector2(250,250);
    // draw_circle(circleCtr,50,false);
}

function draw_challenge() {
    let isFill = false; //충돌하는지 안 하는지
    let radius = 50; 
    ctx.strokeStyle = "red"
    ctx.fillStyle = "red"
    draw_box(boxPts[2], boxPts[3], isFill)

    ctx.strokeStyle = "blue"
    ctx.fillStyle = "blue"
    circleCtr = new THREE.Vector2(250,250);
    draw_circle(circleCtr,radius,false);

    if (circle_box_collision(circleCtr.x, circleCtr.y, radius, boxPts[2], boxPts[3]))
        isFill = true;
}
function box_box_collision(pMin, pMax, qMin, qMax) {
    if (
        pMin.x < qMax.x && pMax.x > qMin.x && pMin.y < qMax.y && pMax.y > qMin.y
      ) 
        return true;
    return false
}

function circle_box_collision(cirx, ciry, r, qMin, qMax) {
    if (
        //점과 점 사이의 거리
        x = 
        //거리
        let d = 
        //반지름과 거리에 관계
        r < d
      ) 
        return true;
    return false
}

//Keyboard Input
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        xValue += 5;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        xValue -= 5;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        yValue -= 5;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        yValue += 5;
    }

    boxPts[2].x = xValue;
    boxPts[3].x = xValue + 50;
    boxPts[2].y = yValue;
    boxPts[3].y = yValue + 50;
}

//Animation Callback
function clear() {
    ctx.clearRect(0, 0, c.width, c.height);
}
function update() {
    clear();
    //draw_image();
    draw_challenge();
    requestAnimationFrame(update);
    
}
update();
document.addEventListener('keydown', keyDown);  //keyboard INPUT event action
