import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import CoinInfo from '../Components/CoinInfo';
import { SingleCoin } from '../config/api';
import { Crypto } from '../CryptoContext';
import parse from 'html-react-parser';


const CoinsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState()
  const {currency,setCurrency,symbol} = useContext(Crypto)
  const [loading, setLoading] = useState(false)





  const fetchCoin = async () =>{
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setLoading(false);
  }

  const useStyles = makeStyles((theme)=>(
    {
      container:{
        display:"flex",
        [theme.breakpoints.down("md")]:{
          flexDirection:"column",
          alignItems:"center",
        },//below md screens we apply styles like this
      },
        sidebar:{
          width:"30%",
          [theme.breakpoints.down("md")]:{
           width:"100%",

          },
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          marginTop:25,
          borderRight:"2px solid grey",
         },
         heading:{
          fontWeight:"bold",
          fontFamily:"Montserrat",
          marginBottom:20,
         },
         description:{
           width:"100%",
           fontFamily:"Montserrat",
           padding:25,
           paddingBottom:15,
           paddingTop:0,
           textAlign:"justify"

         },
         marketdata:{
           alignSelf:"start",
           padding:25,
           paddingTop:10,
           width:"100%",
           [theme.breakpoints.down("md")]:{
             display:"flex",
             justifyContent:"space-around",
           },
           [theme.breakpoints.down("sm")]:{
             flexDirection:"column",
             alignItems:"center",
           },
           [theme.breakpoints.down("xs")]:{
             alignItems:"start",
           }
         }
      }
    
  ));
  const classes = useStyles();
  useEffect(()=>{
     fetchCoin();
  },[]);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  console.log(coin)

  if(!coin) return <LinearProgress style={{backgroundColor:'gold'}}/> //while the coin is not populated we use linerprogress
  
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}> 
        <img 
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{marginBottom:20}}
        />
        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' className={classes.description}>
           {parse(`${coin?.description.en.split(". ")[0]}`)}
          {/* we take 0 th index of decription after splitting with . */}
        </Typography>
        <div className={classes.marketdata}>
          <span style={{display:"flex"}}>
            <Typography variant='h5' className={classes.heading}>Rank :</Typography>
            &nbsp;&nbsp;
            <Typography variant='h5' style={{fontFamily:"Montserrat"}}>{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant='h5' className={classes.heading}>Current Price :</Typography>
            &nbsp;&nbsp;
            <Typography variant='h5' style={{fontFamily:"Montserrat"}}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant='h5' className={classes.heading}>Market Cap :</Typography>
            &nbsp;&nbsp;
            <Typography variant='h5' style={{fontFamily:"Montserrat"}}>
              {symbol}{" "}
              {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}

export default CoinsPage