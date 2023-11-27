
import React, { createContext, useState,useContext } from 'react'

const Stock=createContext();
const Stock_Context = ({children}) => {
    const[stock_price,setstock_price]=useState([]);
    const[history_loss,sethistory_loss]=useState([]);
    const[history_val,sethistory_val]=useState([]);
    const[StockCode,setStockCode]=useState('');
  return (
    <Stock.Provider value={[stock_price,setstock_price,StockCode,setStockCode,history_loss,history_val,sethistory_loss,sethistory_val]}>
      {children}
    </Stock.Provider>
  )
}
export const useStock = () => {
    return useContext(Stock);
  };

export default Stock_Context