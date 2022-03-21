import { BrowserRouter,  Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import CoinsPage from "./Pages/CoinsPage";
import HomePage from "./Pages/HomePage";
import { makeStyles } from '@material-ui/core/styles';

const useStyles   = makeStyles({
  App:{
    backgroundColor:"#14161a",
    color:"white",
    minHeight:"100vh",
  },
});

function App() {
  const classes = useStyles();
  return (
      
     <BrowserRouter> 
     {/* wraps the complete app with browserrouter so that we can implement routing */}
    <div className={classes.App}>
    <Header />
    <Switch >
    <Route path='/' exact>
      {/* exact path is used bcz '/ is also present in another pages so ' */}
      <HomePage/>
    </Route> 
    <Route path='/coins/:id'>
      <CoinsPage/>    
   </Route> 
   </Switch>
    {/* we dont know id of each coin so we keep it as :id, we can us useparams hook for accesing dynamic pieces of Url */}
    </div>
    </BrowserRouter>
    
  );
}

export default App;
