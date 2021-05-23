import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreBookingValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	/*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
  public schema = schema.create({
    reference_number: schema.string({}, [
      rules.unique({ table: 'documents', column: 'reference_number' })
    ]),
    description: schema.string({}, [
      rules.maxLength(255)
    ]),
    data: schema
      .array([
        rules.distinct('material_id')
      ])
      .members(
        schema.object().members({
          material: schema.string(),
          price: schema.number(),
          unit: schema.string(),
          category: schema.string(),
          material_id: schema.number([
            rules.exists({ table: 'materials', column: 'id' })
          ]),
          qty: schema.number([
            rules.range(1, 100)
          ]),
        })
      )
  })

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
  public messages = {}
}
