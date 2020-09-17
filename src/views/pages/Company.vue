<template>
  <div class="company">
    <div class="section-title">
      <div class="overlay"></div>
      <h4 class="mb-4">Our mission is to provide</h4>
      <h1 class="mb-2">Liquidity with Privacy</h1>
    </div>
    <div class="about" ref="about">
      <div class="about__row justify-end">
        <div
          class="row--left flex flex-col justify-center order-2 xl:order-first row--text text-center"
        >
          <p class="row-text--upper">
            A private marketplace
            <br />with exceptional
            <br />condo deals
          </p>
        </div>
        <div class="row--right flex items-center justify-center w-full xl:w-1/2">
          <!-- <img class="row__img" src="../../../public/dealcards.png" width="544"> -->
          <p class="row-text--lower">
            BulkCondoDeals.com is a global marketplace for developers, financial institutions and other sellers to confidentially post single and bulk unit condo investments to a global audience of institutional and private investors. Deals are priced with up to 50% discounts in order to achieve rapid liquidity for sellers.
            <br />
            <br />The company is a licensed real estate brokerage and is headquartered in Miami, Florida (www.BulkCondoDeals.com).
            <br />
            <br />For more information or to post a deal please contact Bruce M. Goldstein at bruce@BulkCondoDeals.com or 720.933.0900.
          </p>
        </div>
      </div>
      <div class="about__row items-center justify-center card-row-wrapper" style="margin-bottom: 0px;">
        <div class="row flex flex-col justify-end items-center w-full xl:w-full team" ref="team">
          <h3 class="row-text--upper access text-center">Backed by an experienced team</h3>
          <p
            class="row-text--lower access text-center"
          >The team has significant experience in marketplace development, online real estate and real estate finance:</p>
        </div>
      </div>
      <div class="about__row items-center justify-end card-row-wrapper team-grid" style="margin-top: 60px;">
        <div
          class="row flex flex-col justify-end items-center w-full xl:w-1/3 member"
          style="background-image:url('../../../bruce.jpg'); background-size:cover;"
        >
          <h3 class="row-text--upper access text-center">Bruce M. Goldstein</h3>
          <p class="row-text--lower access text-center">CEO</p>
          <div class="flex justify-spacing items-center">
          <vs-button
          @click="bruceBio = true"
          class="bio_links text-white self-center inline"
          color="#FFFFFF"
          type="flat"
          
        >Read Bio</vs-button> 
        <!-- <a class="bio_links" target="_blank" href="#">LinkedIn</a> -->
        </div>
        </div>
        <vs-popup :active.sync="bruceBio" class="agree-popup" title="Bruce's Bio">
          <p class="mb-4">Bruce M. Goldstein is the founder and CEO of Bruce M. Goldstein & Associates, Inc (BMGA) a nationally acclaimed real estate development and brokerage firm. Bruce and the firm have extensive experience acquiring, financing, developing, and selling commercial, residential, hotel, senior housing and retail real estate.<br><br>
