const fs = require('fs');
const isImage = require('is-image');

const config = require('./../config');
const processor = require('./../helper/processor');

const display = (req, res, image, width, height) => {
    try {
        render(req, res, image, width, height);
    } catch (err) {
        res.status(500).send({ 'errors': { 
            message: err.message, error: (!config.is_production) ? err : {}
        }});
    }
}

const render = (req, res, image, width, height) => {
    processor.resize(image, width, height, (err, data) => {
        if (err) {
            throw err;
        } 
        processor.cacheImage(image, width, height, data);
        send(req, res, data);
    });
}

const send = (req, res, data) => {
    res.setHeader('Cache-Control', 'public, max-age=604800');
    res.set('Content-Type', 'image/jpeg');
    res.send(data);
}


const Picsum = function() {
    // simulating database image storage with primitive array
    const imageStore = []; 
    this.getImage = function(index, callback) {
        callback(imageStore[index]);
    }
    this.addImage = function(image) {
        if (isImage(image)) {
            imageStore.push(image);
        }
    }
    this.size = function() {
        return imageStore.length;
    }
}

Picsum.prototype.cacheDir = processor.cacheDir;

Picsum.prototype.initialize = function(callback) {
    processor.cacheDirectory();
    fs.readdir(config.image_path, (err, files) => {
        if (err) {
            return callback(err, null);
        }
        for (let i = 0; i < files.length; i++) {
            this.addImage(files[i]);
        }
        callback(err, this.size());
    });
}

Picsum.prototype.serveImage = function(req, res) {
    const width = req.params.width || config.max_width;
    const height = req.params.height || config.max_height;

    const min = 1;
    const max = this.size();
    const imageIndex = Math.floor(Math.random() * (max - min + 1)) + min;

    if (width > config.max_width || height > config.max_height) {
        return res.status(500).send({ 'errors': { 
            message: "maximum picture size exceeded!", error: {} 
        }});
    }
    this.getImage(imageIndex - 1, (image) => {
        processor.getCache(image, width, height, (err, content) => {
            if (content) {
                return send(req, res, content);
            }
            display(req, res, image, width, height);
        });
    });
}

module.exports = new Picsum();
