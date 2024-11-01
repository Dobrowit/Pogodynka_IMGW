// Załadowanie kodów TERYT
import { warnTERdata, warnWOJdata } from "./kody-teryt.js";

async function fetchStations() {
    const stationSelectElement = document.getElementById('stationSelect');
    const metStationSelectElement = document.getElementById('metStationSelect');
    const hydroStationSelectElement = document.getElementById('hydroStationSelect');
    const warnTERSelectElement = document.getElementById('warnTERSelect');
    const warnWOJSelectElement = document.getElementById('warnWOJSelect');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    // Wyświetl komunikat ładowania
    loadingElement.style.display = 'block';
    stationSelectElement.style.display = 'none';
    metStationSelectElement.style.display = 'none';
    hydroStationSelectElement.style.display = 'none';
    warnTERSelectElement.style.display = 'none';
    warnWOJSelectElement.style.display = 'none';
    errorElement.style.display = 'none';
    
    try {
        // Pobranie danych stacji synoptycznych
//         const responseSyn = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
//         if (!responseSyn.ok) {
//             throw new Error('Problem z połączeniem z serwerem dla stacji meteorologicznych');
//         }
//         const synData = await responseSyn.json();
// 
//         // Pobranie danych stacji meteorologicznych
//         const responseMet = await fetch('https://danepubliczne.imgw.pl/api/data/meteo');
//         if (!responseMet.ok) {
//             throw new Error('Problem z połączeniem z serwerem dla stacji meteorologicznych');
//         }
//         const metData = await responseMet.json();
// 
//         // Pobranie danych stacji hydrologicznych
//         const responseHydro = await fetch('https://danepubliczne.imgw.pl/api/data/hydro');
//         if (!responseHydro.ok) {
//             throw new Error('Problem z połączeniem z serwerem dla stacji hydrologicznych');
//         }
//         const hydroData = await responseHydro.json();

        const [synopResponse, meteoResponse, hydroResponse, hydro2Response] = await Promise.all([
            fetch("https://danepubliczne.imgw.pl/api/data/synop"),
            fetch("https://danepubliczne.imgw.pl/api/data/meteo"),
            fetch("https://danepubliczne.imgw.pl/api/data/hydro")
        ]);

        const synData = await synopResponse.json();
        const metData = await meteoResponse.json();
        const hydroData = await hydroResponse.json();
        
        // Sortowanie danych alfabetycznie
        synData.sort((a, b) => a.stacja.localeCompare(b.stacja));
        metData.sort((a, b) => a.nazwa_stacji.localeCompare(b.nazwa_stacji));
        hydroData.sort((a, b) => a.stacja.localeCompare(b.stacja));
        warnTERdata.sort((a, b) => a.nazwa.localeCompare(b.nazwa));

        // Dodanie stacji meteorologicznych do menu rozwijanego
        synData.forEach(station => {
            const option = document.createElement('option');
            option.value = station.id_stacji;
            option.textContent = `${station.stacja} (id: ${station.id_stacji})`;
            stationSelectElement.appendChild(option);
        });
        
        // Dodanie stacji meteorologicznych do menu rozwijanego
        metData.forEach(station => {
            const option = document.createElement('option');
            option.value = station.kod_stacji;
            option.textContent = `${station.nazwa_stacji} (id: ${station.kod_stacji})`;
            metStationSelectElement.appendChild(option);
        });

        // Dodanie stacji hydrologicznych do menu rozwijanego
        hydroData.forEach(hydroStation => {
            const option = document.createElement('option');
            option.value = hydroStation.id_stacji;
            option.textContent = `${hydroStation.stacja} - ${hydroStation.rzeka} (id: ${hydroStation.id_stacji})`;
            hydroStationSelectElement.appendChild(option);
        });

        // Dodanie powiatów
        warnTERdata.forEach(warnTER => {
            const option = document.createElement('option');
            option.value = warnTER.kod_teryt;
            option.textContent = `${warnTER.nazwa} (teryt: ${warnTER.kod_teryt})`;
            warnTERSelectElement.appendChild(option);
        });

        // Dodanie woj.
        warnWOJdata.forEach(warnWOJ => {
            const option = document.createElement('option');
            option.value = warnWOJ.nazwa.toLowerCase();
            option.textContent = `${warnWOJ.nazwa.toLowerCase()} (teryt: ${warnWOJ.kod_teryt})`;
            warnWOJSelectElement.appendChild(option);
        });
                    
        // Pokaż listy rozwijane
        loadingElement.style.display = 'none';
        stationSelectElement.style.display = 'block';
        metStationSelectElement.style.display = 'block';
        hydroStationSelectElement.style.display = 'block';
        warnTERSelectElement.style.display = 'block';
        warnWOJSelectElement.style.display = 'block';
    } catch (error) {
        errorElement.textContent = 'Błąd podczas pobierania danych: ' + error.message;
        errorElement.style.display = 'block';
        loadingElement.style.display = 'none';
    }
}

function showStation() {
    const stationId = document.getElementById('stationSelect').value;
    const metStationId = document.getElementById('metStationSelect').value;
    const hydroStationId = document.getElementById('hydroStationSelect').value;
    const warnTERId = document.getElementById('warnTERSelect').value;
    const warnWOJId = document.getElementById('warnWOJSelect').value;

    if (stationId || hydroStationId) {
        window.location.href = `pogodynka-imgw.html?synopId=${stationId}&meteoId=${metStationId}&hydroId=${hydroStationId}&warnTER=${warnTERId}&warnWOJ=${warnWOJId}`;
        console.log('pogodynka-imgw.html?synopId=${stationId}&meteoId=${metStationId}&hydroId=${hydroStationId}&warnTER=${warnTERId}&warnWOJ=${warnWOJId}')
    } else {
        alert('Proszę wybrać przynajmniej jedną stację.');
    }
}

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', fetchStations);
