# PogodynkaIMGW
Pogoda IMGW na stronie internetowej z otwartych danych.

Dane pochodzą z otwartego źródła - https://danepubliczne.imgw.pl

API JSON - https://danepubliczne.imgw.pl/api/data/synop

Aby dostosować skrypt do własnych potrzeb:
  - wybierz odpowiednią stację - zmień id stacji w stałej STATION_ID (wykaz identyfikatorów w API JSON)
  - dane odświerzają się co 60 sek - można zmienić interwał w stałej REFRESH_INTERVAL
  - skrypt można osadzić w ramce iframe lub wyciągnąć część JS i zaadoptować na swojej stronie wedle własnych potrzeb

![obraz](https://github.com/user-attachments/assets/e984a3a2-8a33-4aee-b6da-afec2e78a3b9)

W repozytorium umieszczono dwa warianty skryptu:
  - AIO - wszystko w jednym
  - rozdzielony na html, css i js

DEMO - https://leba.eu/pogoda.html