BMGA has developed millions of feet of real estate on its own or in partnership with prestigious partners, including Hyatt Corporation and Property Markets Group. The firm has been recognized as a leader in the real estate development world and most recently purchased, renovated and re-sold over 200 single family homes in Florida and Illinois.<br><br>
The Sagamore Hotel on South Beach, The Hyatt Pinon Pointe Resort in Sedona, Arizona, and Mei, one of the most successful ultra-luxury condominiums in Miami Beach history, are a few examples from the impressive portfolio Bruce and BMGA have built over the past 40 years.<br><br>
Born and raised in Minneapolis, Minnesota, Bruce graduated from the University of Minnesota and began his real estate career in 1977.
</p>
      
        </vs-popup>
        <!-- </div> -->
        <div
          class="row flex flex-col justify-end items-center w-full xl:w-1/3 member"
          style="background-image:url('../../../ben.png'); background-size:cover; background-size: auto 153%; background-position-x: center; background-position-y: 1%;">
          <h3 class="row-text--upper access text-center ">Benjamin Evans</h3>
          <p class="row-text--lower access text-center">Co-Founder</p>
          
          <div class="flex justify-spacing items-center">
          <!-- <vs-button
          @click="benBio = true"
          class="bio_links text-white self-center inline"
          color="#FFFFFF"
          type="flat"
          
        >Read Bio</vs-button>  -->
        <a class="bio_links" target="_blank" href="https://www.linkedin.com/in/benjaminjevans">LinkedIn</a>
        </div>
        </div>
        <vs-popup :active.sync="benBio" class="agree-popup" title="Ben's Bio">
          <p class="mb-4">Please have the Bulk Condo Deals concierge contact me about posting a deal</p>
      
        </vs-popup>
        
        <div class="row flex flex-col justify-end items-center w-full xl:w-1/3 member" style="background-image:url('../../../rich.png'); background-size:cover;     background-position-x: center;">
          <h3 class="row-text--upper access text-center ">Richard Swerdlow</h3>
          <p class="row-text--lower access text-center">Co-Founder</p>
          <div class="flex justify-spacing items-center">
          <vs-button
          @click="richBio = true"
          class="bio_links text-white self-center inline"
          color="#FFFFFF"
          type="flat"
          
        >Read Bio</vs-button> 
        <a class="bio_links" target="_blank" href="https://www.linkedin.com/in/richard-swerdlow-47338b2/">LinkedIn</a>
        </div>
        </div>
        <vs-popup :active.sync="richBio" class="agree-popup" title="Rich's Bio">
          <p class="mb-4">Richard Swerdlow is a serial entrepreneur with over 20 years of web development and Internet marketing experience. He founded Condo.com in 2006 and has helped grow the online real estate portal into the leading condo marketplace with over 5 million annual visitors that generate over $20 billion in annual property inquiries.<br><br>

Previously, Swerdlow founded Everything Wireless, the first consumer cataloger and Internet retailer which provided national distribution of wireless phones and accessories. The Company was sold to Federated Department Stores in 2000.<br><br>

