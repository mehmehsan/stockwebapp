import React, { useState } from "react";
import "./styles.css";
var date;
var plcolor;

function App() {
  const [optn, setOptn] = useState();
  const [purchaseDate, setpurchaseDate] = useState();
  const[price,selectPrice]=useState(0);
const[numshares, showNumshares]= useState(0);
const[currentPrice,setcurrentPrice]=useState(0);
const[error,showError]=useState();
const[symb,setSymb]=useState();

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
      showError();
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
     
        
       setcurrentPrice(data.["Time Series (Daily)"].["2021-01-21"].["4. close"]);
    
       })
    if(currentPrice>price){ plcolor ="green";
  setSymb("ᐃ");}
    else{ plcolor="red";
    setSymb("ᐁ");
  }
      }
    )
    .catch((error)=>{showError("Prices not available for Selected data",error);
   
})
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
        <option> MARICO </option>
        <option> LTI </option>
        <option> HCLTECH </option>
        <option> ASTRAL</option>
        <option> AARTIIND</option>
        <option> LT</option>
        <option> BAJFINANCE</option>
        <option> IOLCP</option>
        <option> HDFC</option>

      </select>
      <br />
      <br />
      <label> Select quantity of stock purchased : </label>
      <input type="number" onChange={quantityHandler} />
      <br />
      <br />
      <label> Select date of stock purchased : </label>
      <input type="date" onChange={eventHandler} />
    <div id="output">
      <p> Stock : {optn} </p>
      <br />
      <p> Per Share price : {price} as on {purchaseDate} </p>
      <p> Buying price : ₹ {numshares*price} /- </p>
      <p> Current Price : ₹ {numshares*currentPrice} /- </p>
      <p style={{color : plcolor }}>{symb} Profit / Loss : <strong> ₹ {numshares*currentPrice-numshares*price} /-</strong> </p>
      {error}
      </div>
    </div>
  );
}

export default App;
