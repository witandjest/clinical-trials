/* HELPER AND PARSING FUNCTIONS BEGIN */

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

// const validKPSStrings = {
//     10: [],
//     20: [],
//     30: [],
//     40: ['≥40'],
//     50: ['>40', '≥40', '≥50'],
//     60: ['>40', '>50', '≥40', '≥50', '≥60'],
//     70: ['>40', '>50', '>60', '≥40', '≥50', '≥60', '≥70'],
//     80: ['>40', '>50', '>60', '>70', '≥40', '≥50', '≥60', '≥70', '≥80'],
//     90: ['>40', '>50', '>60', '>70', '>80', '≥40', '≥50', '≥60', '≥70', '≥80', '≥90'],
//     100: ['>40', '>50', '>60', '>70', '>80', '>90', '≥40', '≥50', '≥60', '≥70', '≥80', '≥90'],
// };


function checkKPS ( criteria, validStrings ) {
    let validKPS = false, errorKPS = false;
    let sampleString = criteria;

    sampleString = sampleString.substring(sampleString.indexOf('KPS'));
    sampleString = sampleString.split(/\r?\n/g, 1)[0];
    
    for (const stringKey of Object.keys(validStrings)) {
        let searchString = validStrings[stringKey].replace(/ /g,'');
        if (sampleString.replace(/ /g,'').indexOf(searchString) != -1) {
            validKPS = true;
        }
    }

    // todo: improve the logic tracking if KPS is in inclusion or exclusion criteria
    if (criteria.toLowerCase().indexOf('exclusion') < criteria.toLowerCase().indexOf('KPS')) {
        validKPS = !validKPS;
    }

    console.log(' ------ ');
    console.log(sampleString);

    errorKPS = ( sampleString.split(/\d+/g, 1)[0] == sampleString );

    return { validKPS, errorKPS };

}


function buildKPSStrings ( KPS ) {
    const KPSOptions = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
    const KPSPrefixes = ['greater than or equal to', 'at least', '≥']
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

/* HELPER AND PARSING FUNCTIONS END */


function cleanData ( data, filterData ) {
    let processedData = [];
    const validKPSStrings = buildKPSStrings(filterData['KPS']);

    for (const key of Object.keys(data)) {
        let cleanedData = {};

        cleanedData['link'] = 'https://www.clinicaltrials.gov/ct2/show/' + data[key]['nct_id'];
        cleanedData['criteria'] = data[key]['criteria'];
        cleanedData['title'] = data[key]['title'];
      
        let isValid = true;
        if ( isValid && cleanedData['criteria'].indexOf('ECOG') != -1 && filterData['ECOG'] ) {
            const { validECOG, errorECOG } = checkECOG(cleanedData['criteria'], filterData['ECOG']);
            isValid = isValid && ( validECOG || errorECOG );
            cleanedData['errorECOG'] = errorECOG;
        }

        if ( isValid && cleanedData['criteria'].indexOf('KPS') != -1 && filterData['KPS']) {
            const { validKPS, errorKPS } = checkKPS(cleanedData['criteria'], validKPSStrings);
            isValid = isValid && ( validKPS || errorKPS );
            cleanedData['errorKPS'] = errorKPS;
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