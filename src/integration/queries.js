const DB = require("./queryDB.js");

/* -- Bulk of logic --

    Takes in a set of params and builds matching query call

    */
function buildQuery ( params ) {

    searchTerms = [];
    searchTerms = params.tumorDiagnosis ? searchTerms.concat(params.tumorDiagnosis) : searchTerms;
    searchTerms = params.molecularMarkers ? searchTerms.concat(params.molecularMarkers) : searchTerms;
    searchTerms = params.otherConditions ? searchTerms.concat(params.otherConditions) : searchTerms;

    console.log(params);

    let query = 'SELECT * FROM eligibilities WHERE ';

    if (params.age) {
        console.log('age2');
        // query += ' AND ';
    }

    if (params.sex) {
        query += "gender IN ('All', '" + params.sex + "') "
        query += "AND ";
    }

    if (searchTerms.length > 0) {
        // query += ' AND ';
        query += "regexp_replace(LOWER(SPLIT_PART(LOWER(criteria), LOWER('Exclusion Criteria'), '1')), '\s+', ' ', 'g') SIMILAR TO '%(" + searchTerms.join('|') + ")%' ";
    
        query += "AND regexp_replace(LOWER(SPLIT_PART(LOWER(criteria), LOWER('Exclusion Criteria'), '2')), '\s+', ' ', 'g') NOT SIMILAR TO '%(" + searchTerms.join('|') + ")%' ";
        query += "AND ";
    }

    if ( query.substr(-4).indexOf('AND') !== -1 ) {
        query = query.substr(0, query.length - 4);
    }

    query += 'LIMIT 25';

    return query;
}





function executeQuery ( query, then ) {
    let queryResults = false

    console.log('-- Executing Query --');
    console.log('Query: ' + query);

    return DB.query(query, (err, results) => {
        if (err) console.log(err);

        console.log(results);

        //console.log(err ? err : results);
        queryResults = results;    

        then(results);
        // return results;
    })

    // console.log('Results:');
    // console.log(queryResults);

    // return queryResults;
}

// todo: export into separate file and process there
// module.exports = { buildQuery, executeQuery }

function processAndQuery ( params ) {
    console.log('woo');
    console.log(params);
    return false;

    const query = buildQuery(params);
    const results = executeQuery(query);

    console.log(results);
}

// executeQuery('  ');

module.exports = { buildQuery, executeQuery, processAndQuery }



// const { Pool } = require('pg');

// // pools will use environment variables
// // for connection information
// const pool = new Pool({
//     user: 'witjest',
//     host: 'aact-db.ctti-clinicaltrials.org',
//     database: 'aact',
//     password: 'ferrari',
//     port: 5432,
// });

// pool.query('select count(*) from studies;', (err, res) => {
//     console.log(err ? err : res);
//     pool.end();
// })