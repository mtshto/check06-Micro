const repository = require("../repositories/agendamentos-repository");
const ValidationContract = require('../util/validator');
const Medico = require("../models/medicos");

exports.getAll = async (req, res, next) => {
    const agendamentos = await repository.get();

    if (!agendamentos || agendamentos.length === 0) {
        res.status(204).send();
        return;
    }

    const agendamentosComDuracaoEspecialidade = await Promise.all(agendamentos.map(async (agendamento) => {
        const medico = await Medico.findById(agendamento.medico);
        if (medico && medico.especialidades && medico.especialidades.length > 0) {
            agendamento.duracao = medico.especialidades[0].duracaoPadrao;
            agendamento.especialidade = medico.especialidades[0].nome; 
        } else {
            agendamento.duracao = 0; 
            agendamento.especialidade = "Especialidade não definida"; 
        }
        return agendamento;
    }));

    res.status(200).send(agendamentosComDuracaoEspecialidade);
}

exports.post = async (req, res, next) => {
    try {
        const contract = new ValidationContract();

        if (!contract.isValid()) {
            return res.status(400).send({
                message: "Erro ao cadastrar as informações. Favor validar."
            });
        }

        const medicoId = req.body.medico;
        const dataAgendamento = req.body.data; 
        const horarioAgendamento = req.body.horario; 

        const medico = await Medico.findById(medicoId);

        if (!medico) {
            return res.status(400).send({
                message: "Médico não encontrado"
            });
        }

        const horarioInicioMedico = medico.horarioInicio;
        const horarioFimMedico = medico.horarioFim;

        if (horarioAgendamento < horarioInicioMedico || horarioAgendamento > horarioFimMedico) {
            return res.status(409).send({
                message: "Conflito de agendamento. O horário do agendamento está fora do horário de atendimento do médico."
            });
        }

        const dataAgendamentoFormatada = new Date(dataAgendamento + 'T' + horarioAgendamento + ':00');

        const agendamentoExistente = await repository.getByMedicoDataHorario(medicoId, dataAgendamento, horarioAgendamento);

        if (agendamentoExistente) {
            return res.status(409).send({
                message: "Conflito de agendamento. Já existe um agendamento na mesma data e horário."
            });
        }

        const nomeEspecialidade = medico.especialidades[0].nome;

        const agendamentoData = {
            medico: medicoId,
            tutor: req.body.tutor,
            animal: req.body.animal,
            data: dataAgendamento,
            horario: horarioAgendamento,
            duracao: medico.especialidades[0].duracaoPadrao,
            ativo: req.body.ativo
        };

        const agendamento = await repository.create(agendamentoData);
        const nomeMedico = medico.nome;

        return res.status(200).send({
            message: "Criado com sucesso",
            id: agendamento._id,
            nomeMedico: nomeMedico,
            duracao: medico.especialidades[0].duracaoPadrao,
            especialidade: nomeEspecialidade
        });
    } catch (e) {
        console.error('Erro inesperado:', e);
        return res.status(500).send({
            message: "Erro no servidor, favor contatar o administrador"
        });
    }
}

function somarHorario(horario, minutos) {
    const [horas, minutosOriginais] = horario.split(':').map(Number);
    const minutosTotais = horas * 60 + minutosOriginais + minutos;
    const horasFinais = Math.floor(minutosTotais / 60);
    const minutosFinais = minutosTotais % 60;
    return `${String(horasFinais).padStart(2, '0')}:${String(minutosFinais).padStart(2, '0')}`;
}

exports.update = async (req, res, next) => {
    const id = req.params.id;

    await repository.update(id, req.body);

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
