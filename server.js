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

    // let query = "select * from eligibilities where criteria like '%ECOG%' order by 1 desc limit 100;";

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

function cleanData ( data, filterData ) {
    let processedData = [];

    for (const key of Object.keys(data)) {
        let cleanedData = {};

        cleanedData['link'] = 'https://www.clinicaltrials.gov/ct2/show/' + data[key]['nct_id'];
        cleanedData['criteria'] = data[key]['criteria'];
        cleanedData['title'] = data[key]['title'];
      
        let isValid = true;
        if ( cleanedData['criteria'].indexOf('ECOG') != -1 && filterData['ECOG'] ) {
            const { validECOG, errorECOG } = checkECOG(cleanedData['criteria'], filterData['ECOG']);
            isValid = validECOG || errorECOG;
            cleanedData['errorECOG'] = errorECOG;
        }

        // todo: implement
        // if ( cleanedData['criteria'].indexOf('KPS') != -1 ) {
        //     isValid = checkKPS(cleanedData['criteria'], 50);
        // }

        if (cleanedData['errorECOG']) {
            console.log('ECOG error');
        }
        
        if (isValid) {
            processedData.push(cleanedData);
        }

    }

    return processedData;
}

const validECOGStrings = {
    0: ['0', '0-1', '0-2', '0-3', '0 or 1', '0, 1, or 2', '≤ 1', '≤1', '≤ 2', '≤2', '=< 2', '0 to 2', '3 or worse', 'less than or equal to 2'],
    1: ['0-1', '0-2', '0-3', '0 or 1', '0, 1, or 2', '≤ 1', '≤1', '≤ 2', '≤2', '=< 2', '0 to 2', '3 or worse', 'less than or equal to 2'],
    2: ['0-2', '0-3', '0, 1, or 2', '≤ 2', '≤2', '=< 2', '0 to 2', '3 or worse', 'less than or equal to 2', '2 or higher'],
    3: ['0-3', '3 or worse', '2 or higher'],
    4: ['2 or higher']
}

function checkECOG ( criteria, ECOG ) {
    let validECOG = false, errorECOG = false;
    let sampleString = criteria;

    sampleString = sampleString.substring(sampleString.indexOf('ECOG'));
    sampleString = sampleString.split(/\r?\n/g, 1)[0];

    const validStrings = validECOGStrings[ECOG];
    for (const stringKey of Object.keys(validStrings)) {
        let searchString = validStrings[stringKey].replace(/ /g,'');
        if (sampleString.replace(/ /g,'').indexOf(searchString) != -1) {
            validECOG = true;
        }
    }

    // todo: improve the logic tracking if ECOG is in inclusion or exclusion criteria
    if (criteria.toLowerCase().indexOf('exclusion') < criteria.toLowerCase().indexOf('ECOG')) {
        validECOG = !validECOG;
    }

    console.log(' ------ ');
    console.log(sampleString);

    errorECOG = ( sampleString.split(/\d+/g, 1)[0] == sampleString );

    return { validECOG, errorECOG };

}

const validKPSStrings = {

};

function checkKPS ( criteria, KPS ) {

    // todo: implement

}


// function nl2br ( text ) {
//     return text.replace("\r", "<br/>").replace("\n", "<br/>");
// }