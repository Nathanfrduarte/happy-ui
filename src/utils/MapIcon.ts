import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

// Criação de um ícone personalizado do tipo Leaflet
// const MapIcon = Leaflet.icon({
//     iconUrl: mapMarkerImg,
//     iconSize: [58, 68],
//     iconAnchor: [29, 68],   // Posição do ícone que representa o ponto no mapa
//     popupAnchor: [0, -60]   // Posição do popup
// })

// Criação de um ícone personalizado do tipo Leaflet
const MapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68], // Posição do ícone que representa o ponto no mapa
    popupAnchor: [170, 2] // Posição do popup
})

export default MapIcon