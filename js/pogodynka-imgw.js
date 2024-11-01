const REFRESH_INTERVAL = 60000;
// Domyślne identyfikatory stacji
const defaultSynopId = "12120";
const defaultMeteoId = "354170120";
const defaultHydroId = "154170100";
// Teryt (4 pierwsze cyfry) i woj. dla których wyświetlą się ostrezżenia
const defaultWarnTER = "2208";
const defaultWarnWOJ = "pomorskie"

// Pobieranie zmiennych z URLa
const urlParams = new URLSearchParams(window.location.search);
const synopId = urlParams.get('synopId') || defaultSynopId;
const meteoId = urlParams.get('meteoId') || defaultMeteoId;
const hydroId = urlParams.get('hydroId') || defaultHydroId;
const warnTER = urlParams.get("warnTER") || defaultWarnTER;
const warnWOJ = urlParams.get("warnWOJ") || defaultWarnWOJ;

// Pobranie kodów TERYT
import { warnTERdata } from "./kody-teryt.js";
    
// Funkcja do pobierania danych z API
async function fetchData() {
    console.log("Załadunek danych...");
    try {
        const [synopResponse, meteoResponse, hydroResponse, hydro2Response] = await Promise.all([
            fetch("https://danepubliczne.imgw.pl/api/data/synop"),
            fetch("https://danepubliczne.imgw.pl/api/data/meteo"),
            fetch("https://danepubliczne.imgw.pl/api/data/hydro"),
            fetch("https://danepubliczne.imgw.pl/api/data/hydro2")
        ]);
        const synopData = await synopResponse.json();
        const meteoData = await meteoResponse.json();
        const hydroData = await hydroResponse.json();
        const hydro2Data = await hydroResponse.json();

        // const synopResponse = await fetch("https://danepubliczne.imgw.pl/api/data/synop");
        // const synopData = await synopResponse.json();
        // const meteoResponse = await fetch("https://danepubliczne.imgw.pl/api/data/meteo");
        // const meteoData = await meteoResponse.json();
        // const hydroResponse = await fetch("https://danepubliczne.imgw.pl/api/data/hydro");
        // const hydroData = await hydroResponse.json();
        // const hydro2Response = await fetch("https://danepubliczne.imgw.pl/api/data/hydro2");
        // const hydro2Data = await hydro2Response.json();
        
        const selectedSynop = synopData.find(station => station.id_stacji === synopId);
        const selectedMeteo = meteoData.find(station => station.kod_stacji === meteoId);
        const selectedHydro = hydroData.find(station => station.id_stacji === hydroId);
        const selectedHydro2 = hydro2Data.find(station => station.kod_stacji === hydroId);
        fetchWarnings();
        displayData(selectedSynop, selectedMeteo, selectedHydro, selectedHydro2);
    } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
    }
}

