const express = require('express');
const router = express.Router();

const Image = require('../models/image')


// GET Gallery
router.get('/', function(req, res) {
    Image.findAll()
    .then((images) => {
        if (!images.length) return res.status(404).send({ err: 'Images not found' });
        //res.send(`find successfully: ${images}`);
        res.json(images)
    })
    .catch(err => res.status(500).send(err));
});

// ADD image
router.post('/add-image', function(req, res) {
    Image.create(req.body)
    .then(image => res.send(image))
    .catch(err => res.status(500).send(err));
});

// DELETE image
router.delete('/:id', function(req, res) {
    console.log(req.params.id)

    Image.deleteById(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router