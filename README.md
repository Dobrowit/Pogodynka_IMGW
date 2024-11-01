# Pogodynka IMGW
Pogoda IMGW na stronie internetowej z otwartych danych.

Dane pochodzą z otwartego źródła - https://danepubliczne.imgw.pl

Źródło znalezione w publicznym katalogu (polecam) - https://dane.gov.pl

## Warianty skryptu
  - AIO - wszystko w jednym ale tylko dane synoptyczne
  - wersja rozbudowane (wszelkie dostępne dane publiczne z IMGW) rozdzielony na html, css i js

## Dostosowanie skryptu do własnych potrzeb:
  - domyślny id stacji można nadpisać zmienną podaną w url - np. ``/pogodynka-imgw-aio.html?station_id=12295``
  - skrypt przyjmuje następujące zmienne przez URL: ``synopId``, ``meteoId``, ``hydroId`` - odpowiednio dla danych: synoptycznych, meteorologicznych, hydrologicznych (nie dotyczy skryptu AIO - ten tylko przyjmuje ``station_id`` z kodem stacji synoptycznej)
  - identyfikatory można sobie wygenerować ze skryptu [pogodynka-imgw-stations.html](https://dobrowit.github.io/Pogodynka_IMGW/pogodynka-imgw-stations.html)
  - dodatkowo można podać ``warnWOJ`` i ``warnTER`` - nazwę województwa i [TERYT](https://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/baza_teryt/baza_teryt.aspx?contrast=default) powiatu (4 cyfry) dla ostrzeżeń hydrologicznych i meteorologicznych
  - w kodzie na początku te zmienne są zakodowane w stałych, więc jeśli nie poda się Id to użyte będą domyślne
  - dane odświerzają się domyślnie co 60 sek - można zmienić interwał w stałej ``REFRESH_INTERVAL``
  - UWAGA - nie można usuwać informacji o pochodzeniu danych - grozi to odpowiedzialnością karną - sprawdź [regulamin](https://danepubliczne.imgw.pl/docs/regulamin_udostepniania_danych.pdf) i [ostrzeżenie](https://danepubliczne.imgw.pl/docs/ostrzezenie.docx)! Jeśli dane publiczne to nie znaczy, że można je dowolnie używać. Używaj je z odpowiedzialnością i zgodnie z regulaminem.

## Demo
  - DEMO (AIO) - https://dobrowit.github.io/Pogodynka_IMGW/pogodynka-imgw-aio.html
  - DEMO (ALL) - https://dobrowit.github.io/Pogodynka_IMGW/pogodynka-imgw.html
  - LISTA STACJI - https://dobrowit.github.io/Pogodynka_IMGW/pogodynka-imgw-stations.html

![obraz](https://github.com/user-attachments/assets/e984a3a2-8a33-4aee-b6da-afec2e78a3b9)

## API JSON użyte w projekcie
  - https://danepubliczne.imgw.pl/api/data/synop
  - https://danepubliczne.imgw.pl/api/data/meteo
  - https://danepubliczne.imgw.pl/api/data/hydro
  - https://danepubliczne.imgw.pl/api/data/hydro2
  - https://danepubliczne.imgw.pl/api/data/warningsmeteo
  - https://danepubliczne.imgw.pl/api/data/warningshydro
