//const MongoClient = require('mongodb').MongoClient;
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


app.get('/hello',
function (req, res){    
    res.send("Hello de Novo");
    }
)

const personagens = [
    "Ryu", "Chun-Li"
];

app.get('/personagens',
    function(req, res){
        // res.send(mensagens);
        res.send(personagens.filter(Boolean));
    }
);

const mongodb = require('mongodb')
const password=process.env.PASSWORD||"QWERTY";
console.log(password)
const connectionString  = `mongodb+srv://admin:${password}@cluster0.rteuk.mongodb.net/tt905?retryWrites=true&w=majority`;
const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

(async()=>{
    const client = await mongodb.MongoClient.connect(connectionString,options);
    const db = client.db('tt905')
    const personagens=db.collection('personagens');
    personagens.find({}).toArray();
    console.log(await personagens.find({}).toArray());

    app.get('/personagem',
        async function(req, res){
        // res.send(mensagens);
        res.send(await personagens.find({}).toArray());
    });

app.get('/personagem/:id',
    async function(req, res){
        const id = req.params.id;
        const personagem = await personagens.findOne(
            {_id : mongodb.ObjectID(id)}
        );
        console.log(personagem);
        if (!personagem){
            res.send("Personagem não encontrada");
        } else {
            res.send(personagem);
        }
    }
);

app.post('/personagem', 
    async (req, res) => {
        console.log(req.body);
        const personagem = req.body;
        delete personagem["_id"];
        personagens.insertOne(personagem);        
        res.send("Criar um personagem");
    }
);

app.put('/personagem/:id',
    async (req, res) => {
        const id = req.params.id;
        const personagem = req.body;

        console.log(personagem);

        delete personagem["_id"];

        const num_mensagens = await personagens.countDocuments({_id : mongodb.ObjectID(id)});

        if (num_mensagens !== 1) {
            res.send('Ocorreu um erro por conta do número de personagens');
            return;
        }

        await personagens.updateOne(
            {_id : mongodb.ObjectID(id)},
            {$set : personagem}
        );
        
        res.send("Personagem atualizado com sucesso.")
    }
);

app.delete('/personagem/:id', 
    async (req, res) => {
        const id = req.params.id;
        
        await personagens.deleteOne({_id : mongodb.ObjectID(id)});

        res.send("Personagem removida com sucesso");
    
    }
);

})();

/*const express = require("express");
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



client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


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
);*/
