import React, { useEffect, useState } from 'react'
import Axios from 'axios'


function HistoryPage () {
  
  const [History,setHistory] =  useState([])
  
  useEffect(() => {
    Axios.get('/api/users/getHistory')
    .then(response => {
      if(response.data.success) {
        setHistory(response.data.history)
      } else {
        alert('failed to get history')
      }
    })
  },[])
  
  
  return (
    <div style={{width: '80%', margin: '3rem auto'}}>
      <div style={{textAlign:'center'}}>
        <h1>History</h1>
      </div>
      
      <table>
        <thead>
        <tr>
          <th>payment id</th>
          <th>price</th>
          <th>quantity</th>
          <th>daste of purchase</th>
          
        </tr>
        </thead>
        
        <tbody>
        {History.map(item => (
          <tr key={item._id}>
  
            <th>{item.paymentId}</th>
            <th>{item.price}</th>
            <th>{item.quantity}</th>
            <th>{item.dateOfPurchase}</th>
          </tr>
        ))}
        </tbody>
      </table>
      
    </div>
  )
}


export default HistoryPage
