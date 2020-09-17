<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div
    :class="[layoutTypeClass, navbarClasses, footerClasses, {'no-scroll': isAppPage}]"
    class="layout--main"
    v-if="this.$store.state.isLoggedIn"
  >
    <div :class="[contentAreaClass, {'show-overlay': bodyOverlay}]" id="content-area">
      <div id="content-overlay" />

      <!-- Navbar -->
      <template v-if="mainLayoutType === 'horizontal' && windowWidth >= 1024">
        <the-navbar-horizontal
          :activePage="routeIndex"
          :class="[
          {'text-white' : isNavbarDark  && !isThemeDark},
          {'text-base'  : !isNavbarDark && isThemeDark}
        ]"
          :navbarType="navbarType"
          text-color="#707070"
        />
        <div style="height: 62px" v-if="navbarType === 'static'"></div>
      </template>

      <template v-else>
        <the-navbar-vertical
          :class="[
          {'text-white' : isNavbarDark  && !isThemeDark},
          {'text-base'  : !isNavbarDark && isThemeDark}
        ]"
          :navbarColor="navbarColor"
        />
      </template>
      <!-- /Navbar -->
      <!--      <div class="main-nav" v-if="mainNav && windowWidth >= 1024">-->
      <!--        <div class="nav-section items-center">-->
      <!--          <router-link :to="{name: 'dashboard'}" v-bind:class="{ active: isDashboard }" v-show="!detailedView">-->
      <!--            Dashboard-->
      <!--          </router-link>-->
      <!--          <vs-dropdown class="ml-4" v-show="detailedView" vs-trigger-click>-->
      <!--            <feather-icon class="cursor-pointer" icon="MenuIcon" v-show="detailedView"/>-->
      <!--            <vs-dropdown-menu class="back">-->
      <!--              <vs-dropdown-item>-->
      <!--                <router-link :to="{name: 'dashboard'}">Dashboard</router-link>-->
      <!--              </vs-dropdown-item>-->
      <!--            </vs-dropdown-menu>-->
      <!--          </vs-dropdown>-->
      <!--          <router-link :to="{name: 'deals'}" v-bind:class="{active: isDeals}">Deals</router-link>-->
      <!--          <span class="text-2xl" v-show="detailedView">CND-4201</span>-->
      <!--        </div>-->
      <!--        <div class="nav-section">-->
      <!--          <router-link :to="{name: 'favorites'}" v-bind:class="{active: isFavorites}">Favorites</router-link>-->
      <!--          <router-link :to="{name: 'my-deals'}" v-bind:class="{active: isMyDeals}">My Deals</router-link>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="content-wrapper">
        <div class="router-view">
          <div class="router-content">
            <transition :name="routerTransition">
              <div
                class="router-header flex flex-wrap items-center mb-6"
                v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
              >
                <div
                  :class="{'pr-4 border-0 md:border-r border-solid border-grey-light' : $route.meta.breadcrumb}"
                  class="content-area__heading"
                >
                  <h2 class="mb-1">{{ routeTitle }}</h2>
                </div>

                <!-- BREADCRUMB -->
                <vx-breadcrumb
                  :isRTL="$vs.rtl"
                  :route="$route"
                  class="ml-4 md:block hidden"
                  v-if="$route.meta.breadcrumb"
                />

                <!-- DROPDOWN -->
                <vs-dropdown class="ml-auto md:block hidden cursor-pointer">
                  <vs-button icon="icon-settings" icon-pack="feather" radius />

                  <vs-dropdown-menu class="w-32 back">
                    <vs-dropdown-item>
                      <div
                        @click="$router.push('/pages/profile').catch(() => {})"
                        class="flex items-center"
                      >
                        <feather-icon
                          class="inline-block mr-2"
                          icon="UserIcon"
                          svgClasses="w-4 h-4"
                        />
                        <span>Profile</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div
                        @click="$router.push('/apps/todo').catch(() => {})"
                        class="flex items-center"
                      >
                        <feather-icon
                          class="inline-block mr-2"
                          icon="CheckSquareIcon"
                          svgClasses="w-4 h-4"
                        />
                        <span>Tasks</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div
                        @click="$router.push('/apps/email').catch(() => {})"
                        class="flex items-center"
                      >
                        <feather-icon
                          class="inline-block mr-2"
                          icon="MailIcon"
                          svgClasses="w-4 h-4"
                        />
                        <span>Inbox</span>
                      </div>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </transition>

            <div class="content-area__content">
              <!-- <back-to-top :right="$vs.rtl ? 'calc(100% - 2.2rem - 38px)' : '30px'" bottom="5%" v-if="!hideScrollToTop"
                           visibleoffset="500">
                <vs-button class="shadow-lg btn-back-to-top" icon="icon-arrow-up" icon-pack="feather"/>
              </back-to-top>-->

              <transition :name="routerTransition" mode="out-in">
                <router-view
                  @changeRouteTitle="changeRouteTitle"
                  @setAppClasses="(classesStr) => $emit('setAppClasses', classesStr)"
                />
              </transition>
            </div>
          </div>
        </div>
      </div>
      <the-footer />
    </div>
  </div>
