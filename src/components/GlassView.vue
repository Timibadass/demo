<template>
  <div
    class="glassview__div"
    :style="{ backgroundImage: `url(${currentVariant.media[0].url})` }"
  >
    <p class="glassview__text">{{ glass.name }}</p>
  </div>
</template>

<script>
  export default {
    name: "GlassView",
    data() {
      return {
        currentImage: 0,
      };
    },
    props: {
      glass: {
        type: Object,
        required: true,
      },
    },
    computed: {
      currentVariant() {
        return this.glass.glass_variants[this.currentImage];
      },
    },
  };
</script>

<style>
  .glassview__div {
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    height: 240px;
    background-color: #f6f6f4;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    flex-basis: 100%;
    padding: 16px;
  }
  .glassview__text {
    text-transform: uppercase;
    color: #000;
  }

  @media (min-width: 768px) {
    .glassview__div {
      width: 100%;
      box-sizing: border-box;
      background-size: contain;
      flex-grow: 1;
      height: 400px;
    }
  }
  @media (min-width: 1280px) {
    .glassview__div {
      height: 500px;
    }
  }
</style>
