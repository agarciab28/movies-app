import React, {useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '90%',
      },
    },
  }));

  
  

const Form = ({ usermail, setUserMail, setSits, sits}) => {
    const classes = useStyles();



    return (
        <div className={classes.root}>
            <TextField  name="usermail" id="usermail" label="Correo Electrónico" onChange={e => setUserMail(e.target.value)} value={usermail}/>
            <TextField  value={sits} name="sits" onChange={e => setSits(e.target.value)} label="Asientos" select >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
            </TextField>
        </div>
            
    );
}

export default Form;