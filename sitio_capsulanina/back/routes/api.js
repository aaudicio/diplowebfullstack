var express = require('express');
var router = express.Router();
var serviciosModel = require('./../models/serviciosModel');
var cloudinary = require ('cloudinary').v2;
var nodemailer = require ('nodemailer');

router.get('/servicios', async function (req, res, next) {
    let servicios = await serviciosModel.getServicios();

    servicios = servicios.map(servicios => {
        if (servicios.img_id) {
            const imagen = cloudinary.url(servicios.img_id , {
                //width : 960,
                //height: 200,
                //crop: 'fill'
            });
            return {
                ...servicios,
                imagen
            } 
        } else {
            return {
                ...servicios,
                imagen: ''
            }
        }
    });
    res.json(servicios);
});

router.post('/contacto', async (req, res) => {
    const mail = {
        to: 'audicioaraceli@gmail.com',
        subject: 'Contacto web',
        html: `${req.body.nombre} se contactó a traves de la web y quiere mas información a este correo: ${req.body.email} <br> Además, hizo el siguiente comentario: ${req.body.mensaje} <br> Su tel es: ${req.body.telefono}`
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail)

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    });
});

module.exports = router;