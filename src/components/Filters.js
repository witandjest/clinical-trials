import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

import { List, ListSubheader } from '@material-ui/core';

import ConditionList from "./ConditionList";
import Search from "./Search";


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 280,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
});

class Filters extends React.Component {

    state = {
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
    };

    handleChange = event => {
        this.props.updateFilter(event);
    };

    render() {
        const { classes, filters, executeSearch, loading } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <Grid
                    container
                >
                    <Grid item xs={1} alignContent="left">
                        <FormControl className={classes.formControl}>
                            <TextField
                                style={{width:80}}
                                id="age-simple"
                                name="age"
                                label="Age"
                                className={classes.textField}
                                value={filters.age}
                                onChange={this.handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="sex-simple">Sex</InputLabel>
                            <Select
                                style={{width: 80}}
                                value={filters.sex}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'sex',
                                    id: 'sex-simple',
                                }}
                            >
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="tumor-simple">Tumor Diagnosis</InputLabel>
                            <Select
                                style={{width: 180}}
                                value={filters.tumorDiagnosis}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'tumorDiagnosis',
                                    id: 'tumor-simple',
                                }}
                            >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value={'giloma - grade i'}>Giloma - Grade I</MenuItem>
                            <MenuItem value={'giloma - grade ii'}>Giloma - Grade II</MenuItem>
                            <MenuItem value={'giloma - grade iii'}>Giloma - Grade III</MenuItem>
                            <MenuItem value={'giloma - grade iv'}>Giloma - Grade IV</MenuItem>
                            <MenuItem value={'meningioma'}>Meningioma</MenuItem>
                            <MenuItem value={'brain metastases'}>Brain metastases</MenuItem>
                            <MenuItem value={'schwannoma'}>Schwannoma</MenuItem>
                            <MenuItem value={'neurofibroma'}>Neurofibroma</MenuItem>
                            <MenuItem value={'malignant peripheral nerve sheath tumor'}>Malignant peripheral nerve sheath tumor</MenuItem>
                            </Select>
                        </FormControl> 
                    </Grid>
                    <Grid item xs={1}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="kps-simple">KPS</InputLabel>
                            <Select
                                style={{width: 80}}
                                value={filters.KPS}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'KPS',
                                    id: 'kps-simple',
                                }}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={40}>40</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={60}>60</MenuItem>
                                <MenuItem value={70}>70</MenuItem>
                                <MenuItem value={80}>80</MenuItem>
                                <MenuItem value={90}>90</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="ecog-simple">ECOG</InputLabel>
                            <Select
                                style={{width: 80}}
                                value={filters.ECOG}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'ECOG',
                                    id: 'ecog-simple',
                                }}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="molecularMarkers-simple">Molecular Markers</InputLabel>
                            <Select
                                style={{width: 180}}
                                value={filters.molecularMarkers}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'molecularMarkers',
                                    id: 'molecularMarkers-simple',
                                }}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={'braf +'}>BRAF +</MenuItem>
                                <MenuItem value={'braf -'}>BRAF -</MenuItem>
                                <MenuItem value={'mgmt methylation +'}>MGMT methylation +</MenuItem>
                                <MenuItem value={'mgmt methylation -'}>MGMT methylation -</MenuItem>
                                <MenuItem value={'ras pathway mutation'}>RAS Pathway mutation</MenuItem>
                                <MenuItem value={'raf pathway mutation'}>RAF Pathway mutation</MenuItem>
                                <MenuItem value={'mek pathway mutation'}>MEK Pathway mutation</MenuItem>
                                <MenuItem value={'erk pathway mutation'}>ERK Pathway mutation</MenuItem>
                                <MenuItem value={'nras mutation'}>NRAS mutation</MenuItem>
                                <MenuItem value={'kras mutation'}>KRAS mutation</MenuItem>
                                <MenuItem value={'nf1 mutation'}>NF1 mutation</MenuItem>
                                <MenuItem value={'nf2 mutation'}>NF2 mutation</MenuItem>
                            </Select>
                        </FormControl> 
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="primary-reccurrent-simple">Primary/Recurrent</InputLabel>
                            <Select
                                style={{width: 180}}
                                value={filters.primaryRecurrent}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'primaryRecurrent',
                                    id: 'primary-reccurrent-simple',
                                }}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="other-trials-simple">Enrolled in Other Trials</InputLabel>
                            <Select
                                style={{width: 190}}
                                value={filters.otherTrials}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'otherTrials',
                                    id: 'other-trials-simple',
                                }}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} style={{paddingTop: 20}}>
                        <ConditionList />
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={2} style={{paddingTop: 40, paddingLeft: 60}}>
                        <Search 
                            executeSearch={executeSearch}
                            loading={loading}
                        />
                    </Grid>
                </Grid>
            </form>
        )
    }

}

export default withStyles(styles)(Filters);