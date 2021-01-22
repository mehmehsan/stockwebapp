import React, { useState } from "react";
import "./styles.css";
var date;

function App() {
  const [optn, setOptn] = useState();
  const [purchaseDate, setpurchaseDate] = useState();
  const[price,selectPrice]=useState(0);
const[numshares, showNumshares]= useState(0);
const[currentPrice,setcurrentPrice]=useState(0);
const[error,showError]=useState();

  function quantityHandler(e){
    var numshares = e.target.value;
    showNumshares(numshares);
  }


  function eventHandler(e) {
    var purchaseDate = e.target.value;
    setpurchaseDate(purchaseDate);

    var query =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:"+optn+"&apikey=LB6Q2SNMAOAPX513";
    
  fetch(query)
    .then((response) => response.json())
    .then((data) =>  {
      selectPrice((+data.["Time Series (Daily)"].[purchaseDate].["4. close"]).toFixed(3));
      
      fetch(query)
      .then((response) => response.json())
      .then((data) => {
        date = new Date();
        var curr_date = date.getDate()-1;
        var curr_month = date.getMonth() + 1; //Months are zero based
        if(curr_month<10)
        curr_month = "0"+ curr_month;
        var curr_year = date.getFullYear();
        date=curr_year + "-" + curr_month + "-" + curr_date;
     
        
       setcurrentPrice(data.["Time Series (Daily)"].[date].["4. close"]);
    
       })
    
      }
    )
    .catch((error)=>showError("Prices not available for Selected data",error))
  }
  
  return (
    <div className="App">
      <h1>Stock Market App</h1>
      <label> Select stock purchased : </label>
      <select onChange={(e) => setOptn(e.target.value)}>
        <option></option>
        <option> ITC </option>
        <option> INFY </option>
        <option> DABUR </option>
      </select>
      <br />
      <br />
      <label> Select quantity of stock purchased : </label>
      <input type="number" onChange={quantityHandler} />
      <br />
      <br />
      <label> Select date of stock purchased : </label>
      <input type="date" onChange={eventHandler} />

      <p> Stock : {optn} </p>
      <p> Per Share price : {price} as on {purchaseDate} </p>
      <p> Buying price : ₹ {numshares*price} /- </p>
      <p> Current Price : ₹ {numshares*currentPrice} /- </p>
      <p> Profit / Loss : ₹ {numshares*currentPrice-numshares*price} /- </p>
      {error}
    </div>
  );
}

export default App;
