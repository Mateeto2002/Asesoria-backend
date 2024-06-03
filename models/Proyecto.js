const { Schema, model } = require('mongoose');

const ProyectosSchema = new Schema({

    numero: {type: String, require: true, unique: true},
    titulo: { type: String, require: true },
    fecha_iniciacion: { type: Date, require: true}, 
    fecha_creacion: { type: Date, require: true},
    valor: { type: String, require: true},
    fecha_creacion: { type: Date, require: true}, 
    fecha_actualizacion: { type: Date, require: true},

    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', require: true },
    tipo_proyecto: { type: Schema.Types.ObjectId, ref: 'Tipo_Proyecto', require: true },
    universidad: { type: Schema.Types.ObjectId, ref: 'Universidad', require: true },
    etapa: { type: Schema.Types.ObjectId, ref: 'Etapa', require: true }

})

module.exports = model('Proyecto', ProyectosSchema);