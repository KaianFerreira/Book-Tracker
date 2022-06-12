<template>
  <div class="loading" :class="{ 'loading-fullscreen' : fullscreen }">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path fill="currentColor" d="M12.9 3.1c1.3 1.2 2.1 3 2.1 4.9 0 3.9-3.1 7-7 7s-7-3.1-7-7c0-1.9 0.8-3.7 2.1-4.9l-0.8-0.8c-1.4 1.5-2.3 3.5-2.3 5.7 0 4.4 3.6 8 8 8s8-3.6 8-8c0-2.2-0.9-4.2-2.3-5.7l-0.8 0.8z"></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: ['fullscreen']
}
</script>

<style lang="scss" scoped>
@import "../assets/_scss/_variables.scss";
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 100px 0;
  svg {
    color: $primary-color;
    animation: loading 0.6s infinite linear;
    width: 30px;
    height: 30px;
  }
  &.loading-fullscreen {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.7);
    margin: 0;
    svg {
      width: 40px;
      height: 40px;
    }
  }
  @keyframes loading {
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
  }
}
</style>
