import { Request, Response } from "express"
import { Product } from "./model/product";

const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const session = require('express-session')

const app = express();

var appView = path.join(__dirname, '/views/');

var nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
}

nunjucks.configure(appView, nunjucksConfig);

app.set('view engine', 'html');

app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'NOT HARDCODED SECRET', cookie: { maxAge: 60000}}));

declare module "express-session" {
    interface SessionData{
        product: Product;
        token: String;
    }
}

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.get('/', async (req: Request, res: Response) => {
    res.render('pizza', { title: 'New Pizza Time' })
})

require('./controller/authController')(app);

const authMiddleware = require('./middleware/auth')
app.use(authMiddleware);

require('./controller/productController')(app);
require('./controller/orderController')(app);
