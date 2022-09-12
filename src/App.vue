<template>
  <div id="app">
    <Nav @collection-click="getCollectionByConfig" @reset-page="resetPage" />
    <section>
      <FilterComponent @reset-page="resetPage" />
      <template v-if="glassesArray && glassesArray.length > 0">
        <section class="glass__section">
          <GlassView
            v-for="glass in glassesArray"
            :key="glass.id + glass.name"
            :glass="glass"
          />
        </section>
      </template>
      <h1 class="glass__heading" v-else>
        No result found, please try a different filter!
      </h1>
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
        glassesArray: [],
      };
    },
    components: {
      Nav,
      FilterComponent,
      GlassView,
    },
    created() {
      this.resetPage();
      this.fetchCollections();
      this.getCollectionByConfig();
    },
    computed: {
      ...mapGetters(["glasses", "collection", "totalPages", "page"]),
    },
    watch: {
      collection: "getCollectionByConfig",
      glasses(val) {
        if (this.page !== 1) {
          this.glassesArray.push(...val);
        } else {
          this.glassesArray = val;
        }
        this.setObserver();
      },
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
        const configName =
          this.collection?.configuration_name || "spectacles-women";
        try {
          await this.getGlasses({ collection: configName });
        } catch (error) {
          console.log(error);
        }
      },
      resetPage() {
        this.showLoader = true;
        this.changePage(1);
      },
      callback(entries) {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            if (this.totalPages >= this.page + 1) {
              this.changePage();
              this.getCollectionByConfig();
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
  .glass__heading {
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    color: #000;
    margin-top: 30px;
    width: 100%;
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
