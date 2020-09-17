<template>
  <div class="sellers">
    <div class="investor-alert">
      <form @submit.prevent="sendEmail">
        <span>Get Notified When New Deals Are Posted</span>
        <input
          type="email"
          id="lname"
          name="user_email"
          placeholder="Enter Email"
          v-model="email"
        /><br /><br />
        <!-- <vs-button class="submit-btn" button="submit">Submit</vs-button> -->
        <input type="submit" value="Submit" />
      </form>
    </div>
    <!--    <login-nav-new :activeItem="0"></login-nav-new>-->
    <div class="hero">
      <div class="hero__cta hero__text">
        <h1>
          Access exclusive &amp; private deals on
          <br />new construction condos
        </h1>
        <h3>Investor discounts of up to 50% or more.</h3>
        <div class="cta__buttons">
          <vs-button color="#01b143" to="../register">Get Started</vs-button>
          <vs-button
            color="#ffffff"
            @click="scrollMeTo('banner')"
            text-color="#9c9c9c"
            >Learn More</vs-button
          >
        </div>
      </div>
      <img
        class="hero__img"
        src="../../../public/condos-platform-ipadpro.png"
      />
    </div>

    <div id="banner" class="banner" ref="banner">
      <div class="banner__card">
        <div class="banner__card--inner">
          <!-- <img src="../../../public/planet.png"> -->
          <h1>
            Exceptional
            <br class="mobile" />Private Investment Opportunities
          </h1>

          <h3>
            The BulkCondoDeals.com marketplace was developed to aggregate deeply
            discounted new construction investment opportunities for discerning
            and value-oriented investors.
          </h3>
          <br />
          <h3>
            BulkCondoDeals.com provides investors with easy to use tools to
            quickly analyze cap rates, appreciation, return on investment and
            other investment metrics.
          </h3>
        </div>
      </div>
    </div>

    <div class="about">
      <div class="about__row justify-end">
        <div
          class="row--left flex flex-col justify-center order-2 xl:order-first row--text"
        >
          <p class="row-text--upper">Significant Price Discount to Market</p>
          <p class="row-text--lower">
            All deals have been verified with the Seller and meet the initial
            discount requirements to support asset appreciation and investment
            growth.
          </p>
        </div>
        <div
          class="row--right flex items-center justify-center w-full xl:w-1/2"
        >
          <img
            class="row__img"
            src="../../../public/dealcards.png"
            width="544"
          />
        </div>
      </div>
      <div class="about__row items-center justify-end card-row-wrapper">
        <div class="row--left flex justify-center card-row">
          <div class="row__card">
            <span>Developers</span>
            <span>Banks</span>
            <span>Mezzanine Lenders</span>
            <span>Servicers</span>
            <span>Private Sellers</span>
          </div>
        </div>
        <div
          class="row--right flex flex-col justify-end items-start w-full xl:w-1/2"
        >
          <p class="row-text--upper access">
            Access Deals
            <br class="mobile" />Not Available <br class="mobile" />Anywhere
            Else
          </p>
          <p class="row-text--lower access">
            Our team of real estate finance professionals have sourced deals
            from a wide range of sellers looking to sell fast in exchange for a
            significant discount. Since deals can be posted confidentially,
            sellers looking for liquidity do not have to signal potential
            distress to lenders or retail buyers. Accordingly, there are many
            deals not available on other websites.
          </p>
        </div>
      </div>
      <div class="about__row">
        <div class="row--left order-2 xl:order-first row--text">
          <p class="row-text--upper">
            Project Investment Performance With Easy To Use Tools
          </p>
          <p class="row-text--lower">
            Quickly simulate investment returns by adjusting deposit, rental
            income and appreciation assumptions. All deals are displayed through
            an investor lens helping you quickly ascertain minimum performance
            thresholds for underwriting.
          </p>
        </div>
        <div
          class="row--right flex items-center justify-center xl:justify-start assumptions-row"
        >
          <img
            class="row__img assumptions"
            src="../../../public/charts.png"
            width="555"
          />
        </div>
      </div>
    </div>

    <div class="demo">
      <span>Investor Tools To Help You</span>
      <h2 class="analyze">
        Understand
        <br class="mobile" />& Analyze Deals
      </h2>
      <img class="demo-img" src="../../../public/dealcarddetail.png" />
    </div>

    <div class="flow">
      <div class="flow-inner">
        <h1>Request Access to See Private Information</h1>
      </div>
      <div class="flow__lower">
        <div class="flow__lower-card">
          <span class="text-lower">
            REGISTER
            <br class="text-lower__br" />& GET VERIFIED
          </span>
        </div>
        <div class="flow__lower-card">
          <span class="text-lower">
            ANALYZE
            <br class="text-lower__br" />INVESTMENTS
          </span>
        </div>
        <div class="flow__lower-card">
          <span class="text-lower">
            ACCESS
            <br class="text-lower__br" />PRIVATE DATA
          </span>
        </div>
        <div class="flow__lower-card">
          <span class="text-lower">
            NEGOTIATE
            <br class="text-lower__br" />ACQUISITION
          </span>
        </div>
      </div>
      <div class="flow__lower-text">
        <span>
          Only logged in members are
          <br />able to see private deals
        </span>
        <span>
          Analyze private investments
          <br />with interactive tools
        </span>
        <span>
          Private access to deal details
          <br />and initiate Seller contact
        </span>
        <span
          >Transaction concierge will provide support through the process</span
        >
      </div>
    </div>

    <div class="ensure">
      <!-- <img src="../../../public/landing-overlaid.png"> -->
      <div class="ensure__inner">
        <h1>
          Pre & Post Closing
          <br />Investor Services
        </h1>
        <div class="ensure__pros">
          <div class="ensure__pros-pro">
            <img class="pro-img" src="../../../public/map-white.png" />
            <span class="pro-txt">Transaction Management</span>
          </div>
          <div class="ensure__pros-pro">
            <img class="pro-img" src="../../../public/financing.png" />
            <span class="pro-txt">Financing</span>
          </div>
          <div class="ensure__pros-pro">
            <img class="pro-img" src="../../../public/legal.png" />
            <span class="pro-txt">Legal & Title</span>
          </div>
          <div class="ensure__pros-pro">
            <img class="pro-img" src="../../../public/management.png" />
            <span class="pro-txt">Property Management</span>
          </div>
          <div class="ensure__pros-pro">
            <img class="pro-img" src="../../../public/resales.png" />
            <span class="pro-txt">Resales</span>
          </div>
        </div>
      </div>
    </div>

    <div class="faq" ref="faq">
      <div class="faq-inner">
        <div class="faq__header">
          <h2>Frequently Asked Questions</h2>
          <div class="flex flex-col lg:flex-row items">
            <span>Have more questions?</span>
            <a class="link" href="google.com">Click to Chat</a>
          </div>
        </div>
        <div class="faq__qas">
          <div class="faq__qas-qa">
            <span class="faq__qas-qa__question"
              >Are these opportunities verified and available?</span
            >
            <span class="faq__qas-qa__answer"
              >Yes. All deals on the site have been verified as available and
              with the posted discount. It is up to each investor however to
              conduct their own financial and legal analysis before making an
              investment.</span
            >
          </div>
          <div class="faq__qas-qa">
            <span class="faq__qas-qa__question">How can I view the deals?</span>
            <span class="faq__qas-qa__answer"
              >In order to maintain confidentiality for our sellers, Investors
              have an easy three-step process before viewing deals: 1. Email
              Verification; 2. Investor Qualification; and 3. Seller
              Approval.</span
            >
          </div>
          <div class="faq__qas-qa">
            <span class="faq__qas-qa__question"
              >How do I become a qualified investor?</span
            >
            <span class="faq__qas-qa__answer">
              Investors complete a simple Investor Questionnaire with the
              following questions: 1. Do you have a net worth of $1 million,
              excluding your primary residence, or income of $200,000 for the
              past two years ($300,00 if combined with a spouse) with the
              expectation of the same income for the current year? 2. Do you
              currently own investment real estate? 3. Do you own investment
              condominiums? 4. How many real estate transactions did you
              complete in the past 12 months? 5. Are you primarily interested in
              rental income or asset appreciation?
            </span>
          </div>
          <div class="faq__qas-qa">
            <span class="faq__qas-qa__question"
              >Are there any costs for an investor to use the platform?</span
            >
            <span class="faq__qas-qa__answer"
              >No. There is no cost to view, negotiate and make offers on
              deals.</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="browse">
      <h1>
        Ready to browse our
        <br />private deal inventory?
      </h1>
      <vs-button color="#FFFFFF" text-color="#000000" to="../register"
        >Get Started</vs-button
      >
    </div>
    <!--    <login-nav-lower :activeItem="1"></login-nav-lower>-->
  </div>
