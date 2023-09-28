<?php 

// Usuário
const DETALHAR_USUARIO_ENDPOINT = "DetalharUsuario";
const ALTERAR_USUARIO_ENDPOINT = "AlterarUsuario";
const CHECAR_SENHA_ENDPOINT = "ChecarSenhaUsuario";
const ALTERAR_SENHA_ENDPOINT = "AlterarSenhaUsuario";

// Chamado
const ABRIR_CHAMADO_ENDPOINT = "AbrirChamado";
const FILTRAR_CHAMADO_ENDPOINT= "FiltrarChamado";
const DETALHAR_CHAMADO_ID_ENDPOINT = "DetalharChamadoID";
const ATENDER_CHAMADO_ID_ENDPOINT = "AtenderChamadoID";
const ATENDER_CHAMADO_ENDPOINT = "AtenderChamado";
const FINALIZAR_CHAMADO_ENDPOINT = "FinalizarChamado";

// Situações do Chamado
const AGUARDANDO_ATENDIMENTO = 0;
const EM_ATENDIMENTO = 1;
const ENCERRADO = 2;

// Validação de Login
const AUTENTICAR = 'Autenticar';

// Definição do caminho padrão (local) do projeto
define('PATH_URL', $_SERVER['DOCUMENT_ROOT'] . '/ControleOSTecnico/src/');