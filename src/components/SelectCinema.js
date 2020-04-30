import React, { useEffect, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import db from '../firebase/firebase';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '100%',
    },
  }));


const SelectCinema = ({ setCinema, setCinemaInfo, cinema }) => {
    const classes = useStyles();
    const [cinemas, setCinemas] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getCinemas = async () => {
            var docRef = db.collection("cinemas");

            var cinemas = await docRef.get();
            var obj = [];
            for (const cinema of cinemas.docs) {
                obj.push({
                    id: cinema.id,
                    info: cinema.data(),
                })
            }
            setCinemas(obj);
        }
        getCinemas();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (e) => {
        const getCinemaInfo = async () => {
            var docRef = db.collection("cinemas");
            var res = await docRef.doc(e.target.value).get();

            setCinemaInfo({
                info: res.data(),
            });
        }

        getCinemaInfo();
        setCinema(e.target.value)
    }

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="cinemasSelect">Cine</InputLabel>
            <Select
                labelId="cinemasSelect"
                id="cinemasSelect"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={cinema}
                onChange={handleChange}
            >
                {cinemas.map(cinema => (
                    <MenuItem key={cinema.id} value={cinema.id}> {cinema.info.name} </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default SelectCinema;
