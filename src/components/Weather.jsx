import React, { useEffect ,useRef,useState} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import clear2_icon from '../assets/clear2.png'
import fewclouds_icon from '../assets/fewclouds.png'
import fewclouds2_icon from '../assets/fewclouds2.png'
import scatteredclouds_icon from '../assets/scatteredclouds.png'
import scatteredclouds2_icon from '../assets/scatteredclouds2.png'
import brokenclouds_icon from '../assets/brokenclouds.png'
import brokenclouds2_icon from '../assets/brokenclouds2.png'
import showerrain_icon from '../assets/showerrain.png'
import showerrain2_icon from '../assets/showerrain2.png'
import rain_icon from '../assets/rain.png'
import rain2_icon from '../assets/rain2.png'
import thunderstrom_icon from '../assets/thunderstrom.png'
import thunderstrom2_icon from '../assets/thunderstrom2.png'
import snow_icon from '../assets/snow.png'
import snow2_icon from '../assets/snow2.png'
import mist_icon from '../assets/mist.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {
    const inputRef=useRef()
    const [weatherData, setWeatherData] = useState(false);
    const allIcons={
        "01d":clear_icon,
        "01n":clear2_icon,
        "02d":fewclouds_icon,
        "02n":fewclouds2_icon,
        "03d":scatteredclouds_icon,
        "03n":scatteredclouds2_icon,
        "04d":brokenclouds_icon,
        "04n":brokenclouds2_icon,
        "09d":showerrain_icon,
        "09n":showerrain2_icon,
        "10d":rain_icon,
        "10n":rain2_icon,
        "13d":snow_icon,
        "13n":snow2_icon,
        "50d":mist_icon,
        "50n":mist_icon,

    }
    const search=async(city)=>{
        if(city===""){
            alert("Enter city Name");
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return; 
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon]||clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch(error){
            setWeatherData(false);
            console.error("Error in Fetching Data")
    }
}
    useEffect(()=>{
        search("NewYork");
    },[])
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
            <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icon} alt=""/>
                <div>
                    <p>{weatherData.humidity}</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={wind_icon} alt=""/>
                <div>
                    <p>{weatherData.windSpeed}</p>
                    <span>wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
        
    </div>
  )
}

export default Weather
