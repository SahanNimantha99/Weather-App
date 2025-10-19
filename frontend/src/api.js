// src/api.js
export const fetchWeather = async () => {
  try {
    const response = await fetch("http://localhost:5000/weather"); // your BE endpoint
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    // Backend returns an array directly
    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Backend response is not an array:", data);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return [];
  }
};
