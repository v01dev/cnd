/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "/pages",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "",
          name: "dashboard",
          component: () => import("./views/Dashboard.vue"),
          meta: {
            nav: true,
            isDashboard: true,

            isMyDeals: false,
          },
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("./views/Dashboard.vue"),
          meta: {
            nav: true,
            isDashboard: true,

            isMyDeals: false,
          },
        },
        {
          path: "/deals",
          name: "deals",
          component: () => import("./views/Deals.vue"),
          meta: {
            isDeals: true,

            nav: true,
          },
        },
        {
          path: "/offers",
          name: "offers",
          component: () => import("./views/Offers.vue"),
          meta: {
            isOffers: true,

            nav: true,
          },
        },
        {
          path: "/favorites",
          name: "favorites",
          component: () => import("./views/Favorites.vue"),
          meta: {
            isFavorites: true,

            nav: true,
          },
        },
        {
          path: "/my-deals",
          name: "my-deals",
          component: () => import("./views/MyDeals.vue"),
          meta: {
            isMyDeals: true,
            nav: true,
          },
        },
        {
          path: "/detailed-view/:id",
          name: "detailed-view",
          component: () => import("./views/DetailedView"),
          meta: {
            nav: true,
            isDeals: true,
          },
        },
        {
          path: "/edit-profile",
          name: "edit-profile",
          component: () => import("./views/EditProfile"),
          meta: {
            nav: false,
          },
        },
        {
          path: "/edit-developer",
          name: "edit-developer",
          component: () => import("./views/EditDeveloper"),
          meta: {
            nav: false,
          },
        },
        // {
        //     path: '/create-card',
        //     name: 'create-card',
        //     component: () => import('./views/CreateCard'),
        //     meta: {
        //         nav: true,
        //     }
        // },
        // {
        //     path: '/deal-details/:id',
        //     name: 'deal-details',
        //     component: () => import('./views/DealDetailed'),
        //     meta: {
        //         nav: true,
        //     }
        // },

        {
          path: "/deal-details/:id",
          name: "deal-details",
          component: () => import("./views/DealDetailsNew"),
          meta: {
            nav: true,
            isDeals: true,
          },
        },
        {
          path: "/building-details/:id",
          name: "building-details",
          component: () => import("./views/BuildingDetailed"),
          meta: {
            nav: true,
          },
        },
        {
          path: "/unit-details/:id",
          name: "unit-details",
          component: () => import("./views/UnitDetailed"),
          meta: {
            nav: true,
          },
        },
        {
          path: "/create-deal/:id/:mode?",
          name: "create-deal",
          component: () => import("./views/CreateDeal"),
          meta: {
            isAddDeals: true,
            nav: true,
          },
        },
        {
          path: "/create-unit/:id?/:mode?",
          name: "create-unit",
          component: () => import("./views/CreateUnit"),
          meta: {
            nav: true,
          },
        },
        {
          path: "/create-building/:id?/:mode?",
          name: "create-building",
          component: () => import("./views/CreateBuilding"),
          meta: {
            nav: true,
          },
        },
        {
          path: "/access-requests",
          name: "access-requests",
          component: () => import("./views/AccessRequests"),
          meta: {
            nav: true,
          },
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("./views/Profile"),
        },
        {
          path: "/devtools/:index?/:action?/:mode?/:id?",
          name: "devtools",
          component: () => import("./views/DeveloperTools"),
          meta: {
            isDevTools: true,
            nav: true,
          },
        },
        {
          path: "/notification-settings",
          name: "notification-settings",
          component: () => import("./views/NotificationSettings"),
          meta: {
            nav: true,
          },
        },
        {
          path: "/notifications",
          name: "notifications",
          component: () => import("./views/Notifications"),
          meta: {
            nav: true,
          },
        },
        {
          path: "/deal-card",
          name: "deal-card",
          component: () => import("./layouts/components/DealCardNew"),
          meta: {
            nav: true,
          },
        },
      ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: "",
          name: "page-landing",
          component: () => import("@/views/pages/Investors.vue"),
          meta: {
            index: 0,
          },
        },
        {
          path: "sellers/:section?",
          name: "page-sellers",
          component: () => import("@/views/pages/Sellers.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "investors/:section?",
          name: "page-investors",
          component: () => import("@/views/pages/Investors.vue"),
        },
        {
          path: "login",
          name: "page-login",
          component: () => import("@/views/pages/Login.vue"),
          metaTags: [
            {
              name: "description",
              content: "The about page of our example app.",
            },
            {
              property: "og:description",
              content: "The about page of our example app.",
            },
          ],
          meta: {
            title: "Condos Login",
          },
        },
        {
          path: "register",
          name: "page-register",
          component: () => import("@/views/pages/Register.vue"),
        },
        {
          path: "reset",
          name: "page-reset",
          component: () => import("@/views/pages/Reset.vue"),
        },
        {
          path: "resend",
          name: "page-resend",
          component: () => import("@/views/pages/Resend.vue"),
        },
        {
          path: "error-404",
          name: "page-error-404",
          component: () => import("@/views/pages/Error404.vue"),
        },
        {
          path: "devs",
          name: "page-developers",
          component: () => import("@/views/pages/Developers.vue"),
        },
        {
          path: "company/:section?",
          name: "page-company",
          component: () => import("@/views/pages/Company.vue"),
          meta: {
            index: 2,
          },
        },
        {
          path: "contact",
          name: "page-contact",
          component: () => import("@/views/pages/Contact.vue"),
        },
        {
          path: "support",
          name: "page-support",
          component: () => import("@/views/pages/Support.vue"),
        },
        {
          path: "landing",
          name: "page-landing",
          component: () => import("@/views/pages/Landing.vue"),
        },
        // {
        //     path: 'query',
        //     name: 'query',
        //     component: () => import('@/views/pages/QueryTestPage.vue')
        // },
        {
          path: "team",
          name: "page-team",
          component: () => import("@/views/pages/Team.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "news",
          name: "page-news",
          component: () => import("@/views/pages/News.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "how-it-works-sellers",
          name: "how-it-works-sellers",
          component: () => import("@/views/pages/HowItWorksSellers.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "how-it-works-buyers",
          name: "how-it-works-buyers",
          component: () => import("@/views/pages/HowItWorksBuyers.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "how-it-works-brokers",
          name: "faq-broker",
          component: () => import("@/views/pages/FAQBroker.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "bulk-condo-sales",
          name: "bulk",
          component: () => import("@/views/pages/BulkSales.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "pre-construction-condo-buyers-guide",
          name: "pre-construction",
          component: () => import("@/views/pages/PreConstruction.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "terms",
          name: "page-terms",
          component: () => import("@/views/pages/Terms.vue"),
          meta: {
            index: 1,
          },
        },

        {
          path: "legal",
          name: "page-legal",
          component: () => import("@/views/pages/Legal.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "privacy",
          name: "page-privacy",
          component: () => import("@/views/pages/Privacy.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "access-agreement",
          name: "page-agreement",
          component: () => import("@/views/pages/Agreement.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "non-disclosure-non-circumvent",
          name: "page-ndma",
          component: () => import("@/views/pages/NDMA.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "accessibility-statement",
          name: "page-statement",
          component: () => import("@/views/pages/Statement.vue"),
          meta: {
            index: 1,
          },
        },
        {
          path: "brokers",
          name: "brokers",
          component: () => import("@/views/pages/Brokers.vue"),
          meta: {
            index: 3,
          },
        },
      ],
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      component: () => import("@/views/pages/404.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
