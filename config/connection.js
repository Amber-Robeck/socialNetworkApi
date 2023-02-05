const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/socialAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('socialAPI connected'))
    .catch(err => console.log(err));

module.exports = connection;

