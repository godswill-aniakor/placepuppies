const fs = require('fs');
const sharp = require('sharp');
const config = require('./../config');
console.log(config);

const cacheDir = `${config.image_path}/cache`;

const resize = function(file, width, height, callback) {
    const filePath = `${config.image_path}/${file}`;
    const image = sharp(filePath).rotate().resize(parseInt(width), parseInt(height), {
        fit: sharp.cover,
        withoutEnlargement: true
    });
    
    image.toFormat('jpeg', { progressive: true }).toBuffer(function (err, data) {
        callback(err, data)
    });
}

const cacheDirectory = () => {
    if (!fs.existsSync(cacheDir)){
        fs.mkdirSync(cacheDir);
    }
}

const getImageDirectory = (file, width, height) => {
    const name = file.substring(0, file.lastIndexOf('.'));
    return `${cacheDir}/${name}_${width}x${height}.jpeg`;
}

const cacheImage = (file, width, height, data) => {
    fs.writeFile(getImageDirectory(file, width, height), data, () => {});
}

const getCache = (file, width, height, callback) => {
    const image = getImageDirectory(file, width, height);
    fs.readFile(image, (err, content) => callback(err, content));
}

module.exports = { 
    cacheDir: cacheDir,
    resize: resize,
    cacheDirectory: cacheDirectory, 
    cacheImage: cacheImage, 
    getCache: getCache 
};