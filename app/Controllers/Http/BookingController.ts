import Database from '@ioc:Adonis/Lucid/Database';
import Material from 'App/Models/Material'
import Document from 'App/Models/Document'
import Booking from 'App/Models/Booking'
import StoreBookingValidator from 'App/Validators/StoreBookingValidator';
import moment from 'moment'


export default class BookingController {

  public async index ({ response }) {
    const material = await Material.query()
      .whereIn('name', ['Ceker', 'Mie', 'Bihun', 'Sosis Ori'])
    response.json(material);
  }

  public async store ({ request, response, auth }) {
    try {
      await request.validate(StoreBookingValidator)
    } catch (error) {
      return response.status(422).json(error.messages)
    }

    let data: {
      material:string,
      price: number,
      unit: string,
      category: string,
      material_id: bigint,
      qty: number,
      error:string
    }[] = []

    request = request.all()
    for (const item of request.data) {
      data.push(item)
    }
    await this.storeBooking(request, auth)
    return response.json({ message: 'CREATED' })
  }

  private async storeBooking (request, auth) {
    const trx = await Database.transaction()
    try {
      const document = new Document
      document.reference_number = request.reference_number
      document.date = moment().toDate()
      document.branch_id = await auth.user.branch_id
      document.status = 'booking'
      await document.useTransaction(trx).save()
      for (const item of request.data) {
        const material = await Material.findOrFail(item.material_id)
        const booking = new Booking
        booking.material_id = material.id
        booking.name = material.name
        booking.price = material.price
        booking.category = material.category
        booking.qty = item['qty']
        booking.document_id = document.id
        await booking.useTransaction(trx).save()
      }
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  public async show () {
  }

  public async update () {
  }

  public async destroy () {
  }
}
