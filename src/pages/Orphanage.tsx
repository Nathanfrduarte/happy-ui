import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, LayersControl, Marker, TileLayer } from "react-leaflet";
import SidebarCP from "../components/SidebarCP";

import MapIcon from "../utils/MapIcon";
import '../styles/pages/orphanage.css';
import getFromAPI from "../services/getFromAPI";
import { useParams } from "react-router-dom";

interface IOrphanage {
  latitude: number
  longitude: number
  name: string
  about: string
  instructions: string
  opening_hours: string
  open_on_weekends: string
  images: Array<{
    id: number
    url: string
  }>
}

interface IOrphanageParams {
  id: string
}

export default function Orphanage() {
  const params = useParams<IOrphanageParams>()
  const [orphanage, setOrphanage] = useState<IOrphanage>()
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)

  useEffect(getOrphanages, [params.id])

  function getOrphanages() {
    if (!params.id) return
    getFromAPI.get(`orphanages/${params.id}`).then((response) => {
      console.log(response.data)
      setOrphanage(response.data)
    })
  }

  if (!orphanage) return <p>Carregando...</p>

  return (
    <div id="page-orphanage">

      <SidebarCP />

      <main>
        <div className="orphanage-details">

          {
            orphanage.images.length > 0 && <>
              <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name + ' imagem'} />
              <div className="images">
                {
                  orphanage.images.map((image, index) => {
                    return (
                      <button
                        key={image.id}
                        className={activeImageIndex === index ? 'active' : ''}
                        type="button" onClick={() => setActiveImageIndex(index)}
                      >
                        <img src={image.url} alt={orphanage.name + ' imagem'} />
                      </button>
                    )
                  })
                }
              </div>
            </>
          }

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <MapContainer center={[orphanage.latitude, orphanage.longitude]} zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
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

                  <Marker interactive={false} icon={MapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                </LayersControl>
              </MapContainer>

              <footer>
                <a target='_blank' rel='noopener noreferrer' href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ?
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                </div>
                :
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF6690" />
                    Não atendemos <br />
                    fim de semana
                  </div>}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
