<template>
  <div
    class="glassview__div"
    :style="{
      backgroundImage: `url(${currentVariant.media[currentImage].url})`,
    }"
  >
    <button
      @click="currentImage--"
      class="glassview__button"
      v-if="currentImage !== 0"
    >
      <img
        class="glassview-button__image"
        src="@/assets/images/caret-left.svg"
        alt=""
      />
    </button>
    <h1 class="glassview__heading">{{ glass.name }}</h1>
    <div class="glassview-info__div">
      <h3 class="glassview-info__heading">Variants</h3>
      <div class="glassview-variants__div">
        <button
          class="glassview-variant__button"
          @disabled="variant.id === currentVariant.id"
          @click="currentVariant = variant"
          :class="{
            'glassview-variant__button--active':
              variant.id === currentVariant.id,
          }"
          v-for="(variant, index) in glass.glass_variants"
          :key="variant.id"
        >
          {{ index + 1 }}
        </button>
      </div>
    </div>
    <button
      class="glassview__button glassview__button--right"
      v-if="currentImage !== currentVariant.media.length - 1"
      @click="currentImage++"
    >
      <img
        class="glassview-button__image"
        src="@/assets/images/caret-right.svg"
        alt=""
      />
    </button>
  </div>
</template>

<script>
  export default {
    name: "GlassView",
    data() {
      return {
        currentImage: 0,
        images: null,
        currentVariant: this.glass?.glass_variants[0],
      };
    },
    props: {
      glass: {
        type: Object,
        required: true,
      },
    },
    watch: {
      currentVariant() {
        this.currentImage = 0;
      },
    },
  };
</script>

<style>
  .glassview__div {
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    height: 300px;
    background-color: #f6f6f4;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    flex-basis: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    transition: all 500ms ease-in-out;
    position: relative;
  }

  .glassview__heading {
    text-transform: uppercase;
    color: #000;
    width: 100%;
    font-weight: 600;
    letter-spacing: 1px;
    height: 20px;
  }

  .glassview-info__div {
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    color: #000;
  }

  .glassview-info__heading {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .glassview-variants__div {
    display: flex;
    flex-wrap: wrap;
  }

  .glassview-variant__button {
    width: 40px;
    height: 40px;
    background-color: transparent;
    box-sizing: border-box;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .glassview__button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 0;
    position: absolute;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    padding: 0;
    top: 50%;
    background-color: #fff;
  }

  .glassview-button__image {
    width: 18px;
    border-radius: 50%;
    height: 18px;
  }

  .glassview__button--right {
    right: 10px;
  }

  .glassview-variant__button--active {
    background-color: rgba(128, 128, 128, 0.3);
    cursor: not-allowed;
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
