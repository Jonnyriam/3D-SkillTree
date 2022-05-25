import { ElementRef, Injectable } from "@angular/core";
import * as THREE from "three";

import { CameraService } from "./camera.service";

@Injectable()
export class SceneService {
  scene: THREE.Scene;

  constructor(private camService: CameraService) { }

  getCanvasRef(canvasRef: ElementRef<HTMLCanvasElement>) {
    this.camService.getCanvasRef(canvasRef);
  }

  getCamera() {
    return this.camService.getCamera();
  }

  createScene(cube: THREE.Mesh) {

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
}
