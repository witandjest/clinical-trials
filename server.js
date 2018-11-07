const express = require('express');
const app = express();
const { buildQuery, processAndQuery } = require("./src/integration/queries.js");

const cn = {
    user: 'witjest',
    host: 'aact-db.ctti-clinicaltrials.org',
    database: 'aact',
    password: 'ferrari',
    port: 5432,
};

var pgp = require('pg-promise')(/*options*/)
var db = pgp(cn);

app.use(express.static("dist"));

app.get('/trials', function (req, res) {
    // executeQuery('select count(*) from studies;', function ( results ) {
    //     console.log('wahey');
    //     console.log(results);
    // });
    const params = req.query;

    if (params.hasOwnProperty('name')) {
        delete params.name;
    }

    if (params.hasOwnProperty('labelWidth')) {
        delete params.labelWidth;
    }

    const query = buildQuery(params);

    console.log(query);

    db.one('select count(*) from studies;', 123)
    .then(function (data) {
        console.log('DATA:', data)
        res.send(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error)
    })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})