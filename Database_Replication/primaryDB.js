const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, 'primaryDB.json');

if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
}

module.exports = {
    write: (item) => {
        const rawData = fs.readFileSync(FILE_PATH);
        const data = JSON.parse(rawData);

        data.push(item);

        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

        return data;
    },
    getAll: () => {
        const rawData = fs.readFileSync(FILE_PATH);
        return JSON.parse(rawData);
    }
}