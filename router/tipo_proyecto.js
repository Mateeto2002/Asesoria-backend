const { Router } = require('express');
const TipoProyecto = require('../models/TipoProyecto');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [

    check('nombre', 'invalid.nombre').not().isEmpty()
    

], async function (req, res) {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let tipoProyecto = new TipoProyecto();

        tipoProyecto.nombre = req.body.nombre;
        tipoProyecto.fecha_creacion = new Date;
        tipoProyecto.fecha_actualizacion = new Date;

        tipoProyecto = await tipoProyecto.save();

        res.send(tipoProyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en la creacion del tipoProyecto')
    }
})

router.get('/', async function (req, res) {

    try {

        const tipoProyecto = await TipoProyecto.find();
        res.send(tipoProyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }


})


router.put('/:tipoProyectoID', [

    check('nombre', 'invalid.nombre').not().isEmpty()
    

], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let tipoProyecto = await TipoProyecto.findById(req.params.tipoProyectoID);
        if (!tipoProyecto) {
            return res.status(400).send('TipoProyecto no existe');
        }

        tipoProyecto.nombre = req.body.nombre;
        tipoProyecto.fecha_actualizacion = new Date;

        tipoProyecto = await tipoProyecto.save();

        res.send(tipoProyecto);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar')
    }

})

router.delete('/:tipoProyectoID', async function (req, res) {

    try {

        let tipoProyecto = await TipoProyecto.findById(req.params.tipoProyectoID);

        tipoProyecto = await tipoProyecto.deleteOne();

        res.send(tipoProyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al eliminar');
    }
})


module.exports = router;