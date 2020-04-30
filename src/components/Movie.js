import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        maxWidth: 200,
    },
    text: {
        textAlign: 'center',
        fontSize: 15, 
    },
    media: {
        height: 270,
    },
});

const Movie = ({ movie, setMovieInfo, setMovieId }) => {
    const classes = useStyles();
    const handleSetMovie = () => {
        setMovieInfo(movie.info)
        setMovieId(movie.id)
    }
    return (
       
                <Grid item xs={6}>
                    <Card className={classes.root}>
                        <CardActionArea onClick={handleSetMovie}>
                            <CardMedia
                                className={classes.media}
                                image={movie.info.cover}
                                title={movie.info.name}
                            />
                            <CardContent>
                                <Typography gutterBottom className={classes.text} component="p">
                                    {movie.info.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

    );
}

export default Movie;