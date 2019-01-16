const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const server = express();

server.use(express.json());
server.use(helmet());

const db = knex(knexConfig.development);

// endpoints here
server.get('/', (req, res) => {
  res.send('api working');
});

server.get('/api/zoos', (req, res) =>{
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:id', (req, res) => {
  db('zoos').where({ id: req.params.id})
  .then(zoos => {
    if(zoos) {
      res.status(200).json(zoos);
    } else {
      res.status(404).json({ message: 'Zoo not found' });
    }
  }).catch(err => res.status(500).json(err));
});

// add zoos
server.post('/api/zoos', (req, res) => {
  db('zoos')
  .insert(req.body)
  then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => res.status(500).json(err));
});

// update zoos
server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  db('zoos')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(400).json({ message: 'Zoo not found' });
      }
    }).catch(err => res.status(500).json(err));
});

// delete zoo
server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

// list bears
server.get('/api/bears', (req, res) => {
  db('bears')
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/bears/:id', (req, res) => {
  db('bears').where({ id: req.params.id })
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ message: 'Bear not found' });
      }
    }).catch(err => res.status(500).json(err));
})

//add bears
server.post('/api/bears', (req, res) => {
  // db.insert(req.body).into('bears').then().catch();
  db('bears')
    .insert(req.body)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));

});

//delete bears
server.delete('/api/bears/:id', (req, res) => {
  db('bears')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});


//update bears
server.put('/api/bears/:id', (req, res) => {
  const changes = req.body;
  db('bears')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(400).json({ message: 'Bear not found' });
      }
    }).catch(err => res.status(500).json(err));
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