// Funkcja do wyświetlania danych na stronie
function displayData(synopData, meteoData, hydroData, hydro2Data) {
    const synopElement = document.getElementById('synopData');
    if (synopData) {
        synopElement.innerHTML = `
<div class="container">
    <div class="header">
        <h1 class="title">Dane SYNOPTYCZNE</h1>
    </div>
    <div id="weatherData" class="weather-grid" style="display: grid;">      
        <div class="weather-item">
            <div class="weather-label">Stacja:</div>
            <div class="weather-value">${synopData.stacja}</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Czas pomiaru:</div>
            <div class="weather-value">${synopData.data_pomiaru}, godz. ${synopData.godzina_pomiaru}.</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Temperatura:</div>
            <div class="weather-value">${synopData.temperatura} °C</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Prędkość wiatru:</div>
            <div class="weather-value">${synopData.predkosc_wiatru} m/s</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Kierunek wiatru:</div>
            <div class="weather-value">${synopData.kierunek_wiatru} °</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Wilgotność względna:</div>
            <div class="weather-value">${synopData.wilgotnosc_wzgledna} %</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Suma opadu:</div>
            <div class="weather-value">${synopData.suma_opadu} mm</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Ciśnienie:</div>
            <div class="weather-value">${synopData.cisnienie} hPa</div>
        </div>
    </div>
</div>`;
            console.log("id stacji synoptycznej:", synopData.id_stacji)
    } else {
        synopElement.innerHTML = `<h2>Dane SYNOP</h2><p>Brak danych dla podanego ID.</p>`;
    }

    const meteoElement = document.getElementById('meteoData');
    if (meteoData) {
        meteoElement.innerHTML = `
<div class="container">
    <div class="header">
        <h1 class="title">Dane METEOROLOGICZNE</h1>
    </div>
    <div id="weatherData" class="weather-grid" style="display: grid;">      
        <div class="weather-item">
            <div class="weather-label">Stacja:</div>
            <div class="weather-value">${meteoData.nazwa_stacji}</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Temperatura gruntu:</div>
            <div class="weather-value">${meteoData.temperatura_gruntu} °C</div>
            <div class="weather-date">${meteoData.temperatura_gruntu_data}</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Kierunak wiatru:</div>
            <div class="weather-value">${meteoData.wiatr_kierunek} °</div>
            <div class="weather-date">${meteoData.wiatr_kierunek_data}</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Średnia prędkość wiatru:</div>
            <div class="weather-value">${meteoData.wiatr_srednia_predkosc} m/s</div>
            <div class="weather-date">${meteoData.wiatr_srednia_predkosc_data}</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Maksymalna prędkość wiatru:</div>
            <div class="weather-value">${meteoData.wiatr_predkosc_maksymalna} m/s</div>
            <div class="weather-date">${meteoData.wiatr_predkosc_maksymalna_data}</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Wilgotność względna:</div>
            <div class="weather-value">${meteoData.wilgotnosc_wzgledna} %</div>
            <div class="weather-date">${meteoData.wilgotnosc_wzgledna_data}</div>
        </div>
        ${meteoData.wiatr_poryw_10min !== null ? `
        <div class="weather-item">
            <div class="weather-label">Porywy wiatu (10 min):</div>
            <div class="weather-value">${meteoData.wiatr_poryw_10min} m/s</div>
            <div class="weather-date">${meteoData.wiatr_poryw_10min_data}</div>
        </div>
        ` : ''}
        ${meteoData.opad_10min !== null ? `
        <div class="weather-item">
            <div class="weather-label">Opad 10 min:</div>
            <div class="weather-value">${meteoData.opad_10min} mm</div>
            <div class="weather-date">${meteoData.opad_10min_data}</div>
        </div>
        ` : ''}
    </div>
</div>`;
            console.log("kod stacji meteorlogicznej:", meteoData.kod_stacji)
    } else {
        meteoElement.innerHTML = `<h2>Dane METEO</h2><p>Brak danych dla podanego kodu stacji.</p>`;
    }

    const hydroElement = document.getElementById('hydroData');
    if (hydroData) {
        hydroElement.innerHTML = `
<div class="container">
    <div class="header">
        <h1 class="title">Dane HYDROLOGICZNE</h1>
    </div>
    <div id="weatherData" class="weather-grid" style="display: grid;">      
        <div class="weather-item">
            <div class="weather-label">Stacja:</div>
            <div class="weather-value">${hydroData.stacja} - ${hydroData.rzeka}</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Temperatura wody:</div>
            <div class="weather-value">${hydroData.temperatura_wody} °C</div>
            <div class="weather-date">${hydroData.temperatura_wody_data_pomiaru}</div>
        </div>
        <div class="weather-item">
            <div class="weather-label">Stan wody:</div>
            <div class="weather-value">${hydro2Data.stan} cm</div>
            <div class="weather-date">${hydro2Data.stan_data}</div>
        </div>
    </div>
</div>`;
            console.log("id stacji hydrologicznej(2):", hydroData.id_stacji)
    }
}

