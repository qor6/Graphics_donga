let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

// 중심과 반지름
let circleData = { center: new THREE.Vector2(200, 200), radius: 50 };

let boxData = { min: new THREE.Vector2(300, 300), max: new THREE.Vector2(400, 400) };

function draw_circle(data) {
    ctx.beginPath();
    ctx.arc(data.center.x, data.center.y, data.radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function draw_box(data) {
    ctx.beginPath();
    ctx.rect(data.min.x, data.min.y, data.max.x - data.min.x, data.max.y - data.min.y);
    ctx.stroke();
}

function draw_point(pt, color, size) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, size, 0, 2 * Math.PI);
    ctx.fill();
}

//point(vector2).distanceTo(circle.centor (vector2)) 거리 ==> bool(밖:false, 안:true)
function is_pt_inside_circle(pt, circle) {
    return pt.distanceTo(circle.center) <= circle.radius;
}

//min.x, min.y, max.x, max.y => min.x < x < max.x && min.y < y < max.y
function is_pt_inside_box(pt, box) {
    return box.min.x < pt.x && pt.x < box.max.x && box.min.y < pt.y && pt.y < box.max.y;
    //return false; //Need to write!
}

function is_cir_inside_box(pt, circle, box) {
    box.min.x < pt.x && pt.x < box.max.x && box.min.y < pt.y && pt.y < box.max.y;
    pt.distanceTo(circle.center) <= circle.radius;
    return 
}

function draw_sample_point() {
    for (i = 0; i <= 500; i += 10) {
        for (j = 0; j <= 500; j += 10) {
            let pt = new THREE.Vector2(i, j);
            let color = 'black';
            let size = 1;

            // 겹쳐진 부분 색 바꾸기
            if ((is_pt_inside_circle(pt, circleData)) && (is_pt_inside_box(pt, boxData)))  {
                color = 'green';
                size = 3;
            }
            else if (is_pt_inside_circle(pt, circleData)) {
                color = 'blue';
                size = 2;
            }
            else if (is_pt_inside_box(pt, boxData)) {
                color = 'purple';
                size = 2;
            }

            draw_point(pt, color, size);
        }
    }
}

function draw_image() {
    ctx.strokeStyle = "blue";
    draw_circle(circleData);

    ctx.strokeStyle = "purple";
    draw_box(boxData);

    draw_sample_point();
}

//Keyboard Input
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right')
        circleData.center.x += 5;
    else if (e.key === 'ArrowLeft' || e.key === 'Left')
        circleData.center.x -= 5;
    else if (e.key === 'ArrowUp' || e.key === 'Up')
        circleData.center.y -= 5;
    else if (e.key === 'ArrowDown' || e.key === 'Down')
        circleData.center.y += 5;
    //w,a,s,d
    else if (e.key === 'w')
        boxData.min.y += 5, boxData.max.y += 5;
    else if (e.key === 's')
        boxData.min.y -= 5, boxData.max.y -= 5;
    else if (e.key === 'd')
        boxData.min.x += 5, boxData.max.x += 5;
    else if (e.key === 'a')
        boxData.min.x -= 5, boxData.max.x -= 5;
}

//Animation Callback
//clear 주석 하면 이동된 경로대로 계속 뜬다.
function clear() {
    ctx.clearRect(0, 0, c.width, c.height);
}
function update() {
    clear();
    draw_image();
    requestAnimationFrame(update);
}
update();
document.addEventListener('keydown', keyDown);
