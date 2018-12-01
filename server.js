const express = require('express');
const app = express();
const { buildQuery } = require("./src/server/database.js");
const { cleanData } = require("./src/server/validation.js");

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

    // let query = "select * from eligibilities where criteria like '%KPS%' and criteria like '%ECOG%' order by 1 desc limit 100;";

    console.log(query);

    db.many(query, 123)
    .then(function (data) {
        const cleanedData = cleanData(data, params);
        res.send(cleanedData);
    })
    .catch(function (error) {
        console.log('ERROR:', error);
        res.send([]);
    })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

// function nl2br ( text ) {
//     return text.replace("\r", "<br/>").replace("\n", "<br/>");
// }