import { makeStyles } from '@material-ui/core'
import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react'

const SelectButton = ({day, onClick , selected}) => {
    const useStyles = makeStyles({
      selectButton:{
          border:"1px solid gold",
          borderRadius:5,
          padding:10,
          paddingLeft:20,
          paddingRight:20,
          fontFamily:"Montserrat",
          cursor:"pointer",
          backgroundColor:selected?"gold":"",
          color:selected?"black":"",
          fontWeight:selected?700:500,
          "&:hover":{
              backgroundColor:"gold",
              color:"black",
          },
          width:"22%"

      }
      

    });
    const classes = useStyles();
  return (
    <span onClick={onClick} className={classes.selectButton}>{day.label}</span>
  )
}

export default SelectButton