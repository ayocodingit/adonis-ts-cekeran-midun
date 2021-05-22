import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  public async handle ({auth}: HttpContextContract, next: () => Promise<void>) {
    await auth.check()
    await next()
  }
}
