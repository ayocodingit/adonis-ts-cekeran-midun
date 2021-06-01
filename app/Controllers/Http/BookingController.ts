import Database from '@ioc:Adonis/Lucid/Database';
import Material from 'App/Models/Material'
import Document from 'App/Models/Document'
import Booking from 'App/Models/Booking'
import StoreBookingValidator from 'App/Validators/StoreBookingValidator';
import moment from 'moment'
import UpdateBookingValidator from 'App/Validators/UpdateBookingValidator';


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
      document.branchId = await auth.user.branch_id
      document.status = 'booking'
      await document.useTransaction(trx).save()
      for (const item of request.data) {
        const material = await Material.findOrFail(item.material_id)
        const booking = new Booking
        booking.materialId = material.id
        booking.name = material.name
        booking.price = material.price
        booking.category = material.category
        booking.qty = item['qty']
        booking.documentId = document.id
        await booking.useTransaction(trx).save()
      }
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  public async show ({ params, response }) {
    const document = await Document.query()
                                  .preload('branch')
                                  .preload('booking', (bookingsQuery) => {
                                        bookingsQuery.preload('material')
                                  })
                                  .where('id', params.id)
                                  .firstOrFail()
    response.json(document)
  }

  public async update({ params, request, response }) {
    try {
      await request.validate(UpdateBookingValidator)
    } catch (error) {
      return response.status(422).json(error.messages)
    }
    const trx = await Database.transaction()
    try {
      let spending:number = 0
      for (const item of (request.all()).data) {
        const booking = await Booking.findOrFail(item['id'])
        booking.qty = item['qty']
        await booking.useTransaction(trx).save()
        spending = spending + booking.qty * booking.price
      }
      const document = await Document.findOrFail(params.id)
      document.status = 'received'
      document.spending = BigInt(spending)
      await document.useTransaction(trx).save()
      await trx.commit()
      return response.json({ message: 'UPDATED' })
    } catch (error) {
      await trx.rollback()
      throw error
    }

  }

  public async destroy ({ params, response }) {
    const booking = await Booking.findOrFail(params.id)
    await booking.delete()
    response.json({message: 'DELETED'})
  }
}
