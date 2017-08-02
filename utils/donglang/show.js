/* encoding=utf-8
** 为澄清中印在2017.07前后爆发的边界冲突而作。
** 仅代表个人观点。
** me@nagexiucai.com
*/

// 依赖项目：three.js、echarts.js、jquery-mobile.js。

// 依赖项目：https://github.com/nagexiucai/website

function getHeightData(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");

    var size = img.width * img.height;
    var data = new Float32Array(size);
    var base = 6553600000;
    context.drawImage(img,0,0);
    for (vari=0;i<size;i++) {
        data[i] = 0
    }

    var idata = context.getImageData(0,0,img.width,img.height);
    var pixels = idata.data;
    for (var i=0,j=0;i<pixels.length;i+=4,j++) { // pixel = [r,g,b,a]
        data[j] = (pixels[i]*256+pixels[i+1]+pixels[i+2]/256)-32768;
        if (data[j] < base) {
            base = data[j];
        }
    }
    img.base = base;
    return data;
}

var img = new Image();
img.onload = function () {
    var square = document.getElementById("square");
    square.innerHTML = "";

    var data = getHeightData(img);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(img.width*img.scalex, img.height*img.scaley);
    square.appendChild(renderer.domElement);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75,1,0.1,1000);
    camera.position.set(0,0,img.vh);
    camera.lookAt(scene.position);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    scene.add(new THREE.AmbientLight("white"));

    var geometry = new THREE.PlaneGeometry(16,16,img.width-1,img.height-1);

    var skin = new Image();
    skin.src = img.skin;
    var texture = new THREE.Texture(skin);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    var cover = {map: texture};
    var material = new THREE.MeshLambertMaterial(cover);
    var plane = new THREE.Mesh(geometry,material);
    // plane.rotation.set(-Math.PI/4,0,-Math.PI/4);

    var scale = function () {
        for (var i=0;i<plane.geometry.vertices.length;i++) {
            plane.geometry.vertices[i].z = (data[i]-img.base)/img.scalez;
        }
    }

    scale();

    scene.add(plane);

    var render = function () {
        requestAnimationFrame(render);

        controls.update();
        renderer.render(scene,camera);
    };
    render();
};

var view = {
    "dataset": undefined,
    "initialize": function () {
        this.dataset = donglang;
        img.scalez = 1800;
        img.scalex = 1.125;
        img.scaley = 1.125;
        img.vh = 15;
        img.zoomed = this.dataset.scale;
        img.skin = this.dataset.satellitembmk;
        img.src = this.dataset.terrainmz;
    },
    "change": function () {
        if (img.skin == this.dataset.satellitembmk) {
            img.skin = this.dataset.streetsmbmk;
        }
        else {
            img.skin = this.dataset.satellitembmk;
        }
        img.src = this.dataset.terrainmz;
    },
    "zoomed": function () {
        if (this.dataset == donglang) {
            this.dataset = donglang.meadow;
            img.scalez = 100;
            img.vh = 20;
        }
        else {
            this.dataset = donglang;
            img.scalez = 1800;
            img.vh = 15;
        }
        this.change();
    }
}

view.initialize();

require.config({
    paths: {
        echarts: "."
    }
});

require([
    "echarts",
    "echarts/chart/radar"
],
function(echarts){
    var es = echarts.init(document.getElementById("contrast"));
    es.setOption(option);
});