const { Router } = require('express');
const Cliente = require('../models/Cliente');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').not().isEmpty()

], async function(req, res){

    try {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({ mensaje: errors.array() })
        }

        let cliente = new Cliente();

        cliente.nombre = req.body.nombre;
        cliente.email = req.body.email;
        cliente.fecha_creacion = new Date;
        cliente.fecha_actualizacion = new Date;

        cliente = await cliente.save();

        res.send(cliente);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en la creacion del cliente')
    }
})

module.exports = router;