import sqlite3
from werkzeug.security import generate_password_hash

DATABASE = 'login_teste.db'

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL,
            data_registro TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print(f"Banco de dados '{DATABASE}' inicializado com sucesso e tabela 'usuarios' criada.")

    
