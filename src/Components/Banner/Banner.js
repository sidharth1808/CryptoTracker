import { Container, makeStyles, Typography } from '@material-ui/core'
import { display, flexbox, height } from '@mui/system'
import React from 'react'
import Caoursal from './Caoursal';



const useStyles = makeStyles(()=>({
    banner: {
        backgroundImage: "url(./crypto_banner.jpg)",
        
        
    },
    bannerContent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around"

    },
    tagline:{
        display:"flex",
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
       
      

    }
}));
const Banner = () => {
    const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                variant='h2'
                style={{
                    fontWeight:"bold",
                    marginBottom:15,
                    fontFamily:"Montserrat"
                }}
                >
                    CryptoTracker
                </Typography>
                <Typography
                variant='subtitle2'
                style={{
                    color:"gold",
                    textTransform:"capitalize",
                    fontFamily:"Montserrat"
                }}
                >
                Get all info regarding your favourite Cryptocurrency
                </Typography>
                
            </div>
            <Caoursal />

        </Container>
    </div>
  )
}

export default Banner