const { Router } = require('express');
const Cliente = require('../models/Etapa');
const { validationResult, check } = require('express-validator');
const Etapa = require('../models/Etapa');

const router =Router();


router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
], async function (req, res) {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let etapa = new Etapa();

        etapa.nombre = req.body.nombre;
        etapa.fecha_creacion = new Date;
        etapa.fecha_actualizacion = new Date;

        etapa =  await etapa.save();

        res.send(etapa);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');

    }


})

router.put('/:etapaID', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let etapa = await Etapa.findById(req.params.etapaID);
        if (!etapa) {
            return res.status(400).send('Etapa no existe');
        }

        etapa.nombre = req.body.nombre;
        etapa.fecha_actualizacion = new Date;

        etapa = await etapa.save();

        res.send(etapa);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar')
    }

})

router.delete('/:etapaID', async function (req, res) {

    try {

        let etapa = await Etapa.findById(req.params.etapaID);

        etapa = await etapa.deleteOne();

        res.send(etapa);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al eliminar');
    }
})

router.get('/', async function (req, res) {

    try {

        const etapa = await Etapa.find();
        res.send(etapa);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }


})

module.exports = router;


