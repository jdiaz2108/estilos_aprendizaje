<template>
    <div id="app">

        <div class="container-fluid p-0 shadow">
             <img src="src/assets/arriba.png" alt="" class="img-fluid p-0 m-0">
        </div>



  <v-app style="background-color: #0097aa" class="pt-3 pb-3">
  <v-card
    class="mx-auto"
    max-width="900"
   
    color="BGtable"
  >

    <v-card-text v-if="step <= preguntas.length">
          <div class="row mx-1 py-2"  style="border-radius: 15px; background-color: #fff" v-if="step <= preguntas.length">

            <div class="col-10 py-2 px-4 my-auto h5 font-weight-black" >
              {{ currentTitle }} 
            </div>

            <div class="col-2 py-2 px-4">
                <v-btn fab color="purple text-white text-light" disabled style="background-color: #0097aa !important; color: #fff !important">
                    <h3 class="my-auto">{{step}}</h3>
                </v-btn>
            </div>

          </div> 
    </v-card-text>

    <v-window v-model="step">

        <v-window-item :value="preguntas.length + 2">
        <v-card-text>
            <div class="container-fluid"><div class="row"><div class="col-12"><img :src="'src/assets/inicio.jpg'" class="img-fluid" alt="" @click="inicio()"></div></div></div>
        </v-card-text>
    </v-window-item>


      <v-window-item v-for="pregunta in orderedPreguntas" :value="pregunta.id" class="BGtable">
        <v-card-text class="BGtable">
          <div class="row mx-1 py-2"  style="border-radius: 15px; background-color: #db9565">

            <div v-for="opcion in pregunta.opciones" class="col-12 py-2 px-4">
                <v-btn block round large color="buttonColor" class="font-weight-bold" style="text-transform: none !important" @click="step++; progress(opcion.valor)" >{{opcion.respuesta}}</v-btn>
            </div>

          </div> 
        </v-card-text>
      </v-window-item>

      <v-window-item :value="preguntas.length + 1">
        <v-card-text>
            <div class="container-fluid"><div class="row"><div class="col-12"><img :src="'src/assets/'+currentEstilo.url+'.jpg'" class="img-fluid" alt=""></div></div></div>

        </v-card-text>
      </v-window-item>


    </v-window>
<v-btn v-if="step == 17" @click="reload()" color="white" class="font-weight-bold mb-5 elevation-15" fixed bottom right>Reiniciar test</v-btn>



<!--     <v-card-actions align-end fill-height class="align-items-end align-end mt-auto mb-0">
      <v-btn
        :disabled="step === 1"
        flat
        @click="step--"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="step === preguntas.length + 2"
        color="primary"
        depressed
        @click="step++; progress()"
      >
        Next
      </v-btn>
    </v-card-actions> -->
  </v-card>
        
</v-app>
<div class="container-fluid p-0 shadow">
             <img src="src/assets/abajo.png" alt="" class="img-fluid p-0 m-0">
        </div>

    </div>
</template>

<script>
    import _ from 'lodash';
