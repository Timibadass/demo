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
    <button class="filter-close__button" @click="$emit('close-filter')">
      <img
        class="filter-close__image"
        src="@/assets/images/close-dark.svg"
        alt=""
      />
    </button>
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
        if (val !== this.filterOptions) {
          const allSelected = val;
          const correctSelected = allSelected.filter((value) => {
            return this.options.includes(value);
          });
          this.$emit("filter-values", correctSelected, this.name);
        }
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

<style scoped>
  .filter-options__div {
    position: absolute;
    transform: translateY(calc(100% - 25px));
    transition: all 500ms ease-in-out;
    width: 100%;
    border-bottom: 1px solid #000;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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
    position: relative;
  }

  .filter-option__label--active {
    text-decoration: underline;
  }

  .filter-option__button {
    border: 0;
    background-color: transparent;
  }
  .filter-close__button {
    width: 30px;
    background-color: transparent;
    border: 0;
    height: 30px;
    border-radius: 4px;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .filter-close__image {
    width: 15px;
    height: 15px;
  }

  .filter-option__checkbox {
    opacity: 0;
    position: absolute;
    width: 100%;
    cursor: pointer;
  }

  @media (min-width: 500px) {
    .filter-options__div {
      min-height: 100px;
      transform: translateY(76px);
      padding: 0 16px;
      box-sizing: border-box;
    }
  }
  @media (min-width: 768px) {
    .filter-options__div {
      transform: translateY(51px);
      min-height: min-content;
      justify-content: flex-end;
    }
  }
</style>