// Funkcja do pobierania ostrzeżeń meteorologicznych
async function fetchWarnings() {
    console.log("Ładowanie ostrzeżeń meteo.")
    const url = "https://danepubliczne.imgw.pl/api/data/warningsmeteo";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Błąd sieci: ${response.status}`);
        }
        const data = await response.json();
        displayWarnings(data);
    } catch (error) {
        console.error("Błąd podczas pobierania ostrzeżeń:", error);
    }
    console.log("Ładowanie ostrzeżeń hydro.")
    const url2 = "https://danepubliczne.imgw.pl/api/data/warningshydro";
    try {
        const response2 = await fetch(url2);
        if (!response2.ok) {
            throw new Error(`Błąd sieci: ${response2.status}`);
        }
        const data2 = await response2.json();
        displayHydroWarnings(data2);
    } catch (error) {
        console.error("Błąd podczas pobierania ostrzeżeń:", error);
    }
}

// Funkcje do wyświetlania ostrzeżeń
function displayWarnings(dataArray) {
    const warning = dataArray.find(item => item.teryt.includes(warnTER));
    if (warning) {
        const powiat = warnTERdata.find(nazwa => nazwa.kod_teryt === warnTER);
        const warningMessageElement = document.getElementById('warningMessage');
        warningMessageElement.innerHTML = `
<div class="container warning">
    <div class="header">
        <h1 class="title white">Ostrzeżenie meteorologiczne<br>
        powiat ${powiat.nazwa}</h1>
    </div>
    <div id="weatherData" class="weather-grid" style="display: grid;">
    <div class="weather-item">
        <div class="weather-label">Nazwa zdarzenia:</div>
        <div class="weather-value">${warning.nazwa_zdarzenia}</div>
    </div>
    <div class="weather-item">
        <div class="weather-label">Prawdopodobieństwo:</div>
        <div class="weather-value">${warning.prawdopodobienstwo} %</div>
    </div>
    <div class="weather-item">
        <div class="weather-label">Stopień:</div>
        <div class="weather-value">${warning.stopien}</div>
    </div>
    <div class="weather-item">
        <div class="weather-label">Obowiązuje od:</div>
        <div class="weather-value">${warning.obowiazuje_od}</div>
    </div>
    <div class="weather-item">
        <div class="weather-label">Obowiązuje do:</div>
        <div class="weather-value">${warning.obowiazuje_do}</div>
    </div>
    <div class="weather-item">
        <div class="weather-label">Opublikowano:</div>
        <div class="weather-value">${warning.opublikowano}</div>
    </div>
    </div>
    <div id="weatherData" class="weather-grid-1" style="display: grid;">
    <div class="weather-item">
        <div class="weather-label">Treść:</div>
        <div class="weather-value">${warning.tresc}</div>
    </div>
    <div class="weather-item">
        <div class="weather-label">Komentarz:</div>
        <div class="weather-value">${warning.komentarz}</div>
    </div>    
        <div class="weather-item">
        <div class="weather-label">Biuro:</div>
        <div class="weather-value">${warning.biuro}</div>
    </div>   
</div>`;
    } else {
        warningMessageElement.innerHTML = ''; // Nie wyświetlaj nic, jeśli nie ma ostrzeżenia
    }
}

function displayHydroWarnings(dataArray) {
    const filteredWarning = dataArray.find(warning => warning.wojewodztwo === warnWOJ);
    if (filteredWarning) {
        const warningMessageElement = document.getElementById('warningMessage');
        const warningDetails = `
<div class="container warning">
    <div class="header ">
        <h1 class="title white">Ostrzeżenie hydrologiczne</h1>
    </div>
    <div id="weatherData" class="weather-grid" style="display: grid;">
    <div class="weather-item">
        <div class="weather-label">Zdarzenie:</div>
        <div class="weather-value">${filteredWarning.zdarzenie}</div>
    </div>
    <div class="weather-item">
        <div class="weather-label">Prawdopodobieństwo:</div>
        <div class="weather-value">${filteredWarning.prawdopodobienstwo} %</div>
    </div>
    <div class="weather-item">
        <div class="weather-label">Opublikowano:</div>
        <div class="weather-value">${filteredWarning.opublikowano}</div>
    </div>
    <div class="weather-item">
        <div class="weather-label">Województwo:</div>
        <div class="weather-value">${filteredWarning.wojewodztwo}</div>
    </div>
    <div class="weather-item">
        <div class="weather-label">Obszar:</div>
        <div class="weather-value">${filteredWarning.obszar}</div>
    </div>
    </div>
        <div id="weatherData" class="weather-grid-1" style="display: grid;">
    <div class="weather-item">
        <div class="weather-label">Przebieg:</div>
        <div class="weather-value">${filteredWarning.przebieg}</div>
    </div>
</div>`;
        warningMessageElement.innerHTML += warningDetails;
    }
}

fetchData();
setInterval(fetchData, REFRESH_INTERVAL);
