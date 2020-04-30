import React from 'react';
import Movie from './Movie';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    divClass: {
        marginTop: 20,
        flexGrow: 1,
    },
});


const ListMovies = ({ movies, setMovieInfo, setMovieId }) => {
    const classes = useStyles();
    return (
        <div className={classes.divClass}>
            <Grid container spacing={1}>
                {movies.map(movie => (
                    <Movie
                        key={movie.id}
                        movie={movie}
                        setMovieInfo={setMovieInfo}
                        setMovieId={setMovieId}
                    />
                ))}
            </Grid>
        </div>
    );
}

export default ListMovies;