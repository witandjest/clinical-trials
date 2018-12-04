/* HELPER AND PARSING FUNCTIONS BEGIN */

// currently only grabs after the field appears, we ned to grab before too
// continue using regex, check the open stackoverflow link



// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ !!!!!
function getCriteriaChunk ( criteria, field ) {
    // const fieldIndex = criteria.indexOf(field);
    let criteriaChunk = criteria.substring(criteria.indexOf(field));
    criteriaChunk = criteriaChunk.split(/\r?\n/g, 1)[0];

    // const test = criteria.match(/\r?\n(.*\r?\n.*(?:Glioma|glioma).*\r?\n.*)\r?\n/g);
    // console.log(test);

    // const test2 = criteria.match(/\r?\n(?:.*\r?\n.*(.{0,15}(?:Glioma|glioma)(?:\s{1}|\.|,|s).{0,15}).*\r?\n.*)\r?\n/g);
    // console.log(test2);

    return criteriaChunk;   
}

// Pull Glioma logic out of the buildQuery and into a post-processing
// - match 'glioma' in the query, and then check the grades here


// Fix brain metastases results not returning any results

function checkGliomaGrade ( criteria, validGliomaStrings ) {
    let validGlioma = false;
    const gliomaSplit = criteria.match(/\r?\n(.*\r?\n.*(?:Glioma|glioma)(?:\s{1}|\.|,|s).*\r?\n.*)\r?\n/g);
    if (gliomaSplit == undefined) {
        return {valid: false, error: false};
    }

    for (const key of Object.keys(gliomaSplit)) {
        if (!validGlioma) {
            const { valid, error } = checkField(gliomaSplit[key], 'glioma', validGliomaStrings, false, false);
            validGlioma = valid;
        }
    }

    return {valid: validGlioma, error: false};
}

const validECOGStrings = {
    0: ['0', '0-1', '0-2', '0-3', '0 or 1', '0, 1, or 2', '≤ 1', '≤1', '≤ 2', '≤2', '=< 2', '0 to 2', '3 or worse', 'less than or equal to 2'],
    1: ['0-1', '0-2', '0-3', '0 or 1', '0, 1, or 2', '≤ 1', '≤1', '≤ 2', '≤2', '=< 2', '0 to 2', '3 or worse', 'less than or equal to 2'],
    2: ['0-2', '0-3', '0, 1, or 2', '≤ 2', '≤2', '=< 2', '0 to 2', '3 or worse', 'less than or equal to 2', '2 or higher'],
    3: ['0-3', '3 or worse', '2 or higher'],
    4: ['2 or higher']
}

function checkField ( 
    criteria, 
    field, 
    validStrings, 
    numberExpected, 
    trimWhitespace 
    ) {
        let valid = false, error = false;

        let criteriaChunk = trimWhitespace ? getCriteriaChunk(criteria, field) : criteria;

        for (const stringKey of Object.keys(validStrings)) {
            if (trimWhitespace) {
                let searchString = validStrings[stringKey].replace(/ /g,'');
                if (criteriaChunk.replace(/ /g,'').toLowerCase().indexOf(searchString) != -1) {
                    valid = true;
                }
            } else {
                let searchString = validStrings[stringKey];
                if (criteriaChunk.toLowerCase().indexOf(searchString) != -1) {
                    valid = true;
                }
            }
            
        }

        // todo: improve the logic tracking if field is in inclusion or exclusion criteria
        if (valid && criteria.toLowerCase().indexOf('exclusion') != -1 && criteria.toLowerCase().indexOf('exclusion') < criteria.toLowerCase().indexOf(field)) {
            valid = !valid;
        }

        if (numberExpected) {
            error = ( criteriaChunk.split(/\d+/g, 1)[0] == criteriaChunk ); // if no number in chunk, return error
        } else {
            // todo: check if glioma grade is present or not
        }

        if (field === 'glioma') {
            console.log({
                criteriaChunk,
                valid,
                error
            });
        }

        return {valid, error};
}



