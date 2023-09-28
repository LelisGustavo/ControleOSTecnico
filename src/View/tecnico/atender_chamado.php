<?php
require_once dirname(__DIR__, 3) . '\vendor\autoload.php';

if (!isset($_GET['id'])) {
    header('location: consultar_chamado.php');
    exit;
}
?>

<!DOCTYPE html>
<html>

<head>
    <?php
    include_once PATH_URL . '/Template/_includes/_head.php';
    ?>
</head>

<body class="hold-transition sidebar-mini">

    <div class="wrapper">
        <?php
        include_once PATH_URL . '/Template/_includes/_topo.php';
        include_once PATH_URL . '/Template/_includes/_menu.php';
        ?>

        <div class="content-wrapper">

            <section class="content-header">

                <div class="container-fluid">

                    <div class="row mb-2">

                        <div class="col-sm-6">
                            <h1>Atender Chamado</h1>
                        </div>

                    </div>

                </div>

            </section>

            <section class="content">

                <div class="card">

                    <div class="card-header">
                        <h3 class="card-title">Faça os atendimentos aqui</h3>
                    </div>

                    <div class="card-body">

                        <form action="atender_chamado.php" method="post" id="formAlt">

                            <input type="hidden" id="endpoint_detalhar_chamado_id" value="<?= DETALHAR_CHAMADO_ID_ENDPOINT ?>">
                            <input type="hidden" id="endpoint_atender_chamado" value="<?= ATENDER_CHAMADO_ENDPOINT ?>">
                            <input type="hidden" id="endpoint_finalizar_chamado" value="<?= FINALIZAR_CHAMADO_ENDPOINT ?>">
                            <input type="hidden" id="id_chamado" value="<?= $_GET['id'] ?>">
                            <input type="hidden" id="alocar_id">

                            <!-- Class row para formatar os campos (Data e Setor) com col-md-6 -->
                            <div class="row">

                                <div class="form-group col-md-6">
                                    <label>Data</label>
                                    <input readonly class="form-control obg" placeholder="Digite aqui..." name="data_chamado" id="data_chamado">
                                </div>

                                <div class="form-group col-md-6">
                                    <label>Setor</label>
                                    <input readonly class="form-control obg" placeholder="Digite aqui..." name="setor_chamado" id="setor_chamado">
                                </div>

                            </div>

                            <!-- Class row para formatar os campos (Funcionário e Equipamento) com col-md-6 -->
                            <div class="row">

                                <div class="form-group col-md-6">
                                    <label>Funcionário</label>
                                    <input readonly class="form-control obg" placeholder="Digite aqui..." name="funcionario_chamado" id="funcionario_chamado">
                                </div>

                                <div class="form-group col-md-6">
                                    <label>Equipamento</label>
                                    <input readonly class="form-control obg" placeholder="Digite aqui..." name="equipamento_chamado" id="equipamento_chamado">
                                </div>

                            </div>

                            <div class="form-group">
                                <label>Descrição do problema</label>
                                <textarea readonly class="form-control obg" rows="3" placeholder="Digite aqui..." name="problema" id="problema"></textarea>
                            </div>

                            <div id="divAtender" class="atender">

                                <center>
                                    <button type="button" class="btn btn-outline-info" onclick="AtenderChamado()" name="btn_atender">Iniciar Atendimento</button>
                                </center>

                            </div>

                            <div id="divAtendimento" class="ocultar">

                                <div class="form-group">
                                    <label>Laudo</label>
                                    <textarea class="form-control obg" rows="3" placeholder="Digite aqui..." name="laudo" id="laudo"></textarea>
                                </div>

                                <center>
                                    <button type="button" class="btn btn-outline-success" onclick="FinalizarChamado('formAlt')" name="btn_finalizar" id="btn_finalizar">Finalizar</button>
                                </center>

                            </div>

                            <br>

                            <center>
                                <a href="consultar_chamado.php" class="btn btn-outline-secondary">Voltar para Chamados</a>
                            </center>

                        </form>

                    </div>

                    <div id="divLoad"></div>

                </div>

            </section>

        </div>

        <?php
        include_once PATH_URL . '/Template/_includes/_footer.php';
        ?>

    </div>

    <?php
    include_once PATH_URL . '/Template/_includes/_scripts.php';
    ?>

    <script src="../../ajax/chamado_ajx.js"></script>
    <script>
        Verify();
        CarregarDetalheChamado(<?= $_GET['id'] ?>);
    </script>

</body>

</html>