import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as lil from 'lil-gui';

console.log( lil);

const gui = new lil.GUI();

/**
 * mouse position
 */

const cursor =
{
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) =>
{
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - ( event.clientY / sizes.height - 0.5 )
  // console.log( cursor );
})



/**
 * Canvas
 */

const canvas = document.querySelector( 'canvas.webgl' );

/**
 * Scene
 */

const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

/**
 * Sizes
 */
const sizes =
{
  width: window.innerWidth,
  height: window.innerHeight
}




const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

/**
 * debug Ui
 */

gui
  .add( camera.position, 'x' )
  .min( - 3 )
  .max( 3 )
  .step( 0.01 )

gui
  .add( camera.position, 'y' )
  .min( - 3 )
  .max( 3 )
  .step( 0.01 )
  .name( "Y")

gui
  .add(mesh.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name("elevation")
/**
 * Controls
 */

const controls = new OrbitControls( camera, canvas );

/**
 * Resize
 */

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Renderer
 * */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize( sizes.width, sizes.height );
renderer.outputColorSpace = THREE.LinearSRGBColorSpace

const clock = new THREE.Clock();

const tick = () => 
{
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  mesh.rotation.y = elapsedTime;
  mesh.rotation.x = elapsedTime * 0.5;
  // camera.position.x = cursor.x * 2
  // camera.position.y = cursor.y * 2
  // camera.lookAt(mesh.position)

  // Update controls
  controls.update();

  // Render
  renderer.render( scene, camera );

  // Call tick again on the next frame
  window.requestAnimationFrame( tick );
}

tick();
