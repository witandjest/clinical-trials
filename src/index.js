import React from "react";
import ReactDOM from "react-dom";

import Filters from "./components/Filters";
import Search from "./components/Search";

import Grid from '@material-ui/core/Grid';

ReactDOM.render(
    <div>
        <Filters />
        <Grid
            container
            padding={12}
            style={{paddingTop: 20}}
        >   
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
                <Search />
            </Grid>
        </Grid>
    </div>, 
    document.getElementById("root")
);