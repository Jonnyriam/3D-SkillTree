import { ElementRef } from "@angular/core";
import * as THREE from "three";

export class CameraService {
  private canvas: HTMLCanvasElement;
  camera: THREE.PerspectiveCamera;

  //camera Properties
  cameraZ: number = 400;
  public fieldOfView: number = 0.5;
  public nearClippingPlane: number = 1;
  public farClippingPLane: number = 1000;

  getCamera() {
    return this.camera;
  }

  getCanvasRef(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvas = canvas.nativeElement;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  //Camera
  createCamera() {
    console.log("i'm here");
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
