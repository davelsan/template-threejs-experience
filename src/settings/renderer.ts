import { BindingConfig } from '@controllers/Debug';
import { Color } from 'three';

export type RenderSettings = typeof renderSettings;
export type RenderConfig = BindingConfig<RenderSettings>;

const { r, g, b } = new Color(0x000011);

export const renderSettings = {
  anisotropy: 1,
  clearColor: { r, g, b, a: 1.0 },
};

export const renderConfig: RenderConfig[] = [
  {
    folder: {
      title: 'Renderer',
      expanded: false,
    },
    bindings: [
      {
        key: 'clearColor',
        options: {
          label: 'Clear Color',
          color: { type: 'float' },
        },
      },
    ],
  },
];
