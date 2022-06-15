import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';

import * as THREE from 'three';
import { Scene } from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EngineComponent } from '../engine/engine.component';
import { CameraService } from './camera.service';

@Injectable()
export class SceneService implements OnDestroy {
  //scene vars
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  private controls;

  //branch related
  private geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
  private material = new THREE.MeshPhongMaterial({
    color: 0x6b1913,
    flatShading: true,
  });
  cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  meshArray: THREE.Mesh[] = [];

  private frameId: number = null;
  constructor(private camService: CameraService, private ngZone: NgZone) {}

  public ngOnDestroy(): void {
    if (this.frameId != null) cancelAnimationFrame(this.frameId);

    if (this.renderer != null) {
      this.renderer.dispose();
      this.renderer = null;
      this.canvas = null;
    }
  }

  /*getCanvas(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvas = canvas.nativeElement;
  }

  getRendererRef(rendererRef: THREE.WebGLRenderer) {
    this.renderer = rendererRef;
  }

  //CamService Related
  getCanvasRef(canvasRef: ElementRef<HTMLCanvasElement>) {
    this.camService.getCanvasRef(canvasRef);
  }*/
  getCamera() {
    return this.camService.getCamera();
  }

  getRenderer() {
    return this.renderer;
  }

  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    //console.log("i'm here on the createScene");

    this.canvas = canvas.nativeElement;

    //renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(window.innerWidth - 280, window.innerHeight - 70.9);

    //Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbc85a3);
    this.scene = scene;

    const loader = new FontLoader();

    loader.load(
      '../../assets/fonts/helvetiker_regular.typeface.json',
      function (font) {
        console.log('Entered the font loader');
        const color = 0x006699;

        const matDark = new THREE.LineBasicMaterial({
          color: color,
          side: THREE.DoubleSide,
        });

        const matLite = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        });

        const message = '   Three.js\nSimple text.';
        console.debug(message);

        const shapes = font.generateShapes(message, 0.5);

        const geometry = new THREE.ShapeGeometry(shapes);
        geometry.computeBoundingBox();

        const xMid =
          -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);

        const text = new THREE.Mesh(geometry, matLite);
        text.position.z = 0;
        scene.add(text);

        const holeShapes = [];
        for (let i = 0; i < shapes.length; i++) {
          const shape = shapes[i];

          if (shape.holes && shape.holes.length > 0) {
            for (let j = 0; j < shape.holes.length; j++) {
              const hole = shape.holes[j];
              holeShapes.push(hole);
            }
          }
        }

        shapes.push.apply(shapes, holeShapes);
        console.debug('HOIII U BISH');
        const lineText = new THREE.Object3D();

        for (let i = 0; i < shapes.length; i++) {
          const shape = shapes[i];

          const points = shape.getPoints();
          const geometry = new THREE.BufferGeometry().setFromPoints(points);

          geometry.translate(xMid, 0, 0);

          const lineMesh = new THREE.Line(geometry, matDark);
          lineText.add(lineMesh);
          console.error(lineText);
        }

        scene.add(lineText);
        console.error(lineText.id);
        this.render();
      }
    );

    this.cube.rotateX(0.5);

    let i = 27;
    let even = 0;
    let odd = 0;

    while (i != 1) {
      if (i == 123) {
        scene.add(this.cube);
        //this.meshArray.push(this.cube);
      }
      if (i % 2 == 1) {
        i = i * 3 + 1;
        let mesh = this.cube.clone();
        mesh.rotateX(odd * 0.01);
        mesh.translateY(odd + 0.01);
        scene.add(mesh);
        this.meshArray.push(mesh);
        odd++;
      } else if (i % 2 == 0) {
        i /= 2;
        let mesh = this.cube.clone();
        //mesh.rotateX(even * 0.2);
        mesh.rotateZ(even * 0.02);
        mesh.translateY(even);
        scene.add(mesh);
        this.meshArray.push(mesh);
        even++;
      }
    }
    console.log('amount of even: ' + even);
    console.log('amount of odds: ' + odd);

    //Creates the camera
    this.camService.createCamera();

    //lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(1, 1, 1);
    dirLight1.intensity = 1.5;
    scene.add(dirLight1);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.renderer.render(this.scene, this.getCamera());
  }

  animate() {
    requestAnimationFrame(this.animate);

    this.render();

    const controls = new OrbitControls(
      this.getCamera(),
      this.renderer.domElement
    );
    controls.target.set(0, 0, 0);
  }
}
