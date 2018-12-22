export class Provider {
  constructor() {
    if (this === Provider) {
      throw new TypeError(
        'Abstract class Provider cannot be instantiated directly',
      );
    }
  }
}
