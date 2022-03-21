import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Crypto } from '../CryptoContext';



const useStyles = makeStyles(()=>({    // useStyles from material ui in which we can we can provide a classname and define 
                                       // our styles
    title:{
        flex:1, //spread to full width
        color:"gold",
        fontFamily:"Montserrat",
        fontWeight:"bold",    
        cursor:"pointer",
    }
}))

const Header = () => {
    const classes = useStyles(); // calsses is the object
    const history = useHistory(); // for redirecting to different pages from react router dom

    const {currency,setCurrency} = useContext(Crypto);
    console.log(currency);
    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            type:"dark",
        },
    });
  return (
      <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
        <Container> 
            {/* container helps to make our content responsive */}
            
            <Toolbar>
                <Typography 
                onClick={()=>history.push("/")}
                className={classes.title}
                variant='h6'
                
                >CryptoTracker</Typography>
                <Select
                  variant="outlined"
                  value={currency}
                  onChange={(e)=>setCurrency(e.target.value)}
                  style={{
                      width:100,
                      height:40,
                      marginRight:15
                  }}
                >
                    <MenuItem  value={"USD"}>USD</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header