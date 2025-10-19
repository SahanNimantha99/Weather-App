import express from "express";
import axios from "axios";
import NodeCache from "node-cache";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Read cities.json
const citiesData = JSON.parse(fs.readFileSync("cities.json", "utf-8"));
const cityIds = citiesData.List.map((city) => city.CityCode);

// GET /weather -> return weather info for all cities
app.get("/weather", async (req, res) => {
  try {
    const cached = cache.get("weatherData");
    if (cached) return res.json(cached);

    const weatherPromises = cityIds.map(async (id) => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
      return {
        CityCode: id,
        CityName: response.data.name,
        Temp: response.data.main.temp,
        Status: response.data.weather[0].description,
      };
    });

    const weatherData = await Promise.all(weatherPromises);
    cache.set("weatherData", weatherData);
    res.json(weatherData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch weather data." });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
