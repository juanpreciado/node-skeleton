const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {

  app.get('/notes/:id', (req, res) => {
    console.log(`Get request, id: ${req.params.id}`);
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(note);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });

  app.post('/notes', (req, res) => {

    console.log(req.body);
    const note = {text: req.body.body, title: req.body.title};
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};