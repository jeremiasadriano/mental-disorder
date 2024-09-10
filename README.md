# Mental Disorder Classification

Mental Disorder é uma aplicação que envolve o uso de inteligência artificial para a classificação de transtornos mentais utilizando o conjunto de dados disponível no Kaggle: [Mental Disorder Classification](https://www.kaggle.com/datasets/cid007/mental-disorder-classification/data).

A aplicação inclui um front-end desenvolvido em React e um back-end em Python.

## Requisitos

- Python 3.11 ou superior
- Node.js 20.12 ou superior
- Pnpm 9.0.5 ou superior

## Instalação e Execução

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/jeremiasadriano/machine-learning-api.git
   cd machine-learning-api
   ```
2. Crie um ambiente virtual:

   ```bash
   cd machine-learning-api/api
   python3 -m venv .venv
   source venv/bin/activate
   ```

3. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

4. Iniciar o servidor:

   ```bash
   flask run
   ```

## Frontend (React)

1. Abra um novo terminal e vá o diretório do front-end:

   ```bash
   cd ../ui
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Inicie o servidor de desenvolvimento do React:

   ```bash
   pnpm run dev
   ```

4. Acesse o front-end no navegador:
   ```link
   http://localhost:5173/
   ```
