import React, { useState, useEffect } from 'react';
import ListMovies from './ListMovies';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core/styles';
import db from '../firebase/firebase';

const useStyles = makeStyles((theme) => ({
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
    // imageModal: {
    //     maxHeight: 200,
    //     maxWidth: '100%',
    //     marginBottom: 20,
    // },
    // image: {
    //     maxHeight: 200,
    //     minWidth: '100%',
    //     objectFit: 'cover',
    // },
    videoPlayer: {
        marginBottom: 20,
    },

    text: {
        textAlign: 'justify',
        marginLeft: 20,
        marginRight: 20,
    },
    schedule: {
        marginLeft: 20,
    },
}));

const NextMovies = () => {
    const classes = useStyles();
    const [movies, setMovies] = useState([])
    const [movieinfo, setMovieInfo] = useState({});
    const [movieid, setMovieId] = useState('')
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setMovieInfo({});
        setOpen(false);
    };

    useEffect(() => {
        const getCinemas = async () => {
            var docRef = db.collection("nextMovies");

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
    }, []);

    useEffect(() => {
        if (Object.keys(movieinfo).length === 0) return;
        console.log(movieid)
        handleOpen();
        //eslint-disable-next-line 
    }, [movieinfo]);


    return (
        <div className="container">
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
                        {/* <div className={classes.imageModal}>
                            <img src={movieinfo.cover} className={classes.image}/>
                        </div> */}
                        <ReactPlayer url={movieinfo.trailer} playing controls width="100%" height="200px" className={classes.videoPlayer} />
                        <h2 className={classes.text}> {movieinfo.name} </h2>
                        <p className={classes.text}>{movieinfo.sinopsis}</p>
                        <button onClick={handleClose}>Cancelar</button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default NextMovies;