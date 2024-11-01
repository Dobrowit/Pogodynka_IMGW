## Wprowadzenie
Pogoda IMGW na stronie internetowej z otwartych danych.

Dane pochodzą z [otwartego źródła](https://danepubliczne.imgw.pl). Źródło znalezione w [publicznym katalogu](https://dane.gov.pl) (polecam).

## Warianty skryptu
  - AIO - wszystko w jednym ale tylko dane synoptyczne
  - wersja rozbudowana rozdzielona na html, css i js

Wersja rozbudowana pokazuje ostrzeżenia dla wybranego obszaru.

## Dostosowanie skryptu do własnych potrzeb
  - domyślny id stacji można nadpisać zmienną podaną w url - np. ``/pogodynka-imgw-aio.html?station_id=12295``
  - skrypt przyjmuje następujące zmienne przez URL: ``synopId``, ``meteoId``, ``hydroId`` - odpowiednio dla danych: synoptycznych, meteorologicznych, hydrologicznych (nie dotyczy skryptu AIO - ten tylko przyjmuje ``station_id`` z kodem stacji synoptycznej)
  - identyfikatory można wygenerować ze skryptu [pogodynka-imgw-stations.html](https://dobrowit.github.io/Pogodynka_IMGW/pogodynka-imgw-stations.html)
  - dodatkowo można podać ``warnWOJ`` i ``warnTER`` - nazwę województwa i [TERYT](https://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/baza_teryt/baza_teryt.aspx?contrast=default) powiatu (4 cyfry) dla ostrzeżeń hydrologicznych i meteorologicznych
  - w kodzie na początku te zmienne są zakodowane w stałych, więc jeśli nie poda się Id to użyte będą domyślne
  - dane odświerzają się domyślnie co 60 sek - można zmienić interwał w stałej ``REFRESH_INTERVAL``

## Informacji o pochodzeniu danych
UWAGA - nie można usuwać informacji o pochodzeniu danych - grozi to odpowiedzialnością karną. Sprawdź [regulamin](https://danepubliczne.imgw.pl/docs/regulamin_udostepniania_danych.pdf) i [ostrzeżenie](https://danepubliczne.imgw.pl/docs/ostrzezenie.docx)!

**Danych publicznych nie można dowolnie używać - trzeba to robić z odpowiedzialnością, zdrowym rozsądkiem i w zgodzie z regulaminem dostawcy.**

## Demo
  - DEMO (AIO) - [https://dobrowit.github.io/Pogodynka_IMGW/pogodynka-imgw-aio.html](https://dobrowit.github.io/Pogodynka_IMGW/pogodynka-imgw-aio.html)
  - DEMO (ALL) - [https://dobrowit.github.io/Pogodynka_IMGW/pogodynka-imgw.html](https://dobrowit.github.io/Pogodynka_IMGW/pogodynka-imgw.html)
  - LISTA STACJI - [https://dobrowit.github.io/Pogodynka_IMGW/pogodynka-imgw-stations.html](https://dobrowit.github.io/Pogodynka_IMGW/pogodynka-imgw-stations.html)

![obraz](https://github.com/user-attachments/assets/e984a3a2-8a33-4aee-b6da-afec2e78a3b9)

## API JSON użyte w projekcie
  - [https://danepubliczne.imgw.pl/api/data/synop](https://danepubliczne.imgw.pl/api/data/synop)
  - [https://danepubliczne.imgw.pl/api/data/meteo](https://danepubliczne.imgw.pl/api/data/meteo)
  - [https://danepubliczne.imgw.pl/api/data/hydro](https://danepubliczne.imgw.pl/api/data/hydro)
  - [https://danepubliczne.imgw.pl/api/data/hydro2](https://danepubliczne.imgw.pl/api/data/hydro2)
  - [https://danepubliczne.imgw.pl/api/data/warningsmeteo](https://danepubliczne.imgw.pl/api/data/warningsmeteo)
  - [https://danepubliczne.imgw.pl/api/data/warningshydro](https://danepubliczne.imgw.pl/api/data/warningshydro)

## Uwagi do API IMGW
Dane udostępniane przez IMGW mają pewne niespójności, które trzeba uwzględnić:
  - API hydro podaje nieaktualne stany wody (dobrze że jest pole z datą) dlatego stan wody należy pobierać z API hydro2 i łączyć po Id stacji (uwaga rózne nazwy tych pól)
  - w API hydro pole 'rzeka' nie zawsze oznacza rzekę; w stacjach nadmorskich często jest to Bałtyk (lub kanał portowy... nazwany tak samo); wg mnie bardziej właściwa nazwa dla tego pola to zbiornik_wodny lub akwen_wodny ale rozumiem, że padło na termin rzeka bo te przeważają
  - w API meteo pola wiatr_poryw_10min, opad_10min i powiązane z nimi znaczniki czasu wydają się być martwe

## Czym są dane synoptyczne i meteorlogiczne?

  - **Dane meteorologiczne** – jest to ogólny termin obejmujący wszelkie informacje dotyczące pogody, takie jak temperatura, wilgotność, prędkość wiatru, opady itp. Dane meteorologiczne mogą pochodzić z różnych źródeł, takich jak stacje meteorologiczne, satelity, balony meteorologiczne czy radary. Mogą być surowe lub przetworzone.
  - **Dane synoptyczne** – to specyficzny rodzaj danych meteorologicznych zebranych na potrzeby prognozowania pogody w krótkim okresie czasu (zazwyczaj do kilku dni). Są one zbierane w stałych godzinach na całym świecie przez stacje synoptyczne według ustalonych norm i standardów (np. co 6 godzin). Dane te są zwykle surowymi odczytami, a następnie są analizowane i interpretowane przez meteorologów do tworzenia prognoz pogody.

Podsumowując:
  - **Dane synoptyczne** to szczególne dane meteorologiczne zbierane w krótkich odstępach czasu i z określonych miejsc.
  - **Dane meteorologiczne** to ogólny termin obejmujący wszystkie dane dotyczące pogody, a dane synoptyczne są ich częścią.

Dane synoptyczne nie są danymi uśrednionymi z dłuższego przedziału czasu, natomiast istnieją dane meteorologiczne o charakterze uśrednionym (np. dane klimatyczne).
