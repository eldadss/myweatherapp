import React, { useRef, useState } from 'react';
import './WeatherApp.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


    let api_key= "cbdaa17fecc925fbc0ca98c3ecf1df38";

function setIcon(icn){
    if(icn === "01d" || icn === "01n"){
                return(clear_icon);
            }
            else if(icn === "02d" || icn === "02n"){
                return(cloud_icon);
            }
            else if(icn === "03d" || icn === "03n"){
                return(drizzle_icon);
            }
            else if(icn === "04d" || icn === "04n"){
                return(drizzle_icon);
            }
            else if(icn === "09d" || icn === "09n"){
                return(rain_icon);
            }
            else if(icn === "10d" || icn === "10n"){
                return(rain_icon);
            }
            else if(icn === "13d" || icn === "13n"){
                return(snow_icon);
            }
            else{
                return(clear_icon);
            }
}


function WeatherApp() {
    const [output , setoutput] = useState({ location : '-' , temp : '-', wind : '-' , humidity : '-' , icon : clear_icon});
    const [ userInput , setuserInput ] = useState('');
    function handleinput(event){
        setuserInput(event.target.value);
       
    };
    
    const search = async () => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=Metric&appid=${api_key}`;
        let response =await fetch(url);
        console.log(response);
        console.log("break\n");
        let data = await response.json();
        console.log(data);
        setoutput({
            location :  data.name ,
            temp :  parseInt(data.main.temp) ,
            wind :  data.wind.speed ,
            humidity :  data.main.humidity ,
            icon : setIcon(data.weather.icon)
        })
        
    };
 return (
        <div className='container'> 
            <div className='top-bar' >
                <input type="text" className="cityInput" placeholder='Search..' onChange={handleinput} />
               <div className='search-icon' onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>

            <div className="weather-image">
                <img src={output.icon} alt="" />
            </div>

            <div className="weather-temp">{output.temp + " "}  °C </div>
            <div className="weather-location">{output.location}</div>

            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{output.humidity} %</div>
                        <div className="text"> Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{output.wind + " "} km/h</div>
                        <div className="text"> Wind Speed</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WeatherApp