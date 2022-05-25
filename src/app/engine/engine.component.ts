import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

import { SceneService } from '../shared/scene.service';

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.css']
})
export class EngineComponent implements OnInit, AfterViewInit {
  @HostListener('window:resize') onResize() {
    this.sceneService.getCamera().aspect = window.innerWidth / window.innerHeight;
    this.sceneService.getCamera().updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  @ViewChild('canvas') private canvasRef: ElementRef;

  //* branch properties
  @Input() public rotationSpeedY: number = 0.005;

  //Renderer
  //renderer

  //private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private renderer!: THREE.WebGLRenderer;
  //private scene: THREE.Scene;

  constructor(private sceneService: SceneService) { }

  ngAfterViewInit(): void {
    this.sceneService.getCanvasRef(this.canvasRef);
    this.sceneService.getRendererRef(this.renderer);
    this.sceneService.createScene();
    this.startRenderingLoop();
  }


  ngOnInit(): void {
  }

  //animating the cube
  private animateCube() {
    //this.cube.rotation.x += this.rotationSpeedX;
    //this.sceneService.cube.rotation.y += this.rotationSpeedY;
  }

  //Start the rendering loop
  private startRenderingLoop() {
    //renderer

    //Creates the renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    let component: EngineComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.sceneService.scene , component.sceneService.getCamera());
    }());

    const controls = new OrbitControls(this.sceneService.getCamera(), this.renderer.domElement);
  }
}

