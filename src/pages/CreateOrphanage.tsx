import React, { FormEvent, useState, ChangeEvent } from "react"
import { useHistory } from "react-router-dom";
import { MapContainer, LayersControl, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import SidebarCP from "../components/SidebarCP";

import { FiPlus } from "react-icons/fi"
import MapIcon from "../utils/MapIcon";

import '../styles/pages/create-orphanage.css'
import getFromAPI from "../services/getFromAPI";

export default function CreateOrphanage() {
  const history = useHistory()
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number, lng: number }>()
  const [name, setName] = useState<string>('')
  const [about, setAbout] = useState<string>('')
  const [instructions, setInstructions] = useState<string>('')
  const [openingHours, setOpeningHours] = useState<string>('')
  const [openOnWeekends, setOpenOnWeekends] = useState<boolean>(false)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function SelectedLocationMarker() {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!selectedPosition) return

    const data = new FormData()
    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', openingHours)
    data.append('open_on_weekends', String(openOnWeekends))
    data.append('latitude', String(selectedPosition.lat))
    data.append('longitude', String(selectedPosition.lng))
    images.map((image) => {
      data.append('images', image)
    })

    await getFromAPI.post('orphanages', data)
    alert('Cadastro realizado com sucesso!')
    history.push('/orphanages')
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return
    const selectedImages = Array.from(event.target.files)

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image)
    })

    setImages(selectedImages)
    setPreviewImages(selectedImagesPreview)
  }

  return (
    <div id="page-create-orphanage">

      <SidebarCP />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
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
              <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={(event) => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {
                  previewImages.map((image) => {
                    console.log(image)
                    return <img key={image} src={image} alt={image} />
                  })
                }

                <label htmlFor='images' className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
              <input multiple onChange={handleSelectImages} type='file' id="images" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={(event) => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={openingHours} onChange={(event) => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={openOnWeekends ? 'active' : ''} onClick={() => setOpenOnWeekends(true)}>Sim</button>
                <button type="button" className={!openOnWeekends ? 'active' : ''} onClick={() => setOpenOnWeekends(false)}>Não</button>
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
