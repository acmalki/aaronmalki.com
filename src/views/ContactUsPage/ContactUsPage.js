import React, {useContext} from "react"
import {Grid, isWidthUp, withStyles, withWidth} from "@material-ui/core";
import transitions from "@material-ui/core/styles/transitions";
import {FittedText, StyledText} from "../../components/Text";
import SendMessage from "./SendMessage";
import ShowGoogleMap from "./GoogleMaps/ShowGoogleMap";
import {colorScheme} from "../../constants";
import {AppContext} from "../../context";
import Paper from '@material-ui/core/Paper';

import BorderGuard from "../../components/BorderGuard/BorderGuard";
import {DB_NODES_PAGES, PUBLIC_PAGE_KEYS} from "../../constants/contants";
import SeoTags from "../../components/SeoTags/SeoTags";

const styles = theme => ({

    brandText: {
        fontFamily: "'Baloo Bhaijaan', cursive",
        fontWeight: 400,
        color: theme.palette.common.white
    },
    footerLinks: {
        marginTop: theme.spacing(2.5),
        marginBot: theme.spacing(1.5),
        color: theme.palette.common.white
    },
    infoIcon: {
        color: `${theme.palette.common.white} !important`,
        backgroundColor: "#33383b !important"
    },
    socialIcon: {
        fill: theme.palette.common.white,
        backgroundColor: "#33383b",
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
            backgroundColor: theme.palette.primary.light
        }
    },
    credential_container: {
        display: 'flex',
        height: '40%',
        fontSize: '20px',
        flexDirection: 'row'

    },
    socialIcon_container: {
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        cursor: "Pointer",
        color: theme.palette.common.white,
        transition: transitions.create(["color"], {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeIn
        }),
        "&:hover": {
            color: theme.palette.primary.light
        }
    },
    whiteBg: {
        backgroundColor: theme.palette.common.white
    },
    credentialsTitle_container: {
        display: "flex",
        flexDirection: "column"
    },
    mapAndForm_container: {
        justifyContent: 'center',
        width: '100%',
        // marginBottom: '45px',
        flexGrow: 1
    },

    map_footer: {},
    map_map: {
        height: '75%'
    },
    main_container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(6),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorScheme.other.backgroundComplementary,
        [theme.breakpoints.down("md")]: {
            paddingLeft: 0,
            paddingRight: 0,
        },


    },
    contact_container: {
        display: 'flex',
        width: '100%',
        height: '100%',


    },
    credentialname: {
        textAlign: 'left',
        color: theme.palette.common.white,
        fontFamily: 'airbnb-book',
        fontSize: '25px',
        letterSpacing: '1px',
        marginBottom: theme.spacing(.25),
        [theme.breakpoints.down("sm")]: {
            fontSize: '23px'
        },
    },
    address: {
        color: theme.palette.common.white,
        textAlign: 'left',
        width: '100%',
        height: '100%',
        margin: 0,
        fontFamily: 'airbnb-light',
        //border: `2px solid pink`,


    },
    address_container: {
        backgroundColor: colorScheme.secondary.dark,
        height: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
        // border: `2px solid pink`,
    },
    email: {
        color: theme.palette.common.white
    },
    phone: {
        textDecoration: 'none',
        color: theme.palette.common.white
    },
    msgAndMapContainer:{
        width: '100%',


        height:'100%',
        display:'flex',
        [theme.breakpoints.down("sm")]: {
            height: '575px'
        },
    }
});


const AnyReactComponent = ({text}) => <div>{text}</div>;

const LOS_ANGELES_CENTER = [37.806279, -122.423516];
const DEFAULT_ZOOM = 13;
const ContactUsPage = ({location, classes, theme, width, center, zoom}) => {

    const {
        pageState: {
            [DB_NODES_PAGES.settings]: {
                phoneNumber, email, address, companyName,
                seo: {
                    [PUBLIC_PAGE_KEYS.ContactUsPage]: {
                        title: googleSerpTitle,
                        description: googleSerpDescription
                    }
                }
            }
        },
    } = useContext(AppContext);


    return (
        <div className={classes.main_container}>
            {/*Page content in the Google SERP Listing*/}
            <SeoTags description={googleSerpDescription}
                     companyName={companyName}
                     title={googleSerpTitle}
                     path={location.pathname}

            />

            <BorderGuard/>


            <Grid container spacing={isWidthUp("md", width) ? 10 : 5} className={classes.mapAndForm_container}>

                <SendMessage md={6} lg={5} xl={5} sm={6} xs={12} className={classes.msgAndMapContainer}/>

                {/* The map and Location*/}
                <Grid item
                      md={6} lg={5} xl={5} sm={6} xs={12}
                      className={classes.msgAndMapContainer}

                 component={'div'}>
                    <Paper component={'div'} style={{height: '100%', width: '100%', display:'flex', flexDirection:'column'}}>
                        {/*The Map*/}
                        <div style={{height: '70%',display: 'flex'}}>
                            <ShowGoogleMap address={address} phoneNumber={phoneNumber} email={email}/>
                        </div>

                        {/*The Location*/}

                        <div className={classes.address_container}>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                height: "100%",
                                marginTop: "5%",
                                marginBottom: "5%",

                            }}>
                                <StyledText className={classes.credentialname}>Aaron Malki</StyledText>

                                <FittedText className={classes.address}>
                                    {address.line1} <br/>
                                    {address.line2} <br/>
                                    <a className={classes.phone} href={`tel:${phoneNumber.tel}`}> {phoneNumber.dash}</a>
                                    <br/>
                                    <a href={`mailto:${email}`}
                                       className={classes.email}>{email} </a>
                                </FittedText>
                            </div>
                        </div>
                    </Paper>

                </Grid>


            </Grid>
        </div>)

};

ContactUsPage.defaultProps = {
    center: {
        lat: 59.95,
        lng: 30.33
    },
    zoom: 11
};


export default withWidth()(withStyles(styles, {withTheme: true})(ContactUsPage));