</template>

<script>
import LoginNavNew from "../../layouts/condos-navbars/LoginNavNew";
import LoginNavLower from "../../layouts/condos-navbars/LoginNavLower";
import emailjs from "emailjs-com";

export default {
  data() {
    return {
      email: "",
    };
  },
  components: {
    LoginNavNew,
    LoginNavLower,
  },
  methods: {
    scrollToView(component) {
      setTimeout(() => {
        this.$refs[component].scrollIntoView();
      }, 200);
    },
    async sendEmail(e) {
      await emailjs
        .sendForm(
          "gmail",
          "template_9osqxer",
          e.target,
          "user_praLRxgpKucwmV0r1B3O4"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
      this.email = "";
      this.$vs.notify({
        color: "success",
        title: "Success",
        text: "Message successfully sent!",
        position: "top-center",
      });
    },
  },
  mounted() {
    if (this.$route.params.section) {
      this.scrollToView(this.$route.params.section);
      console.log("scrolled");
    }
  },
  updated() {
    if (this.$route.params.section) {
      this.scrollToView(this.$route.params.section);
      console.log("scrolled");
    }
  },
  watch: {
    "$route.params.section": function() {
      if (this.$route.params.section) {
        this.scrollToView(this.$route.params.section);
        console.log("scrolled");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sellers {
  background-color: #f4f4f4;
}

.hero {
  width: 100%;
  display: flex;
  align-items: center;
  /* height: 80vh; */
  justify-content: flex-end;
  flex-direction: column;
  @media (max-width: 650px) {
    //  height: 300px;
  }
}

.hero__img {
  // width: 100%;
  // position: absolute;
  // left: -35%;
  @media (max-width: 650px) {
    // display: none;
  }
}

.hero__cta {
  width: 100%;
  z-index: 2;
  text-align: center;
  margin-top: 130px;
  margin-bottom: 84px;
  @media (max-width: 650px) {
    width: 90%;
    margin-top: 58px;
  }
}

.hero__text {
  font-size: 50px;

  h1 {
    font-size: 63px;
    // font-size: 50px;
    line-height: 1;
    font-family: "Khmer MN", "khmer_mnregular", Georgia, "Times New Roman",
      Times, serif;
    @media (max-width: 900px) {
      font-size: 34px;
      line-height: 0.9;
      letter-spacing: 0;
      margin-bottom: 10px;

      br {
        display: none;
      }
    }
  }

  h3 {
    font-size: 24.633px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
    @media (max-width: 900px) {
      font-size: 15px;
    }
  }

  .vs-button {
    margin-right: 10px;
  }
}

.banner {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 300px;
  @media (max-width: 900px) {
    margin-top: 40px;
    margin-bottom: 200px;
  }
  @media (max-width: 600px) {
    margin-bottom: 100px;
  }

  .banner__card {
    width: 80%;
    border-radius: 14px;
    background-color: rgb(255, 255, 255);
    box-shadow: 2.939px 4.045px 1px 0px rgba(0, 0, 0, 0.04);

    @media (max-width: 600px) {
      width: 90%;
    }

    .banner__card--inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 60px;
      padding-top: 90px;
      flex-direction: column;

      h1 {
        width: 100%;
        font-size: 42px;
        text-align: center;
        margin-bottom: 40px;
        font-family: "Khmer MN", "khmer_mnregular", Georgia, Times, serif;
      }

      img {
        width: 8%;
        margin-bottom: 40px;
      }

      h3 {
        width: 90%;
        font-size: 16px;
        line-height: 1.8;
        text-align: center;
        max-width: 650px;
      }

      @media (max-width: 1800px) {
        h1 {
          font-size: 42px;
          line-height: 1.1;
        }
        h3 {
          font-size: 16px;
          line-height: 1.8;
        }
      }
      @media (max-width: 1400px) {
        h1 {
          font-size: 42px;
        }
        h3 {
          font-size: 16px;
        }
      }
      @media (max-width: 1100px) {
        flex-direction: column;
        h1 {
          width: 90%;
          text-align: center;
          margin-bottom: 30px;
        }
        h3 {
          margin-top: 30px;
          width: 90%;
          text-align: center;
        }
        img {
          width: 17%;
        }
      }
      @media (max-width: 900px) {
        img {
          width: 23%;
        }
      }
      @media (max-width: 600px) {
        padding: 10px;
        padding-top: 60px;
        padding-bottom: 40px;
        img {
          width: 35%;
        }
        h1 {
          font-size: 32px;
          line-height: 1;
          margin-bottom: 20px;
        }

        h3 {
          // text-align:left;
          width: 100%;
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 0;
        }
      }
    }
  }
}
.investor-alert {
  background: #ebebeb;
  text-align: center;
  padding-top: 0px;
  padding-bottom: 0px;
  background: #636363;
  color: white;
}

.about {
  .about__row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 250px;
    margin-bottom: 250px;

    @media (max-width: 1200px) {
      padding: 0 15%;
      margin-top: 100px;
      margin-bottom: 75px;
    }
    @media (max-width: 768px) {
      padding: 0 6%;
      margin-top: 30px;
    }

    .row--left {
      width: 45%;

      .row__card {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 58%;
        padding: 45px;
        border-radius: 14px;
        background-color: rgb(255, 255, 255);
        box-shadow: 2.939px 4.045px 1px 0px rgba(0, 0, 0, 0.04);
        @media (max-width: 768px) {
          width: 100%;
        }

        span {
          font-size: 24px;
          font-family: "Helvetica Neue";
          color: rgb(129, 124, 124);
          text-align: left;
          margin-bottom: 5px;
        }
      }

      .row-text--upper {
        margin-left: 20%;
        font-size: 4.1rem;
        font-family: "Khmer MN", "khmer_mnregular", Georgia, Times New Roman,
          serif;
        width: 61%;
        line-height: 1.1;
        margin-bottom: 20px;
        @media (max-width: 900px) {
          font-size: 30px;
        }
      }

      .row-text--lower {
        font-size: 17px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        line-height: 1.5;
        margin-left: 20%;
        width: 58%;
      }

      @media (max-width: 1440px) {
        .row-text--upper {
          font-size: 3.7rem;
        }
        .row-text--lower {
          font-size: 14px;
        }
      }
      @media (max-width: 1200px) {
        .row-text--upper {
          width: 100%;
          margin-left: 0;
        }
        .row-text--lower {
          width: 100%;
          margin-left: 0;
        }
      }

      @media (max-width: 600px) {
        .row-text--upper {
          font-size: 2.7rem;
          text-align: left;
          margin-bottom: 30px;
          padding-left: 5%;
          padding-right: 5%;
        }
        .row-text--lower {
          font-size: 16px;
          padding-left: 5%;
          padding-right: 5%;
        }
      }

      .row__img {
        max-width: 100%;
      }

      .circle {
        height: 400px;
        width: auto;
        margin-left: 20%;
      }

      .buildings {
        height: 500px;
        width: auto;
      }
    }
    .card-row-wrapper {
      @media (max-width: 1200px) {
        margin-top: 75px;
      }
    }
    .row--right {
      width: 45%;

      .row-text--upper {
        width: 70%;
        line-height: 1.1;
        margin-right: 10%;
        font-size: 4.1rem;
        font-family: "Khmer MN", "khmer_mnregular", Georgia, Times New Roman,
          serif;
        margin-bottom: 20px;
        @media (max-width: 900px) {
          font-size: 30px;
        }
      }

      .row-text--lower {
        font-size: 17px;
        font-family: "Helvetica Neue";
        line-height: 1.5;
        margin-right: 20%;
        width: 58%;
      }

      @media (max-width: 1440px) {
        .row-text--upper {
          font-size: 3.7rem;
        }
        .row-text--lower {
          font-size: 14px;
        }
      }

      @media (max-width: 600px) {
        .row-text--upper {
          font-size: 2.7rem;
          text-align: left;
          margin-bottom: 30px;
          padding-left: 5%;
          padding-right: 5%;
        }
        .row-text--lower {
          font-size: 16px;
          padding-left: 5%;
          padding-right: 5%;
        }
      }

      .access {
        width: 70%;
      }

      .row__img {
        max-width: 100%;
        // width:544px;
      }

      .visualise {
        height: 450px;
        width: auto;
      }

      .bars {
        max-height: 350px;
        width: 80%;
      }

      .assumptions {
        // width: 65%;
        // margin-right: 20%;
      }

      @media (max-width: 1200px) {
        .row-text--upper {
          width: 100%;
        }
        .row-text--lower {
          width: 100%;
        }
        .assumptions {
          margin-right: 0;
        }
      }
    }

    @media (max-width: 1200px) {
      .assumptions-row {
        width: 100%;
      }
      .row--text {
        width: 100% !important;
      }
      .row-text--upper {
        width: 100%;
        margin: 0;
      }
      .row-text--lower {
        width: 100%;
        margin: 0;
      }
      .card-row {
        width: 100%;
      }
      .access {
        width: 100%;
      }
      .row--left {
        margin-bottom: 30px;
        margin-top: 30px;
      }
      .row--right {
        margin-bottom: 30px;
        margin-top: 30px;
      }
    }
  }
}

.demo {
  margin-top: 250px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    margin-top: 100px;
  }

  span {
    font-size: 25px;
    font-family: "Helvetica Neue";
    margin-bottom: 15px;
    @media (max-width: 900px) {
      font-size: 15px;
    }
  }

  h2 {
    margin-bottom: 80px;
    font-size: 60px;
    font-family: "Khmer MN", "khmer_mnregular", Georgia, "Times New Roman",
      Times, serif;
    @media (max-width: 900px) {
      font-size: 2.7rem;
      margin-bottom: 30px;
    }
  }

  .demo-img {
    width: 1070px;
    max-width: 92%;
  }

  .analyze {
    text-align: center;
    line-height: 1;
  }
}

.flow {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
  position: relative;

  .flow-inner {
    margin-top: 40px;
    width: 58%;
    position: relative;
    // border-top: 3px #00A551 solid;

    @media (max-width: 600px) {
      width: 80%;
    }

    h1 {
      font-size: 40px;
      line-height: 300px;
      line-height: 1;
      border-left: 3px #00a551 solid;
      text-align: center;
      font-family: "Khmer MN", "khmer_mnregular", Georgia, Times, serif;
      padding-top: 55px;
      padding-bottom: 24px;
    }

    @media (max-width: 1600px) {
      h1 {
        font-size: 40px;
        padding-top: 110px;
        padding-bottom: 110px;
        padding-left: 20px;
        padding-right: 20px;
        line-height: unset;
      }
    }
    @media (max-width: 680px) {
      h1 {
        font-size: 30px;
        line-height: 1;
        padding-top: 60px;
        padding-bottom: 0px;
        border-left: none;
        padding-left: 0;
        padding-right: 0;
      }
    }
  }

  .flow-inner:before {
    content: "";
    width: 0;
    height: 40px;
    position: absolute;
    border-right: 3px #00a551 solid;
    top: -23px;
    right: 0;

    @media (max-width: 600px) {
      right: 50%;
    }
  }

  .flow__lower {
    display: flex;
    justify-content: space-between;
    width: 72%;
    margin-top: 20px;
    @media (max-width: 1024px) {
      margin-top: 0;
    }
    .flow__lower-card {
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px;
      background-color: rgb(255, 255, 255);
      box-shadow: 2.939px 4.045px 1px 0px rgba(0, 0, 0, 0.04);
      padding: 40px 20px;
      width: 20%;

      .text-upper {
        text-align: center;
        margin-bottom: 15px;
      }

      .text-lower {
        text-align: center;
        font-size: 20.726px;
        font-family: "Khmer MN", "khmer_mnregular", Georgia, Times, serif;
        line-height: 1.1;
        color: rgb(60, 60, 60);
        text-transform: uppercase;
      }
    }

    .flow__lower-card:after {
      content: "";
      position: absolute;
      width: 0;
      height: 40%;
      right: -17%;
      top: 30%;
      border-right: 3px #00a551 solid;
      transform: rotate(90deg);
    }

    .flow__lower-card:nth-child(4n):after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      right: -17%;
      top: 30%;
      border-right: 3px #00a551 solid;
      transform: rotate(90deg);
    }

    @media (max-width: 1200px) {
      .flow__lower-card:after {
        height: 20%;
        top: 40%;
      }
    }
    @media (max-width: 1024px) {
      flex-direction: column;
      .flow__lower-card {
        width: 75%;
        margin-bottom: 35px;
        margin-top: 35px;

        .text-lower__br {
          display: none;
        }
      }
      .flow__lower-card:after {
        transform: unset;
        right: unset;
        left: 13%;
        top: 115%;
        height: 40%;
      }
    }
    @media (max-width: 620px) {
      .flow__lower-card {
        width: 100%;
      }
      .flow__lower-card:after {
        left: 50%;
      }
    }
  }

  .flow__lower-text {
    display: flex;
    justify-content: space-between;
    width: 77%;
    margin-top: 30px;
    margin-bottom: 80px;

    span {
      width: 25%;
      text-align: center;
      font-size: 15px;
      font-family: "Helvetica Neue";
      color: rgb(62, 62, 62);
      line-height: 1.34;
    }

    @media (max-width: 1024px) {
      flex-direction: column;
      position: absolute;
      align-items: flex-end;
      height: 54%;
      top: 38%;
      width: 100%;
      span {
        width: 33%;
        margin-left: 20px;
      }
    }
    @media (max-width: 680px) {
      height: 56%;
      top: 36%;
    }
    @media (max-width: 620px) {
      display: none;
    }
  }
}

.ensure {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  position: relative;
  background: url("/../../landing-overlaid.png");
  background-size: cover;
  height: 700px;

  img {
    max-width: 100%;
  }

  .ensure__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: absolute;
    z-index: 5;
    top: 100px;

    h1 {
      margin-bottom: 5px;
      font-size: 60px;
      font-family: "Khmer MN", "khmer_mnregular", Georgia, Times, serif;
      color: #ffffff;
      line-height: 0.8;
      text-align: center;
      @media (max-width: 1024px) {
        font-size: 45px;
      }

      @media (max-width: 600px) {
        font-size: 34px;
        line-height: 1.1;
      }
    }

    h3 {
      font-size: 24px;
      font-family: "Helvetica Neue";
      color: #ffffff;
      text-align: center;
      font-weight: 300;
    }

    .ensure__pros {
      display: flex;
      justify-content: space-between;
      width: 83%;
      margin-top: 15%;
      @media (max-width: 1400px) {
        margin-top: 10%;
      }
      .ensure__pros-pro {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 20%;

        @media (max-width: 768px) {
          width: 100%;
          display: flex;
          flex-direction: row;
          padding-left: 10%;
          padding-right: 10%;
          justify-content: space-evenly;
        }

        .pro-txt {
          font-size: 19.553px;
          font-family: "Helvetica Neue";
          color: #ffffff;
          line-height: 1;
          text-align: center;
          width: 50%;

          @media (max-width: 768px) {
            width: 100%;
            text-align: left;
            font-size: 24px;
            font-weight: 300;
            padding-left: 40px;
          }
        }

        .pro-img {
          width: auto;
          height: 80px;
          margin-bottom: 50px;
          vertical-align: middle;

          @media (max-width: 768px) {
            height: 40px;
            margin-bottom: 0 !important;
          }
        }

        .find {
          margin-left: 5%;
        }
      }
    }
  }

  .c-progress {
    margin-top: 100px;
    transform: skewX(-45deg);
    transform-origin: bottom;
    position: relative;
    width: 80%;
    height: 50px;
    background-color: #ffffff;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

    &__bar {
      position: absolute;
      top: 0;
      padding: 5px 10px;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00a551;
      background-clip: content-box;
    }
  }

  @media (max-width: 1250px) {
    overflow: hidden;
    height: 900px;
    width: 100%;
    img:not(.pro-img) {
      height: 100%;
      width: auto;
      position: absolute;
      max-width: unset;
    }
    .ensure__inner {
      position: relative;
      height: 100%;
      top: 0;
      padding-top: 100px;

      .ensure__pros {
        flex-wrap: wrap;

        .ensure__pros-pro {
          width: 30%;
          margin-top: 25px;
          margin-bottom: 25px;

          .pro-img {
            margin-bottom: 30px;
          }
        }
      }
    }
  }
  @media (max-width: 700px) {
    height: 1100px;
    .ensure__inner {
      .ensure__pros {
        .ensure__pros-pro {
          width: 45%;
        }
      }
    }
  }
  @media (max-width: 640px) {
    height: auto;
    padding-bottom: 100px;
    .ensure__inner {
      .ensure__pros {
        margin-top: 50px;

        .ensure__pros-pro {
          width: 100%;
        }
      }
    }
  }
}

