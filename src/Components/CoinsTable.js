import { ClassNames } from '@emotion/react'
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import axios from 'axios'
import React, { useContext , useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CoinList } from '../config/api'
import { Crypto } from '../CryptoContext'


const CoinsTable = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const {currency,setCurrency,symbol} = useContext(Crypto) // use context api for using currency state, we should pass currency in the api call for coin list
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1);
  const history = useHistory();
  
  const useStyles = makeStyles(()=>({
    row:{
      backgroundColor:"#16171a",
      cursor:"pointer",
      "&:hover":{
        backgroundColor:"#131111",
      },
      fontFamily:"Montserrat",
    },
    pagination:{
      "& .MuiPaginationItem-root":{
        color:"gold"
      }
    }
  }));
  const classes = useStyles();

  const darkTheme = createTheme({
    palette:{
        primary:{
            main:"#fff",
        },
        type:"dark",
    },
});
  
  
  const fetchCoins = async() =>{
    setLoading(true);
     const { data } = await axios.get(CoinList(currency)); // { data } we are destructuring the 
     // output object we are getting from api call otherwise data.data
     setCoins(data);
     setLoading(false);
  };

  const handleSearch = () => {
    
    return coins.filter((coin)=>
      coin.name.toLowerCase().includes(searchKey) || coin.symbol.toLowerCase().includes(searchKey)
    );
   
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(()=>{
    fetchCoins();
  }, [currency]); // when currecny changes we have to fetch the coinlist

  //console.log(coins);
  return (
    
      <ThemeProvider theme={darkTheme}>
      <Container style={{textAlign:"center"}}>
        <Typography variant='h6'
        style={{
          fontFamily:"Montserrat",
          margin:18
        }}
        >
          Cryptocurrency Prices By Market Cap
        </Typography>
        <TextField 
        label="Search for a Cryptocurrency"
        variant="outlined"
        style={{width:"100%", marginBottom:20}}
        value={searchKey}
        onChange={(e)=>setSearchKey(e.target.value)}
        />
        <TableContainer >
          {
            loading?(
              <LinearProgress style={{backgroundColor:"gold"}}/>
            ):(
              <Table >
                <TableHead style={{backgroundColor:"#EEBC1D"}} >
                  <TableRow >
                    {["Coin","Price","24h Change","Market Cap"].map((head)=>(
                      <TableCell
                      style={{
                        color:"black",
                        fontFamily:"Montserrat",
                        fontWeight:700
                      }}
                      key={head}
                      align={head==="Coin"?"":"right"}
                      >{head}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row)=>{
                    
                    const profit = row.price_change_percentage_24h > 0;
                    
                    return(
                      <TableRow
                      onClick = {()=>history.push(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                      >
                        <TableCell component="th" scope="row"
                        style={{display:"flex",gap:15}}
                        >
                         
                         <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}} />
                         <div style={{
                           display:"flex",
                           flexDirection:"column",
                         }}>
                            <span style={{textTransform:"uppercase",fontSize:22}}>{row.symbol}</span>
                            <span style={{color:"darkgray"}}>{row.name}</span>
                         </div>

                        </TableCell>
                        <TableCell align="right">
                            {symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell align="right"
                        style={{
                          color:profit>0?"rgb(14,203,129)":"red",
                          fontWeight:500,
                        }}
                        >
                            {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right"
                       
                        >
                            {symbol}{" "}{numberWithCommas(row.market_cap.toString().slice(0,-6))}{" "}M
                        </TableCell>

                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )
          }
        </TableContainer>
        <Pagination 
        style={{
          padding:20,
          width:"100%",
          display:"flex",
          justifyContent:"center"

        }}
           className={classes.pagination}
           count={(handleSearch()?.length/10).toFixed(0)}
           onChange={(_,value)=>{
             setPage(value);
             window.scroll(0,450);

           }}
        />
      </Container>
      </ThemeProvider>
    
  )
}

export default CoinsTable
