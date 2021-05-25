import React, { useState } from "react"
import { MapContainer, LayersControl, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import SidebarCP from "../components/SidebarCP";

import { FiPlus } from "react-icons/fi"
import MapIcon from "../utils/MapIcon";

import '../styles/pages/create-orphanage.css'

export default function CreateOrphanage() {

  const [selectedPosition, setSelectedPosition] = useState<{lat: number, lng: number}>()

  function SelectedLocationMarker() {
    useMapEvents({
      click(event) {
        const {lat, lng} =  event.latlng
        setSelectedPosition({ lat, lng })
      },
    })

    return !!selectedPosition ?
      <Marker
        interactive={false}
        icon={MapIcon}
        position={[selectedPosition.lat, selectedPosition.lng]}
      />
      : null
  }

  return (
    <div id="page-create-orphanage">

      <SidebarCP />

      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="input-block">
              <label htmlFor="name">Mostre a localização no mapa</label>
            </div>
            <MapContainer
              zoom={15}
              center={[-19.9326393, -44.2004929]}
              style={{ width: '100%', height: 280 }}
            >
              <LayersControl position="topright">
                <LayersControl.BaseLayer name="Satélite">
                  {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' /> */}
                  <TileLayer
                    url='https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmF0aGFuZnJkdWFydGUiLCJhIjoiY2toNDJma3VjMDdxbDJ4b3Y5MHJuaXU2NyJ9.AypmHWG-7O0F1KV2fqdzTQ'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer checked name="Padrão">
                  {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' /> */}
                  <TileLayer
                    url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmF0aGFuZnJkdWFydGUiLCJhIjoiY2toNDJma3VjMDdxbDJ4b3Y5MHJuaXU2NyJ9.AypmHWG-7O0F1KV2fqdzTQ'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                </LayersControl.BaseLayer>

                <SelectedLocationMarker />
                {/* <Marker interactive={false} icon={MapIcon} position={[-27.2092052, -49.6401092]} /> */}
              </LayersControl>
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className="active">Sim</button>
                <button type="button">Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
