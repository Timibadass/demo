<template>
  <section class="filter">
    <div class="filter__div">
      <button
        class="filter__button filter__button--mobile"
        @click="currentOption = 'Colours'"
      >
        Colour
      </button>
      <h1 class="filter__heading">
        {{ collection?.name || "Spectacles Women" }}
      </h1>
      <button
        class="filter__button filter__button--mobile"
        @click="currentOption = 'Shape'"
      >
        Shape
      </button>
      <div class="filter-buttons__div">
        <button class="filter__button" @click="currentOption = 'Shape'">
          Shape
        </button>
        <button class="filter__button" @click="currentOption = 'Colours'">
          Colour
        </button>
      </div>
      <FilterOptions
        v-if="options"
        :options="options"
        @filter-values="filterGlasses"
        :name="currentOption"
      />
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import FilterOptions from "./FilterOptions";
  export default {
    name: "FilterComponent",
    data() {
      return {
        colours: ["black", "tortoise", "coloured", "crystal", "dark", "bright"],
        shapes: ["square", "rectangle", "round", "cat-eye"],
        currentOption: "",
      };
    },
    components: {
      FilterOptions,
    },
    computed: {
      ...mapGetters(["collection"]),
      options() {
        let options = null;
        switch (this.currentOption) {
          case "Colours":
            options = this.colours;
            break;
          case "Shape":
            options = this.shapes;
            break;
        }
        return options;
      },
    },
    methods: {
      ...mapActions(["getGlasses", "storeFilterOptions"]),
      async filterGlasses(filterValue, queryType) {
        let queryParam = "";
        switch (queryType) {
          case "Colours":
            filterValue.forEach((filter) => {
              queryParam += `&filters[glass_variant_frame_variant_colour_tag_configuration_names][]=${filter}`;
            });
            break;
          case "Shape":
            filterValue.forEach((filter) => {
              queryParam += `&filters[glass_variant_frame_variant_frame_tag_configuration_names][]=${filter}`;
            });
            break;
        }
        this.$emit("reset-page");
        try {
          await this.getGlasses({
            collection: this.collection.configuration_name,
            queryParam,
          });
          this.storeFilterOptions(filterValue);
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
</script>

<style>
  .filter {
    border-bottom: 1px solid #000;
    height: 50px;
    position: sticky;
    top: 41px;
  }

  .filter__div {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    flex-wrap: wrap;
    height: 100%;
  }

  .filter__heading {
    font-family: "Source Serif Pro", serif;
    margin: auto;
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
  }

  .filter-buttons__div {
    display: none;
  }

  .filter__button {
    background-color: transparent;
    border: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #000;
    height: 100%;
    font-size: 12px;
  }

  .filter__button--mobile {
    border-left: 1px solid #000;
    border-right: 1px solid #000;
  }

  .filter__button--mobile:nth-of-type(2) {
    border-right: 0;
  }
  @media (min-width: 500px) {
    .filter {
      top: 61px;
    }
  }
  @media (min-width: 768px) {
    .filter__heading {
      font-size: 26px;
    }
  }

  @media (min-width: 1024px) {
    .filter__heading {
      width: 100%;
      /* flex-basis: calc((100% / 2) - 3); */
      border-right: 1px solid #000;
      border-left: 1px solid #000;
      height: 100%;
      font-size: 32px;
      grid-column-start: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .filter__div {
      display: grid;
      grid-template-columns: 33.33% 33.33% 33.33%;
      justify-items: center;
      align-items: flex-start;
    }

    .filter-buttons__div {
      border-right: 1px solid #000;
      display: flex;
      flex-basis: calc((100% / 2) - 3);
      align-items: center;
      margin-right: auto;
      height: 100%;
    }

    .filter__button {
      border-right: 1px solid #000;
      width: 100px;
      height: 100%;
    }

    .filter__button--mobile {
      display: none;
    }

    .filter__button:nth-of-type(1) {
      border-left: 0;
    }
  }

  @media (min-width: 1280px) {
    .filter-buttons__div,
    .filter__heading {
      flex-basis: 30%;
    }
  }
</style>