function buildKPSStrings ( KPS ) {
    const KPSOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
    const KPSPrefixes = ['greater than or equal to', 'at least', '≥', '>=']
    const KPSSuffixes = ['or greater', 'or higher', 'or more', 'or above'];
    const KPSLowerPrefixes = ['>'];
    let KPSStrings = [];

    for (var i = 0; i < KPSOptions.length; i++) {
        const KPSOption = KPSOptions[i];
        if (parseInt(KPSOption) <= parseInt(KPS)) {
            for (var j = 0; j < KPSPrefixes.length; j++) {
                KPSStrings.push(KPSPrefixes[j] + ' ' + KPSOption);
            }

            for (var k = 0; k < KPSSuffixes.length; k++) {
                KPSStrings.push(KPSOption + ' ' + KPSSuffixes[k]);
            }
        }

        if (( parseInt(KPSOption) + 10 ) <= parseInt(KPS)) { // doing < here so need the lower (not equal) cases
            for (var x = 0; x < KPSLowerPrefixes.length; x++) {
                KPSStrings.push(KPSLowerPrefixes[x] + ' ' + KPSOption);
            }
        }


    }

    return KPSStrings;

}

const gliomaStrings = {
    'i': ['grade i ', 'grade i)', 'grade i,', 'grade i.', ' i glioma', 'low grade', 'low-grade'],
    'ii': ['grade ii ', 'grade ii)', 'grade ii.', ' ii glioma', 'low grade', 'low-grade'],
    'iii': ['iii', 'high grade', 'high-grade'],
    'iv': ['iv', 'high grade', 'high-grade']
}

/* HELPER AND PARSING FUNCTIONS END */


function cleanData ( data, filterData ) {
    let processedData = [];
    const validKPSStrings = buildKPSStrings(filterData['KPS']);
    const checkGlioma = filterData['tumorDiagnosis'].indexOf('glioma') != -1;

    for (const key of Object.keys(data)) {
        let cleanedData = {};

        cleanedData['link'] = 'https://www.clinicaltrials.gov/ct2/show/' + data[key]['nct_id'];
        cleanedData['criteria'] = data[key]['criteria'];
        cleanedData['title'] = data[key]['title'];
      
        let isValid = true;
        if ( isValid && filterData['ECOG'] && cleanedData['criteria'].indexOf('ECOG') != -1 ) {
            const { valid: validECOG, error: errorECOG } = checkField(cleanedData['criteria'], 'ECOG', validECOGStrings[filterData['ECOG']], true, true);
            isValid = isValid && ( validECOG || errorECOG );
            cleanedData['errorECOG'] = errorECOG;
        }

        if ( isValid && filterData['KPS'] && cleanedData['criteria'].indexOf('KPS') != -1) {
            const { valid: validKPS, error: errorKPS } = checkField(cleanedData['criteria'], 'KPS', validKPSStrings, true, true);
            isValid = isValid && ( validKPS || errorKPS );
            cleanedData['errorKPS'] = errorKPS;
        }

        if ( isValid && checkGlioma && cleanedData['criteria'].indexOf('glioma') != -1) {
            const gliomaGrade = filterData['tumorDiagnosis'].split('grade')[1].replace(/ /g,'');
            const validGliomaStrings = gliomaStrings[gliomaGrade];
            const { valid: validGlioma, error: errorGlioma } = checkGliomaGrade(cleanedData['criteria'], validGliomaStrings);
            isValid = isValid && ( validGlioma || errorGlioma );
            cleanedData['errorGlioma'] = errorGlioma;
        }

        // if (cleanedData['errorKPS']) {
        //     console.log('KPS error');
        // }
        
        if (isValid) {
            processedData.push(cleanedData);
        }

    }

    return processedData;
}

module.exports = { cleanData }