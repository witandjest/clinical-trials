import React, { Component } from "react";
import Button from '@material-ui/core/Button';
//import { processAndQuery } from '../integration/queries'

import '../styles/Search.css';

class Search extends Component {

    executeSearch () {
        console.log('Search');
       // processAndQuery();
    }

    render() {
        return (
            <div>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={this.executeSearch}
                  size="large"
                >
                  Search
                </Button>
            </div>
        );
    }
}

export default Search;