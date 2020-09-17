<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="relative">
    <div class="vx-navbar-wrapper" :class="classObj">
      <vs-navbar
        class="vx-navbar navbar-custom navbar-skelton"
        :color="navbarColor"
        v-model="activePage"
        activeTextColor="#fbbf81"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer p-2"
          icon="MenuIcon"
          @click.stop="active = !active"
        />

        <vs-sidebar
          parent="body"
          :index="activePage"
          style="position:absolute; z-index:10000000000;"
          v-model="active"
          :key="this.$route.path"
        >
          <div class="w-full flex justify-end">
            <feather-icon
              @click.stop="active = !active"
              class="mr-2"
              icon="XIcon"
            />
          </div>
          <vs-sidebar-item index="0" icon="dashboard" to="../dashboard">
            Dashboard
          </vs-sidebar-item>
          <vs-sidebar-item index="1" icon="insert_drive_file" to="../deals">
            Deals
          </vs-sidebar-item>
          <vs-sidebar-item index="3" icon="star" to="../favorites">
            My Favorites
          </vs-sidebar-item>
          <vs-sidebar-item index="4" icon="folder_shared" to="../my-deals">
            My Deals
          </vs-sidebar-item>
        </vs-sidebar>
        <vs-spacer />

        <profile-drop-down class="" />
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import ProfileDropDown from "./components/ProfileDropDown.vue";

export default {
  name: "the-navbar-vertical",
  data() {
    return {
      active: false,
      index: 5,
      activePage: 4,
    };
  },
  props: {
    navbarColor: {
      type: String,
      default: "#fff",
    },
  },
  components: {
    ProfileDropDown,
  },
  watch: {
    "$route.path": function() {
      this.active = false;
    },
  },
  computed: {
    navbarColorLocal() {
      return this.$store.state.theme === "dark" && this.navbarColor === "#fff"
        ? "#10163a"
        : this.navbarColor;
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    textColor() {
      return {
        "text-white":
          (this.navbarColor != "#10163a" &&
            this.$store.state.theme === "dark") ||
          (this.navbarColor != "#fff" && this.$store.state.theme !== "dark"),
      };
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },

    // NAVBAR STYLE
    classObj() {
      if (this.verticalNavMenuWidth == "default") return "navbar-default";
      else if (this.verticalNavMenuWidth == "reduced") return "navbar-reduced";
      else if (this.verticalNavMenuWidth) return "navbar-full";
    },
  },
  methods: {},
};
</script>

<style>
.vs-sidebar .vs-sidebar--items {
  overflow: auto;
  padding: 2px 0;
}
.vs-sidebar--item a {
  color: #000000;
}
</style>
