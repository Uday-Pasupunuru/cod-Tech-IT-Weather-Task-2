 const apiKey = "1459c7be10a7f99cbef7cd8060129789"; 
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function checkclimate(city) {
            try {
                const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
                if (!response.ok) throw new Error("City not found");
                const details = await response.json();

                const currentDate = new Date();
				const hours = String(currentDate.getHours()).padStart(2, '0'); // Ensure two digits
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');
                document.querySelector(".city").innerHTML = details.name;
                document.querySelector(".temp").innerHTML = Math.round(details.main.temp) + "°C";
                document.querySelector(".humidity").innerHTML = details.main.humidity + "%";
                document.querySelector(".wind").innerHTML = details.wind.speed + "km/hr";
                document.querySelector(".date").innerHTML =currentDate.toLocaleDateString(); 
                const weatherCondition = details.weather[0].main;
                if (weatherCondition === "Clouds") {
                    weatherIcon.src = "images/cloudy.png"; 
                } else if (weatherCondition === "Clear") {
                    weatherIcon.src = "images/sun.png";
                } else if (weatherCondition === "Rain") {
                    weatherIcon.src = "images/rain.png";
                    weatherIcon.src = "images/drizzle.png"; 
                } else if (weatherCondition === "Fog") {
                    weatherIcon.src = "images/fog.png"; 
                }else if (weatherCondition === "Snow") {
                    weatherIcon.src = "images/snow.png"; 
                }
                document.querySelector(".climate").style.display = "block";
                document.querySelector(".error").style.display = "none";
            } catch (error) {
                console.error(error);
                document.querySelector(".error").style.display = "block";
                document.querySelector(".climate").style.display = "none";
            }
        }

        searchBtn.addEventListener("click", () => {
            checkclimate(searchBox.value.trim());
        });

        searchBox.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                checkclimate(searchBox.value.trim());
            }
        });