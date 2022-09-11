<template>
  <section class="filter">
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
    <div class="filter-buttons__div"></div>
    <FilterOptions
      v-if="options"
      :options="options"
      @filter-values="filterGlasses"
      :name="currentOption"
    />
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
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
  }

  .filter__heading {
    font-family: "Source Serif Pro", serif;
    margin: auto;
    font-weight: 600;
    text-transform: uppercase;
    color: #000;
  }

  .filter-buttons__div {
    border-left: 1px solid #000;
    height: 100%;
    display: flex;
    align-items: center;
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
</style>
