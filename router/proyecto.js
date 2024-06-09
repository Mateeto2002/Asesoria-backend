const { Router } = require('express');
const TipoProyecto = require('../models/Proyecto');
const { validationResult, check } = require('express-validator');
const Proyecto = require('../models/Proyecto');

const router = Router();

router.post('/', [

    check('numero', 'invalid.numero').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('fecha_iniciacion', 'invalid.fecha_iniciacion').not().isEmpty(),
    check('fecha_entrega', 'invalid.fecha_entrega').not().isEmpty(),
    check('valor', 'invalid.valor').not().isEmpty(),
    
    check('cliente', 'invalid.cliente').not().isEmpty(),
    check('tipo_proyecto', 'invalid.tipo_proyecto').not().isEmpty(),
    check('universidad', 'invalid.universidad').not().isEmpty(),
    check('etapa', 'invalid.etapa').not().isEmpty()

], async function (req, res) {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        const numeroExistente = await Proyecto.findOne({ numero: req.body.numero });
        if (numeroExistente) {
            return res.status(400).send('numero de proyecto ya existe');
        }


        let proyecto = new Proyecto();

        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fecha_iniciacion = req.body.fecha_iniciacion;
        proyecto.fecha_entrega = req.body.fecha_entrega;
        proyecto.valor = req.body.valor;
        proyecto.fecha_creacion = new Date;
        proyecto.fecha_actualizacion = new Date;

        proyecto.cliente = req.body.cliente;
        proyecto.etapa = req.body.etapa;
        proyecto.tipo_proyecto = req.body.tipo_proyecto;
        proyecto.universidad = req.body.universidad;



        proyecto = await proyecto.save();

        res.send(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en la creacion del tipoProyecto')
    }
})

router.get('/', async function (req, res) {
    try {
        const proyectos = await Proyecto.find().populate([
            {
                path: 'cliente', select: 'nombre'
            },
            {
                path: 'etapa', select: 'nombre'
            },
            {
                path: 'tipo_proyecto', select: 'nombre'
            },
            {
                path: 'universidad', select: 'nombre'
            }
        ]);
        res.send(proyectos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:proyectoID', [

    check('numero', 'invalid.numero').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('fecha_iniciacion', 'invalid.fecha_iniciacion').not().isEmpty(),
    check('fecha_entrega', 'invalid.fecha_entrega').not().isEmpty(),
    check('valor', 'invalid.valor').not().isEmpty(),
    
    check('cliente', 'invalid.cliente').not().isEmpty(),
    check('tipo_proyecto', 'invalid.tipo_proyecto').not().isEmpty(),
    check('universidad', 'invalid.universidad').not().isEmpty(),
    check('etapa', 'invalid.etapa').not().isEmpty()


], async function (req, res){

    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        const numeroExistente = await Proyecto.findOne({ numero: req.body.numero });
        if (numeroExistente) {
            return res.status(400).send('numero de proyecto ya existe');
        }

        let proyecto = await Proyecto.findById(req.params.proyectoID)
        if(!proyecto){
            return res.status(400).send('Proyecto no existe');
        }

        proyecto.numero = req.body.numero;
        proyecto.titulo = req.body.titulo;
        proyecto.fecha_iniciacion = req.body.fecha_iniciacion;
        proyecto.fecha_entrega = req.body.fecha_entrega;
        proyecto.valor = req.body.valor;
        
        proyecto.fecha_actualizacion = new Date;

        proyecto.cliente = req.body.cliente;
        proyecto.etapa = req.body.etapa;
        proyecto.tipo_proyecto = req.body.tipo_proyecto;
        proyecto.universidad = req.body.universidad;

        proyecto = await proyecto.save();

        res.status(500).send(proyecto);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('error ');
    }
})






module.exports = router;