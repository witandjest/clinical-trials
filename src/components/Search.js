import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { CircularProgress, Typography } from '@material-ui/core';
//import { processAndQuery } from '../integration/queries'

import '../styles/Search.css';

class Search extends Component {

    executeSearch () {
        console.log('Search');
        // testGet();
       // processAndQuery();
    }

    render() {
        const { executeSearch, loading } = this.props;

        return (
            <div>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={executeSearch}
                  size="large"
                  disabled={loading}
                >
                 {loading ?
                    <CircularProgress size={14} /> :
                    <span>Search</span>}
                </Button>
            </div>
        );
    }
}

export default Search;