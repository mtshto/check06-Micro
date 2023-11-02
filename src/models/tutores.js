const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
    nome: {
        type: String,
        required: [true, "Nome é obrigatório"]
    },
    telefone: {
        type: String,
        required: [true, "Telefone é obrigatório"]
    },
    celular: {
        type: String,
        required: [true, "Celular é obrigatório"]
    },
    endereco: {
        logradouro: {
            type: String,
        },
        numero: {
            type: String,
        },
        complemento: String,
        bairro: {
            type: String,
        },
        cidade: {
            type: String,
        },
        estado: {
            type: String,
        }
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Tutor', tutorSchema);
