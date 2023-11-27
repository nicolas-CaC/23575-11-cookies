import express from 'express';
import { resolve } from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'nico',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3000 }
}))

app.use(cookieParser('nikito'))



app.get('/', (req, res) => {

    if (req.session.nombre === 'admin')
        return res.send('Ya te logueaste como admin')

    res.sendFile(resolve() + '/src/views/pages/index.html')
})

app.post('/login', (req, res) => {

    if (req.body.user === 'a' && req.body.pass === 'a') {
        req.session.nombre = 'admin'
        res.send('sos admin')
    }
})

app.get('/ver', (req, res) => {
    console.log(req.session.nombre)

    if (req.sessionID)
        res.send(`Estas logueado con tu id: ${req.sessionID}`)

    else res.sendFile(resolve() + '/src/views/pages/error.html')
})

app.get('/cambiar', (req, res) => {
    req.session.nombre = 'otro'
    console.log(req.sessionID)
    res.send(req.session.nombre)
})



app.get('/cookie/crear', (req, res) => {
    res.cookie('nombreCookie', 123123);
    res.cookie('cookieFirmada', 'Nikazo', { signed: true });
    res.send('Se creó la cookie');
})

app.get('/cookie/leer', (req, res) => {
    const nombreCookie = req.cookies.nombreCookie;
    const cookieFirmada = req.signedCookies.cookieFirmada;
    console.log(nombreCookie);
    console.log(cookieFirmada);
    res.send(`El valor de la cookie nombreCookie es ${nombreCookie} y el de la cookie firmada es ${cookieFirmada}`)
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))