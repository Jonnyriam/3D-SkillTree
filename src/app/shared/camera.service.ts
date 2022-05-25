import { ElementRef, Injectable } from "@angular/core";

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable()
export class CameraService {
  private canvas: HTMLCanvasElement;
  camera: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  //camera Properties
  cameraZ: number = 400;
  public fieldOfView: number = 0.5;
  public nearClippingPlane: number = 1;
  public farClippingPLane: number = 10000;

  getCamera() {
    if(this.camera != null)
      return this.camera;
    else {
      this.createCamera();
      return this.camera
    }
  }

  getRendererRef(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
    console.log(this.renderer);
  }

  getCanvasRef(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvas = canvas.nativeElement;
  }

  private getAspectRatio() {
    return window.innerWidth / window.innerHeight;
  }

  //Camera
  createCamera() {
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPLane
    )
    this.camera.position.z = this.cameraZ;
  }
}
