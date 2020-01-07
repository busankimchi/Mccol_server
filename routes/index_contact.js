const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');


// GET Contact
router.get('/', function (req, res) {
    Contact.findAll()
        .then((contacts) => {
            if (!contacts.length) return res.status(404).send({ err: 'Contacts not found' });
            res.send(JSON.stringify(contacts))
        })
        .catch(err => res.status(500).send(err));
});


router.post('/', function (req, res) {
    var reqJSON = JSON.parse(JSON.stringify(req.body));
    console.log(reqJSON);

    if (req.body.request == "get_all_contacts") {
        Contact.findAllById(req.body.id)
            .then((contacts) => {
                if (!contacts.length) return res.status(404).send({ err: 'Contacts not found' });
                res.send(JSON.stringify(contacts))
            })
            .catch(err => res.status(500).send(err));
    }

    else if (req.body.request == "upload_contact") {
        var item = new Object();

        item.id = req.body.item.id;
        item.name = req.body.item.name;
        item.number = req.body.item.number;

        console.log(item)

        Contact.create(item)
            .then(contact => res.json(JSON.stringify(contact)))
            .catch(err => res.status(500).send(err));
    }

    else if (req.body.request == "delete_contact") {
        //console.log(req.body.item.number);
        Contact.deleteByNumber(req.body.item.number)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err));
    }
});


/*
// ADD contact
router.post('/add-contact', function(req, res) {
    Contact.create(req.body)
    .then(contact => res.send(contact))
    .catch(err => res.status(500).send(err));
});

// DELETE contact
router.delete('/:id', function(req, res) {
    console.log(req.params.id)

    Contact.deleteById(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

*/
module.exports = router