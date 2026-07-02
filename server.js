const express = require('express');
const path = require('path');
const pessoa = require('./models/pessoa');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let pessoas = [];

app.get('/api/pessoas', (req, res) => {
  res.json(pessoas.map(p => p.toJSON()));
});

app.post('/api/pessoas', (req, res) => {
    const { nome, dataNascimento } = req.body;
    if (!nome || !dataNascimento) {
        return res.status(400).json({ error: 'Nome e data de nascimento são obrigatórios.' });
    }

    const Pessoa = new pessoa(nome, new Date(dataNascimento));
    pessoas.push(Pessoa);
    res.status(201).json(Pessoa.toJSON());
}); 

app.delete('/api/pessoas/:id', (req, res) => {
    const index = parseInt(req.params.id, 10);
    if (Number.isNaN(index) || index < 0 || index >= pessoas.length) {
        return res.status(404).json({ error: 'pessoa nao encontrada.' });
    }

    pessoas.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});





