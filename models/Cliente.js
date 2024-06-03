const {Schema, model } = require('mongoose');

const ClientesSchema = new Schema({

    nombre: { type: String, require: true },
    email: { type: String, require: true},
    fecha_creacion: { type: Date, require: true},
    fecha_actualizacion: { type: Date, require: true}
})

module.exports = model('Cliente', ClientesSchema);