Swerdlow began his career practicing law in the Public Finance Department of Greenberg Traurig, Miami, Florida where he helped structure bond financings for a variety of municipal clients as bond counsel and underwriter's counsel. He is a member of the New York and Florida Bar Associations and a licensed Real Estate Broker. Swerdlow has been interviewed and quoted as an expert in real estate and Internet marketing in various publications and media outlets including The New York Times, Wall Street Journal, Miami Herald and affiliates of NBC and ABC. He has appeared as a guest on CBNC and Fox & Friends.
</p>
      
          </vs-popup>
        <!-- </div> -->
      </div>

      <!-- <div class="about__row ">
        <div class="row--left order-2 xl:order-first row--text">
          <p class="row-text--upper">News & Media</p>
          <p class="row-text--lower">Quickly simulate investment returns by adjusting deposit, rental income and
            appreciation assumptions. All deals are displayed through an investor lens helping you quickly ascertain
            minimum performance thresholds for underwriting.
          </p>
        </div>
        <div class="row--right flex items-center justify-center xl:justify-start assumptions-row">
          
        </div>
      </div>-->
    </div>

    <div class="browse">
      <h1>
        Ready to browse our
        <br />private deal inventory?
      </h1>
      <vs-button color="#FFFFFF" text-color="#000000" to="../register">Get Started</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    benBio: false,
    bruceBio: false,
    richBio: false,
    }
  },
  methods: {
    scrollToView(component) {
      setTimeout(() => {
        this.$refs[component].scrollIntoView();
      }, 0);
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
  // watch: {
  //   "$route.params.section": function () {
  //     if (this.$route.params.section) {
  //       this.scrollToView(this.$route.params.section);
  //       console.log("scrolled");
  //     }
  //   },
  // },

};
</script>

<style lang="scss" scoped>
.company {
  .section-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 350px;
    background-image: url(../../../public/ussama-azam-PUVEbGs7uxs-unsplash.jpg);
    background-size: cover;
    background-position-y: 30%;
    position: relative;

    @media (max-width: 768px) {
      height: 240px;
    }

    h1 {
      color: #ffffff;
      font-size: 60px;
      font-weight: 500;
      text-align: center;
      position: relative;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 3rem;
      }
    }
    h4 {
      color: #ffffff;
      font-size: 20px;
      font-weight: 100;
      position: relative;
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
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 100px;
        h2 {
          font-size: 32px;
        }
        @media (max-width: 700px) {
          flex-direction: column;
        }
      }

      .faq__qas {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 40px;

        .faq__qas-qa {
          width: 45%;
          display: flex;
          flex-direction: column;
          margin-bottom: 60px;
          @media (max-width: 700px) {
            width: 100%;
          }

          .faq__qas-qa__question {
            font-size: 15px;
            font-family: "Helvetica Neue";
            color: rgb(51, 51, 51);
            text-align: left;
            margin-bottom: 12px;
          }

          .faq__qas-qa__answer {
            font-size: 12px;
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
      font-family: "Khmer MN";
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
      font-size: 25px;
      font-family: "Helvetica Neue";
      color: rgb(54, 55, 54);
    }
  }

  .about {
    .team {
      width: 100%;

      h3 {
        font-family: "Khmer MN", "khmer_mnregular", Georgia, Times New Roman,
          serif;
        font-size: 40px;
        margin-bottom: 20px;
        @media (max-width: 768px) {
          font-size: 2rem;
          margin-bottom: 20px !important;
          display: block;
        }
      }

      p {
        font-size: 16px;
      }
    }

    .team-grid {
      padding-left: 14%;
      padding-right: 14%;
      color: white;
      position: relative;

      h3 {
        // margin-top:255px;
        position: relative;
        margin-top: 255px;
        color: white;
      }

      p {
        // flex-grow: 1;
        position: relative;
      }
    }

    .about__row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 170px;
      margin-bottom: 200px;

      @media (max-width: 1200px) {
        padding: 0 15%;
        margin-top: 100px;
        margin-bottom: 75px;
      }
      @media (max-width: 768px) {
        padding: 0 8%;
        margin-top: 20px;
      }

      .row--left {
        width: 45%;
        @media (max-width: 768px) {
          width: 100%;
        }
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
            width: 70%;
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
          font-family: "Helvetica Neue";
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
        @media (max-width: 768px) {
          .row-text--upper {
            font-size: 2rem;
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

        @media (max-width: 768px) {
          width: 100%;
        }

        .row-text--upper {
          width: 70%;
          line-height: 1.1;
          margin-right: 10%;
          font-size: 4.1rem;
          font-family: "Khmer MN", Georgia, Times New Roman, serif;
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
          width: 70%;

          @media (max-width: 768px) {
            margin-right: 0;
          }
        }

        @media (max-width: 1440px) {
          .row-text--upper {
            font-size: 3.7rem;
          }
          .row-text--lower {
            font-size: 16px;
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
}

.team-grid {
  padding-left: 14%;
  padding-right: 14%;
}

.member {
  background-color: #dfdfdf;
  border-radius: 5px;
  margin-right: 1%;
  height: 475px;

  @media (max-width: 768px) {
    height: 375px;
    margin-bottom: 10px;
  }
}

.team-grid {
  box-sizing: border-box;
  flex-wrap: inherit !important;
  /* margin-top: 10px !important; */
  color: white;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}
.team-grid .member::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #00000042;
  top: 0;
}
.team-grid .member {
  padding: 20px 29px;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.team-grid .member h3 {
  font-family: "Khmer MN", "khmer_mnregular", Georgia, Times New Roman, serif;
  font-size: 1.9rem;
  margin-top: 24px;
}

.overlay {
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.4;
  position: absolute;
}

.bio_links {
    color: white !important;
    opacity: 1 !important;
    position: relative;
    background: #333333e3 !important;
    padding: 8px 14px !important;
    line-height: 1;
    margin-top: 10px;
    margin-right: 6px;
    border-radius: 4px;
    font-size: 1rem;
}
</style>
