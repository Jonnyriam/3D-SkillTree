import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { SceneService } from '../shared/scene.service';

import * as THREE from 'three';
import { Scene } from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraService } from '../shared/camera.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.css'],
})
export class EngineComponent implements OnInit, AfterViewInit {
  //Listener for window resizes
  @HostListener('window:resize') onResize() {
    this.sceneService.getCamera().aspect =
      window.innerWidth / window.innerHeight;
    this.sceneService.getCamera().updateProjectionMatrix();
    this.sceneService
      .getRenderer()
      .setSize(window.innerWidth - 280, window.innerHeight - 70.9);
  }

  @ViewChild('canvas', { static: true }) public canvasRef: ElementRef;

  //Skill list
  names = [
    'Skills',
    'Soft Skills',
    'Hard Skills',
    //soft skills
    'Leadership',
    'Flexibility',
    'Negotiation',
    'Results oriented',
    'Decision making',
    'Team work',
    //hard skills
    'Analytical Thinking',
    'Business intelligence',
    'Artifical intelligence',
    'Talent management',
    'Talent development',
    'Mobile app development',
    'Digital marketing',
    'Animation',
    'Redaction',
    'Industrial Design',
    'Corporative Communication',
    'UX Design',
  ];

  constructor(private sceneService: SceneService) {}

  ngAfterViewInit(): void {
    this.sceneService.createScene(this.canvasRef);
    this.sceneService.animate();
  }

  ngOnInit(): void {}

  // createScene() {
  //   console.log("i'm here on the createScene");

  //   const loader = new FontLoader();

  //   //Scene
  //   this.scene = new THREE.Scene();
  //   this.scene.background = new THREE.Color(0xbc85a3);

  //   loader.load(
  //     '../../assets/fonts/helvetiker_regular.typeface.json',
  //     function (font) {
  //       console.log('im here');
  //       const color = 0x006699;

  //       const matDark = new THREE.LineBasicMaterial({
  //         color: color,
  //         side: THREE.DoubleSide,
  //       });

  //       const matLite = new THREE.MeshBasicMaterial({
  //         color: color,
  //         transparent: true,
  //         opacity: 0.4,
  //         side: THREE.DoubleSide,
  //       });

  //       const message = '   Three.js\nSimple text.';

  //       const shapes = font.generateShapes(message, 100);

  //       const geometry = new THREE.ShapeGeometry(shapes);

  //       geometry.computeBoundingBox();

  //       const xMid =
  //         -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

  //       geometry.translate(xMid, 0, 0);

  //       const text = new THREE.Mesh(geometry, matLite);
  //       text.position.z = 0;
  //       this.scene.add(text);
  //     }
  //   );

  //   this.cube.rotateX(0.5);

  //   let i = 27;
  //   let even = 0;
  //   let odd = 0;

  //   while (i != 1) {
  //     if (i == 123) {
  //       this.scene.add(this.cube);
  //       //this.meshArray.push(this.cube);
  //     }
  //     if (i % 2 == 1) {
  //       i = i * 3 + 1;
  //       let mesh = this.cube.clone();
  //       mesh.rotateX(odd * 0.01);
  //       mesh.translateY(odd + 0.01);
  //       this.scene.add(mesh);
  //       this.meshArray.push(mesh);
  //       odd++;
  //     } else if (i % 2 == 0) {
  //       i /= 2;
  //       let mesh = this.cube.clone();
  //       //mesh.rotateX(even * 0.2);
  //       mesh.rotateZ(even * 0.02);
  //       mesh.translateY(even);
  //       this.scene.add(mesh);
  //       this.meshArray.push(mesh);
  //       even++;
  //     }
  //   }
  //   console.log('amount of even: ' + even);
  //   console.log('amount of odds: ' + odd);

  //   //Creates the camera
  //   this.camService.createCamera();

  //   //lights
  //   const dirLight1 = new THREE.DirectionalLight(0xffffff);
  //   dirLight1.position.set(1, 1, 1);
  //   dirLight1.intensity = 1.5;
  //   this.scene.add(dirLight1);

  //   const ambientLight = new THREE.AmbientLight(0xffffff);
  //   this.scene.add(ambientLight);
  // }

  //animating the cube
}
