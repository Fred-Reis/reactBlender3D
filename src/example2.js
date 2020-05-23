import React, {Component} from 'react';
import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import kenny from'./bread.glb';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


class App extends Component {
  constructor(props) {
    super(props);
    // STATE FOR UPDATING INPUTS VALUE AND SET MODEL POSITION
    this.state = {position: { x: 0, y: 0, z: 0 },
                  rotation: { x: 0, y: 0, z: 0 },
                  scale: { x: 3, y: 3, z: 3 } }
  }
  componentDidMount() {
    
    // var scene = new THREE.Scene();
    // const loader = new GLTFLoader();
    // loader.load( './assets/Kenny.gltf', gltf => {

    //   scene.add( gltf.scene );
   
    //  } );
    
    
    // === THREE.JS CODE START ===
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setClearColor('#dbdbdb');
    this.renderer.setSize(width, height);
    this.renderer.gammaFactor = 1.5;
    this.renderer.gammaOutput = true;
    this.mount.appendChild(this.renderer.domElement);

    // this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
    // this.camera.position.set( 0, 2, 2 );
    // this.orbit.update();

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera( 100, width / height, 0.1, 10000 );

    //ADD SCENE
    this.scene = new THREE.Scene();

    // LIGHT
    this.light = new THREE.AmbientLight(0xffffff, 3.3);
    this.scene.add(this.light);


    this.loader = new GLTFLoader();

    // LODING GLB FILE FROM SRC FOLDER
    this.loader.load(kenny, gltf => {
      this.gltf = gltf.scene

      // ADD MODEL TO THE SCENE
      this.scene.add(gltf.scene);

      this.renderer.render(this.scene, this.camera);
    }, undefined,

    error => {
      console.log(error);
    });

    // objPosition = (direction, axis) => {
    //   this.gltf[direction][axis] = this.state[direction][axis];
    //   this.renderer.render(this.scene, this.camera);
    // };

    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    // camera.position.z = 5;
    // var animate = function () {
    //   requestAnimationFrame( animate );
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
    //   renderer.render( scene, camera );
    // };
    // animate();
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return (
     <>
        <div
          style={{width: "300px", height: "300px"}}
          ref={mount => this.mount = mount}>
        </div>
      
        <div>
          <p>Position</p>
          <input type="number" value={this.state.position.x}
                  onChange={event => this.stateUpdate(event, "position", "x", this.objPosition)}/>
          <input type="number" value={this.state.position.y}
                  onChange={event => this.stateUpdate(event, "position", "y", this.objPosition)}/>
          <input type="number" value={this.state.position.z}
                  onChange={event => this.stateUpdate(event, "position", "z", this.objPosition)}/>
        </div>

        <div>
          <p>Position Rotation Scaled Selector</p>
          <select onChange={this.posRotScale} ref={valType => this.valType = valType}>
            <option value="position">position</option>

          </select>
        </div>
    
      </>
    )
  }
}

export default App;
