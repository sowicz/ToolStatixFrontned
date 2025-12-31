# ToolStatix - zbieranie danych do przebiegu narzędzi

Frontend aplikacji toolstatix - do zbierania danych narzędzi CNC w oparciu o parametry prądu,przepływu czy inne.
Dane zbierane w oparciu o protokol OPCua, z możliwością rozbudowy w przyszłości o inne protokoły

(Backend ToolStatix)[https://github.com/sowicz/ToolStatix]

Zdjęcia poniżej

## TODO

- Dodać ściąganie raportów narzędzia na desktop
- Dodać edycje istniejących rekordkow w DB

## Funkcje

- Zarządzanie **Network Data Sources**
- Obsługa połączeń **OPC UA**
- Start / Stop subskrypcji tagów
- Monitoring statusu tagów
- Podgląd danych historycznych na wykresach
- UI oparty o React + Tailwind

## Stack

### Frontend

- React + TypeScript
- Tailwind CSS
- Recharts

### Backend

- FastAPI
- OPC UA (`asyncua`)
- REST API

## Uruchomienie frontend

1. Zaisntalować pakiety

```
npm install

```

2. Utworzyć plik .env a w nim link do backend API (toolstatix API)

```
.env

VITE_API_BASE_URL=http://localhost:8000

```

3. Uruchamiamy projekt

```
npm run dev
```

## Zdjęcia

### Dashboard

![alt](https://github.com/sowicz/ToolStatixFrontned/blob/main/toolstatixFrontendPics/ts1.png "Dashboard - OPCUA connection cards")

### Connected to OPCua with active tags

![alt](https://github.com/sowicz/ToolStatixFrontned/blob/main/toolstatixFrontendPics/ts2.png "Activate tags")

### Logs data gathered

![alt](https://github.com/sowicz/ToolStatixFrontned/blob/main/toolstatixFrontendPics/ts3_logs.png "Logs from backend")

### Main tags

![alt](https://github.com/sowicz/ToolStatixFrontned/blob/main/toolstatixFrontendPics/ts5.png "Main tags")

### Actual data collected for tool

![alt](https://github.com/sowicz/ToolStatixFrontned/blob/main/toolstatixFrontendPics/ts6.png "Tool actual data")

### Actual data collected for tool part 2

![alt](https://github.com/sowicz/ToolStatixFrontned/blob/main/toolstatixFrontendPics/ts7.png "Tool actual data part 2")
