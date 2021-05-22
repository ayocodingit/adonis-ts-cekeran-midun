export default class HomeController {

  public async index({ request }) {
    return {
      app: 'Cekeran Midun Rest Api',
      host: request.hostname()
    }
  }
}
