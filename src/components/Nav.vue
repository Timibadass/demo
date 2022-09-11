<template>
  <header class="header" @mouseleave="showNav = false">
    <div class="header__div">
      <button
        class="header__button"
        :class="{ 'header__button--active': showNav }"
        @mouseover="showNav = true"
      >
        <span
          class="header-button__text header-button__text--mobile"
          @click="showNav = !showNav"
          >{{ showNav ? "x" : "Menu" }}</span
        >
        <span class="header-button__text header-button__text--tab">Menu</span>
      </button>
      <h1 class="header__heading">bloobloom</h1>
    </div>
    <nav
      class="nav"
      ref="nav"
      :class="{ 'nav--visible': showNav }"
      @mouseleave="showNav = false"
    >
      <div
        class="nav__div"
        :class="{ 'nav__div--active': subMenu === 'Spectacles' }"
        @click="showSubMenu('Spectacles')"
        @mouseover="showSubMenu('Spectacles')"
      >
        <p class="nav__text">Spectacles</p>
      </div>
      <div
        class="nav__div"
        :class="{ 'nav__div--active': subMenu === 'Sunglasses' }"
        @mouseover="showSubMenu('Sunglasses')"
        @click="showSubMenu('Sunglasses')"
      >
        <p class="nav__text">Sunglasses</p>
      </div>
      <div class="nav__div" @mouseover="showSubMenu('')">
        <p class="nav__text">Home try on</p>
      </div>
      <div class="nav__div" @mouseover="showSubMenu('')">
        <p class="nav__text">pair for pair</p>
      </div>
      <nav
        class="nav-submenu__nav"
        :class="{ 'nav-submenu__nav--visible': subMenu }"
      >
        <div
          class="nav__div"
          v-for="menu in currentSubMenu"
          :key="menu.id"
          @click="fetchCollectionGlasses(menu.configuration_name, menu)"
        >
          <p class="nav__text">{{ menu.title }}</p>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    name: "appHeader",
    data() {
      return {
        showNav: false,
        subMenu: "",
      };
    },
    computed: {
      ...mapGetters(["collections", "collection"]),
      spectacles() {
        const spectacles = this.collections.filter((collection) => {
          return collection.name.includes("Spectacles");
        });
        return spectacles;
      },
      sunglasses() {
        const sunglasses = this.collections.filter((collection) => {
          return collection.name.includes("Sunglasses");
        });
        return sunglasses;
      },
      currentSubMenu() {
        let currentSubMenu = null;
        const subMenu = this.subMenu;
        switch (subMenu) {
          case "Sunglasses":
            currentSubMenu = this.sunglasses;
            break;
          case "Spectacles":
            currentSubMenu = this.spectacles;
            break;
          default:
            currentSubMenu = null;
            break;
        }
        currentSubMenu?.map((collection) => {
          collection.title = collection.name.toLowerCase().includes("women")
            ? "Women"
            : "Men";
        });
        return currentSubMenu;
      },
    },
    watch: {
      showNav(value) {
        if (!value) {
          this.subMenu = "";
        }
      },
    },
    created() {
      this.fetchCollections();
      const currentCollection = this.collection;
      if (currentCollection) {
        this.fetchCollectionGlasses(currentCollection.configuration_name);
      } else {
        this.fetchCollectionGlasses("spectacles-women");
      }
    },
    methods: {
      ...mapActions(["getCollections", "getGlasses", "storeCollectionInfo"]),
      async fetchCollections() {
        try {
          await this.getCollections();
        } catch (error) {
          console.log(error);
        }
      },
      showSubMenu(type) {
        this.subMenu = type;
      },
      async fetchCollectionGlasses(configName, collection) {
        if (collection) {
          this.storeCollectionInfo(collection);
        }
        this.showSubMenu("");
        this.showNav = false;
        try {
          await this.getGlasses({ collection: configName });
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
</script>

<style>
  .header {
    border-bottom: 1px solid #000;
    height: 40px;
    position: relative;
  }

  .header__div {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
  }

  .header__heading {
    font-weight: 700;
    margin: auto;
    font-size: 24px;
    color: #000;
  }

  .header__button {
    border: 0;
    height: 40px;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    background-color: transparent;
    width: 80px;
    border-right: 1px solid #000;
    cursor: pointer;
    transition: all 300ms ease-in-out;
  }

  .header-button__text {
    color: #000;
  }

  .header-button__text--tab {
    display: none;
  }

  .nav,
  .nav-submenu__nav {
    min-height: calc(100vh - 41px);
    width: 100vw;
    transition: all 500ms ease-in-out;
    transform: translateX(-100%);
    position: absolute;
    border-right: 1px solid #000;
    z-index: 1;
    top: 41px;
    background-color: #fff;
    border-top: 0;
  }

  .nav--visible {
    transform: translateX(0);
  }

  .nav__div {
    border-bottom: 1px solid #000;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: #000;
    cursor: pointer;
  }

  .nav__div--active {
    background-color: #000;
    color: #fff;
  }

  .nav__text {
    text-transform: uppercase;
    font-weight: bold;
  }

  .nav-submenu__nav {
    top: 0;
    opacity: 0;
  }

  .nav-submenu__nav--visible {
    transform: translateX(0);
    opacity: 1;
  }

  @media (min-width: 500px) {
    .header {
      height: 60px;
    }

    .header__button {
      border-right: 0;
      width: 60px;
      height: 25px;
      font-size: 14px;
    }
    .header-button__text--tab {
      display: block;
      letter-spacing: 2px;
    }

    .header-button__text--mobile {
      display: none;
    }

    .header__button--active,
    .header__button :hover {
      text-decoration: underline;
    }

    .nav,
    .nav-submenu__nav {
      max-width: 250px;
      min-height: calc(100vh - 60px);
    }

    .nav {
      top: 60px;
    }

    .nav-submenu__nav--visible {
      transform: translateX(251px);
    }
  }
</style>
