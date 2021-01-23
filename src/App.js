import React, { useState } from "react";
import "./styles.css";

import "./stock.svg";
var date;

var plcolor;
var cntt=0;

function App() {
  
  const [optn, setOptn] = useState();
  const [purchaseDate, setpurchaseDate] = useState();
  const[price,selectPrice]=useState(0);
const[numshares, showNumshares]= useState(0);
const[currentPrice,setcurrentPrice]=useState(0);
const[error,showError]=useState();
const[symb,setSymb]=useState();
const[bck,setBck]=useState();
const[fnt,setFnt]=useState();
const[cnt,setCnt]=useState();
const[txtalign,setTxtalign]=useState("Normal mode");

function darkMode(){
 

if(cnt%2!==0){
    setBck("white");
    setFnt("black");    
    setTxtalign("right");}
    else{
      
    setBck("black");
    setFnt("white");
    setTxtalign("left");
    }
    setCnt(cntt++);

}

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
     
        
       setcurrentPrice(data.["Time Series (Daily)"].[date].["4. close"]);
    
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
    <div className="App" style={{background: bck,
    color:fnt }}>
     
      <button id="outerSwitch" style={{textAlign : txtalign
       }} onClick={darkMode} > <button id= "innerSwitch"></button> </button> 

      <br />
      <br />
    <br />
      <svg height="52" viewBox="0 0 512 512" width="52" xmlns="http://www.w3.org/2000/svg"><g id="Fill_out_line" data-name="Fill out line"><path d="m432 112v-88h-88v32h32l-96 96-80-80-120 120 24 24 96-96 80 80 120-120v32z" fill="#f35244"/><path d="m160 208h32v128h-32z" fill="#4db7e5"/><path d="m240 232h32v40h-32z" fill="#4db7e5"/><path d="m320 208h32v64h-32z" fill="#4db7e5"/><path d="m400 144h32v128h-32z" fill="#4db7e5"/><path d="m112 248h-32v120l32-32z" fill="#4db7e5"/><path d="m40 424h80v32h-80z" fill="#fca713"/><path d="m104 456h80v32h-80z" fill="#fca713"/><path d="m104 392h80v32h-80z" fill="#fca713"/><path d="m200 424h80v32h-80z" fill="#fca713"/><g fill="#f4c067"><path d="m184 456h80v32h-80z"/><path d="m184 392h80v32h-80z"/><path d="m120 424h80v32h-80z"/><path d="m120 360h80v32h-80z"/><path d="m24 456h80v32h-80z"/><path d="m24 392h80v32h-80z"/></g><path d="m272 424h184v64h-184z" fill="#80c326"/><path d="m434.56543 424a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709"/><path d="m344 424h32v64h-32z" fill="#fca713"/><path d="m304 360h184v64h-184z" fill="#80c326"/><path d="m466.56543 360a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709"/><path d="m376 360h32v64h-32z" fill="#fca713"/><path d="m272 296h184v64h-184z" fill="#80c326"/><path d="m434.56543 296a136.15545 136.15545 0 0 1 -110.03711 56h-52.52832v8h184v-64z" fill="#69a709"/><path d="m344 296h32v64h-32z" fill="#fca713"/><path d="m240 392h24v32h-24z" fill="#f5b142"/><path d="m256 424h24v32h-24z" fill="#ed8515"/><path d="m240 456h24v32h-24z" fill="#f5b142"/><path d="m160 456h24v32h-24z" fill="#ed8515"/><path d="m176 424h24v32h-24z" fill="#fca713"/><path d="m160 392h24v32h-24z" fill="#ed8515"/><path d="m80 456h24v32h-24z" fill="#f5b142"/><path d="m96 424h24v32h-24z" fill="#ed8515"/><path d="m80 392h24v32h-24z" fill="#f5b142"/><path d="m176 360h24v32h-24z" fill="#f5b142"/><path d="m480 352h-24v-56a8.00008 8.00008 0 0 0 -8-8h-184a8.00008 8.00008 0 0 0 -8 8v64a8.00008 8.00008 0 0 0 8 8h24v48h-16v-24a8.00008 8.00008 0 0 0 -8-8h-56v-24a8.00008 8.00008 0 0 0 -8-8h-80a8.00008 8.00008 0 0 0 -8 8v24h-88a8.00008 8.00008 0 0 0 -8 8v32a8.00008 8.00008 0 0 0 8 8h8v16h-8a8.00008 8.00008 0 0 0 -8 8v32a8.00008 8.00008 0 0 0 8 8h424a8.00008 8.00008 0 0 0 8-8v-56h24a8.00008 8.00008 0 0 0 8-8v-64a8.00008 8.00008 0 0 0 -8-8zm-40 0h-64v-48h64zm-64 64v-48h16v48zm-168 32v-16h64v16zm-16-16v16h-64v-16zm-80-16v-16h64v16zm0 16v16h-64v-16zm64 32v16h-64v-16zm16 0h64v16h-64zm80 0h8a8.00008 8.00008 0 0 0 8-8v-24h40v48h-56zm72-32h16v48h-16zm0-80v-48h16v48zm-72-48h56v48h-56zm32 64h56v48h-56zm-48 48h-64v-16h64zm-128-48h64v16h-64zm-96 32h64v16h-64zm0 64h64v16h-64zm408 16h-64v-48h64zm32-64h-64v-48h64z"/><path d="m120 336v-88a8.00008 8.00008 0 0 0 -8-8h-32a8.00008 8.00008 0 0 0 -8 8v120h16v-112h16v80z"/><path d="m200 336v-128a8.00008 8.00008 0 0 0 -8-8h-32a8.00008 8.00008 0 0 0 -8 8v128h16v-120h16v120z"/><path d="m280 272v-40a8.00008 8.00008 0 0 0 -8-8h-32a8.00008 8.00008 0 0 0 -8 8v40h16v-32h16v32z"/><path d="m360 272v-64a8.00008 8.00008 0 0 0 -8-8h-32a8.00008 8.00008 0 0 0 -8 8v64h16v-56h16v56z"/><path d="m440 272v-128a8.00008 8.00008 0 0 0 -8-8h-32a8.00008 8.00008 0 0 0 -8 8v128h16v-120h16v120z"/><path d="m98.34277 221.65674a8.00063 8.00063 0 0 0 11.31446 0l90.34277-90.34274 74.34277 74.34278a8.00122 8.00122 0 0 0 11.31446 0l106.34277-106.34278v12.686a8.00008 8.00008 0 0 0 8 8h32a8.00008 8.00008 0 0 0 8-8v-88a8.00008 8.00008 0 0 0 -8-8h-88a8.00008 8.00008 0 0 0 -8 8v32a8.00008 8.00008 0 0 0 8 8h12.68652l-76.68652 76.686-74.34277-74.34274a8.00122 8.00122 0 0 0 -11.31446 0l-120 120a8 8 0 0 0 0 11.31348zm101.65723-138.34274 74.34277 74.34278a8.00122 8.00122 0 0 0 11.31446 0l96-96a8.00038 8.00038 0 0 0 -5.65723-13.65678h-24v-16h72v72h-16v-24a8.0001 8.0001 0 0 0 -13.65723-5.65674l-114.34277 114.34274-74.34277-74.34278a8.00122 8.00122 0 0 0 -11.31446 0l-90.34277 90.34278-12.68652-12.686z"/></g></svg><label>           </label>
      <h1> Stock Market App </h1>
      <div id="input">
      <div> Select stock purchased</div>
      <br />
 
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
      <div> Select quantity of stock purchased</div>
      <br />
      <input type="number" onChange={quantityHandler} />
      <br />
      <br />
      <div> Select date of stock purchased</div>
      <br />
      <input type="date" onChange={eventHandler} />
      </div>
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
