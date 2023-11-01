# Sistema de Agendamento de Consultas para Pets

Este projeto, nomeado "check06-Micro," tem como data de entrega o dia 08/11. 

## Visão Geral

O objetivo deste sistema é criar um eficiente agendamento de consultas para animais de estimação (pets). Ele permitirá o cadastro de médicos veterinários, tutores de animais e informações detalhadas sobre os animais. O agendamento de consultas será baseado nas especialidades dos médicos e em sua disponibilidade de horários.

## Cadastro de Médicos Veterinários

Os médicos veterinários deverão ser cadastrados com as seguintes informações:
- **Nome**: Nome completo do médico veterinário.
- **CRV**: Número de registro no Conselho Regional de Medicina Veterinária.
- **Especialidades**: Seleção múltipla das especialidades nas quais o médico atua.
- **Dias de Disponibilidade na Semana**: Seleção múltipla dos dias em que o médico está disponível para consultas.

Exemplo: O Dr. Rafael atende as especialidades de cardiologia e trabalha na clínica nas segundas, quartas e sextas, das 8:00 às 14:00. Aos sábados, ele atende das 13:00 às 20:00. A Dra. Amanda é clínica geral e especialista em ortodontia felina, atendendo de segunda a sexta, das 09:00 às 18:00.

## Cadastro de Tutores

Os tutores de animais deverão ser cadastrados com as seguintes informações:
- **Nome**: Nome completo do tutor.
- **Telefone**: Número de telefone do tutor.
- **Celular**: Número de celular do tutor.
- **Endereço**: O endereço do tutor, incluindo logradouro, número, complemento, bairro, cidade e estado.

## Cadastro de Animais

As informações sobre os animais deverão incluir:
- **Nome**: Nome do animal de estimação.
- **Raça**: Raça do animal.
- **Espécie**: Espécie do animal.
- **Idade**: Idade do animal.
- **Tutor**: Vinculação do animal ao seu tutor.

## Agendamento de Consultas

Para realizar o agendamento de consultas, os seguintes passos devem ser seguidos:
1. Cadastro do pet (animal).
2. Seleção do tutor do pet.
3. Escolha do médico veterinário com base na especialidade necessária.
4. Escolha do horário disponível do médico.

A duração padrão da consulta deve ser informada no cadastro de especialidade do médico. Por exemplo, a clínica geral pode ter uma consulta de 30 minutos, enquanto a cardiologia pode ter uma consulta de 45 minutos.

Que os jogos comecem! Inicie o desenvolvimento do projeto seguindo os passos mencionados e criando as camadas necessárias no Spring Initializer. Certifique-se de mapear as tabelas e seus relacionamentos, implementar os endpoints nos controllers e criar as view models para o frontend. Boa sorte no desenvolvimento deste sistema de agendamento de consultas para pets na Cats and Dogs!
