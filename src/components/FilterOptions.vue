<template>
  <div class="filter-options__div">
    <label
      class="filter-option__label"
      :class="{ 'filter-option__label--active': selected.includes(option) }"
      :for="option + 'selected'"
      v-for="(option, index) in options"
      :key="index"
    >
      <button class="filter-option__button">
        {{ option }}
      </button>
      <input
        class="filter-option__checkbox"
        type="checkbox"
        v-model="selected"
        name="selected-options"
        :id="option + 'selected'"
        :value="option"
      />
    </label>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "FilterOptions",
    data() {
      return {
        selected: [],
      };
    },
    props: {
      options: {
        type: Array,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    watch: {
      selected(val) {
        this.$emit("filter-values", val, this.name);
      },
      queryParams: "populateFilter",
    },
    computed: {
      ...mapGetters(["filterOptions"]),
    },
    created() {
      this.populateFilter();
    },
    methods: {
      populateFilter() {
        if (this.filterOptions) {
          this.selected = this.filterOptions && this.filterOptions;
        }
      },
    },
  };
</script>

<style>
  .filter-options__div {
    position: absolute;
    transform: translateY(calc(100% - 25px));
    transition: all 500ms ease-in-out;
    width: 100%;
    border-bottom: 1px solid #000;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    background-color: #fff;
    height: max-content;
  }

  .filter-option__label {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }

  .filter-option__label--active {
    text-decoration: underline;
  }

  .filter-option__button {
    border: 0;
    background-color: transparent;
  }
  @media (min-width: 500px) {
    .filter-options__div {
      transform: translateY(51px);
    }
  }
</style>
