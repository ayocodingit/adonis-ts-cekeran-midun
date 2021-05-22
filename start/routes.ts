/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index')
Route.get('/api/', 'HomeController.index')

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
  Route.post('logout', 'AuthController.logout').middleware('auth')
  Route.get('profile', 'AuthController.profile').middleware('auth')
}).prefix('api/auth')

// Route.group(() => {
//   Route.get('/', 'BookingController.index')
//   Route.post('/', 'BookingController.store')
//   Route.put('/:id', 'BookingController.update')
//   Route.get('/:id', 'BookingController.show')
// }).prefix('api/booking').middleware('auth')

// Route.group(() => {
//   Route.get('material', 'ListController.material')
//   Route.get('document', 'ListController.document')
//   Route.get('branch', 'ListController.branch')
// }).prefix('api/list').middleware('auth')

// Route.group(() => {
//   Route.put('/:id', 'SaleController.update')
// }).prefix('api/sale').middleware('auth')
