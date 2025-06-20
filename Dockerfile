# Usa imagem oficial do Python
FROM python:3.11

# Cria um diretório dentro do container
WORKDIR /app

# Copia todos os arquivos do seu projeto para dentro do container
COPY . /app

# Atualiza o pip e instala dependências
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expondo a porta 8000
EXPOSE 8000

# Comando padrão para rodar o Django no container
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
