<template>
  <div>
    <div class="three" style="width:100px;height:100px;background:#ccc"></div>
    <div class="three1" style="width:100px;height:100px;background:#ccc"></div>
    <div class="three2" style="width:100px;height:100px;background:#ccc"></div>
    <div class="three3" style="width:100px;height:100px;background:#ccc"></div>
  </div>
</template>
<script>
const THREE = require("three")
// import { WEBGL } from "three/examples/jsm/WebGL.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
export default {
  data() {
    return {
      lis: [1, 2, 3, 4, 5]
    }
  },
  created() {},
  mounted() {
    this.test()
    this.three1()
    this.three2()
    this.three3()
  },
  methods: {
    test() {
      // 渲染器
      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(50, 50)
      document.querySelector(".three").appendChild(renderer.domElement)

      // 相机
      let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100)
      // camera.position.set(10,10,50)

      // 场景
      let scene = new THREE.Scene()

      let geometry = new THREE.BoxGeometry(1, 1, 1)
      let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      let cube = new THREE.Line(geometry, material)
      scene.add(cube)

      camera.position.z = 2

      let animate = function() {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        renderer.render(scene, camera)
      }
      animate()
    },
    three1() {
      // 场景-相机-渲染器

      // 创建场景对象Scene
      let scene = new THREE.Scene()

      //  创建网络模型
      // let geomety = new THREE.SphereGeometry(60, 40, 40) //创建球体几何对象
      let geomety = new THREE.BoxGeometry(100, 100, 100) //创建球体几何对象
      let material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
      }) //材质对象Material
      let mesh = new THREE.Mesh(geomety, material) //网络模型对象Mesh
      scene.add(mesh) //网络模型添加到场景中

      // 光源设置
      let point = new THREE.PointLight(0xffffff) //点光源
      point.position.set(0, 200, 300) //点光源位置
      scene.add(point)
      let ambient = new THREE.AmbientLight(0x444444) //环境光
      scene.add(ambient)

      // 相机设置
      let width = 100 //window.innerWidth  //窗口宽度
      let height = 100 //window.innerHeight  //窗口高度
      let k = width / height //窗口宽高比
      let s = 100 //三维场景显示范围控制系数.系数越大,显示的范围越大

      //创建相机对象
      let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 500)
      camera.position.set(200, 300, 200) //相机位置
      camera.lookAt(scene.position) //相机方向(指向场景对象)
      console.log(scene.position)
      console.log(scene)

      // 创建渲染器对象
      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height) //渲染器区域尺寸
      renderer.setClearColor(0xb9d3ff, 1) //背景颜色
      console.log(renderer)

      document.querySelector(".three1").appendChild(renderer.domElement) //在.three1插入cavans对象

      // renderer.render(scene,camera)//执行渲染操作,指定场景/相机作为参数
      // let t0 = new Date()
      function render() {
        // let t1 = new Date()
        // console.log(t1-t0)
        // t0 = t1
        renderer.render(scene, camera) //执行渲染操作
        mesh.rotateY(-0.01) //每次绕y轴旋转0.01弧度
        mesh.rotateX(-0.01) //每次绕y轴旋转0.01弧度
        mesh.rotateZ(-0.01) //每次绕y轴旋转0.01弧度
        requestAnimationFrame(render) //请求浏览器再次执行渲染函数,渲染下一帧
      }
      // setInterval(render,20)
      render()
    },
    //监听鼠标操作三维场景旋转缩放
    three2() {
      // 场景-相机-渲染器

      // 创建场景对象Scene
      let scene = new THREE.Scene()

      //  创建网络模型
      // let geomety = new THREE.SphereGeometry(60, 40, 40) //创建球体几何对象
      let geomety = new THREE.BoxGeometry(100, 100, 100) //创建球体几何对象
      let material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
      }) //材质对象Material
      let mesh = new THREE.Mesh(geomety, material) //网络模型对象Mesh
      scene.add(mesh) //网络模型添加到场景中

      // 光源设置
      let point = new THREE.PointLight(0xffffff) //点光源
      point.position.set(0, 200, 300) //点光源位置
      scene.add(point)
      let ambient = new THREE.AmbientLight(0x444444) //环境光
      scene.add(ambient)

      // 相机设置
      let width = 100 //window.innerWidth  //窗口宽度
      let height = 100 //window.innerHeight  //窗口高度
      let k = width / height //窗口宽高比
      let s = 100 //三维场景显示范围控制系数.系数越大,显示的范围越大

      //创建相机对象
      let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 500)
      camera.position.set(200, 300, 200) //相机位置
      camera.lookAt(scene.position) //相机方向(指向场景对象)
      console.log(scene.position)
      console.log(scene)

      // 创建渲染器对象
      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height) //渲染器区域尺寸
      renderer.setClearColor(0xb9d3ff, 1) //背景颜色

      document.querySelector(".three2").appendChild(renderer.domElement) //在.three1插入cavans对象

      function render() {
        renderer.render(scene, camera) //执行渲染操作
      }
      render()

      let controls = new OrbitControls(camera, renderer.domElement)
      controls.addEventListener("change", render)
    },
    // 三维场景自动旋转缩放-鼠标科操作
    three3() {
      // 场景-相机-渲染器

      // 创建场景对象Scene
      let scene = new THREE.Scene()

      //  创建网络模型
      // let geomety = new THREE.SphereGeometry(60, 40, 40) //创建球体几何对象
      let geomety = new THREE.BoxGeometry(100, 100, 100) //创建球体几何对象
      let material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
      }) //材质对象Material
      let mesh = new THREE.Mesh(geomety, material) //网络模型对象Mesh
      scene.add(mesh) //网络模型添加到场景中

      // 光源设置
      let point = new THREE.PointLight(0xffffff) //点光源
      point.position.set(0, 200, 300) //点光源位置
      scene.add(point)
      let ambient = new THREE.AmbientLight(0x444444) //环境光
      scene.add(ambient)

      // 相机设置
      let width = 100 //window.innerWidth  //窗口宽度
      let height = 100 //window.innerHeight  //窗口高度
      let k = width / height //窗口宽高比
      let s = 100 //三维场景显示范围控制系数.系数越大,显示的范围越大

      //创建相机对象
      let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 500)
      camera.position.set(200, 300, 200) //相机位置
      camera.lookAt(scene.position) //相机方向(指向场景对象)
      console.log(scene.position)
      console.log(scene)

      // 创建渲染器对象
      let renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height) //渲染器区域尺寸
      renderer.setClearColor(0xb9d3ff, 1) //背景颜色

      document.querySelector(".three3").appendChild(renderer.domElement) //在.three1插入cavans对象

      function render() {
        renderer.render(scene, camera) //执行渲染操作
        mesh.rotateY(-0.01) //每次绕y轴旋转0.01弧度
        requestAnimationFrame(render) //请求浏览器再次执行渲染函数,渲染下一帧
      }
      render()

      let controls = new OrbitControls(camera, renderer.domElement)
      // controls.addEventListener("change", render)
    }
  },
  directives: {
    test: {
      bind: function(el, binding, vnode) {
        el.addEventListener("click", function() {
          console.log(el)
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  div > div {
    display: inline-block;
    margin-right: 5px;
  }
  #info {
    position: absolute;
    top: 200px;
    width: 500px;
    text-align: center;
    z-index: 100;
    display: block;
  }
</style>