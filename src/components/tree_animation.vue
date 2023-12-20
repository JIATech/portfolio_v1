<template>
  <div class="christmas-tree">
    <div class="star"></div>
    <div class="lights"></div>
    <div class="tree-body"></div>
  </div>
</template>

<script>
export default {
  name: "TreeAnimation",
  mounted() {
    // Suponiendo que está utilizando un temporizador para la duración de la animación
    setTimeout(() => {
      this.$emit("animation-finished");
    }, 5000); // Ajuste este tiempo según la duración de la animación del árbol
  },
};
</script>

<style scoped>
.christmas-tree {
  position: relative;
  display: inline-block;
}

.tree-body {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid green;
  position: relative;
  margin-top: -10px;
}

.tree-body:before {
  content: "";
  width: 0;
  height: 0;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
  border-bottom: 140px solid green;
  position: absolute;
  top: -120px;
  left: -20px;
}

.tree-body:after {
  content: "";
  width: 0;
  height: 0;
  border-left: 90px solid transparent;
  border-right: 90px solid transparent;
  border-bottom: 180px solid green;
  position: absolute;
  top: -260px;
  left: -40px;
}

.star {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid yellow;
  position: absolute;
  top: -280px;
  left: -10px;
}

.lights {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: -20px;
  left: 20px;
  animation: blink 1s infinite alternate;
}

@keyframes blink {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
