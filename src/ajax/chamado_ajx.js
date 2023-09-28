function ListarChamados() {

    let dados = {
        endpoint: $("#endpoint_filtrar_chamado").val(),
        situacao: $("#situacao").val()
    }

    $.ajax({
        type: "POST",
        url: BASE_URL("tecnico_api"),
        beforeSend: function () {
            CarregarTela();
        },
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            "Content-Type": "application/json"
        },
        data: JSON.stringify(dados),
        success: function (result) {
            let chamados = result['result']; //console.log(chamados);

            if (chamados == -1000) {
                ClearTnk();
            }
            else {

                if (chamados.length > 0) {

                    let titulo = '<h3 class="card-title">Resultado(s) encontrado(s)</h3>';
                    let tabela_inicial = `<table class="table table-hover">

                <thead>
                    <tr>
                        <th>Ação</th>
                        <th>Data Abertura</th>
                        <th>Funcionário</th>
                        <th>Equipamento</th>
                        <th>Problema</th>
                    </tr>
                </thead>`;

                    let = linha = '';

                    $(chamados).each(function () {
                        linha += `<tbody>
                <tr>
                    <td>`;

                        if (this.data_atendimento != null && this.data_encerramento == null) {
                            linha += `<i class="text-info"> Em atendimento </i>`;
                        }

                        else if (this.data_encerramento != null) {
                            linha += `<i class="text-muted"> Encerrado </i>`;
                        }

                        else {
                            linha += `<a href="atender_chamado.php?id=${this.chamado_id}" class="btn btn-outline-warning btn-xs">Iniciar Atendimento</a>`;
                        }

                        linha += `</td>
                    <td>${this.data_chamado}</td>
                    <td>${this.funcionario}</td>
                    <td>${this.tipo + ' - ' + this.modelo + ' / ' + this.identificacao}</td>
                    <td>${this.problema}</td>
                </tr>
            </tbody>`;
                    });

                    let tabela_final = '</table>';

                    let tabela_completa = tabela_inicial + linha + tabela_final;

                    // Adicionando os elementos na tabela e <h3>
                    $("#divResult").html(tabela_completa);
                    $("#titulo").html(titulo);
                    $("#titulo").show();

                } else {
                    MensagemNaoEncontradoRegistro();
                    $("#divResult").html('');
                    $("#titulo").hide();
                }
            }
        }, complete: function () {
            EncerrarTela();
        }
    })

}

function CarregarDetalheChamado() {

    let dados = {
        endpoint: $("#endpoint_detalhar_chamado_id").val(),
        id_chamado: $("#id_chamado").val()
    }

    $.ajax({
        type: "POST",
        url: BASE_URL("tecnico_api"),
        beforeSend: function () {
            CarregarTela();
        },
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            "Content-Type": "application/json"
        },
        data: JSON.stringify(dados),
        success: function (result) {
            let dados = result['result']; //console.log(dados);

            if (dados == -1000) {
                ClearTnk();
            }
            else {

                $("#data_chamado").val(dados.data_chamado);
                $("#setor_chamado").val(dados.setor);
                $("#funcionario_chamado").val(dados.funcionario);
                $("#equipamento_chamado").val(dados.tipo + ' - ' + dados.modelo + ' / ' + dados.identificacao);
                $("#problema").val(dados.problema);
                $("#alocar_id").val(dados.alocar_id);
                $("#laudo").val(dados.laudo);

                if (dados.data_atendimento == null) {
                    $("#divAtendimento").hide();
                    $("#divAtender").show();
                    $("#laudo").prop("disabled", false);
                }

                else if (dados.data_atendimento != null && dados.data_encerramento == null) {
                    $("#divAtendimento").show();
                    $("#divAtender").hide();
                    $("#btn_finalizar").show();
                }

                else if (dados.data_encerramento != null) {
                    $("#divAtender").hide();
                    $("#divAtendimento").show();
                    $("#btn_finalizar").hide();
                    $("#laudo").prop("disabled", false);
                }
            }

        }, complete: function () {
            EncerrarTela();
        }
    })

}

function AtenderChamado() {

    let dados = {
        endpoint: $("#endpoint_atender_chamado").val(),
        id_tecnico: CodigoUserLogado(),
        id_chamado: $("#id_chamado").val()
    }

    $.ajax({
        type: "POST",
        url: BASE_URL("tecnico_api"),
        beforeSend: function () {
            CarregarTela();
        },
        headers: {
            'Authorization': 'Bearer ' + GetTnk(),
            "Content-Type": "application/json"
        },
        data: JSON.stringify(dados),
        success: function (result) {
            let ret = result['result']; //console.log(ret);

            if (ret == -1000) {
                ClearTnk();
            }
            else {

                if (ret == 1) {
                    MensagemCustomizadaInfo('Acesso Permitido');
                    $("#divAtendimento").show();
                    $("#divAtender").hide();
                } else {
                    MensagemErro();
                }
            }

        }, complete: function () {
            EncerrarTela();
        }
    })

}

function FinalizarChamado(id_form) {

    if (NotificarCampos(id_form)) {

        let dados = {
            endpoint: $("#endpoint_finalizar_chamado").val(),
            id_tecnico: CodigoUserLogado(),
            id_chamado: $("#id_chamado").val(),
            laudo: $("#laudo").val(),
            id_alocar: $("#alocar_id").val()
        }

        $.ajax({
            type: "POST",
            url: BASE_URL("tecnico_api"),
            beforeSend: function () {
                CarregarTela();
            },
            headers: {
                'Authorization': 'Bearer ' + GetTnk(),
                "Content-Type": "application/json"
            },
            data: JSON.stringify(dados),
            success: function (result) {
                let ret = result['result']; //console.log(ret);

                if (ret == -1000) {
                    ClearTnk();
                }
                else {

                    if (ret == 1) {
                        MensagemSucesso();
                        $("#btn_finalizar").hide();
                        $("#laudo").prop("disabled", true);
                    } else {
                        MensagemErro();
                    }
                }

            }, complete: function () {
                EncerrarTela();
            }
        })

    }

}
