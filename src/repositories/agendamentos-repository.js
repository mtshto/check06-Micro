const mongoose = require('mongoose');
const Agendamento = mongoose.model('Agendamento');
const Medico = mongoose.model('Medicos'); 
exports.get = async () => {
    const result = await Agendamento.find({
        ativo: true
    });
    return result;
}

exports.create = async (data) => {
    try {
        const medico = await Medico.findOne({ _id: data.medico });
        if (!medico) {
            throw new Error('Médico não encontrado');
        }

        if (medico.especialidades && medico.especialidades.length > 0) {
            const duracao = medico.especialidades[0].duracaoPadrao;

            const dataAgendamento = new Date(data.data + 'T' + data.horario + ':00');
            const agendamentoExistente = await this.getByMedicoDataHorario(data.medico, dataAgendamento);

            if (agendamentoExistente) {
                throw new Error('Conflito de agendamento. Já existe um agendamento na mesma data e horário.');
            }

            const agendamento = new Agendamento({ ...data, duracao });
            const result = await agendamento.save();
            return result; 
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

exports.getByMedicoData = async (medicoId, dataAgendamento) => {
    return Agendamento.find({
        medico: medicoId,
        data: dataAgendamento
    });
}

exports.getByMedicoDataHorario = async (medicoId, dataAgendamento, horarioAgendamento) => {
    return Agendamento.findOne({
        medico: medicoId,
        data: dataAgendamento,
        horario: horarioAgendamento
    });
}