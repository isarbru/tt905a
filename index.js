const express = require("express");
const app = express();
app.use(express.json());

// Permissões
var cors = require('cors');
app.use(cors());

// Porta que eu estou ouvindo
app.listen(process.env.PORT || 3000);

app.get('/', 
    function (req, res){    
        res.send("Biblioteca de personagens do Street Fighter");
    }
);


const personagens = [{"nome":"Ryu ","idade":"57","país origem":"Japão"},
                    {"nome":"Chun-Li ","idade":"36","país origem":"China"},
                    {"nome":"M. Bison ","idade":"50","país origem":"Reino Unido"}];

app.get('/personagens',
    function(req, res){
        res.send(personagens.filter(String));
    }
);

app.get('/personagens/:id',
    function(req, res){
        const id = req.params.id - 1;
        const personagem = personagens[id];

        if (!personagem){
            res.send("Shoryuken! Personagem não encontrado");
        } else {
            res.send(personagem);
        }
    }
)

app.post('/personagens', 
    (req, res) => {
        console.log(req.body.personagem);
        const personagem = req.body.personagem;
        personagens.push(personagem);
        res.send("HADOUKEN! Seu personagem foi cadastrado")
    }
);

app.put('/personagens/:id',
    (req, res) => {
        const id = req.params.id - 1;
        const personagem = req.body.personagem;
        personagens[id] = personagem;        
        res.send("Personagem atualizado com sucesso.")
    }
)

app.delete('/personagens/:id', 
    (req, res) => {
        const id = req.params.id - 1;
        delete personagens[id];

        res.send("Hadouken! Personagem REMOVIDO com sucesso");
    }
);