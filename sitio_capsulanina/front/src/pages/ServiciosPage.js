//import React from 'react';

import '../styles/estilos_nina.css';
import '../styles/normalize.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ServicioItem from '../componentes/servicios/ServicioItem';

//const ServiciosPage = (props) => (
//    <main>
//        <h2 className="tituloServ">Servicios</h2>
//        <main className="contenedor_listadoservicios">
//            <section className="listadoservicios">
//                <div className="servicios">
//                    <img src="images/uñas servicios.jpeg" width="200" height="200" alt="uñas servicios"/>
//                        <div className="servicioTexto">
//                            <h4>Uñas Esculpidas</h4>
//                            <p> En Nina Go van a poder hacerse las manos. Uñas gelificadas con el mejor cuidado que pueden tener.</p>
//                        </div>
//                    </div>
//                <div className="servicios">
//                    <img src="images/barbera.jpeg" width="200" height="200" alt="uñas servicios"/>
//                        <div className="servicioTexto">
//                            <h4>Corte y Barbería</h4>
//                            <p> Los hombres tambien tienen su lugar en Nina Go. No solo cortamos pelo sino que pueden venir a cortarse la barba también.</p>
//                        </div>
//                    </div>
//                <div className="servicios">
//                    <img src="images/depilacion.jpeg" width="200" height="200" alt="uñas servicios"/>
//                        <div className="servicioTexto">
//                            <h4>Depilación Infrared</h4>
//                            <p> Depilación definitiva para todeees!. </p>
//                            <p> No te depiles mas con cera, veni a depilarte con laser que es un camino de ida, no te vas a arrepentir.</p>
//                        </div>
//                    </div>
//                <div className="servicios">
//                    <img src="images/tratamiento.jpeg" width="200" height="200" alt="uñas servicios"/>
//                        <div className="servicioTexto">
//                            <h4>Tratamientos</h4>
//                            <p> También contamos con tratamientos corporales como MioUp, BodyUp, Himfu y muchas cosas más.</p>
//                        </div>
//                    </div>
//            </section>
//        </main>
//    </main>
//)

const ServiciosPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const cargarServicios = async () => {
            setLoading(true);
            //const response = await axios.get('${process.env.REACT_APP_API_URL}/api/servicios');
            const response = await axios.get('http://localhost:3000/api/servicios');
            setServicios(response.data);
            setLoading(false);
        };

        cargarServicios();
    }, []);
    return (
        <>
        <h2 className='tituloServ'>Servicios</h2>
        <section className="listadoservicios">
            
            { 
                loading ? (
                    <p>Cargando...</p>
                ) : (
                    servicios.map(item => <ServicioItem key={item.id}
                        Servicio={item.Servicio} Descripcion={item.Descripcion}
                        imagen={item.imagen} Precio={item.Precio} />)
                )
            }
        </section>
        </>
    );
    
}
export default ServiciosPage;