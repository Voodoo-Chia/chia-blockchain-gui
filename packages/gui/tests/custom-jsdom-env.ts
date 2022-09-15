import Environment from 'jest-environment-jsdom';

export default class CustomJSDOMEnvironment extends Environment {
  async setup() {
    await super.setup();
    if (this.global.TextEncoder === undefined) {
      const { TextEncoder } = await import('util');
      this.global.TextEncoder = TextEncoder;
    }
    if (this.global.TextDecoder === undefined) {
      const { TextDecoder } = await import('util');
      this.global.TextDecoder = TextDecoder as any;
    }
  }
}
