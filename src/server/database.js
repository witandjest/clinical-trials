function buildQuery ( params ) {

    searchTerms = [];
    // searchTerms = params.tumorDiagnosis ? searchTerms.concat(params.tumorDiagnosis) : searchTerms;
    searchTerms = params.molecularMarkers ? searchTerms.concat(params.molecularMarkers) : searchTerms;
    // searchTerms = params.otherConditions ? searchTerms.concat(params.otherConditions) : searchTerms;

    searchTerms = searchTerms.map(function (val) { return val.toLowerCase(); });



    console.log(params);

    let query = 'SELECT elig.nct_id, elig.criteria, stud.brief_title as title FROM eligibilities elig join studies stud on elig.nct_id = stud.nct_id WHERE ';
    

    if (params.age) { // todo: fix bug here around ages being in months in some cases
        query += "( NOT NULLIF(regexp_replace(elig.minimum_age, '\\D','','g'), '')::int > " + params.age + " ";
        query += " OR elig.minimum_age = 'N/A' ) "
        query += "AND ";
        query += "( NOT NULLIF(regexp_replace(elig.maximum_age, '\\D','','g'), '')::int < " + params.age + " ";
        query += " OR elig.maximum_age = 'N/A' ) "
        query += "AND ";
    }

    if (params.sex) {
        query += "elig.gender IN ('All', '" + params.sex + "') "
        query += "AND ";
    }

    if (params.primaryRecurrent === 'primary') {
        query += "stud.brief_title LIKE '% Primary%'"
        query += "AND ";
    }

    if (params.primaryRecurrent === 'recurrent') {
        query += "stud.brief_title LIKE '% Recurrent%'"
        query += "AND ";
    }

    if (params.tumorDiagnosis) {
        if (params.tumorDiagnosis.indexOf('glioma') != '-1') {
            query += "regexp_replace(LOWER(SPLIT_PART(LOWER(elig.criteria), LOWER('Exclusion Criteria'), '1')), '\s+', ' ', 'g') SIMILAR TO '%glioma%' ";
            query += "AND ";
    
            const tumorGrade = params.tumorDiagnosis.split('grade')[1].trim();

            if (tumorGrade === 'i' || tumorGrade === 'ii') {
                query += "regexp_replace(LOWER(SPLIT_PART(LOWER(elig.criteria), LOWER('Exclusion Criteria'), '1')), '\s+', ' ', 'g') NOT SIMILAR TO '%high grade glioma%' ";
                query += "AND ";
            }
     
            query += "regexp_replace(LOWER(SPLIT_PART(LOWER(elig.criteria), LOWER('Exclusion Criteria'), '1')), '\s+', ' ', 'g') SIMILAR TO '%grade " + tumorGrade + " %' "; 
            query += "AND ";
        // } else if (params.tumorDiagnosis.indexOf('metastases') != '-1') {
        //     query += "(regexp_replace(LOWER(SPLIT_PART(LOWER(elig.criteria), LOWER('Exclusion Criteria'), '1')), '\s+', ' ', 'g') SIMILAR TO '%(" + params.tumorDiagnosis + ")%' ";
        //     query += "OR ";
        //     query += "LOWER(stud.brief_title) LIKE '%brain metastases%')"
        //     query += "AND ";
        // } else if (params.tumorDiagnosis.indexOf('sheath') != '-1') {
        //     query += "(regexp_replace(LOWER(SPLIT_PART(LOWER(elig.criteria), LOWER('Exclusion Criteria'), '1')), '\s+', ' ', 'g') SIMILAR TO '%(" + params.tumorDiagnosis + ")%' ";
        //     query += "OR ";
        //     query += "LOWER(stud.brief_title) LIKE '%malignant peripheral nerve sheath%')"
        //     query += "AND ";
        } else {
            query += "(regexp_replace(LOWER(SPLIT_PART(LOWER(elig.criteria), LOWER('Exclusion Criteria'), '1')), '\s+', ' ', 'g') SIMILAR TO '%(" + params.tumorDiagnosis + ")%' ";
            query += "OR ";
            query += "LOWER(stud.brief_title) LIKE '%" + params.tumorDiagnosis + "%') "
            query += "AND ";
        }
    }

    if (searchTerms.length > 0) {
        // query += ' AND ';
        query += "regexp_replace(LOWER(SPLIT_PART(LOWER(elig.criteria), LOWER('Exclusion Criteria'), '1')), '\s+', ' ', 'g') SIMILAR TO '%(" + searchTerms.join('|') + ")%' ";
    
        query += "AND regexp_replace(LOWER(SPLIT_PART(LOWER(elig.criteria), LOWER('Exclusion Criteria'), '2')), '\s+', ' ', 'g') NOT SIMILAR TO '%(" + searchTerms.join('|') + ")%' ";
        query += "AND ";
    }

    if (params.excludeResults) {
        const excludeString = params.excludeResults.join("','");
        query += "elig.nct_id NOT IN ('" + excludeString + "') ";
        query += "AND ";
    }
    

    if ( query.substr(-4).indexOf('AND') !== -1 ) {
        query = query.substr(0, query.length - 4);
    } else if ( query.substr(-6).indexOf('WHERE') !== -1  ) {
        query = query.substr(0, query.length - 6);
    }

    query += 'ORDER BY 1 DESC LIMIT 100';

    return query;
}

module.exports = { buildQuery };