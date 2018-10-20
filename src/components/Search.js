import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import '../styles/Search.css';

class Search extends Component {

    executeSearch () {
        console.log('Search');
    }

    render() {
        return (
            <div>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={this.executeSearch}
                >
                  Search
                </Button>
            </div>
        );
    }
}

export default Search;