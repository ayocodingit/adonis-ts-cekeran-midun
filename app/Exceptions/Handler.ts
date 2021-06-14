import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Sentry from '@ioc:Adonis/Addons/Sentry'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {

    /**
     * Self handle the validation exception
     */

    const childLogger = this.logger.child({
      method: ctx.request.method(),
      url: ctx.request.completeUrl(true),
      status: ctx.response.getStatus(),
      "user-agent": ctx.request.headers()['user-agent']
    });

    childLogger.info('')

    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).json(error.messages)
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx)
  }


  public async report(error: any) {
    if (!this.shouldReport(error)) {
      return
    }

    Sentry.captureException(error.message)
  }
}
