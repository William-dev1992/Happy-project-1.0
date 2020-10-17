import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup,} from 'react-leaflet';

import mapMarkerImg from '../images/local-icon.svg';

import '../styles/pages/orphanages-map.css';
import mapIcon from '../utills/mapIcon';
import api from '../Services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(()=> {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="map marker"/>

                    <h2>Escolha um orfanato no mapa.</h2>
                    <p>muitas crianças estão esperando a sua visita :)</p>
                </header>
                
                <footer>
                    <strong>Petrolina</strong>
                    <span>Pernambuco</span>
                </footer>
            </aside>
            <Map 
                center={[-9.3895792,-40.5043401]}
                zoom={17}
                style={{width: '100%', height:'100%'}}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {orphanages.map(orphanage =>{
                    return (
                        <Marker 
                            key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude,orphanage.longitude]}
                        >
                            <Popup closeButton={false} minWidth={248} maxWidth={248} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={32} color="#FFf" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color='#FFF'/>
            </Link>
        </div>
    )
}

export default OrphanagesMap;