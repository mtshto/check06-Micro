const repository = require("../repositories/produto-repository")
const ValidationContract = require('../util/validator')

exports.getAll = async (req, res, next) => {
    const data = await repository.get();

    if (data == null)
        res.status(204).send();

    res.status(200).send(data);
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.nome, 4, 'O nome precisa de no mínimo 4 caracteres.')
    contract.hasMaxLen(req.body.nome, 20, 'O nome pode ter no máximo 20 caracteres.')

    try {
        if (!contract.isValid()) {
            res.status(400).send({
                message: "Erro ao cadastrar as informações. Favor validar"
            });
            return;
        }
        await repository.create(req.body)
        res.status(200).send("Criado com sucesso!")
    } catch (e) {
        res.status(500).send({
            message: "Erro no setvidor, favor contactar o administrador"
        })
    }


}

exports.update = async (req, res, next) => {
    const id = req.params.id; //na rota daremos o apelido deste id

    await repository.update(id, res.body);

    //Enviar email informando que sofreu uma alteração

    res.status(200).send("Atualizado com sucesso!")
};

exports.delete = async (req, res, next) => {
    const id = req.params.id; //na rota daremos o apelido deste id
    await repository.delete(id); //Deletando um produto pelo id
    res.status(200).send('Removido com sucesso!')
}

exports.getById = async (req, res, next) => {

    const id = req.params.id;
    const data = await repository.getById(id);

    if (data == null)
        res.status(404).send()

    res.status(200).send(data);
}