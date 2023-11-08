const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agendamentoSchema = new Schema({
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medicos',
        required: true,
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'Tutores',
        required: true,
    },
    animal: {
        type: Schema.Types.ObjectId,
        ref: 'Animais',
        required: true,
    },
    data: {
        type: String, // Data como string (sem horário)
        required: true,
    },
    horario: {
        type: String,
        required: true,
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true,
    },
});

module.exports = mongoose.model('Agendamento', agendamentoSchema);
