$(document).ready(function(){
    $('.list-group-item').fadeIn(500);
});

function removerProduto(id) {
    $.ajax({
        url: '/deletar/' + id,
        type: 'DELETE',
        success: function(result) {
            alert(result.message); // Exibe mensagem de sucesso
            location.reload(); // Atualiza a página após excluir o produto
        },
        error: function(xhr, status, error) {
            alert("Erro ao excluir produto: " + error); // Exibe mensagem de erro
        }
    });
}
function filtrarPorCategoria() {
    var categoriaSelecionada = document.getElementById("filtroCategoria").value;
    window.location.href = "/filtrar?categoria=" + categoriaSelecionada;
}
function abrirModalAtualizar(id) {
    $('#produtoId').val(id);

    // Carregar os dados atuais do produto
    $.get('/produto/' + id, function(data) {
        $('#nomeAtualizado').val(data.nome);
        $('#categoriaAtualizada').val(data.categoria);
        $('#precoAtualizado').val(data.preco);
    });

    $('#modalAtualizar').modal('show');
}

function atualizarProduto() {
    var produtoId = $('#produtoId').val();
    var nomeAtualizado = $('#nomeAtualizado').val();
    var categoriaAtualizada = $('#categoriaAtualizada').val();
    var precoAtualizado = $('#precoAtualizado').val();

    $.ajax({
        url: '/atualizar/' + produtoId,
        type: 'PUT',
        data: {
            nome: nomeAtualizado,
            categoria: categoriaAtualizada,
            preco: precoAtualizado
        },
        success: function(result) {
            alert(result.message);
            $('#modalAtualizar').modal('hide');
            location.reload(); // Atualiza a página após atualizar o produto
        },
        error: function(xhr, status, error) {
            alert("Erro ao atualizar produto: " + error);
        }
    });
}