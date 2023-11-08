const repository = require("../repositories/agendamentos-repository");
const ValidationContract = require('../util/validator');
const Medico = require("../models/medicos");

exports.getAll = async (req, res, next) => {
    const agendamentos = await repository.get();

    if (!agendamentos || agendamentos.length === 0) {
        res.status(204).send();
        return;
    }

    // Mapeie os agendamentos para incluir a duração da consulta e o nome da especialidade
    const agendamentosComDuracaoEspecialidade = await Promise.all(agendamentos.map(async (agendamento) => {
        // Obtenha o médico associado ao agendamento
        const medico = await Medico.findById(agendamento.medico);
        if (medico && medico.especialidades && medico.especialidades.length > 0) {
            // Use a duração da primeira especialidade do médico
            agendamento.duracao = medico.especialidades[0].duracaoPadrao;
            agendamento.especialidade = medico.especialidades[0].nome; // Inclui o nome da especialidade
        } else {
            agendamento.duracao = 0; // Ou outro valor padrão, se necessário
            agendamento.especialidade = "Especialidade não definida"; // Ou outra mensagem
        }
        return agendamento;
    }));

    res.status(200).send(agendamentosComDuracaoEspecialidade);
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();

    try {
        if (!contract.isValid()) {
            res.status(400).send({
                message: "Erro ao cadastrar as informações. Favor validar"
            });
            return;
        }

        const medicoId = req.body.medico;
        const dataAgendamento = req.body.data; // Data como string
        const horarioAgendamento = req.body.horario; // Horário como string

        // Verifique se já existe um agendamento para o mesmo médico na mesma data e horário
        const agendamentoExistente = await repository.getByMedicoDataHorario(
            medicoId,
            dataAgendamento,
            horarioAgendamento
        );

        if (agendamentoExistente) {
            res.status(409).send({
                message: "Conflito de agendamento. Já existe um agendamento para o mesmo médico na mesma data e horário."
            });
            return;
        }

        const medico = await Medico.findById(medicoId);
        if (!medico) {
            res.status(400).send({
                message: "Médico não encontrado"
            });
            return;
        }

        if (medico.especialidades && medico.especialidades.length > 0) {
            // Use a duração da primeira especialidade do médico
            const duracaoConsulta = medico.especialidades[0].duracaoPadrao;
            const nomeEspecialidade = medico.especialidades[0].nome;

            const agendamentoData = {
                medico: medicoId,
                tutor: req.body.tutor,
                animal: req.body.animal,
                data: dataAgendamento,
                horario: horarioAgendamento,
                duracao: duracaoConsulta,
                ativo: req.body.ativo
            };

            const agendamento = await repository.create(agendamentoData);
            const nomeMedico = medico.nome;

            res.status(200).send({
                message: "Criado com sucesso",
                id: agendamento._id,
                nomeMedico: nomeMedico,
                duracao: duracaoConsulta,
                especialidade: nomeEspecialidade
            });
        } else {
            res.status(400).send({
                message: "Médico não possui especialidades definidas"
            });
        }
    } catch (e) {
        console.error('Erro inesperado:', e);
        res.status(500).send({
            message: "Erro no servidor, favor contatar o administrador"
        });
    }
}


exports.update = async (req, res, next) => {
    const id = req.params.id;

    await repository.update(id, req.body);

    // Adicione aqui a lógica para enviar um email informando a alteração

    res.status(200).send("Atualizado com sucesso!");
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    await repository.delete(id);
    res.status(200).send('Removido com sucesso!');
}

exports.getById = async (req, res, next) => {
    const id = req.params.id;
    const data = await repository.getById(id);

    if (data == null)
        res.status(404).send();

    res.status(200).send(data);
}