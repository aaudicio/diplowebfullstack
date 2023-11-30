import React from 'react' ;

const ServicioItem = (props) => {
    const {Servicio, Descripcion, imagen, Precio} = props;

    return (
        <div className="servicios">
            <h1>{Servicio}</h1>
            <h2>{Descripcion}</h2>
            <img style={{width:"220px", height:"220px"}} src={imagen} />
            <div dangerouslySetInnerHTML={{ __html: Precio }} />
            <hr />
        </div>
    );
}

export default ServicioItem;