const fs = require('fs');

exports.Utility = {
    getCurrentFilenames(path) {
        let res = []
        fs.readdirSync(path).forEach(file => {
            res.push(file);
        });
        return res
    }
}