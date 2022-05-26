import { ElementRef, Injectable } from "@angular/core";
import * as THREE from "three";

import { EngineComponent } from "../engine/engine.component";
import { CameraService } from "./camera.service";

@Injectable()
export class SceneService {

  meshArray: THREE.Mesh[] = [];
  scene: THREE.Scene;
  canvas: HTMLCanvasElement;
  component: EngineComponent;

  private geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
  private material = new THREE.MeshPhongMaterial({ color: 0x6b1913, flatShading: true });

  cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  constructor(private camService: CameraService) { }

  getCanvas(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvas = canvas.nativeElement;
  }

  getRendererRef(rendererRef:THREE.WebGLRenderer) {
    this.camService.getRendererRef(rendererRef);
  }

  //CamService Related
  getCanvasRef(canvasRef: ElementRef<HTMLCanvasElement>) {
    this.camService.getCanvasRef(canvasRef);
  }
  getCamera() {
    return this.camService.getCamera();
  }

  createScene() {
    console.log("i'm here on the createScene");

    //Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbc85a3);

    this.cube.rotateX(0.5);

    let i = 27;
    let even = 0;
    let odd = 0;

    while (i != 1) {
      if (i == 123) {
        this.scene.add(this.cube);
        //this.meshArray.push(this.cube);
      }
      if (i % 2 == 1) {
        i = (i * 3) + 1;
        let mesh = this.cube.clone();
        mesh.rotateX(odd * 0.01);
        mesh.translateY(odd+0.01);
        this.scene.add(mesh);
        this.meshArray.push(mesh);
        odd++;
      }
      else if (i % 2 == 0) {
        i /= 2;
        let mesh = this.cube.clone();
        //mesh.rotateX(even * 0.2);
        mesh.rotateZ(even * 0.02);
        mesh.translateY(even);
        this.scene.add(mesh);
        this.meshArray.push(mesh);
        even++;
      }
    }
    console.log("amount of even: " + even);
    console.log("amount of odds: " + odd);

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
