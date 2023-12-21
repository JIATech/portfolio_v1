<template>
  <div ref="loader" :class="loaderClass"></div>
</template>

<script>
export default {
  name: "LoaderComponent",
  data() {
    return {
      animationFinished: false,
      currentAnimation: "",
      intervalId: null,
    };
  },
  computed: {
    loaderClass() {
      return `loader-${this.currentAnimation}`;
    },
  },
  mounted() {
    this.selectAnimation();
    this.$nextTick(() => {
      this.startAnimation();
    });
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    selectAnimation() {
      const animations = ["expandBar", "expandDot", "rotateLine"];
      // selección de una animación aleatoria
      this.currentAnimation =
        animations[Math.floor(Math.random() * animations.length)];
    },
    startAnimation() {
      this.$nextTick(() => {
        if (this.currentAnimation && this[this.currentAnimation]) {
          this[this.currentAnimation]();
        }
      });
    },
    expandBar() {
      this.$nextTick(() => {
        const loader = this.$ref.loader;
        if (!loader) {
          console.error("Loader element not found");
          return; // Salir si el elemento del loader no se encuentra
        }
        let time = 0; // Tiempo transcurrido
        const maxWidth = window.innerWidth; // Ancho total de la ventana
        const maxHeight = window.innerHeight / 2 - 25; // Mitad de la altura de la ventana
        let expandingWidth = true; // Flag para controlar la dirección de expansión

        const frame = () => {
          // Función exponencial para la aceleración
          let progress = Math.pow(time, 2);

          if (expandingWidth) {
            let width = progress * 40; // Ajusta este valor para cambiar la velocidad inicial y la aceleración
            if (width >= maxWidth) {
              expandingWidth = false;
              time = 0; // Resetea el tiempo para la expansión de altura
              loader.style.top = "50%";
            } else {
              loader.style.width = width + "px";
            }
          } else {
            let height = progress * 40; // Ajusta este valor para cambiar la velocidad inicial y la aceleración en la altura
            if (height >= maxHeight) {
              clearInterval(id);
              loader.style.top = "0";
              loader.style.transform = "none";
              loader.style.height = "100vh";
            } else {
              loader.style.height = 2 * height + 50 + "px";
              loader.style.top = "50%";
              loader.style.transform = "translateY(-" + (height + 25) + "px)";
            }
          }

          time += 0.05;
        };

        const id = setInterval(frame, 10);

        // Inicia la transición de fade-out antes de ocultar el loader
        setTimeout(() => {
          this.fadeOutLoader(loader, id);
        }, 1870);
      });
    },
    expandDot() {
      const loader = this.$ref.loader;
      if (!loader) {
        console.error("Loader element not found");
        return; // Salir si el elemento del loader no se encuentra
      }

      let scale = 0; // Escala inicial del punto
      const maxScale = Math.max(window.innerWidth, window.innerHeight);
      const interval = 10; // Intervalo en milisegundos para el incremento de la escala
      const increment = 5; // Cantidad de incremento de la escala por intervalo

      const id = setInterval(() => {
        if (scale < maxScale) {
          scale += increment;
          loader.style.width = `${scale}px`;
          loader.style.height = `${scale}px`;
        } else {
          clearInterval(id); // Limpia el intervalo cuando la animación ha terminado

          // Inicia la transición de fade-out antes de ocultar el loader
          this.fadeOutLoader(loader);
        }
      }, interval);
    },
    rotateLine() {
      const loader = this.$ref.loader;
      if (!loader) {
        console.error("Loader element not found");
        return; // Salir si el elemento del loader no se encuentra
      }
      let time = 0; // Tiempo transcurrido
      const maxWidth = window.innerWidth; // Ancho total de la ventana
      const maxHeight = window.innerHeight / 2 - 25; // Mitad de la altura de la ventana
      let expandingWidth = true; // Flag para controlar la dirección de expansión

      const frame = () => {
        // Función exponencial para la aceleración
        let progress = Math.pow(time, 2);

        if (expandingWidth) {
          let width = progress * 40; // Ajusta este valor para cambiar la velocidad inicial y la aceleración
          if (width >= maxWidth) {
            expandingWidth = false;
            time = 0; // Resetea el tiempo para la expansión de altura
            loader.style.top = "50%";
          } else {
            loader.style.width = width + "px";
          }
        } else {
          let height = progress * 40; // Ajusta este valor para cambiar la velocidad inicial y la aceleración en la altura
          if (height >= maxHeight) {
            clearInterval(id);
            loader.style.top = "0";
            loader.style.transform = "none";
            loader.style.height = "100vh";
          } else {
            loader.style.height = 2 * height + 50 + "px";
            loader.style.top = "50%";
            loader.style.transform = "translateY(-" + (height + 25) + "px)";
          }
        }

        time += 0.05;
      };

      const id = setInterval(frame, 10);

      // Inicia la transición de fade-out antes de ocultar el loader
      setTimeout(() => {
        this.fadeOutLoader(loader, id);
      }, 1870);
    },

    fadeOutLoader(loader, id) {
      if (!loader) {
        console.error("Loader element not found");
        this.animationFinished = true; // Consider setting this to true to avoid further errors
        this.$emit("animation-finished");
        if (id) {
          clearInterval(id);
        }
        return; // Salir si el elemento del loader no se encuentra
      } else {
        loader.style.transition = "opacity 0.5s ease";
        loader.style.opacity = "0";
        loader.addEventListener(
          "transitionend",
          () => {
            this.animationFinished = true;
            this.$emit("animation-finished");
            loader.style.display = "none";
          },
          { once: true }
        );
      }
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
}

.loader {
  position: fixed; /* o 'absolute' si prefieres */
  top: 50%;
  left: 0;
  height: 50px; /* o la altura que desees para tu barra */
  width: 0; /* Empieza con un ancho de 0 */
  background-color: black; /* o el color que prefieras */
  z-index: 1000; /* Para asegurarse de que esté por encima de otros elementos */
  transform: translateY(-50%);
}

.loader-expandBar {
  position: fixed; /* o 'absolute' si prefieres */
  top: 50%;
  left: 0;
  height: 50px; /* o la altura que desees para tu barra */
  width: 0; /* Empieza con un ancho de 0 */
  background-color: black; /* o el color que prefieras */
  z-index: 1000; /* Para asegurarse de que esté por encima de otros elementos */
  transform: translateY(-50%);
}
.loader-expandDot {
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: black; /* o el color que prefieras */
  border-radius: 50%; /* Hace que sea un círculo */
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
}

.loader-rotateLine {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%; /* Hace que la línea ocupe todo el ancho */
  height: 2px; /* Altura de la línea */
  background-color: black;
  z-index: 1000;
  transform-origin: center; /* Establece el punto de origen para la rotación */
  transform: translate(-50%, -50%) rotate(0deg); /* Empieza sin rotación */
}
</style>
