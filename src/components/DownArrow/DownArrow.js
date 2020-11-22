import React, {useEffect, useRef, useState} from "react";
import {BsArrowDown} from "react-icons/bs";
import {makeStyles} from '@material-ui/core/styles';
import {animated, useSpring} from 'react-spring'
import {Button, useMediaQuery} from "@material-ui/core";
import {animateScroll as scroll, Events, scrollSpy} from 'react-scroll';
import {useWindowSize} from "../useWindowSize";

const PAGE_HEIGHT = window.innerHeight;
//https://react-icons.github.io/search

const useStyles = makeStyles({
    downArrow_container: {
        marginTop: '45px',
        justifySelf: "flex-end",
        borderRadius: "50%",
        width: "65px",
        height: "65px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "rgba(0, 0, 0, 0.1)"
        }
    },
    downArrow_icon: {
        verticalAlign: "baseline",
        display: "inline-block"
    },

});

const interp = i => r => `translate3d(0, ${15 * Math.sin(r + (i * 2 * Math.PI) / 1.6)}px, 0)`


const DownArrow = ({posnOfContainter}) => {
    const [toggle, setToggle] = useState(false);
    const [posn, setPosn] = useState(window.pageYOffset);
    const inputRef = useRef();
    const mobileBreak = useMediaQuery("only screen and (max-width: 600px)");
    const {height} = useWindowSize();

    useEffect(() => {
        const invtl = setInterval(() => {
            console.log("toggle")
            setToggle(setToggle(!toggle))
        }, 3000);

        return () => clearInterval(invtl)
    }, [])


    useEffect(() => {
        console.log(`Container: DownArrow ${posnOfContainter}`)
    }, [posnOfContainter])

    useEffect(() => {
        console.log(`DownArrow ${inputRef.current.offsetTop}`);

    }, [inputRef])
    useEffect(() => {
        console.log(`Posn ${JSON.stringify(posn)}`);

        Events.scrollEvent.register('begin', function (to, element) {
            //console.log('begin', arguments);
        });

        Events.scrollEvent.register('end', function (to, element) {
            // console.log('end', arguments);
        });

        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        }
    }, [])

    const {radians, color} = useSpring({
        to: async (next) => {
            await next({radians: 1 * Math.PI, color: "black"})

        },
        reverse: toggle,
        immediate: false,
        from: {radians: 0, color: "white"},
        config: {precision: .1, velocity: 5, mass: 10, tension: 300, friction: 90},
        reset: true,
    });

    const onPress = () => {

        // checks if we have a target position to scroll to, otherwise scross to bottom of current container
        //inputRef.current.offsetY
        if (posnOfContainter !== null) {
            scroll.scrollTo(height -28);

        }


    };


    const classes = useStyles();
    return (
        <Button
            ref={inputRef}
            onClick={onPress}
            focusRipple
            className={classes.downArrow_container} style={{border:false && `3px solid rgba(112,134,144,.85)`}}
        >
            {/*size={30} color='aliceblue' style={{ ... }} (in pixels)*/}
            <animated.div className="script-bf-box" style={{transform: radians.interpolate(interp(0))}}>
                <BsArrowDown color={"white"} size={40}
                             className={classes.downArrow_icon}/>
            </animated.div>

        </Button>
    )
};

//      <animated.div class="av" style={{ transform: avSize, justifySelf: delta[0] < 0 ? 'end' : 'start' }} />


//<animated.div key={i} className="script-bf-box" style={{ transform: radians.interpolate(interp(i)) }} />

export default DownArrow;