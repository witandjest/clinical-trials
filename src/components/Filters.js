import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

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
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    };

    handleDelete = event => {
        console.log(event);
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <Grid
                    container
                   // direction="row"
                    //justify="center"
                    // alignItems="left"
                >
                    <Grid item xs={1} alignContent="left">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Age</InputLabel>
                            <Select
                                style={{width: 80}}
                                value={this.state.age}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="sex-simple">Sex</InputLabel>
                            <Select
                                style={{width: 80}}
                                value={this.state.sex}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'sex',
                                    id: 'sex-simple',
                                }}
                            >
                                <MenuItem value={'male'}>Male</MenuItem>
                                <MenuItem value={'female'}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="tumor-simple">Tumor Diagnosis</InputLabel>
                            <Select
                                style={{width: 240}}
                                value={this.state.tumorDiagnosis}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'tumorDiagnosis',
                                    id: 'tumor-simple',
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
                    <Grid item xs={1}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="kps-simple">KPS</InputLabel>
                            <Select
                                style={{width: 80}}
                                value={this.state.KPS}
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
                                value={this.state.ECOG}
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
                                style={{width: 240}}
                                value={this.state.molecularMarkers}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'molecularMarkers',
                                    id: 'molecularMarkers-simple',
                                }}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl> 
                    </Grid>
                    {/* <Grid item xs={3}></Grid>
                    <Grid item xs={1}></Grid> */}
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="primary-reccurrent-simple">Primary/Recurrent</InputLabel>
                            <Select
                                style={{width: 240}}
                                value={this.state.primaryRecurrent}
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
                                style={{width: 240}}
                                value={this.state.otherTrials}
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
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="ecog-simple">Other Comorbid Conditions</InputLabel>
                            <Select
                                style={{width: 240}}
                                value={this.state.otherConditions}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'otherConditions',
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
                    <Grid item xs={4}>
                        <Chip onDelete={this.handleDelete} variant="outlined" />
                    </Grid>
                </Grid>
            </form>
        )
    }

}

export default withStyles(styles)(Filters);