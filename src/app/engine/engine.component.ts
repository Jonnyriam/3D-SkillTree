import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import * as THREE from "three";
import { SceneService } from '../shared/scene.service';
import { CameraService } from '../shared/camera.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.css'],
  providers: [SceneService]
})
export class EngineComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef;

  //* branch properties
  @Input() public rotationSpeedX: number = 0.005;
  @Input() public rotationSpeedY: number = 0.005;
  @Input() public size: number = 200;
  @Input() public texture: string = "assets/texture.png";

  //? Helper Properties (Private Properties)

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }


  private geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
  private material = new THREE.MeshPhongMaterial({ color: 0x6b1913, flatShading: true });

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private renderer!: THREE.WebGLRenderer;

  private scene: THREE.Scene;

  constructor(private sceneService: SceneService) { }

  ngAfterViewInit(): void {
    this.sceneService.getCanvasRef(this.canvasRef);
    this.sceneService.createScene(this.cube,);
    this.startRenderingLoop();
  }


  ngOnInit(): void {
  }
  //animating the cube
  private animateCube() {
    //this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  //creating the scene
  // private createScene() {
  //   Scene
  //   this.scene = new THREE.Scene();
  //   this.scene.background = new THREE.Color(0xbc85a3);
  //   this.cube.rotateX(0.5);
  //   this.scene.add(this.cube);
  //   Camera
  //   let aspectRatio = this.getAspectRatio();
  //   this.camera = new THREE.PerspectiveCamera(
  //     this.fieldOfView,
  //     aspectRatio,
  //     this.nearClippingPlane,
  //     this.farClippingPLane
  //   )
  //   this.camera.position.z = this.cameraZ;

  //   const dirLight1 = new THREE.DirectionalLight( 0xffffff );
  //   dirLight1.position.set(1, 1, 1);
  //   dirLight1.intensity = 1.5;
  //   this.scene.add(dirLight1);

  //   const dirLight2 = new THREE.DirectionalLight( 0x002288 );
	// 	dirLight2.position.set( - 1, - 1, - 1 );
	// 	this.scene.add( dirLight2 );

	// 	const ambientLight = new THREE.AmbientLight( 0xffffff );
	// 	this.scene.add( ambientLight );

  // }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  //Start the rendering loop
  private startRenderingLoop() {
    //renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: EngineComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.sceneService.scene , component.sceneService.getCamera());
    }());
  }
}

