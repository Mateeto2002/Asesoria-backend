const { Schema, model} = require('mongoose')

const UniversidadesSchema = new Schema({

    nombre:  { type: String, require: true},
    direccion: { type: String, require: true},
    telefono: { type: Number, require: true},
    fecha_creacion: { type: Date, require: true}, 
    fecha_actualizacion: { type: Date, require: true}
    
})

module.exports = model('Universidad', UniversidadesSchema);