import { StoreInstance } from '@helpers/classes/StoreInstance';
import { WorldSettings, worldSettings } from '@settings/world';

export interface WorldState extends WorldSettings {
  /**
   * The WebGL views that need to be loaded.
   */
  viewsToLoad: string[];
  /**
   * The WebGL views that have finished loading.
   */
  viewsLoaded: string[];
  /**
   * Ratio [0, 1] of viewsLoaded over viewsToLoad.
   */
  viewsProgress: number;
}

export class WorldStore extends StoreInstance<WorldState> {
  constructor() {
    super('WorldStore', {
      viewsToLoad: [],
      viewsLoaded: [],
      viewsProgress: 0,
      ...worldSettings,
    });
  }

  public setState(state: Partial<WorldState>) {
    this._store.setState(state);
  }

  /* ACTIONS */

  public addViewsToLoad(name: string) {
    this._store.setState((state) => ({
      viewsToLoad: [...state.viewsToLoad, name],
    }));
  }

  /**
   * Set a WebGL view as loaded.
   * @param name namespace of the loaded view
   */
  public addViewLoaded(name: string) {
    this._store.setState((state) => {
      const viewsLoaded = [...state.viewsLoaded, name];
      const viewsProgress = state.viewsToLoad.length / viewsLoaded.length;
      return {
        viewsLoaded,
        viewsProgress,
      };
    });
  }

  public onLoad(callback: () => void) {
    const unsub = this.subscribe(
      this.namespace,
      (state) => state.viewsProgress,
      (viewsProgress) => {
        if (viewsProgress === 1) {
          unsub();
          callback();
        }
      }
    );
  }

  public async onLoadAsync() {
    return new Promise<void>((resolve) => {
      this.onLoad(resolve);
    });
  }
}
