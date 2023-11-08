const repository = require("../repositories/medicos-repository");
const ValidationContract = require('../util/validator');

exports.getAll = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Erro no servidor, favor contatar o administrador."
        });
    }
};

exports.post = async (req, res, next) => {
    const contract = new ValidationContract();
    contract.hasMinLen(req.body.nome, 4, 'O nome precisa de no mínimo 4 caracteres.');
    contract.hasMaxLen(req.body.nome, 20, 'O nome pode ter no máximo 20 caracteres');

    if (!contract.isValid()) {
        return res.status(400).send({
            message: "Erro ao cadastrar as informações. Favor validar."
        });
    }

    try {
        const createdMedico = await repository.create(req.body);
        res.status(201).send({
            message: "Criado com sucesso",
            id: createdMedico._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Erro no servidor, favor contatar o administrador."
        });
    }
};

exports.update = async (req, res, next) => {
    const id = req.params.id;

    try {
        await repository.update(id, req.body);
        res.status(200).send("Atualizado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Erro no servidor, favor contatar o administrador."
        });
    }
};

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        await repository.delete(id);
        res.status(200).send('Removido com sucesso!');
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Erro no servidor, favor contatar o administrador."
        });
    }
};

exports.getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const data = await repository.getById(id);
        if (data === null) {
            res.status(404).send();
        } else {
            res.status(200).send(data);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Erro no servidor, favor contatar o administrador."
        });
    }
};
