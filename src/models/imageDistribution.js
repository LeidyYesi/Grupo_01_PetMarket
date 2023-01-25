const fs = require('fs-extra');

let moveFile = function(filename, fileSource , destinationPath) {
    let sourcePath = fileSource ;
    let sourceFile = filename;
    let source = sourcePath + '/' + sourceFile;
    let destination = destinationPath + '/' + sourceFile;
    console.log(source);
    console.log(destination);
    
    fs.move(source, destination, function (error){
        if (error) {
            return console.error(error);
        }
        return true;
    });
}

module.exports = moveFile;
