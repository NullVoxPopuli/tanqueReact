export class NoCameraError extends Error {
  constructor(...props) {
    super(...props);

    this.name = 'NoCameraError';
  }
}
