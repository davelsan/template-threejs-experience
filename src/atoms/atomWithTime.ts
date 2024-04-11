import gsap from 'gsap';
import { atom, ExtractAtomValue } from 'jotai';

export type TimeAtom = ReturnType<typeof atomWithTime>;
export type TimeAtomValue = ExtractAtomValue<TimeAtom>;

export function atomWithTime() {
  const timeAtom = atom({
    delta: 16,
    elapsed: 0,
    fps: 0,
  });

  timeAtom.onMount = (set) => {
    gsap.ticker.add(
      (time: number, delta: number, _frame: number, _elapsed: number) => {
        const fps = (1 / delta) * 1000;
        set({ delta, elapsed: time, fps });
      }
    );
  };

  return timeAtom;
}
