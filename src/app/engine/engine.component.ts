import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { SceneService } from '../shared/scene.service';

import * as THREE from "three";

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.css']
})
export class EngineComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef;

  //* branch properties
  @Input() public rotationSpeedY: number = 0.005;

  //? Helper Properties (Private Properties)

  //private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
  private material = new THREE.MeshPhongMaterial({ color: 0x6b1913, flatShading: true });

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private renderer!: THREE.WebGLRenderer;

  //private scene: THREE.Scene;

  constructor(private sceneService: SceneService) { }

  ngAfterViewInit(): void {
    this.sceneService.getCanvasRef(this.canvasRef);
    this.sceneService.createScene(this.cube);
    this.startRenderingLoop();
    window.addEventListener('resize', this.onWindowsResize);
  }


  ngOnInit(): void {
  }

  //animating the cube
  private animateCube() {
    //this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  //Start the rendering loop
  private startRenderingLoop() {
    //renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    let component: EngineComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.sceneService.scene , component.sceneService.getCamera());
    }());
  }

  onWindowsResize() {
    this.sceneService.getCamera().aspect = window.innerWidth / window.innerHeight;
    this.sceneService.getCamera().updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

