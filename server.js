const express = require('express');
const app = express();
const data = require('./data.json');

app.use(express.json());
//chamando o json clients, lembrando que desse maneira
//sempre vai retornar 200 (ok)
app.get("/clients", function(req, res){
      res.json(data);
});

//pegando apenas um cliente e retornando erro 204 caso n exista
app.get("/clients/:id", function(req, res){
      const {id} = req.params;
      const client = data.find(cli => cli.id == id);
      if(!client) return res.status(204).json();
      res.json(client);
});

// enviando do client para o back-end (salvar um client)
app.post("/clients", function(req, res){
      //pegando as info
      const {name,email} = req.body;

      res.json({name,email});
});

//atualizar client
app.put("/clients/:id", function(req, res){
      const {id} = req.params;
      const client = data.find(cli => cli.id == id);

      if(!client) return res.status(204).json();

      const {name} = req.body;

      client.name = name;

      res.json(client)
});

app.delete("/clients/:id", function(req, res){
      const {id} = req.params;
      const clientsFiltered = data.filter(client => client.id != id);

      res.json(clientsFiltered)
});


app.listen(3000, function(){
      console.log("api ta on")
});