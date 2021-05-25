import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, LayersControl, Marker, TileLayer, Popup } from 'react-leaflet'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import mapMakerIMG from '../images/map-marker.svg'

import '../styles/pages/orphanages-map.css'
import MapIcon from '../utils/MapIcon'
import getFromAPI from '../services/getFromAPI'

interface IOrphanage {
    id: number
    name: string
    latitude: number
    longitude: number

}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<IOrphanage[]>([])

    useEffect(getOrphanages, [])

    function getOrphanages() {
        getFromAPI.get('orphanages').then((response) => {
            setOrphanages(response.data.data)
        })
    }

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMakerIMG} alt='Happy Icon' />

                    <h2>Escolha um Orfanato no mapa</h2>
                    <p>Muitas Crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Betim</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>

            <MapContainer center={[-19.9326393, -44.2004929]} zoom={15}
                style={{ width: '100%', height: '100%' }}
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

                    {
                        orphanages.map((orphanage) => {
                            return (
                                <Marker
                                    key={orphanage.id}
                                    icon={MapIcon}
                                    position={[orphanage.latitude, orphanage.longitude]}
                                >
                                    <Popup
                                        className='map-popup'
                                        closeButton={false}
                                        minWidth={240}
                                        maxWidth={240}
                                    >
                                        {orphanage.name}

                                        <Link to={`orphanages/${orphanage.id}`}>
                                            <FiArrowRight size={20} color='#FFF' />
                                        </Link>
                                    </Popup>

                                </Marker>
                            )
                        })
                    }

                </LayersControl>


            </MapContainer>

            <Link to='/orphanages/create' className='create-orphanage'>
                <FiPlus size={32} color='#FFF' />
            </Link>
        </div>
    )
}

export default OrphanagesMap
