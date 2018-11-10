import React, { Component } from "react";

import Filters from "./components/Filters";
import Search from "./components/Search";
import Results from "./components/Results";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import keycode from 'keycode';

import { getTrials } from './repository'

let counter = 0;
function createData(name, criteria, link) {
  counter += 1;
  return { id: counter, name, criteria, link: 'dummylink.trial/' + link};
} 

class App extends Component {

    state = {
        results: [],
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
        loading: false,
        selectedItem: []
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

        let filterData = this.state.filters;
        filterData['otherConditions'] = this.state.selectedItem;
        getTrials(filterData)
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

    handleKeyDownMulti = ( event, inputValue ) => {
        const { selectedItem } = this.state;
        if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
            this.setState({
                selectedItem: selectedItem.slice(0, selectedItem.length - 1),
            });
        }
    };
    
    handleChangeMulti = item => {
        let { selectedItem } = this.state;
    
        if (selectedItem.indexOf(item) === -1) {
          selectedItem = [...selectedItem, item];
        }
    
        this.setState({
          selectedItem,
        });

        console.log(this.state.selectedItem);
    };
    
    handleDeleteMulti = item => () => {
        this.setState(state => {
          const selectedItem = [...state.selectedItem];
          selectedItem.splice(selectedItem.indexOf(item), 1);
          return { selectedItem };
        });
    };

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
                                selectedItem={this.state.selectedItem}
                                handleKeyDownMulti={this.handleKeyDownMulti}
                                handleChangeMulti={this.handleChangeMulti}
                                handleDeleteMulti={this.handleDeleteMulti}
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