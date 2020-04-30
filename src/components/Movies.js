import React, { useState, useEffect, Fragment } from 'react';
import SelectCinema from './SelectCinema';
import ListMovies from './ListMovies';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ReactPlayer from 'react-player'
import PaymentCard from 'react-payment-card-component'
import { makeStyles } from '@material-ui/core/styles';
import db from '../firebase/firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '90%',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
    },
    videoPlayer: {
        marginBottom: 20,
    },

    text: {
        textAlign: 'justify',
        marginLeft: 20,
        marginRight: 20,
    },
    button: {
        marginBottom: 10,
        marginLeft: 130,
    },
    schedule: {
        marginLeft: 20,
    },
}));

const Movies = () => {
    const classes = useStyles();
    const [cinema, setCinema] = useState('GrsjgpSQWvtI5LTiyQPW');
    const [cinemainfo, setCinemaInfo] = useState({
        info: {
            name: "La Huerta",
            cost: 55,
        }
    });
    const [movies, setMovies] = useState([])
    const [movieinfo, setMovieInfo] = useState({});
    const [movieid, setMovieId] = useState('')
    const [open, setOpen] = useState(false);
    const [schedules, setSchedules] = useState({});
    const [movieschedules, setMovieSchedules] = useState({
        times: [],
    });
    const [selectedtime, setSelectedTime] = useState('');
    const [purchased, setPurchased] = useState(false);
    const [usermail, setUserMail] = useState('');

    const [sits, setSits] = useState('1');
    const [flip, setFlip] = useState(false);
    const paymentinfo = {
        bank: "default",
        model: "normal",
        type: "gold",
        brand: "mastercard",
        number: "4111111111111111",
        cvv: "202",
        holderName: "Alejandro García",
        expiration: "12/20",
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setMovieInfo({});
        setPurchased(false);
        setOpen(false);
    };


    useEffect(() => {
        const getCinemas = async () => {
            var docRef = db.collection("movies");

            var movies = await docRef.get();
            var obj = [];
            for (const movie of movies.docs) {
                obj.push({
                    id: movie.id,
                    info: movie.data(),
                })
            }
            setMovies(obj);
        }
        getCinemas();
    }, [])

    useEffect(() => {
        if (Object.keys(movieinfo).length === 0) return;

        handleOpen();
        // console.log(movieinfo);
        // console.log(movieid)
    }, [movieinfo]);

    useEffect(() => {
        const getSchedules = async () => {
            var docRef = db.collection("schedules");
            var res = await docRef.where("cinema", "==", cinema).get();

            setSchedules({
                id: res.docs[0].id,
                info: res.docs[0].data(),
            });
        }

        getSchedules();

    }, [cinema]);

    useEffect(() => {
        if (Object.keys(schedules).length === 0) return;
        const getMovieSchedules = () => {
            if (movieid === '') return;
            const movieData = schedules.info.schedule.find(scheduleData => {
                return scheduleData.movie === movieid;
            });
            setMovieSchedules(movieData)
            setMovieId('');
        }

        getMovieSchedules();
        //eslint-disable-next-line 
    }, [movieid]);

    const handleSubmit = e => {
        e.preventDefault();
    }

    const ModalInfo = () => {
        return (
            <Fragment>
                <ReactPlayer url={movieinfo.trailer} playing controls width="100%" height="200px" className={classes.videoPlayer} />
                {movieschedules.times.map(time => (
                    <Chip key={time} label={time} clickable variant="outlined" onClick={() => makePurchase(time)} className={classes.schedule} />
                ))}
                <h2 className={classes.text}> {movieinfo.name} </h2>
                <p className={classes.text}>{movieinfo.sinopsis}</p>
                <Button className={classes.button} variant="contained" onClick={handleClose} color="secondary">Cancelar</Button>
            </Fragment>
        )
    }


    const handleFlip = () => {
        setFlip(!flip);
    }

    const handlePurchase = () => {
        let total = parseInt(sits) * cinemainfo.info.cost;
        const setPurchase = async () => {
            var docRef = db.collection("purchases");
            await docRef.add({
                time: selectedtime,
                movie: movieinfo,
                userMail: usermail,
                paymentInfo: paymentinfo,
                cinema: cinemainfo.info.name,
                total: total,
            });
        }
        setPurchase();
        alert(`Compra confirmada a ${usermail}`)
        handleClose();
    }

    


    const ModalPayment = () => {
        return (
            <Fragment>
                <h2 className={classes.text}> Información de contacto </h2>
                <form className={classes.root} onSubmit={handleSubmit}>
                    <TextField name="usermail" id="usermail" label="Correo Electrónico" onChange={e => setUserMail(e.target.value)} value={usermail} />
                    <TextField value={sits} name="sits" onChange={e => setSits(e.target.value)} label="Asientos" select >
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
                    <PaymentCard
                        bank={paymentinfo.bank}
                        model={paymentinfo.model}
                        type={paymentinfo.type}
                        brand={paymentinfo.brand}
                        number={paymentinfo.number}
                        cvv={paymentinfo.cvv}
                        holderName={paymentinfo.holderName}
                        expiration={paymentinfo.expiration}
                        flipped={flip}
                    />
                    <Button variant="contained" onClick={handleFlip}>Voltear</Button>
                    <Button variant="contained" onClick={handlePurchase}>Pagar</Button>
                </form>
                <Button className={classes.button} variant="contained" onClick={handleClose} color="secondary">Cancelar</Button>
            </Fragment>
        )
    }

    const makePurchase = (time) => {
        setSelectedTime(time);
        setPurchased(true);
    };


    return (
        <div className="container">
            <SelectCinema
                setCinema={setCinema}
                setCinemaInfo={setCinemaInfo}
                cinema={cinema}
            />
            <ListMovies
                movies={movies}
                setMovieInfo={setMovieInfo}
                setMovieId={setMovieId}
            />
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {purchased ? <ModalPayment /> : <ModalInfo />}

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default Movies;