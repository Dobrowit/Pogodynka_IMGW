# PogodynkaIMGW
Pogoda IMGW na stronie internetowej z otwartych danych.

Dane pochodzą z otwartego źródła - https://danepubliczne.imgw.pl

API JSON - https://danepubliczne.imgw.pl/api/data/synop

Aby dostosować skrypt do własnych potrzeb:
  - wybierz odpowiednią stację - zmień id stacji w linii 154 (wykaz identyfikatorów w API JSON)
  - w html zmień nagłówek z nazwą stacji - linia 6 i 84
  - dane odświerzają się co 60 sek - można zmienić interwał w linii 179
  - skrypt można osadzić w ramce iframe lub wyciągnąć część JS i zaadoptować na swojej stronie wedle własnych potrzeb

![obraz](https://github.com/user-attachments/assets/e984a3a2-8a33-4aee-b6da-afec2e78a3b9)

DEMO - https://leba.eu/pogoda.html
