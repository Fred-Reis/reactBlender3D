// import React, {Component} from 'react';
// import * as THREE from 'three';
// import GLTFLoader from 'three-gltf-loader';
// import kenny from'./bread.glb';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// class App extends Component {
//   constructor(props) {
//     super(props);
//     // STATE FOR UPDATING INPUTS VALUE AND SET MODEL POSITION
//     this.state = {position: { x: 0, y: 0, z: 0 },
//                   rotation: { x: 0, y: 0, z: 0 },
//                   scale: { x: 3, y: 3, z: 3 } }
//   }
//   componentDidMount() {
    
//     // var scene = new THREE.Scene();
//     // const loader = new GLTFLoader();
//     // loader.load( './assets/Kenny.gltf', gltf => {

//     //   scene.add( gltf.scene );
   
//     //  } );
    
    
//     // === THREE.JS CODE START ===
//     const width = this.mount.clientWidth;
//     const height = this.mount.clientHeight;
//     //ADD RENDERER
//     this.renderer = new THREE.WebGLRenderer({antialias: true});
//     this.renderer.setClearColor('#dbdbdb');
//     this.renderer.setSize(width, height);
//     this.renderer.gammaFactor = 1.5;
//     this.renderer.gammaOutput = true;
//     this.mount.appendChild(this.renderer.domElement);

//     // this.orbit = new OrbitControls( this.camera, this.renderer.domElement );
//     // this.camera.position.set( 0, 2, 2 );
//     // this.orbit.update();

//     //ADD CAMERA
//     this.camera = new THREE.PerspectiveCamera( 100, width / height, 0.1, 10000 );

//     //ADD SCENE
//     this.scene = new THREE.Scene();

//     // LIGHT
//     this.light = new THREE.AmbientLight(0xffffff, 3.3);
//     this.scene.add(this.light);


//     this.loader = new GLTFLoader();

//     // LODING GLB FILE FROM SRC FOLDER
//     this.loader.load(kenny, gltf => {
//       this.gltf = gltf.scene

//       // ADD MODEL TO THE SCENE
//       this.scene.add(gltf.scene);

//       this.renderer.render(this.scene, this.camera);
//     }, undefined,

//     error => {
//       console.log(error);
//     });

//     // objPosition = (direction, axis) => {
//     //   this.gltf[direction][axis] = this.state[direction][axis];
//     //   this.renderer.render(this.scene, this.camera);
//     // };

//     // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//     // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//     // var cube = new THREE.Mesh( geometry, material );
//     // scene.add( cube );
//     // camera.position.z = 5;
//     // var animate = function () {
//     //   requestAnimationFrame( animate );
//     //   cube.rotation.x += 0.01;
//     //   cube.rotation.y += 0.01;
//     //   renderer.render( scene, camera );
//     // };
//     // animate();
//     // === THREE.JS EXAMPLE CODE END ===
//   }
//   render() {
//     return (
//      <>
//         <div
//           style={{width: "300px", height: "300px"}}
//           ref={mount => this.mount = mount}>
//         </div>
      
//         <div>
//           <p>Position</p>
//           <input type="number" value={this.state.position.x}
//                   onChange={event => this.stateUpdate(event, "position", "x", this.objPosition)}/>
//           <input type="number" value={this.state.position.y}
//                   onChange={event => this.stateUpdate(event, "position", "y", this.objPosition)}/>
//           <input type="number" value={this.state.position.z}
//                   onChange={event => this.stateUpdate(event, "position", "z", this.objPosition)}/>
//         </div>

//         <div>
//           <p>Position Rotation Scaled Selector</p>
//           <select onChange={this.posRotScale} ref={valType => this.valType = valType}>
//             <option value="position">position</option>

//           </select>
//         </div>
    
//       </>
//     )
//   }
// }

// export default App;





import React, { Component } from "react";
import GLTFLoader from 'three-gltf-loader';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import kenny from'./bread.glb';


const style = {
  height: 250 // we can control scene size by setting container dimensions
};

class App extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      100 // far plane
    );
    this.camera.position.z = 0.3; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.el);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    // const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshPhongMaterial({
    //   color: 0x156289,
    //   emissive: 0x072534,
    //   side: THREE.DoubleSide,
    //   flatShading: true
    // });


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

    this.cube = this.gltf;
    this.scene.add(this.cube);

  
    this.light = new THREE.AmbientLight(0xffffff, 3);
    this.scene.add(this.light);

  };

  startAnimationLoop = () => {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div style={style} ref={ref => (this.el = ref)} />;
  }
}

// class Container extends React.Component {
//   state = { isMounted: true };

//   render() {
//     const { isMounted = true } = this.state;
//     return (
//       <>
//         <button
//           onClick={() =>
//             this.setState(state => ({ isMounted: !state.isMounted }))
//           }
//         >
//           {isMounted ? "Unmount" : "Mount"}
//         </button>
//         {isMounted && <App />}
//         {isMounted && <div>Scroll to zoom, drag to rotate</div>}
//       </>
//     );
//   }
// }

export default App;