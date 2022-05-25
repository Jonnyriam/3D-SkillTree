import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import * as THREE from "three";
import { EngineComponent } from "../engine/engine.component";

import { CameraService } from "./camera.service";

@Injectable()
export class SceneService {

  scene: THREE.Scene;
  canvas: HTMLCanvasElement;
  component: EngineComponent;

  private cubeRef: THREE.Mesh;

  constructor(private camService: CameraService) { }

  getCanvas(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvas = canvas.nativeElement;
  }

  //CamService Related
  getCanvasRef(canvasRef: ElementRef<HTMLCanvasElement>) {
    this.camService.getCanvasRef(canvasRef);
  }
  getCamera() {
    return this.camService.getCamera();
  }

  createScene(cube: THREE.Mesh) {
    this.cubeRef = cube;
    console.log("i'm here on the createScene");

    //Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbc85a3);

    cube.rotateX(0.5);
    this.scene.add(cube);

    //Creates the camera
    this.camService.createCamera();

    //lights
    const dirLight1 = new THREE.DirectionalLight( 0xffffff );
    dirLight1.position.set(1, 1, 1);
    dirLight1.intensity = 1.5;
    this.scene.add(dirLight1);

    const ambientLight = new THREE.AmbientLight( 0xffffff );
		this.scene.add( ambientLight );
  }

  // animate() {
  //   requestAnimationFrame(this.render.bind(this.scene));
  //   this.animateCube();
  //   //controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  //   this.render();

  // }

  // render() {
  //   this.renderer.render(this.scene, this.getCamera());
  // }
}
