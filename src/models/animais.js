const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    nome: {
        type: String,
    },
    raca: {
        type: String,
    },
    especie: {
        type: String,
    },
    idade: {
        type: String,
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'Tutor', // Referência ao modelo Tutor
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Animal', animalSchema);
