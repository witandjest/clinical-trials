import React, { Component } from "react";

import Filters from "./components/Filters";
import Search from "./components/Search";
import Results from "./components/Results";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { getTrials } from './repository'

let counter = 0;
function createData(name, criteria, link) {
  counter += 1;
  return { id: counter, name, criteria, link: 'dummylink.trial/' + link};
} 

class App extends Component {

    state = {
        results: [
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 305, 123),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 452, 124),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 262, 125),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 159, 126),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 356, 127),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 408, 128),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 237, 129),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 375, 130),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 518, 131),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 392, 132),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 318, 133),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 360, 134),
          createData('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ', 437, 135),
        ],
        filters: {
            age: '',
            sex: '',
            tumorDiagnosis: '',
            KPS: '',
            ECOG: '',
            molecularMarkers: '',
            primaryRecurrent: '',
            otherTrials: '',
            otherConditions: '',
            name: 't',
            labelWidth: 0
        },
        loading: false
    };

    updateState = event => {
        var filters = {...this.state.filters}
        filters[event.target.name] = event.target.value;
        this.setState({ filters });
    };

    executeSearch = () => {
        this.setState({
            loading: true
        });
        getTrials(this.state.filters)
            .then(results => {
                console.log('in the component;')
                console.log(results);

                this.setState(state => ({
                    ...state,
                    results,
                    loading: false
                }));

                // process results
                // store in state

                // on error, we don't need to do anything as state won't get overwritten 
             })
             .catch(error => {
                 console.log(error);
                 this.setState({
                     loading: false
                 });
             });
    }

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
                            <Filters 
                                filters={this.state.filters}
                                updateFilter={this.updateState}
                                executeSearch={this.executeSearch}
                                loading={this.state.loading}
                            />
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
                        <Results 
                            rows={this.state.results}
                            loading={this.state.loading}
                        />
                    </Grid>
                </Grid>
                <div style={{margin: 'auto', width: 'fit-content', padding: 30, fontFamily: 'Roboto'}}>
                    All data has been sourced from the AACT presented by the Clinical Trials Transformation Initiative. Accessible by link here: <a href="http://www.ctti-clinicaltrials.org">http://www.ctti-clinicaltrials.org</a>.
                </div>
            </div>
        );
    }
}

export default App;