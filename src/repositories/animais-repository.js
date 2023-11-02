const mongoose = require('mongoose');
const Animal = mongoose.model('Animal');

exports.get = async () => {
    const result = await Animal.find({
        ativo: true
    });
    return result;
}

exports.create = async (data) => {
    let animal = new Animal(data);
    await animal.save();
}

exports.delete = async (id) => {
    await Animal.findByIdAndUpdate(id, {
        $set: {
            ativo: false
        }
    });
}

exports.getById = async (id) => {
    const result = await Animal.findOne({
        _id: id
    }, "_id nome raca especie idade tutor ativo");
    return result;
}

exports.update = async (id, data) => {
    await Animal.findByIdAndUpdate(id, {
        $set: {
            nome: data.nome,
            raca: data.raca,
            especie: data.especie,
            idade: data.idade,
            tutor: data.tutor,
            ativo: data.ativo
        }
    });
}
