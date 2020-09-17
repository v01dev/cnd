<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <footer class="the-footer flex-wrap justify-around items-start" id="footer">
    <div class="block-one">
      <img src="../../../public/bulkcondodeals_logo.png" class="logo" href="/" width="120" height="85">
      <!-- <div class="copyright hidden copyright-desktop">
        <span class="">&copy; {{ new Date().getFullYear() }} </span>
        <span class=""> All Rights Reserved | Condos.com</span>
      </div>-->
    </div>
    <div class="flex flex-wrap justify-between block-two">
      <ul>
        <li>
          <router-link class="footer-header" :to="{ name: 'page-company' }">Company</router-link>
        </li>
        <li>
          <router-link
            class="footer-link"
            :to="{ name: 'page-company', params: {section: 'page-company'} }"
          >About</router-link>
        </li>
        <li>
          <router-link
            class="footer-link"
            :to="{ name: 'page-company', params: {section: 'page-company'} }"
          >Team</router-link>
        </li>
        <!-- <li>
          <router-link class="footer-link" :to="{name: 'page-company'}">Investors</router-link>
        </li>-->

        <li>
          <router-link class="footer-link" :to="{ name: 'page-company' }">News & Media</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'page-legal' }">Legal</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'page-terms' }">Terms</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'page-privacy' }">Privacy Policy</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'page-ndma' }">Non-Disclosure<br>& Non-Circumvent Agreement</router-link>
        </li>
      </ul>
      <ul>
        <li>
          <router-link class="footer-header" :to="{ name: 'page-sellers' }">Sellers</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'how-it-works-sellers' }">How it Works</router-link>
        </li>
        <li>
          <router-link
            class="footer-link"
            :to="{ name: 'page-sellers', params: {section: 'faq'} }"
          >FAQs</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'brokers' }">Brokers</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'edit-profile' }">My Account</router-link>
        </li>
        <!-- <li>
          <router-link class="footer-link" :to="{name: 'pre-construction'}">Buy Pre-Construction Condos</router-link>
        </li>-->
      </ul>

      <ul>
        <li>
          <router-link class="footer-header" :to="{ name: 'page-investors' }">Investors</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'how-it-works-buyers' }">How it Works</router-link>
        </li>
        <li>
          <router-link
            class="footer-link"
            :to="{ name: 'page-investors', params: {section: 'faq'} }"
          >FAQs</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'brokers' }">Brokers</router-link>
        </li>
        <li>
          <router-link
            class="footer-link"
            :to="{ name: 'pre-construction' }"
          >Buying Pre-Construction Condos</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'bulk' }">Bulk Condo Sales</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'edit-profile' }">My Account</router-link>
        </li>
        <!-- <li>
          <router-link class="footer-link" :to="{name: 'pre-construction'}">Buy Pre-Construction Condos</router-link>
        </li>-->
      </ul>

      <!-- <ul>
        <li>
          <router-link class="footer-link" :to="{name: 'deals'}">View All Deals</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{name: 'dashboard'}">Dashboard</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{name: 'favorites'}">My Favorites</router-link>
        </li>
        <li>
          <router-link class="footer-link" to="../../../../../devtools/5">Manage Deals</router-link>
        </li>
      </ul>-->
      <ul>
        <li>
          <router-link class="footer-header" :to="{ name: 'page-terms' }">Support</router-link>
        </li>
        <li>
          <router-link class="footer-link" to @click.native="$drift.show()">Live Chat</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{ name: 'page-contact' }">Contact</router-link>
        </li>
        <!-- <li>
          <router-link class="footer-link" :to="{name: 'page-terms'}">Terms</router-link>
        </li>
        <li>
          <router-link class="footer-link" :to="{name: 'page-privacy'}">Privacy</router-link>
        </li>
         <li>
          <router-link class="footer-link" :to="{name: 'page-agreement'}">Deal Access Agreement</router-link>
        </li>
         <li>
          <router-link class="footer-link" :to="{name: 'page-statement'}">Accessibility Statement</router-link>
        </li>-->
      </ul>
    </div>
    <!-- <div class="block-three h-full">
      <span class="font-bold">Don't miss another deal</span>
      <div class="sign-up">

        <vs-input
            class="rounded-full"
            color="#707070"
            name="email"
            placeholder="Enter your email address"
            size="normal"
            v-model="email"/>

        <div class="req-button">
          <vs-button class="rounded-full sign-in-button w-full" color="#49A25A" size="normal">Sign Up</vs-button>
        </div>
      </div>
    </div>-->
    <div class="block w-full copyright-mobile">
      <span class>&copy; {{ new Date().getFullYear() }}</span>
      <span class>All Rights Reserved | BulkCondoDeals.com</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "the-footer",
  data() {
    return {
      email: "",
    };
  },
};
</script>

<style lang="scss">
#footer {
  .logo {
    max-width: 289px;
    height: auto;
    display: block;

    @media (max-width: 600px) {
      width: 200px;
    }
  }

  .block-three {
    align-self: flex-start;
    margin-top: 0.7rem;
  }

  .block-two {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 0.7rem;
  }

  .req-button {
    width: 40%;
    margin-left: 7px;
  }

  // .req-button .vs-button-text {

  // }

  input {
    border-radius: 9999px;
    border: none !important;
    background-color: #f0f0f0;
    height: 39px;
  }

  ul {
    margin-left: 3rem;
    margin-right: 3rem;
  }

  li {
    margin: 0.8rem;
    margin-top: 0;
  }

  .sign-up {
    display: flex;
    align-items: center;
    margin-top: 1.8rem;
  }

  .copyright {
    margin-top: 10rem;
  }

  .vx-logo-text {
    font-size: 37px;
  }

  .block-one {
    align-self: start;
  }

  .footer-link {
    color: #000000;
  }

  .footer-header {
    font-weight: 400;
    padding-left: 0;
    text-transform: uppercase;
    font-family: "Khmer MN", "khmer_mnregular", Georgia, "Times New Roman",
      Times, serif;
    color: #969696;
    font-size: 20px;

    @media (max-width: 600px) {
      margin-top: 30px;
      display: block;
    }
  }

  .footer-link:hover {
    color: #49a25a;
  }
  @media (max-width: 640px) {
    .sign-up {
      flex-direction: column;
      margin-top: 0.8rem;
      align-items: flex-start;
      width: 80vw;
    }
    .vs-input {
      width: 80%;
    }
    .req-button {
      width: 60%;
      margin-left: 0;
      margin-top: 10px;
    }
  }
  @media (max-width: 1024px) {
    .logo {
      margin-bottom: 25px;
    }
    .block-two {
      margin-bottom: 25px;
    }
    .block-three {
      margin-bottom: 25px;
    }
    ul {
      margin-left: 0.2rem;
    }
  }

  @media (max-width: 600px) {
    .logo {
      margin-bottom: 45px;
    }
    // .block-two {
    //   margin-bottom: 125px;
    // }
    // .block-three {

    //   margin-bottom: 125px;
    // }
    ul {
      margin-left: 0.2rem;
      width: 100%;
    }

    .footer-link {
      font-size: 16px;
    }
  }
}
@media (min-width: 1686px) {
  .copyright-mobile {
    display: none !important;
  }
  .copyright-desktop {
    display: inline-block !important;
  }
}
</style>
