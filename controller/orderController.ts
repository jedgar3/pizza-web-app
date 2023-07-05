import { Request, Response, Application } from "express";
import { Order } from "../model/order"

const orderService = require('../service/orderService')
const customerService = require('../service/customerService')

module.exports = function(app: Application){

    app.get('/orders', async (req: Request, res: Response) => {
        let data: Order[];

        try{
            data = await orderService.getOrders()
        } catch (e){
            console.error(e);
        }

        res.render('list-orders', {orders: data})
    })

    app.get('/orders/:id', async (req: Request, res: Response) => {
        let data: Order

        try{
            data = await orderService.getOrderById(req.params.id)
        }catch(e){
            console.error(e)
        }

        res.render('view-order', {order: data})
    })

    app.get('/add-order', async(req: Request, res: Response) => {
        let data: String[]

        try{
            data = await customerService.getAllCustomerNames()
        }catch(e){
            console.error(e)
        }

        res.render('add-order', {customerNames: data})
    })

    app.post('/add-order', async(req: Request, res: Response) => {
        let oldData: Order = req.body
        oldData.customerID = customerService.getCustomerIDFromName(req.body.name)
        delete req.body.name
        req.body = {customerID: oldData.customerID, orderDate: oldData.orderDate}

        let data: Order = req.body
        let id: Number
        //let data.customerID = customerService.getCustomerIDFromName(name)

        try{
            id = await orderService.createOrder(data)

            res.redirect('/orders/' + id)
        }catch(e){
            console.error(e)

            res.locals.errormessage = e.message

            res.render('add-order', req.body)
        }
    })
}