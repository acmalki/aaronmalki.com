import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
      color: "black"
  },
}));

function Main(props) {
  const classes = useStyles();
  const { posts, title} = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />

      {Object.keys(posts).map((key) => (
        <Markdown className={classes.markdown} key={key} children={posts[key].content}/>
      ))}
    </Grid>
  );
}

/*
Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};*/

export default Main;
