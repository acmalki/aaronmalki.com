import React from "react"
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextBlurbWithTitle from "../../../../components/TextBlurbWithTitle/TextBlurbWithTitle";
import FeaturedImage from "../../../../components/Image/FeaturedImage";
import {useMediaQuery} from "@material-ui/core";
import parseMultiPartTextToArray from "../../../../components/Utility/parseMultiPartTextToArray";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
    minMaxChoices: {
        width: '335px'
    }
}));


const IMG_1 = "src/resources/images/buyerview_image1.jpg";
const TITLE_1 = "Finding the Right Home.";
const BLURB_1 = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
in culpa qui officia deserunt mollit anim id est laborum.
`

const IMG_2 = "src/resources/images/buyerview_image1.jpg";
const TITLE_2 = "Where do I Start?";
const BLURB_2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sed leo dapibus, imperdiet tellus vel, tincidunt risus. Phasellus vitae elit in quam rutrum convallis non in ipsum. Phasellus nec justo id magna auctor tincidunt. In orci risus, venenatis a magna facilisis, feugiat mattis mi. Fusce luctus molestie nulla, quis dapibus augue eleifend nec. Cras finibus, est ac porta ultrices, ex odio mattis libero, eu suscipit purus lacus nec augue. Aliquam iaculis tincidunt faucibus. Nulla consequat ornare feugiat. Suspendisse porta dapibus turpis, sagittis vulputate massa maximus et. Pellentesque odio nulla, venenatis eget odio eu, rutrum vehicula ante. Praesent ut tempus lorem. Nullam quis nunc vestib elit at, pellentesque sem. Nulla posuere sit amet nisl at condimentum.";

const BuyerImageAndDescription = ({leftParagraph, leftPicture, leftTitle, rightParagraph, rightPicture, rightTitle}) => {

    const mobileBreak = useMediaQuery("only screen and (max-width: 900px)");

    const classes = useStyles();

    const leftParagraphArray = parseMultiPartTextToArray(leftParagraph);
    const rightParagraphArray = parseMultiPartTextToArray(rightParagraph);


    // Contact
    // Property Type

    return <div className={classes.root}>

        <Grid container spacing={mobileBreak? 3: 7}>
            <Grid sm={12} md={6} item>
                <TextBlurbWithTitle title={leftTitle} paragraphArray={leftParagraphArray}/>
            </Grid>
            <Grid sm={12} md={6} item>
                <FeaturedImage src={rightPicture} alt={'house_1'}/>
            </Grid>


            {!mobileBreak?<React.Fragment>
            <Grid sm={12} md={6} item  >
                <FeaturedImage src={leftPicture} alt={'house_2'}/>
            </Grid>
            <Grid sm={12} md={6} item>
                <TextBlurbWithTitle paragraphArray={rightParagraphArray} title={rightTitle}/>
            </Grid>
            </React.Fragment>
            :
            <React.Fragment>
            <Grid sm={12} md={6} item>
                <TextBlurbWithTitle paragraphArray={rightParagraphArray} title={rightTitle}/>
            </Grid>
            <Grid sm={12} md={6} item  >
                <FeaturedImage src={leftPicture} alt={'house_2'}/>
            </Grid>
            </React.Fragment>}



        </Grid>
    </div>

};


export default BuyerImageAndDescription;