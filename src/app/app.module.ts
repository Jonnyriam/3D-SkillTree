import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EngineComponent } from './engine/engine.component';
import { CameraService } from './shared/camera.service';
import { SceneService } from './shared/scene.service';

@NgModule({
  declarations: [
    AppComponent,
    EngineComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SceneService, CameraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
