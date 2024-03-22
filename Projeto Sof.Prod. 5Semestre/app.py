from flask import Flask, render_template, request, redirect, url_for, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from decimal import Decimal

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://developer:@localhost/bd_teste'
db = SQLAlchemy(app)


class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    categoria = db.Column(db.String(255))
    preco = db.Column(db.Float)


@app.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)


@app.route('/')
def index():
    produtos = Produto.query.all()
    return render_template('index.html', produtos=produtos)


@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        nome = request.form['nome']
        categoria = request.form['categoria']
        preco = Decimal(request.form['preco'])
        novo_produto = Produto(nome=nome, categoria=categoria, preco=preco)
        db.session.add(novo_produto)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('cadastro.html')


@app.route('/filtrar')
def historico():
    # TODO: Implementar a lógica para filtra itens por categoria 
    return 'Filtro por categoria (a implementar)'

@app.route('/atualizar')
def atualizar():
    # TODO: Implementar a lógica para atualizar os preços dos produtos 
    return 'Valor atualizado (a implementar)'


@app.route('/deletar/<int:produto_id>', methods=['DELETE'])
def deletar_produto(produto_id):
    produto = Produto.query.get_or_404(produto_id)
    db.session.delete(produto)
    db.session.commit()
    return jsonify({'message': 'Produto excluído com sucesso'}), 200


if __name__ == '__main__':
    app.run(debug=True)
