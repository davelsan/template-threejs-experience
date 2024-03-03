import { Store } from '@state/store';
import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three-stdlib';

export class CameraController {
  public camera: PerspectiveCamera;
  public controls: OrbitControls;
  public namespace = 'CameraController';

  public constructor(aspectRatio: number, canvas: HTMLElement) {
    // Camera
    this.camera = new PerspectiveCamera(40, aspectRatio, 0.5, 40);
    this.camera.position.set(3, 3, 5);

    // Controls
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enabled = true;

    this.setupSubscriptions();
  }

  public destroy() {
    Store.stage.unsubscribe(this.namespace);
    Store.time.unsubscribe(this.namespace);
    this.controls.dispose();
  }

  /* SETUP */

  private setupSubscriptions() {
    Store.stage.subscribe(
      this.namespace,
      (state) => state.aspectRatio,
      this.resize
    );
    Store.time.subscribe(this.namespace, (state) => state.elapsed, this.update);
  }

  /* CALLBACKS */

  private resize = (aspectRatio: number) => {
    this.camera.aspect = aspectRatio;
    this.camera.updateProjectionMatrix();
  };

  private update = () => {
    this.controls.enabled && this.controls.update();
  };
}
