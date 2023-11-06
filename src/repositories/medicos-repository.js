const mongoose = require('mongoose');
const Medico = mongoose.model('Medicos');

exports.get = async () => {
    const result = await Medico.find({ ativo: true });
    return result;
}

exports.create = async (data) => {
    console.log(data);
    let medico = new Medico(data);
    await medico.save();
}

exports.delete = async (id) => {
    await Medico.findByIdAndUpdate(id, {
        $set: {
            ativo: false
        }
    });
}

exports.getById = async (id) => {
    const result = await Medico.findOne({ _id: id });
    return result;
}

exports.update = async (id, data) => {
    await Medico.findByIdAndUpdate(id, {
        $set: {
            nome: data.nome,
            crv: data.crv,
            especialidades: data.especialidades,
            diasSemana: data.diasSemana,
            ativo: data.ativo
        }
    });
}
