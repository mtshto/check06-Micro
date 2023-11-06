const mongoose = require('mongoose');
const Tutor = mongoose.model('Tutor');

exports.get = async () => {
    const result = await Tutor.find({
        ativo: true
    });
    return result;
}

exports.create = async (data) => {
    let tutor = new Tutor(data);
    await tutor.save();
}

exports.delete = async (id) => {
    await Tutor.findByIdAndUpdate(id, {
        $set: {
            ativo: false
        }
    });
}

exports.getById = async (id) => {
    const result = await Tutor.findOne({
        _id: id
    });
    return result;
}

exports.update = async (id, data) => {
    await Tutor.findByIdAndUpdate(id, {
        $set: {
            nome: data.nome,
            telefone: data.telefone,
            celular: data.celular,
            endereco: data.endereco,
            ativo: data.ativo
        }
    });
}
