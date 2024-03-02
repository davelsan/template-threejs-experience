import { Clock } from 'three';

import { Store } from '../store';

export class TimeController {
  private _clock: Clock;
  private _current: number;
  private _start: number;

  private _animationHandle: number;

  public constructor() {
    this._clock = new Clock();
    this._start = this._clock.getElapsedTime();
    this._current = this._start;

    this._animationHandle = window.requestAnimationFrame(this.tick);
  }

  public destroy() {
    window.cancelAnimationFrame(this._animationHandle);
  }

  /*  CALLBACKS */

  private tick = () => {
    const newCurrent = this._clock.getElapsedTime();
    const delta = newCurrent - this._current;
    const elapsed = newCurrent - this._start;

    this._current = newCurrent;

    Store.time.update({ afterFrame: false, beforeFrame: true });
    Store.time.update({
      delta,
      elapsed,
      afterFrame: false,
      beforeFrame: false,
    });
    Store.time.update({ beforeFrame: false, afterFrame: true });

    this._animationHandle = window.requestAnimationFrame(this.tick);
  };
}