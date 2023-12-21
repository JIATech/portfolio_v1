<template>
  <div id="app">
    <div key="transition-container">
      <LoaderComponent
        v-if="showLoader"
        @animation-finished="handleAnimationFinished"
      />
      <div
        id="main-content"
        v-if="showMainContent"
        :class="{
          'fade-in': !contentVisible,
        }"
      >
        <MainPage />
        <TextTyping />
      </div>
    </div>
  </div>
</template>

<script>
import LoaderComponent from "./components/loader_component.vue";
import MainPage from "./components/main_page.vue";
import TextTyping from "./components/text_typing.vue";

export default {
  name: "App",
  components: {
    LoaderComponent,
    MainPage,
    TextTyping,
  },
  data() {
    return {
      showLoader: true,
      contentVisible: false,
    };
  },
  computed: {
    showMainContent() {
      return !this.showLoader;
    },
  },
  methods: {
    handleAnimationFinished() {
      this.showLoader = false;
      setTimeout(() => {
        this.contentVisible = true;
      }, 10);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#main-content {
  transition: opacity 0.7s ease; /* Transición suave */
  opacity: 1; /* Opacidad completa cuando es visible */
}

/* Estilo para el contenido oculto inicialmente */
#main-content.fade-in {
  opacity: 0;
}
</style>
