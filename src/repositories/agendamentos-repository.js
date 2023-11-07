const mongoose = require('mongoose');
const Agendamento = mongoose.model('Agendamento');
const Medico = mongoose.model('Medicos'); // Certifique-se de importar o modelo dos médicos

exports.get = async () => {
    const result = await Agendamento.find({
        ativo: true
    });
    return result;
}

exports.create = async (data) => {
    try {
        // Busque o médico para obter a especialidade
        const medico = await Medico.findOne({ _id: data.medico });
        if (!medico) {
            throw new Error('Médico não encontrado');
        }

        // Verifique se o médico tem uma especialidade definida
        if (medico.especialidades && medico.especialidades.length > 0) {
            // Assuma que a primeira especialidade define a duração
            const duracao = medico.especialidades[0].duracaoPadrao;

            // Crie o agendamento com a duração definida
            const agendamento = new Agendamento({ ...data, duracao });
            const result = await agendamento.save();
            return result; // Retorne o resultado da criação (agendamento)
        } else {
            throw new Error('Médico não possui especialidades definidas');
        }
    } catch (error) {
        throw error;
    }
}

exports.delete = async (id) => {
    await Agendamento.findByIdAndUpdate(id, {
        $set: {
            ativo: false
        }
    });
}

exports.getById = async (id) => {
    const result = await Agendamento.findOne({
        _id: id
    });
    return result;
}

exports.update = async (id, data) => {
    await Agendamento.findByIdAndUpdate(id, {
        $set: {
            medico: data.medico,
            tutor: data.tutor,
            animal: data.animal,
            data: data.data,
            horario: data.horario,
            ativo: data.ativo
        }
    });
}