</template>


<script>
import BackToTop from "vue-backtotop";
import navMenuItems from "@/layouts/components/vertical-nav-menu/navMenuItems.js";
import TheNavbarHorizontal from "@/layouts/components/navbar/CondosNavbar.vue";
import TheNavbarVertical from "@/layouts/components/navbar/CondosNavbarMobile.vue";
import TheFooter from "@/layouts/components/CondosFooter.vue";
import themeConfig from "@/../themeConfig.js";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../../graphql/queries";
import { getUserNotifications, listDeals } from "../../graphql/custom-queries";
import { listNotifications } from "../../graphql/queries";
import { onCreateNotification } from "../../graphql/subscriptions";

export default {
  components: {
    BackToTop,
    TheFooter,
    TheNavbarHorizontal,
    TheNavbarVertical,
  },
  data() {
    return {
      footerType: themeConfig.footerType || "static",
      hideScrollToTop: themeConfig.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || "#fff",
      navbarType: themeConfig.navbarType || "floating",
      navMenuItems: navMenuItems,
      routerTransition: themeConfig.routerTransition || "none",
      routeTitle: this.$route.meta.pageTitle,
      routeIndex: this.$route.meta.index,
      isDashboard: this.$route.meta.isDashboard,
      isDeals: this.$route.meta.isDeals,
      isOffers: this.$route.meta.isOffers,
      isFavorites: this.$route.meta.isFavorites,
      isMyDeals: this.$route.meta.isMyDeals,
      mainNav: this.$route.meta.nav,
      detailedView: this.$route.meta.detailedView,
      itemID: this.$route.meta.ID,
    };
  },
  watch: {
    $route() {
      this.routeTitle = this.$route.meta.pageTitle;
      this.isDashboard = this.$route.meta.isDashboard;
      this.isDeals = this.$route.meta.isDeals;
      this.isOffers = this.$route.meta.isOffers;
      this.isFavorites = this.$route.meta.isFavorites;
      this.isMyDeals = this.$route.meta.isMyDeals;
      this.mainNav = this.$route.meta.nav;
      this.detailedView = this.$route.meta.detailedView;
      this.itemID = this.$route.meta.ID;
    },
    isThemeDark(val) {
      const color = this.navbarColor == "#fff" && val ? "#10163a" : "#fff";
      this.updateNavbarColor(color);
    },
    "$store.state.mainLayoutType"(val) {
      this.setNavMenuVisibility(val);
    },
  },
  computed: {
    bodyOverlay() {
      return this.$store.state.bodyOverlay;
    },
    contentAreaClass() {
      if (this.mainLayoutType === "vertical") {
        if (this.verticalNavMenuWidth == "default")
          return "content-area-reduced";
        else if (this.verticalNavMenuWidth == "reduced")
          return "content-area-lg";
        else return "content-area-full";
      }
      // else if(this.mainLayoutType === "boxed") return "content-area-reduced"
      else return "content-area-full";
    },
    footerClasses() {
      return {
        "footer-hidden": this.footerType == "hidden",
        "footer-sticky": this.footerType == "sticky",
        "footer-static": this.footerType == "static",
      };
    },
    isAppPage() {
      return this.$route.meta.no_scroll;
    },
    isThemeDark() {
      return this.$store.state.theme == "dark";
    },
    layoutTypeClass() {
      return `main-${this.mainLayoutType}`;
    },
    mainLayoutType() {
      return this.$store.state.mainLayoutType;
    },
    navbarClasses() {
      return {
        "navbar-hidden": this.navbarType == "hidden",
        "navbar-sticky": this.navbarType == "sticky",
        "navbar-static": this.navbarType == "static",
        "navbar-floating": this.navbarType == "floating",
      };
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      console.log(this.$store.state.windowWidth);
      return this.$store.state.windowWidth;
    },
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title;
      console.log(this.routeTitle);
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if (val == "#fff") this.isNavbarDark = false;
      else this.isNavbarDark = true;
    },
    setNavMenuVisibility(layoutType) {
      if (
        (layoutType === "horizontal" && this.windowWidth >= 1200) ||
        (layoutType === "vertical" && this.windowWidth < 1200)
      ) {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);
        this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu");
      } else {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);
      }
    },
    pushBack() {
      ////console.log(this.$store.state.isLoggedIn);
      this.$router.push("/login");
    },
    async getUser() {
      //console.log(this.$store.state.userObject)
      console.log(this.$store.state.currentUserID);
      let currentUser = await API.graphql(
        graphqlOperation(getUserNotifications, {
          id: this.$store.state.currentUserID,
        })
      );
      currentUser = await currentUser.data.getUser;
      console.log(this.$store.state.userObject);
      console.log(currentUser);
      let userCreatedAt = this.$store.state.userObject.createdAt;
      if (currentUser != null && currentUser.notifications.items.length > 0) {
        currentUser.notifications.items.forEach((notification, index) => {
          if (new Date(notification.createdAt) < new Date(userCreatedAt)) {
            currentUser.notifications.items.splice(index, 1);
            console.log("AHA");
            console.log(notification);
          }
          if (notification.deal == null) {
            currentUser.notifications.items.splice(index, 1);
          }
          if (
            currentUser.notificationDenied != true &&
            notification.type == 3
          ) {
            currentUser.notifications.items.splice(index, 1);
          }
          if (
            currentUser.notificationGranted != true &&
            notification.type == 2
          ) {
            currentUser.notifications.items.splice(index, 1);
          }
          if (
            currentUser.notificationRequests != true &&
            notification.type == 1 &&
            !this.$store.state.sa
          ) {
            currentUser.notifications.items.splice(index, 1);
          }
        });
      }

      if (currentUser.notificationNew == true) {
        let newDealNotifications = await API.graphql(
          graphqlOperation(listNotifications, {
            limit: 1000,
            filter: {
              type: { eq: 4 },
            },
          })
        );
        newDealNotifications =
          newDealNotifications.data.listNotifications.items;
        newDealNotifications.forEach((item) => {
          if (this.$store.state.userObject.ignoreDeals == null)
            this.$store.commit("updateUserIgnore", []);
          if (
            !this.$store.state.userObject.ignoreDeals.includes(item.id) &&
            item.deal != null &&
            new Date(item.createdAt) > new Date(userCreatedAt)
          ) {
            currentUser.notifications.items.push(item);
          }
          ////console.log(currentUser);
        });
      }
      if (currentUser.notificationDigest == true) {
        let digestNotifications = await API.graphql(
          graphqlOperation(listNotifications, {
            limit: 1000,
            filter: {
              type: { eq: 5 },
            },
          })
        );
        digestNotifications = digestNotifications.data.listNotifications.items;
        digestNotifications.forEach((item) => {
          if (this.$store.state.userObject.ignoreDeals == null)
            this.$store.commit("updateUserIgnore", []);
          if (
            !this.$store.state.userObject.ignoreDeals.includes(item.id) &&
            new Date(item.createdAt) > new Date(userCreatedAt)
          ) {
            currentUser.notifications.items.push(item);
          }
          ////console.log(currentUser);
        });
      }
      this.$store.commit("setUserObject", currentUser);
      ////console.log(this.$store.state.userObject);
      if (this.$store.state.userObject.favorites == null)
        this.$store.commit("updateUserFav", 1);
      if (this.$store.state.userObject.accessRequests == null)
        this.$store.commit("updateUserAccessRequests", 1);
      ////console.log("I'm here :))")
      // if(this.$store.state.userObject.configured === false) this.$router.push('../../../edit-profile/initial');
    },
  },
  async created() {
    await this.getUser();
    const color =
      this.navbarColor == "#fff" && this.isThemeDark
        ? "#10163a"
        : this.navbarColor;
    this.updateNavbarColor(color);
    this.setNavMenuVisibility(this.$store.state.mainLayoutType);
    if (!this.$store.state.isLoggedIn) this.pushBack();
    API.graphql(graphqlOperation(onCreateNotification)).subscribe({
      //Push the new items onto our listItems array for dispay
      next: (action) => {
        this.getUser();
      },
    });
  },
  mounted() {
    this.$drift.hide();
  },
  beforeUpdate() {
    // this.getUser();
    this.$drift.hide();
  },
};
</script>

<style>
#app {
  background-color: #ffffff;
}

body {
  background-color: #ffffff;
}

.vs-sidebar--item i.material-icons {
  font-size: 1.5rem;
}

.vs-sidebar--item a {
  font-size: 1.5rem;
}

.dashboard {
  margin-top: 100px;
}

.dashboard .vx-navbar-wrapper {
  margin-top: 100px;
}

@media (min-width: 1024px) {
  .navbar-floating .router-content {
    margin-top: 0;
  }
}

.vx-navbar-wrapper {
  background: none;
}

.main-nav {
  width: 100%;
  height: 100px;
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 30px;
}

.nav-section {
  display: flex;
}

.nav-section a {
  margin: 0 2.2rem;
  color: #707070;
  font-weight: 300;
}
@media (min-width: 1024px) {
  .content-wrapper .router-view .router-content {
    margin-top: 0;
  }
}

.main-nav .nav-section .active {
  color: #fbbf81;
  font-weight: 400;
}

.nav-section a:hover {
  color: #fbbf81;
}

.back {
  left: 135px !important;
}

.vs-component .vs-dropdown--item a {
  font-size: 14px;
  color: #707070;
}
</style>
