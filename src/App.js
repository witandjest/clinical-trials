import React, { Component } from "react";

import Filters from "./components/Filters";
import Search from "./components/Search";
import Results from "./components/Results";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

class App extends Component {

    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></link>
                
                <Grid
                    container
                    padding={12}
                    style={{paddingTop: 20}}
                > 
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                    <h3 style={{fontFamily: 'Roboto'}}>Patient Information</h3>
                    <Card style={{overflow: 'visible'}}>
                        <CardContent>
                            <Grid
                                container
                                padding={12}
                                style={{paddingTop: 20}}
                            > 
                                <Grid item xs={1}></Grid>
                                <Grid item xs={10}>
                                    
                                </Grid>
                            </Grid>
                            <Filters />
                            <Grid
                                container
                                padding={12}
                                style={{paddingTop: 20}}
                            >   
                        {/* <Grid item xs={10}></Grid>
                            <Grid item xs={2}>
                                <Search />
                            </Grid> */}
                        </Grid>
                        </CardContent>
                    </Card>
                    </Grid>
                </Grid>
                <Grid
                    container
                    padding={12}
                    style={{paddingTop: 20}}
                >   
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <h3 style={{fontFamily: 'Roboto'}}>Search Results</h3>
                        <Results />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;