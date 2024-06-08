







//Mostrar los datos- GET
router.get('/', async function (req, res){

    const etapa = await Etapa.find();
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }


} )