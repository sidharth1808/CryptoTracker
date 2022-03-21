import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { HistoricalChart } from '../config/api';
import { Crypto } from '../CryptoContext';
import { chartDays } from '../config/Data';
import SelectButton from './SelectButton';

const CoinInfo = ({coin}) => {

const [historicData , setHistoricData ] = useState();
const [ days, setDays ] = useState(1);

const {currency,setCurrency,symbol} = useContext(Crypto);
const darkTheme = createTheme({
  palette:{
    primary:{
      main:"#fff",
    },
    type:"dark"
  
  },
});
const useStyles = makeStyles((theme)=>({
   container:{
     width:"75%",
     display:"flex",
     flexDirection:"column",
     alignItems:"center",
     justifyContent:"center",
     marginTop:25,
     padding:40,
     [theme.breakpoints.down("md")]:{
       width:"100%",
       marginTop:0,
       padding:20,
       paddingTop:0,
     }
   }
}))
const classes = useStyles();
const fetchHistoricData = async () => {
  const { data } = await axios.get(HistoricalChart(coin.id,days,currency));
  setHistoricData(data.prices)
}

useEffect(()=>{
  fetchHistoricData();
  
},[currency,days]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historicData ?(
            <CircularProgress 
            style={{color:"gold"}}
            size={250}
            thickness={1}
            />
          ):(
           <>
            <Line
             data={{
               labels:historicData.map((coin)=>{ // x coridnates
                 let date = new Date (coin[0]); // creating date from the historicdata array 0th pos is date
                 let time = date.getHours() > 12? `${date.getHours()-12}:${date.getMinutes()} PM` // check if it is greater than 12 , if it >12 use get hours and min and it is PM
                 :`${date.getHours()}:${date.getMinutes()} AM`;

                 return days ===1 ? time: date.toLocaleDateString();
               }),
               datasets:[
                 {
                   data:historicData.map((coin)=>coin[1]), // y cordinates
                   label:`Price (Past ${days} Days) in ${currency}`, // label above the graf
                   borderColor:"#EEBC1D" // golden colour to line
                 }
            ]
             }}
             options={{
               elements:{
                 point:{
                   radius:1, // for avoiding circle of some radius in the line
                 },
               },
             }}
            />
            <div
            style={{
              display:"flex",
              justifyContent:"space-around",
              width:"100%",
              marginTop:20

            }}
            >{chartDays.map(day=>(
              <SelectButton
              key={day.value}
              day={day}
              onClick={()=>setDays(day.value)}
              selected={day.value === days}
              />
            ))}</div>
            </>
          )
        }
       
      </div>

    </ThemeProvider>
  )
}

export default CoinInfo