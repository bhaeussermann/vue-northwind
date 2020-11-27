import { createDecorator } from 'vue-class-component';

export function Dependencies(overridingKey?: string) {
  return createDecorator((componentOptions, key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const componentOptionsRef: any = componentOptions;
    if (typeof componentOptionsRef.dependencies === 'undefined') {
      componentOptionsRef.dependencies = {};
    }
    if (!Array.isArray(componentOptionsRef.dependencies)) {
      componentOptionsRef.dependencies[key] = overridingKey ?? key;
    }
  });
}
