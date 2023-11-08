const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const especialidadeSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    duracaoPadrao: {
        type: Number,
        required: true,
    },
});

const medicoSchema = new Schema({
    nome: {
        type: String,
        required: [true, "Nome é obrigatório"],
    },
    crv: {
        type: Number,
        required: [true, "CRV é obrigatório"],
    },
    especialidades: [especialidadeSchema], 
    diasSemana: {
        type: String,
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true,
    },
    horarioInicio: {
        type: String,
        required: true,
    },
    horarioFim: {
        type: String, 
        required: true,
    },
});

module.exports = mongoose.model('Medicos', medicoSchema);
