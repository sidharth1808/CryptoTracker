import { ClassNames } from '@emotion/react'
import { makeStyles } from '@material-ui/core'
import { display, height } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../config/api'
import { Crypto } from '../../CryptoContext'


const useStyles = makeStyles(()=>({
    carousal: {
        height:"50%",
        display:"flex",
        alignItems:"center",

    },
    carousalItem:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        cursor:"pointer",
        textTransform:"uppercase",
        color:"white"
    },
}))

const Caoursal = () => {
    const classes = useStyles();
    const {currency,setCurrency,symbol} = useContext( Crypto )
    const [trending, setTrending] = useState([]);
    const fetchTrendingCoins = async () =>{
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };
    useEffect(()=>{
        fetchTrendingCoins();
    },[currency]);
    console.log(trending);


     function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    const items = trending.map((coins)=>{
        const profit = coins.price_change_percentage_24h >=0;
        console.log(profit)
        return(
            <Link 
            className={classes.carousalItem}
            to={`/coins/${coins.id}`}>
              <img 
              src={coins.image}
              alt={coins.name}
              height="80"
              style={{marginBottom:10}}
              />
              <span>
                  {coins?.symbol}
                  &nbsp;
                  <span 
                  style={{
                      color:profit>0? "rgb(14,203,129)":"red",
                      fontWeight:500,
                  }}
                  >
                    {profit && '+'}{coins?.price_change_percentage_24h?.toFixed(2)}%
                  </span>
              </span>
              <span style={{fontSize:22 , fontWeight:500}}>
                  {symbol}{numberWithCommas(coins?.current_price.toFixed(2))}

              </span>
            </Link>
        )
    })

    const responsive ={
        0:{
            items:2,
        },
        512:{
            items:4,
        },
    };
  return (
    <div className={classes.carousal}>
       <AliceCarousel 
       mouseTracking
       infinite
       autoPlayInterval={1000}
       animationDuration={1500}
       disableDotsControls
       disableButtonsControls
       responsive={responsive}
       autoPlay
       items={items}
       />
    </div>
  )
}

export default Caoursal