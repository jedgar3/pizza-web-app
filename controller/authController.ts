import { Request, Response, Application } from "express";
import { Login } from "../model/login"

const authService = require('../service/authService')

module.exports = function(app : Application){
    app.get('/login', async (req: Request, res: Response) => {
        res.render('login')
    })

    app.post('/login', async (req: Request, res: Response) => {
        let data: Login = req.body
        try{
            req.session.token = await authService.login(data)

            res.redirect('/products')
        } catch(e){
            console.error(e);

            res.locals.errormessage = e.message

            res.render('login', req.body)
        }
    })

    app.get('/register', async (req: Request, res: Response) => {
        res.render('register')
    })

    app.post('/register', async (req: Request, res: Response) => {
        let data: Login = req.body
        try{
            req.session.token = await authService.register(data)

            res.redirect('/login')
        } catch(e){
            console.error(e);

            res.locals.errormessage = e.message

            res.render('register', req.body)
        }
    })
}
