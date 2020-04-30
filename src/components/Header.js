import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ setNextView, nextView }) => {
  const classes = useStyles();

  const changeView = () => {
    if (nextView === 'Proximos Estrenos') {
      setNextView('Cartelera');
    } else {
      setNextView('Proximos Estrenos')
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CNMA
          </Typography>
          <Button
            color="inherit"
            onClick={changeView}
          >{nextView}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;



