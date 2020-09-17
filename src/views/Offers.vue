<template>
  <div>

  </div>
</template>

<style lang="scss">
  app {
    background-color: #FFFFFF !important;
  }

  body {
    background-color: #FFFFFF !important;
  }

  .tab-nav a {
    margin-right: 3.7rem;
    color: #707070;
  }

  .tab-nav a:hover {
    color: #fbbf81;
  }

  .sort span {
    margin-left: 1rem;
  }

  .sort {
    margin-right: 1.5%;
  }

  .view-all {
    margin-right: 1.5%;
  }

  .section-header {
    font-size: 30px;
    font-family:"Khmer MN",Georgia,Times, serif;
    opacity: 0.4;
    margin-left:1%;
  }

  .tab-nav .last {
    margin-right: 0;
  }

  @media(max-width: 600px) {
    .tab-nav a {
      margin-right: 1.5rem;
    }
  }

  @media(max-width: 767px) {
    .sort {
      width: 100%;
    }
  }
</style>

<script>
    import HNavMenu from "@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue";
    import CondosCard from "../layouts/components/CondosCard.vue";
    import CondosCardBig from "../layouts/components/CondosCardBig.vue";

    export default {
        data() {
            return {
                items: [1, 2, 3, 4, 5, 6],
                favorites: [1, 2, 3, 4],
                myDeals: [1, 2, 3, 4],
                collapseDeals: true,
                activeItem: true,
                collapseFav: true,
                activeSort: 1,
                buildingName: "Sunny Hills",
                myBuildings: "Boulevard Royale",
                favBuilding: "Downtown Brickell",
            };
        },
        components: {
            HNavMenu, CondosCard, CondosCardBig,
        }
    };
</script>
