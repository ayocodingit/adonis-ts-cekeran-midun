import User from 'App/Models/User'
import Branch from 'App/Models/Branch'

export default class AuthController {

  async login({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.use('api').attempt(email, password)
    response.json(token)
  }

  async register({ request, response }) {
    const user = await User.create(request.all())
    response.json(user)
  }

  async logout({ response, auth }) {
    await auth.use('api').revoke()
    response.json({ message: 'LOGOUT ...' })
  }

  async profile({ response, auth }) {
    try {
      const user = await auth.user
      user.branch = await Branch.find(user.branch_id)
      return user
    } catch (error) {
      response.json({ error: 'Missing or invalid jwt token' })
    }
  }
}
