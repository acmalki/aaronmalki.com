import React from "react"
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {colorScheme} from "../../constants";

const useStyles = makeStyles((theme) => ({
    formPlug: {
        color:colorScheme.text.primary,
        fontFamily: 'airbnb-bold',
        fontSize: 23,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));


const FormPlug = ({message,style}) => {
    const classes = useStyles();

    return (
        <Typography component={'h2'} className={classes.formPlug} style={style}>
            {message}
        </Typography>
    )
};

export default FormPlug