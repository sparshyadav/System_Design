let data = [];

module.exports = {
    sync: (newData) => {
        data = [...newData];
    },
    read: () => data
}