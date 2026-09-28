import { TestEnvironment } from 'jest-environment-jsdom';

/**
 * Custom Jest test environment to forward Web APIs (like fetch) from Node to JSDOM.
 */
export default class CustomTestEnvironment extends TestEnvironment {
  async setup() {
    await super.setup();
    if (typeof this.global.fetch === 'undefined') {
      this.global.fetch = fetch;
      this.global.Request = Request;
      this.global.Response = Response;
      this.global.Headers = Headers;
      this.global.FormData = FormData;
    }
  }
}
