const mongoose = require('mongoose');
const Medico = mongoose.model('Medicos');

exports.get = async () => {
    return await Medico.find({ ativo: true });
};

exports.create = async (data) => {
    const medico = new Medico(data);
    return await medico.save();
};

exports.delete = async (id) => {
    await Medico.findByIdAndUpdate(id, {
        $set: {
            ativo: false
        }
    });
};

exports.getById = async (id) => {
    return await Medico.findById(id);
};

exports.update = async (id, data) => {
    await Medico.findByIdAndUpdate(id, {
        $set: {
            nome: data.nome,
            crv: data.crv,
            especialidades: data.especialidades,
            diasSemana: data.diasSemana,
            ativo: data.ativo,
            horarioInicio: data.horarioInicio,
            horarioFim: data.horarioFim
        }
    });
};
