import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

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
        name: 't',
        labelWidth: 0
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Age</InputLabel>
                            <Select
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
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Age</InputLabel>
                            <Select
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
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Age</InputLabel>
                            <Select
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
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Age</InputLabel>
                            <Select
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
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Age</InputLabel>
                            <Select
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
                    <Grid item xs={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Age</InputLabel>
                            <Select
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
                </Grid>
            </form>
        )
    }

}

export default withStyles(styles)(Filters);