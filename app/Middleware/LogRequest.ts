import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogRequest {
  public async handle({ request, logger, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const childLogger = logger.child({
      method: request.method(),
      url: request.completeUrl(true),
      "user-agent": request.headers()['user-agent']
    });

    childLogger.info('')

    await next()
  }
}
