<template>
  <div id="app">
    <Nav @collection-click="getCollectionByConfig" />
    <section>
      <FilterComponent @reset-page="resetPage" />
      <section class="glass__section">
        <GlassView v-for="glass in glasses" :key="glass.id" :glass="glass" />
      </section>
      <div class="loader__div">
        <img
          v-if="showLoader"
          src="@/assets/images/spinner.svg"
          class="loader__image"
          ref="loader"
        />
      </div>
    </section>
  </div>
</template>

<script>
  import Nav from "@/components/Nav";
  import FilterComponent from "@/components/Filter";
  import GlassView from "@/components/GlassView";
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "App",
    data() {
      return {
        options: {
          root: document.querySelector(".glass__section"),
          rootMargin: "0px",
          threshold: 0.5,
        },
        observer: null,
        showLoader: true,
      };
    },
    components: {
      Nav,
      FilterComponent,
      GlassView,
    },
    created() {
      this.fetchCollections();
      const currentCollection = this.collection;
      if (currentCollection) {
        this.getCollectionByConfig(currentCollection.configuration_name);
      } else {
        this.getCollectionByConfig("spectacles-women");
      }
    },
    computed: {
      ...mapGetters(["glasses", "collection", "totalPages", "page"]),
    },
    watch: {
      collection: "getCollectionByConfig",
      glasses: "setObserver",
    },
    methods: {
      ...mapActions(["getCollections", "getGlasses", "changePage"]),
      async fetchCollections() {
        try {
          await this.getCollections();
        } catch (error) {
          console.log(error);
        }
      },
      async getCollectionByConfig() {
        const configName = this.collection.configuration_name;
        try {
          await this.getGlasses({ collection: configName });
        } catch (error) {
          console.log(error);
        }
      },
      resetPage() {
        this.changePage(1);
      },
      callback(entries) {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            if (this.totalPages >= this.page + 1) {
              this.changePage();
            } else {
              this.showLoader = false;
            }
          }
        });
      },
      setObserver() {
        this.observer = new IntersectionObserver(this.callback, this.options);
        if (this.showLoader) {
          this.observer.observe(this.$refs.loader);
        }
      },
    },
  };
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:wght@400;700&family=Source+Serif+Pro:wght@600;900&display=swap");
  * {
    font-family: "Libre Caslon Text", serif;
    font-weight: 400;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  body {
    margin: 0;
    min-height: 100vh;
  }
  .glass__section {
    display: flex;
    flex-wrap: wrap;
  }
  .loader__image {
    display: block;
    width: 40px;
    height: 40px;
    margin: 20px auto;
  }
  .loader__div {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  @media (min-width: 1024px) {
    .glass__section {
      display: grid;
      grid-template-columns: 33.33% 33.33% 33.33%;
      justify-items: center;
      align-items: flex-start;
    }
  }
</style>
