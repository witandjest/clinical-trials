const DB = require("./queryDB.js");

/* -- Bulk of logic --

    Takes in a set of params and builds matching query call

    */
function buildQuery ( params ) {
    console.log(params);

    let query = '';

    if (params.age) {
        console.log('age2');
    }

    if (params.sex) {
        
    }

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