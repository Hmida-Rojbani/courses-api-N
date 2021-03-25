const mongoose = require('mongoose');
let url = 'mongodb+srv://user:1234@db.mhbax.mongodb.net/test-n?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
                    .then(()=> console.log('Mongo is UP.'))
                    .catch((err) => console.log('Mongo is Down. Raison :',err.message))
