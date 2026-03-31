const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, 'replica1.json');

if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
}

module.exports = {
    sync: (newData) => {
        fs.writeFileSync(FILE_PATH, JSON.stringify(newData, null, 2));
    },
    read: () => {
        // Read directly from the file to handle new requests
        const rawData = fs.readFileSync(FILE_PATH);
        return JSON.parse(rawData);
    }
}