const express = require('express');
const router = express.Router();

const Image = require('../models/image')
const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../upload");
    },
    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    }
});

const upload = multer({ storage: Storage });


router.post('/upload-image', upload.single("img"), function (req, res) {
    var file = req.files;

    console.log(file);
    console.log(req.body);

    var image = new Object();

    image.id = req.body._parts.id;
    image.uri = req.body._parts.photo.uri;
    image.type = req.body._parts.photo.type;
    image.name = req.body._parts.photo.name;

    Image.create(image)
        .then(img => res.json(JSON.stringify(img)))
        .catch(err => res.status(500).send(err));

    res.status(200).send('success!');

    /*
    var result = {
        originalName: file.originalname,
        size: file.size
    };

    res.json(result);
    */
})

router.post('/delete-image', function (req, res) {
    Image.deleteByName(req.body.name)
        .then(() => res.status(200).send('success!'))
        .catch(err => res.status(500).send(err));
});


// GET Gallery
router.get('/', function (req, res) {
    Image.findAll()
        .then((images) => {
            if (!images.length) return res.status(404).send({ err: 'Images not found' });
            res.send(JSON.stringify(contacts))
        })
        .catch(err => res.status(500).send(err));
});


router.post('/', function (req, res) {
    var reqJSON = JSON.parse(JSON.stringify(req.body));

    console.log(reqJSON);
    console.log(req.body._parts);

    var image = {};
    req.body._parts.forEach((value, key) => {
        image[key] = value;
    });
    var imageJson = JSON.stringify(image);

    console.log(imageJson)

    if (req.body.request == "get_all_images") {
        Image.findAll()
            .then((images) => {
                if (!images.length) return res.status(404).send({ err: 'Images not found' });
                res.send(JSON.stringify(contacts))
            })
            .catch(err => res.status(500).send(err));
    }
    /*
    else if (req.body.request == "upload_image") {
        Image.create(req.body)
            .then(image => res.send(image))
            .catch(err => res.status(500).send(err));
    }
    */
    else if (req.body.request == "delete_image") {
        Image.deleteByName(req.body.name)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err));
    }
});

/*
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
*/

module.exports = router