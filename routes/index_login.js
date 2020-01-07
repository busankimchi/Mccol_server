const express = require('express');
const router = express.Router();

const Login = require('../models/login');


// GET Id/Password
router.get('/', function (req, res) {
    Login.findAll()
        .then((ids) => {
            if (!ids.length) return res.status(404).send({ err: 'ID not found' });
            res.send(JSON.stringify(ids))
        })
        .catch(err => res.status(500).send(err));
});


router.post('/', function (req, res) {
    var reqJSON = JSON.parse(JSON.stringify(req.body));
    console.log(reqJSON);
    /*
        Login.findAllById(req.body.id)
            .then((ids) => {
                if (!ids.length) return res.status(404).send({ err: 'ID not found' });
                res.send(JSON.stringify(ids))
            })
            .catch(err => res.status(500).send(err));
    */

    var item = new Object();

    item.id = req.body.id;
    item.password = req.body.password;

    Login.findAllById(req.body.id)
        .then((ids) => {
            if (!ids.length) {
                Login.create(item)
                    .then((it) => {
                        console.log("asdfasdf  " + item);

                        var itJSON = JSON.parse(JSON.stringify(it));
                        itJSON.msg = "successfully signed up!!";

                        return res.json(JSON.stringify(itJSON));
                    })
                    .catch(err => res.status(500).send(err));
            }
            else {
                console.log(ids.length);

                if (item.password == ids[0].password)
                    item.msg = "successfully signed in!!";
                else item.msg = "sign in failed..";

                res.json(JSON.stringify(item));
            }
        })
        .catch(err => res.status(500).send(err));
});

module.exports = router