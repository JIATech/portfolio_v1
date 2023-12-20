<template>
  <div id="app">
    <TreeAnimation
      v-if="showTree"
      @animation-finished="handleAnimationFinished"
    />
    <div v-if="showMainContent">
      <MainPage />
      <TextTyping />
    </div>
  </div>
</template>

<script>
import TreeAnimation from "./components/tree_animation.vue";
import MainPage from "./components/main_page.vue";
import TextTyping from "./components/text_typing.vue";

export default {
  name: "App",
  components: {
    TreeAnimation,
    MainPage,
    TextTyping,
  },
  data() {
    return {
      showTree: true,
    };
  },
  computed: {
    showMainContent() {
      return !this.showTree;
    },
  },
  methods: {
    handleAnimationFinished() {
      this.showTree = false;
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
</style>
