var x = window.matchMedia("(max-width: 700px), (orientation: portrait)");


const perspective = 800;
const fov = 180 * (2 * Math.atan(innerHeight / 2 / perspective)) / Math.PI;
console.log(window.innerHeight);
var scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 0, perspective);
// camera.position.z=10;
// camera.position.z=320;
// camera.position.y=30;

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

var t = 0;
var factor = new Array(4);
factor[0] = 0.004;
factor[1] = 0.015;
factor[2] = 0.010;
factor[3] = 0.008;
var position = new Array(4);

if(x.matches){
    position[0] = {
        'x': 0,
        'y': -(window.innerHeight / 3) - window.innerHeight / 10,
        'z': 0,
        'scale': 0.6
    };
    
    position[1] = {
        'x': -(window.innerWidth*2),
        'y': -window.innerHeight / 7,
        'z': -window.innerWidth / 100,
        'scale': 0.00001
    };
    
    position[2] = {
        'x': 0,
        'y': (window.innerHeight / 2) - window.innerHeight / 3,
        'z': -2 * (window.innerWidth / 100),
        'scale': 0.00001
    };
    
    position[3] = {
        'x': (window.innerWidth*2),
        'y': -window.innerHeight / 7,
        'z': -window.innerWidth / 100,
        'scale': 0.0001
    };
}else{
    position[0] = {
        'x': 0,
        'y': -(window.innerHeight / 2) - window.innerHeight / 3.5,
        'z': 0,
        'scale': 1
    };
    
    position[1] = {
        'x': -(window.innerWidth / 2),
        'y': -window.innerHeight / 7,
        'z': -window.innerWidth / 100,
        'scale': 0.15
    };
    
    position[2] = {
        'x': 0,
        'y': (window.innerHeight / 2) - window.innerHeight / 3,
        'z': -2 * (window.innerWidth / 100),
        'scale': 0.00001
    };
    
    position[3] = {
        'x': (window.innerWidth / 2),
        'y': -window.innerHeight / 7,
        'z': -window.innerWidth / 100,
        'scale': 0.15
    };
}

var render = function () {
    requestAnimationFrame(render);
    sphere[0].rotation.y -= factor[0];
    // sphere[0].rotation.x = Date.now() * -factor[0];
    sphere[1].rotation.y -= factor[1];
    sphere[2].rotation.y -= factor[2];
    sphere[3].rotation.y -= factor[3];
    renderer.render(scene, camera);
}

var sphere = new Array(4);
var material = new Array(4);
var geo = new THREE.SphereGeometry(400, 80, 80);
material[0] = new THREE.MeshPhongMaterial({});
material[0].map = THREE.ImageUtils.loadTexture('images/2k_earth.jpg');
sphere[0] = new THREE.Mesh(geo, material[0]);
sphere[0].position.x = position[0].x;
sphere[0].position.y = position[0].y;
sphere[0].position.z = position[0].z;
sphere[0].scale.x = position[0].scale;
sphere[0].scale.y = position[0].scale;
sphere[0].scale.z = position[0].scale;
scene.add(sphere[0]);

material[1] = new THREE.MeshPhongMaterial({});
material[1].map = THREE.ImageUtils.loadTexture('./images/2k_jupiter.jpg');
sphere[1] = new THREE.Mesh(geo, material[1]);
sphere[1].position.x = position[1].x;
sphere[1].position.y = position[1].y;
sphere[1].position.z = position[1].z;
sphere[1].scale.x = position[1].scale;
sphere[1].scale.y = position[1].scale;
sphere[1].scale.z = position[1].scale;
scene.add(sphere[1]);

material[2] = new THREE.MeshPhongMaterial({});
material[2].map = THREE.ImageUtils.loadTexture('./images/2k_mars.jpg');
sphere[2] = new THREE.Mesh(geo, material[2]);
sphere[2].position.x = position[2].x;
sphere[2].position.y = position[2].y;
sphere[2].position.z = position[2].z;
sphere[2].scale.x = position[2].scale;
sphere[2].scale.y = position[2].scale;
sphere[2].scale.z = position[2].scale;
scene.add(sphere[2]);

material[3] = new THREE.MeshPhongMaterial({});
material[3].map = THREE.ImageUtils.loadTexture('./images/2k_neptune.jpg');
sphere[3] = new THREE.Mesh(geo, material[3]);
sphere[3].position.x = position[3].x;
sphere[3].position.y = position[3].y;
sphere[3].position.z = position[3].z;
sphere[3].scale.x = position[3].scale;
sphere[3].scale.y = position[3].scale;
sphere[3].scale.z = position[3].scale;
scene.add(sphere[3]);



var light = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(light);
var light3 = new THREE.DirectionalLight(0xffffff, 1.3);
light3.position.set(0, window.innerHeight * 2, 1000);
scene.add(light3);
var t = new THREE.Object3D();
// t.position.x = 0;
// t.position.y = 1000;
// t.position.z = 1000;
// scene.add(t);
light3.target = sphere[2];