export default {
  name: 'app',
  data () {
    return {
        unica: 0,
        tipoEstilo: 1,
        step: 18,
        progressBar: 0,
        msg: 'Welcome to Your Vue.js App',
        estilos: [
            { id: 1, valor: 'v', porcentaje: 0, title: 'Visual', descripcion: '¡Eres un aprendiz visual!', url: 'preguntas1' },
            { id: 2, valor: 'a', porcentaje: 0, title: 'Auditivo', descripcion: '¡Eres un aprendiz auditivo!', url: 'preguntas2' },
            { id: 3, valor: 'r', porcentaje: 0, title: 'Lector Escritor', descripcion: '¡Eres un aprendiz lector-escritor!', url: 'preguntas3' },
            { id: 4, valor: 'k', porcentaje: 0, title: 'Kinestesico', descripcion: '¡Eres un aprendiz kinestésico!', url: 'preguntas4' }
        ],
      preguntas: [
        { 
            id: 1, pregunta: 'Debes cocinar algo especial para tu familia. ¿Qué harías?',
            opciones: [
                {valor: 'v', orden: 2, respuesta: 'b. Dar un vistazo al recetario para sacar ideas de las fotos.'},
                {valor: 'a', orden: 1, respuesta: 'a. Pedirles a tus amigos algunas sugerencias.'},
                {valor: 'r', orden: 3, respuesta: 'c. Usar un libro de cocina en el que sabes que hay una buena receta.'},
                {valor: 'k', orden: 4, respuesta: 'd. Cocinar algo que tú ya sabes hacer sin la necesidad de instrucciones.'}
            ]
        },
        { 
            id: 2, pregunta: 'Debes escoger qué comer en un restaurante o un café. ¿Qué harías?',
            opciones: [
                {valor: 'v', orden: 2, respuesta: 'b. Mirar lo que otros comen o mirar los dibujos de cada platillo.'},
                {valor: 'a', orden: 1, respuesta: 'a. Escuchar al mesero o pedirles a tus amigos que te recomienden opciones.'},
                {valor: 'r', orden: 3, respuesta: 'c. Escoger de las descripciones en el menú.'},
                {valor: 'k', orden: 4, respuesta: 'd. Escoger algo que hayas comido antes.'}
            ]
        },
        { 
            id: 3, pregunta: 'Aparte del precio, ¿qué más te influenciaría para comprar un libro de ciencia ficción?',
            opciones: [
                {valor: 'v', orden: 4, respuesta: 'd. Que el diseño de la pasta sea atractivo.'},
                {valor: 'a', orden: 1, respuesta: 'a. Que un amigo te hable acerca de él y te lo recomiende.'},
                {valor: 'r', orden: 3, respuesta: 'c. Leer rápidamente partes del libro.'},
                {valor: 'k', orden: 2, respuesta: 'b. Que el libro tenga historias reales, experiencias y ejemplos.'}
            ]
        },
        { 
            id: 4, pregunta: 'Has terminado una competencia o un examen y te gustaría tener alguna retroalimentación. Te gustaría retroalimentarte:',
            opciones: [
                {valor: 'v', orden: 3, respuesta: 'c. Viendo gráficos que muestren lo que has logrado.'},
                {valor: 'a', orden: 4, respuesta: 'd. Escuchando a alguien hablar sobre lo que lograste.'},
                {valor: 'r', orden: 1, respuesta: 'a. Teniendo descripciones escritas de los resultados.'},
                {valor: 'k', orden: 2, respuesta: 'b. Escuchando ejemplos de lo que has hecho.'}
            ]
        },
        { 
            id: 5, pregunta: 'Tienes un problema con tu rodilla. Preferirías que el doctor:',
            opciones: [
                {valor: 'v', orden: 4, respuesta: 'd.   Te enseñe un diagrama lo que está mal.'},
                {valor: 'a', orden: 3, respuesta: 'c.   Te describa lo qué está mal.'},
                {valor: 'r', orden: 2, respuesta: 'b.   Te de una página de internet o algo para leer.'},
                {valor: 'k', orden: 1, respuesta: 'a.   Use un modelo de plástico y te enseñe lo que está mal.'}
            ]
        },
        { 
            id: 6, pregunta: 'Estás a punto de comprar una cámara digital o teléfono móvil. Aparte del precio, ¿qué más influirá en tomar tu decisión?',
            opciones: [
                {valor: 'v', orden: 2, respuesta: 'b. Que tenga un diseño moderno y se vea bien.'},
                {valor: 'a', orden: 4, respuesta: 'd. Que el vendedor te informe acerca de tus características.'},
                {valor: 'r', orden: 3, respuesta: 'c. Leer los detalles acerca de sus características.'},
                {valor: 'k', orden: 1, respuesta: 'a. Probarlo.'}
            ]
        },
        { 
            id: 7, pregunta: 'No estás seguro si la palabra se deletrea trascendente o tracendente. ¿Qué harías para salir de la duda?',
            opciones: [
                {valor: 'v', orden: 4, respuesta: 'd. Ver la palabra en tu mente y escoger según cómo la veas.'},
                {valor: 'a', orden: 2, respuesta: 'b. Pensar cómo suena cada palabra y escoger una.'},
                {valor: 'r', orden: 3, respuesta: 'c. Buscar la palabra en un diccionario.'},
                {valor: 'k', orden: 1, respuesta: 'a. Escribir ambas palabras en un papel y escoger una.'}
            ]
        },
        { 
            id: 8, pregunta: 'Te gustan las páginas de Internet que tienen:',
            opciones: [
                {valor: 'v', orden: 2, respuesta: 'b. Diseño interesante y características visuales.'},
                {valor: 'a', orden: 4, respuesta: 'd. Canales en los que puedas escuchar música, programas de radio o entrevistas.'},
                {valor: 'r', orden: 1, respuesta: 'a. Interesantes descripciones escritas, listas y explicaciones.'},
                {valor: 'k', orden: 3, respuesta: 'c. Cosas que puedas cambiar o examinar con un clic.'}
            ]
        },
        { 
            id: 9, pregunta: 'Estás planeando unas vacaciones para un grupo y quieres recibir alguna observación de ellos acerca del plan. ¿Qué harías?',
            opciones: [
                {valor: 'v', orden: 1, respuesta: 'a. Usar un mapa o página de Internet para mostrarles los lugares.'},
                {valor: 'a', orden: 2, respuesta: 'b. Describir algunos de los puntos sobresalientes.'},
                {valor: 'r', orden: 3, respuesta: 'c. Darles una copia del itinerario impreso.'},
                {valor: 'k', orden: 4, respuesta: 'd. Llamarles por teléfono o mandar mensaje por correo electrónico.'}
            ]
        },
        { 
            id: 10, pregunta: 'Estás usando un libro, CD o página de Internet para aprender a tomar fotos con tu cámara digital nueva. A ti te gustaría tener:',
            opciones: [
                {valor: 'v', orden: 2, respuesta: 'b. Esquemas o diagramas que muestran la cámara y la función de cada parte.'},
                {valor: 'a', orden: 1, respuesta: 'a. La oportunidad de hacer preguntas acerca de la cámara y sus características.'},
                {valor: 'r', orden: 4, respuesta: 'd. Aclarar las instrucciones escritas con listas y puntos sobre qué hacer.'},
                {valor: 'k', orden: 3, respuesta: 'c. Ejemplos de buenas y malas fotos y cómo mejorarlas.'}
            ]
        },
        { 
            id: 11, pregunta: 'Quieres aprender sobre un programa nuevo o un videojuego. ¿Qué haces?',
            opciones: [
                {valor: 'v', orden: 3, respuesta: 'c. Sigues los esquemas en el libro que acompañan el programa.'},
                {valor: 'a', orden: 1, respuesta: 'a. Hablas con gente que sabe acerca del programa.'},
                {valor: 'r', orden: 2, respuesta: 'b. Lees las instrucciones que vienen en el programa.'},
                {valor: 'k', orden: 4, respuesta: 'd. Usas los controles o el teclado.'}
            ]
        },
        { 
            id: 12, pregunta: 'Estás ayudando a alguien que quiere ir al aeropuerto, al centro del pueblo o la estación del tren. ¿Qué haces?',
            opciones: [
                {valor: 'v', orden: 4, respuesta: 'd. Le dibujas un croquis o le das un mapa.'},
                {valor: 'a', orden: 3, respuesta: 'c. Le das las direcciones verbalmente.'},
                {valor: 'r', orden: 2, respuesta: 'b. Anotas las direcciones en un papel (sin mapa) y se las das.'},
                {valor: 'k', orden: 1, respuesta: 'a. Vas con la persona hasta el lugar.'}
            ]
        },
        { 
            id: 13, pregunta: 'Recuerda un momento en tu vida en el que aprendiste a hacer algo nuevo. Trata de evitar escoger una destreza física, como andar en bicicleta. Tú aprendiste mejor:',
            opciones: [
                {valor: 'v', orden: 4, respuesta: 'd. Con esquemas y diagramas o pistas visuales.'},
                {valor: 'a', orden: 3, respuesta: 'c. Escuchando a alguien explicarlo o haciendo preguntas.'},
                {valor: 'r', orden: 2, respuesta: 'b. Con instrucciones escritas en un manual o libro de texto.'},
                {valor: 'k', orden: 1, respuesta: 'a. Viendo una demostración.'}
            ]
        },
        { 
            id: 14, pregunta: 'Tú prefieres un maestro o conferencista que use:',
            opciones: [
                {valor: 'v', orden: 3, respuesta: 'c. Diagramas, esquemas o gráficos.'},
                {valor: 'a', orden: 4, respuesta: 'd. Preguntas y respuestas, charlas y oradores invitados.'},
                {valor: 'r', orden: 2, respuesta: 'b. Folletos, libros o lecturas.'},
                {valor: 'k', orden: 1, respuesta: 'a. Demostraciones, modelos o sesiones prácticas.'}
            ]
        },
        { 
            id: 15, pregunta: 'Un grupo de turistas quiere aprender acerca de parques o reservas naturales en tu país. Tú:',
            opciones: [
                {valor: 'v', orden: 4, respuesta: 'd. Les muestras imágenes de Internet, fotos o libros con dibujos.'},
                {valor: 'a', orden: 3, respuesta: 'c. Les das una charla acerca de parques o reservas naturales.'},
                {valor: 'r', orden: 2, respuesta: 'b. Les das un libro o folleto acerca de parques o reservas naturales.'},
                {valor: 'k', orden: 1, respuesta: 'a. Los acompañas a un parque o reserva natural.'}
            ]
        },
        { 
            id: 16, pregunta: 'Tienes que hacer un discurso para una conferencia u ocasión especial. Tú:',
            opciones: [
                {valor: 'v', orden: 4, respuesta: 'd. Haces diagramas o esquemas que te ayuden a explicar las cosas.'},
                {valor: 'a', orden: 3, respuesta: 'c. Escribes algunas palabras claves y practicas el discurso repetidas veces.'},
                {valor: 'r', orden: 1, respuesta: 'a. Escribes el discurso y te lo aprendes leyéndolo varias veces.'},
                {valor: 'k', orden: 2, respuesta: 'b. Reúnes muchos ejemplos e historias para hacer el discurso verdadero y práctico.'}
            ]
        },
      ],
    }
  },
  methods: {
    inicio: function (num) {
        this.step = 1;
    },
    reload: function(){
        location.reload()
    },
        progress: function(num){
            this.progressBar = this.progressBar + 6.25;
            var unica = 0;
            for (var i = 0; i < this.estilos.length; i++) {
                if (this.estilos[i].valor == num) {
                    this.estilos[i].porcentaje = this.estilos[i].porcentaje + 6.25
                }
                if (unica < this.estilos[i].porcentaje) {
                    var unica = this.estilos[i].porcentaje
                    var ide = this.estilos[i].id
                }
            };
            this.tipoEstilo = ide;
            this.unica = unica;
            // console.log(unica+' este valor importa');
            // console.log(num);

        },
 },
      computed: {
        currentEstilo () {
        var tipoEstilo = this.tipoEstilo;
        var results = this.estilos.filter(function (estilo) { return estilo.id == tipoEstilo;});
        var firstObj = (results.length > 0) ? results[0] : null;
        // console.log(firstObj);
        return firstObj;
        // if (firstObj.pregunta) { return firstObj.pregunta; } else { return ''}
      },
      currentTitle () {
        var step = this.step;
        var results = this.preguntas.filter(function (pregunta) { return pregunta.id == step;});
        var firstObj = (results.length > 0) ? results[0] : null;
        if (firstObj.pregunta) { return firstObj.pregunta; } else { return ''}
      },
      orderedPreguntas: function () {

        for (var i = 0; i < this.preguntas.length; i++) {
            this.preguntas[i].opciones = _.orderBy(this.preguntas[i].opciones, 'orden')
        }

        return this.preguntas
  }
    }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.BGtable {
    background-color: #ffbb8d!important;
    border-color: #ffbb8d!important;
}
.buttonColor {
    background-color: #c7e2e5!important;
    border-color: #c7e2e5!important;
}
.application--wrap {
    min-height: 100%
}

</style>
