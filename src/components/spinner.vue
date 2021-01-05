<template>
  <div class="spinner-container">
    <v-progress-circular
      class="spinner"
      indeterminate
      :size="70"
      :width="7"
      ></v-progress-circular>
  </div>
</template>

<style scoped lang="scss">
  .spinner-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    background-color: #21212175;
    display: flex;
  }

  .spinner {
    margin: auto;
  }
</style>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Spinner extends Vue {
  }
</script>
