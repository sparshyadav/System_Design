let data = [];

module.exports = {
    write: (item) => {
        data.push(item);
        return data;
    },
    getAll: () => data
}