render();
var t = window.innerWidth * 0.026458;
this.tl = new TimelineMax({
    paused: true
});
this.tl2 = new TimelineMax({
    paused: true
});
// this.tl.to(this.sphere.position,0.75,{z:-30,ease:Power3.easeIn});
// this.tl.to(this.sphere.position,0.75,{y:-t,ease:Power4.easeIn},"=-0.75");
// this.tl.to(this.sphere.scale,0.5,{y:-6,ease:Power0.easeOut},"=-0.5");
var state_count = 0;
var containers = new Array(4);
var active;
var m = 4;
var cont_count = 0

function goLeft() {
    this.tl.play();
    state_count++;
    cont_count--;
    containers[(cont_count+m)%m].classList.add('active');
    active.classList.remove('active');
    active = containers[(cont_count+m)%m];

    if(cont_count<0) cont_count+=m;

    for (var i = 0; i < m; i++) {
        if (i - state_count < 0) state_count -= m;
        var s;
        if (i > 0) s = "=-1";
        else s = "=0";

        if ((((i - state_count + m) % m) % 2) == 0) {
            this.tl.to(this.sphere[i].position, 1, {
                x: position[(i - state_count + m) % m].x,
                ease: Power4.easeIn
            }, s);
            this.tl.to(this.sphere[i].position, 1, {
                y: position[(i - state_count + m) % m].y,
                ease: Power2.easeIn
            }, "=-1");
            this.tl.to(this.sphere[i].position, 1, {
                z: position[(i - state_count + m) % m].z,
                ease: Power4.easeIn
            }, "=-1");
            this.tl.to(this.sphere[i].scale, 1, {
                y: position[(i - state_count + m) % m].scale,
                x: position[(i - state_count + m) % m].scale,
                z: position[(i - state_count + m) % m].scale,
                ease: Power4.easeIn
            }, "=-1");
        } else if ((((i - state_count + m) % m) % 2) != 0) {
            this.tl.to(this.sphere[i].position, 1, {
                x: position[(i - state_count + m) % m].x,
                ease: Power1.easeIn
            }, s);
            this.tl.to(this.sphere[i].position, 1, {
                y: position[(i - state_count + m) % m].y,
                ease: Power4.easeIn
            }, "=-1");
            this.tl.to(this.sphere[i].position, 1, {
                z: position[(i - state_count + m) % m].z,
                ease: Power4.easeIn
            }, "=-1");
            this.tl.to(this.sphere[i].scale, 1, {
                y: position[(i - state_count + m) % m].scale,
                x: position[(i - state_count + m) % m].scale,
                z: position[(i - state_count + m) % m].scale,
                ease: Power4.easeIn
            }, "=-1");
        }
    }
}

function goRight() {
    this.tl.play();
    state_count--;

    cont_count++;
    containers[(cont_count)%m].classList.add('active');
    active.classList.remove('active');
    active = containers[(cont_count)%m];

    for (var i = 0; i < m; i++) {
        if (i - state_count < 0) state_count -= m;
        var s;
        if (i > 0) s = "=-1";
        else s = "=0";

        if ((((i - state_count + m) % m) % 2) == 0) {
            this.tl.to(this.sphere[i].position, 1, {
                x: position[(i - state_count + m) % m].x,
                ease: Power4.easeIn
            }, s);
            this.tl.to(this.sphere[i].position, 1, {
                y: position[(i - state_count + m) % m].y,
                ease: Power2.easeIn
            }, "=-1");
            this.tl.to(this.sphere[i].position, 1, {
                z: position[(i - state_count + m) % m].z,
                ease: Power4.easeIn
            }, "=-1");
            this.tl.to(this.sphere[i].scale, 1, {
                y: position[(i - state_count + m) % m].scale,
                x: position[(i - state_count + m) % m].scale,
                z: position[(i - state_count + m) % m].scale,
                ease: Power4.easeIn
            }, "=-1");
        } else if ((((i - state_count + m) % m) % 2) != 0) {
            this.tl.to(this.sphere[i].position, 1, {
                x: position[(i - state_count + m) % m].x,
                ease: Power1.easeIn
            }, s);
            this.tl.to(this.sphere[i].position, 1, {
                y: position[(i - state_count + m) % m].y,
                ease: Power4.easeIn
            }, "=-1");
            this.tl.to(this.sphere[i].position, 1, {
                z: position[(i - state_count + m) % m].z,
                ease: Power4.easeIn
            }, "=-1");
            this.tl.to(this.sphere[i].scale, 1, {
                y: position[(i - state_count + m) % m].scale,
                x: position[(i - state_count + m) % m].scale,
                z: position[(i - state_count + m) % m].scale,
                ease: Power4.easeIn
            }, "=-1");
        }
    }
}

function resetTimer(){
    clearInterval(timer);
    timer = setInterval(goRight,6000);
}

document.onkeydown = function (e) {
    if (e.keyCode == 39) goRight();
    else if (e.keyCode == 37) goLeft();
    resetTimer();
}

var timer;

document.addEventListener('DOMContentLoaded',function(){
    containers = document.querySelectorAll('.section-head-cont');
    active = document.querySelector('.active');
    timer = setInterval(goRight,6000);
})
