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
