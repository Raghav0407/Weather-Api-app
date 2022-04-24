import React, {useState} from 'react';
import './App.css';

const api ={
  key:"2efa227f341747b46ef4de2bd9108ef4",
  base:"https:://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});

  const dateBuilder=(d)=>{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];


    let day=days[d.getDay()];
    let month=months[d.getMonth()];
    let date=d.getDate();
    let year=d.getFullYear();
    
    return `${day} ${date} ${year} ${month}`;
  }
  const search =evt=>{
    if(evt.key==="Enter")
    {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res=>res.json)
        .then(result=>{
          setWeather(result);
          setQuery('');
        })
    }

  }
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input className="search-bar" type="text" placeholder='Search...'
          onChange={(e)=>setQuery(e.target.value)}
          onKeyPress={search} />
        </div>
        {(typeof weather.main!="undefined") ? (
          <div>
        <div className='location-box'>
          <div className='location'>{weather.name} {weather.sys.country}</div>
          <div className='date'>{dateBuilder(new Date())}</div>
        </div>
        <div className='weather-box'>
          <div className='temperature'>{Math.round(weather.main.temp)}*c</div>
          <div className='weather'>{weather.weather[0].main}</div>
        </div>
        </div>
        ) :('')}
      </main>
    </div>
  );
}

export default App;
