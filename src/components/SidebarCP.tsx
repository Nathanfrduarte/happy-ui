import React from "react"
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi"

import mapMarkerImg from '../images/map-marker.svg'
import '../styles/components/sidebarCP.css'

export default function SidebarCP() {
    const { goBack } = useHistory();

    return (
        <aside className='sidebar'>
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color='rgba(0,0,0,0.6)' />
                </button>
            </footer>
        </aside>
    )
}