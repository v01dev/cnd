<template>
  <div class="w-full h-screen" id="page-landing">
<!--    <login-nav></login-nav>-->
    <div class="flex-col justify-center content">
      <h1>ACCESS Off-market private deals On new & pre-construction condoS</h1>
      <h2>
        Opportunity is everywhere, if you know where to look.
      </h2>
      <div class="w-full invitation">
        <div class="email-input">
          <vs-input
              class="rounded-full w-full"
              color="#707070"
              name="email"
              placeholder="Enter your email address"
              size="large"
              v-model="email"/>
        </div>
        <div class="req-button">
          <vs-button class="rounded-full sign-in-button w-full" color="#fbbf81" size="large">REQUEST INVITE</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import LoginNav from "../../layouts/condos-navbars/LoginNav";

    export default {
        data() {
            return {
                email: "",
            };
        },
        components: {
            LoginNav,
        }
    };
</script>

<style lang="scss">
  #page-landing {
    background-color: #FFFFFF;
    height: 100vh;

    input {
      border-radius: 9999px;
      background-color: #f0f0f0;
      border: none !important;
    }

    .vs-navbar {
      position: static;
    }

    .content {
      width: 75%;
      margin: auto;
      padding-top: 12rem;
      background-color: #FFFFFF
    }

    h1 {
      font-size: 43px;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
    }

    h2 {
      font-size: 30px;
      font-weight: 300;
      margin-bottom: 25px;
    }

    .invitation {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .req-button {
      width: 45%;
      margin-top: 25px;
      max-width: 300px;
    }

    @media(min-width: 1164px) {
      .req-button {
        margin-left: 10px;
        margin-top: 0;
        width: 25%;
      }
      .email-input {
        width: 50%;
      }
      .invitation {
        width: 100%;
        flex-direction: row;
        align-items: center;
      }
    }
    @media(max-width: 1024px) {
      .content {
        width: 85%;
        padding: 1rem;
      }
      h1 {
        font-size: 38px;
      }
      h2 {
        font-size: 25px;
      }
    }
    @media(max-width: 768px) {
      h1 {
        font-size: 30px;
      }
      h2 {
        font-size: 20px;
      }
    }
    @media(max-width: 625px) {
      .req-button {
        width: 100%;
      }
    }
  }
</style>
