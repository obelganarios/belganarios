from flask import Flask, render_template, request, redirect, url_for, flash, session
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'SUA_CHAVE_SECRETA_MUITO_SEGURA_AQUI'
app.permanent_session_lifetime = timedelta(days=30)

DATABASE = 'login_teste.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('home/indexHomePage.html')

@app.route('/login_page')
def login_page():
    if 'usuario_id' in session:
        return redirect(url_for('index'))
    return render_template('login/indexLoginPage.html')

@app.route('/registrar', methods=['GET', 'POST'])
def registrar():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        confirmar_senha = request.form['confirmar_senha']

        if not email or not senha or not confirmar_senha:
            flash('Por favor, preencha todos os campos.', 'danger')
            return render_template('login/indexRegistrar.html')

        if senha != confirmar_senha:
            flash('As senhas não coincidem.', 'danger')
            return render_template('login/indexRegistrar.html')

        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            senha_hash = generate_password_hash(senha, method='pbkdf2:sha256')
            cursor.execute("INSERT INTO usuarios (email, senha, data_registro) VALUES (?, ?, DATETIME('now'))",
                           (email, senha_hash))
            conn.commit()
            flash('Cadastro realizado com sucesso! Faça login.', 'success')
            return redirect(url_for('login_page'))
        except sqlite3.IntegrityError:
            flash('Este e-mail já está cadastrado.', 'danger')
        except Exception as e:
            flash(f'Ocorreu um erro: {e}', 'danger')
        finally:
            conn.close()

    return render_template('login/indexRegistrar.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    senha = request.form['senha']
    remember_me = request.form.get('remember_me') == 'true'

    if not email or not senha:
        flash('Por favor, preencha todos os campos.', 'danger')
        return render_template('login/indexLoginPage.html')

    conn = get_db_connection()
    usuario = conn.execute("SELECT * FROM usuarios WHERE email = ?", (email,)).fetchone()
    conn.close()

    if usuario and check_password_hash(usuario['senha'], senha):
        session['usuario_id'] = usuario['id']
        session['usuario_email'] = usuario['email']
        session.permanent = remember_me

        flash('Login realizado com sucesso!', 'success')
        return redirect(url_for('index'))
    else:
        flash('Email ou senha incorretos.', 'danger')
        return render_template('login/indexLoginPage.html')

@app.route('/logout')
def logout():
    session.pop('usuario_id', None)
    session.pop('usuario_email', None)
    flash('Você foi desconectado.', 'info')
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
