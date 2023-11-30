//import React from 'react';

import '../styles/estilos_nina.css'
import '../styles/normalize.css'

const HomePage = (props) => (
    <main class="holder">
        <div class="apaisado">
            <div class="texto_bienvenidos">
                <h2>Bienvenidos a mi capsula</h2>
                <p class="parrafo_bienvenido">Como sea que hayas llegado, te recibo con los brazos abiertos!</p>
                <p class="parrafo_bienvenido">Esta capsula fue armada con mucho esfuerzo y amor y quiero que la disfruten tanto como yo.</p>
                <p class="parrafo_bienvenido">En mi estética van a encontrar un lugar cómodo, donde se van a poder dedicar tiempo a ustedes.</p>
                <p class="parrafo_bienvenido">Vernos y sentirnos bien depende de nosotros! </p>
                <div class="ninago"><img src="images/nina2 sin fondo.png" width="150" alt="Capsula Nina2"/></div>
            </div>
            <div class="homeimg">
                <img src="images/uñas apaisada.jpeg" alt="diseños" />
            </div>
        </div>
    </main>

)

export default HomePage;