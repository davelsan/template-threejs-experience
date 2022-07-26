import {
  DebugController,
  RenderController,
  ResourceController,
  StageController,
  TimeController,
  WorldController,
} from '../controllers';
import { Subscription } from '../types/store';
import { defaultDict } from '../utils/default-dict';

export class Store {
  public static get debug() {
    return DebugController.state;
  }

  public static get renderer() {
    return RenderController.state;
  }

  public static get resources() {
    return ResourceController.state;
  }

  public static get stage() {
    return StageController.state;
  }

  public static get time() {
    return TimeController.state;
  }

  public static get world() {
    return WorldController.state;
  }

  public static subscriptions = defaultDict<Subscription[]>(() => []);
}