.faq {
  padding-top: 100px;
  background-color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: center;

  .link {
    color: #000000;
    text-decoration: underline;
    margin-left: 5px;
    text-align: end;
    @media (max-width: 700px) {
      text-align: start;
      margin-left: 0;
    }
  }

  .faq-inner {
    width: 80%;

    .faq__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 100px;
      @media (max-width: 700px) {
        flex-direction: column;
      }

      h2 {
        font-family: "Khmer MN", "khmer_mnregular", Georgia, serif;
        font-size: 40px;
      }
    }

    .faq__qas {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-bottom: 40px;

      .faq__qas-qa {
        width: 40%;
        display: flex;
        flex-direction: column;
        margin-bottom: 60px;

        @media (max-width: 700px) {
          width: 100%;
        }

        .faq__qas-qa__question {
          font-size: 20px;
          font-family: "Helvetica Neue";
          color: rgb(51, 51, 51);
          text-align: left;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .faq__qas-qa__answer {
          font-size: 16px;
          font-family: "Helvetica Neue";
          color: rgb(8, 8, 8);
        }
      }
    }
  }
}

.browse {
  width: 100%;
  background-color: #01b143;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;

  h1 {
    margin-top: 100px;
    margin-bottom: 60px;
    color: #ffffff;
    text-align: center;
    font-size: 60px;
    font-family: "Khmer MN", "khmer_mnregular", Georgia, Times, serif;
    color: rgb(255, 255, 255);
  }
  @media (max-width: 650px) {
    h1 {
      font-size: 33px;
    }
  }
  @media (max-width: 1650px) {
  }

  .vs-button {
    font-size: 20px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: rgb(54, 55, 54);
    font-weight: 400;
  }
}
img.hero__img {
  max-width: 100%;
  width: 1447px;
}

br.mobile {
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
}

.investor-alert form {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.investor-alert form {
  font-size: 1rem;
}

.investor-alert form span {
  margin-right: 10px;
}

.investor-alert form input {
  margin-right: 10px;
  border: none;
  line-height: 1.2;
  // font-size: 1.2rem;
  border-radius: 2px;
  height: 27px;
  padding-left: 11px;
  padding-right: 4px;
  line-height: 1.2;
  font-size: 1rem;
  width: 185px;
  margin-right: -4px;
  // height: 27px;
}

.investor-alert .submit-btn {
  padding: 4.5px !important;
  border-radius: 0 !important;
}

.investor-alert form input:last-child {
  background: #00a551;
  border: none;
  padding: 4px 10px;
  border-radius: 3px;
  width: 80px;
  border-radius: 0 3px 3px 0;
  color: white;
}
</style>
