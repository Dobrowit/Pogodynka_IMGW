function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weatherData').style.display = 'none';
    document.getElementById('error').style.display = 'none';
}

function showError(message) {
    document.getElementById('error').textContent = message;
    document.getElementById('error').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('weatherData').style.display = 'none';
}

function showWeatherData() {
    document.getElementById('weatherData').style.display = 'grid';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'none';
}

function updateLastUpdate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('lastUpdate').textContent = `Ostatnia aktualizacja: ${timeString}`;
}

async function fetchWeatherData() {
    showLoading();
    
    try {
        const response = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
        if (!response.ok) {
            throw new Error('Problem z połączeniem z serwerem');
        }
        
        const data = await response.json();
        const lebaStation = data.find(station => station.id_stacji === "12120");
        
        if (!lebaStation) {
            throw new Error('Nie znaleziono danych dla stacji Łeba');
        }

        // Aktualizacja wartości
        document.getElementById('temperatura').textContent = `${lebaStation.temperatura}°C`;
        document.getElementById('wilgotnosc').textContent = `${lebaStation.wilgotnosc_wzgledna}%`;
        document.getElementById('cisnienie').textContent = `${lebaStation.cisnienie} hPa`;
        document.getElementById('predkosc_wiatru').textContent = `${lebaStation.predkosc_wiatru} m/s`;
        document.getElementById('kierunek_wiatru').textContent = `${lebaStation.kierunek_wiatru}°`;
        document.getElementById('suma_opadu').textContent = `${lebaStation.suma_opadu} mm`;

        updateLastUpdate();
        showWeatherData();
    } catch (error) {
        showError('Błąd podczas pobierania danych: ' + error.message);
    }
}

// Pobierz dane po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    // Ustaw odświeżanie co 60 sekund
    setInterval(fetchWeatherData, 60000);
});
