import React from "react";
import { WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiDaySunny } from "react-icons/wi";

const WeatherCard = ({ cityName, temp, status }) => {
    const getWeatherIcon = (status) => {
        const s = status.toLowerCase();
        if (s.includes("cloud")) return <WiCloudy size={50} color="#64748b" />;
        if (s.includes("rain")) return <WiRain size={50} color="#3b82f6" />;
        if (s.includes("snow")) return <WiSnow size={50} color="#60a5fa" />;
        if (s.includes("thunder")) return <WiThunderstorm size={50} color="#f97316" />;
        if (s.includes("fog") || s.includes("mist")) return <WiFog size={50} color="#94a3b8" />;
        return <WiDaySunny size={50} color="#facc15" />;
    };

    return (
        <div className="weather-card">
            <div className="city-name">{cityName}</div>
            <div className="weather-status">{status}</div>
            <div className="temp">{temp}°C</div>
            <div className="icon">{getWeatherIcon(status)}</div>
        </div>
    );
};

export default WeatherCard;
