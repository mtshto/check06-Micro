const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: [true, "Nome é obrigatório"]
    },
    crv: {
        type: Number,
        required: [true, "CRV é obrigatório"]
    },
    especialidades: {
        type: String,
    },
    diasSemana: {
        type: String,
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Medicos', schema);
