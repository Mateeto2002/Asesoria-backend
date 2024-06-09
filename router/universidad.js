const { Router } = require('express');
const Universidad = require('../models/Universidad');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('direccion', 'invalid.direccion').not().isEmpty(),
    check('telefono', 'invalid.telefono').not().isEmpty()

], async function (req, res) {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let universidad = new Universidad();

        universidad.nombre = req.body.nombre;
        universidad.email = req.body.email;
        universidad.fecha_creacion = new Date;
        universidad.fecha_actualizacion = new Date;

        universidad = await universidad.save();

        res.send(universidad);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en la creacion del universidad')
    }
})

router.get('/', async function (req, res) {

    try {

        const universidad = await Universidad.find();
        res.send(universidad);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }


})


router.put('/:universidadID', [

    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('direccion', 'invalid.direccion').not().isEmpty(),
    check('telefono', 'invalid.telefono').not().isEmpty()

], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        let universidad = await Universidad.findById(req.params.universidadID);
        if (!universidad) {
            return res.status(400).send('Universidad no existe');
        }

        universidad.nombre = req.body.nombre;
        universidad.email = req.body.email;
        universidad.fecha_actualizacion = new Date;

        universidad = await universidad.save();

        res.send(universidad);


    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar')
    }

})

router.delete('/:universidadID', async function (req, res) {

    try {

        let universidad = await Universidad.findById(req.params.universidadID);

        universidad = await universidad.deleteOne();

        res.send(universidad);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al eliminar');
    }
})









module.exports = router;