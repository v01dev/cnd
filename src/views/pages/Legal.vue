<template>
  <div class="company">
    <div class="section-title">
      <h1 class="mb-2">Legal Terms & Conditions</h1>
      <!-- <h4>Subtitle of the section here</h4> -->
    </div>
    <div class="legal-papers title flex justify-around" style="padding-left:14%; padding-right:14%; padding-top:100px; padding-bottom:100px;">
       <div class="paper ">
        <h3>Site Terms</h3>
        <p class="">This is the full broker registration form</p>
        <button>View Terms</button>
      </div>
      <div class="paper ">
        <h3>Privacy Policy</h3>
        <p class="">This is the full broker registration form</p>
        <button>View Privacy Policy</button>
      </div>
      <div class="paper ">
        <h3>Buyer’s Broker Registration Form</h3>
        <p class="">This is the full broker registration form</p>
        <button>Open Form</button>
      </div>
     
      <div class="paper ">
        <h3>Non-Disclosure & Non-Circumvent Agreement</h3>
        <p class="">This is the full broker registration form</p>
        <button>View Agreement</button>
      </div>
      <div class="paper ">
        <h3>Listing Agreement</h3>
        <p class="">This is the full broker registration form</p>
        <button>View Agreement</button>
      </div>
      <div class="paper ">
        <h3>Listing Agent Agreement</h3>
        <p class="">This is the full broker registration form</p>
        <button>View Agreement</button>
      </div>



    </div>
    <div class="browse">
      <h1>Ready to browse our<br>private deal inventory?</h1>
      <vs-button color="#FFFFFF" text-color="#000000" to="../register">Get Started</vs-button>
    </div>
  </div>
</template>

<script>
    export default {

    };
</script>

<style lang="scss" scoped>
  .company{
    .section-title{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 350px;
      background-image: url(../../../public/landing-overlaid.png);
      background-size: cover;
      background-position: center;
      h1{
        color: #FFFFFF;
        font-size: 60px;
        font-weight: 500;
        text-align: center;

        @media (max-width: 786px) {
          font-size:2.4rem;
        }
      }
      h4{
        color: #FFFFFF;
        font-size: 20px;
        font-weight: 100;
      }
    }
    .faq {
      padding-top: 100px;
      background-color: #FFFFFF;
      width: 100%;
      display: flex;
      justify-content: center;

      .link {
        color: #000000;
        text-decoration: underline;
        margin-left: 5px;
        text-align: end;
        @media(max-width: 700px) {
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
          h2{
            font-size: 32px;
          }
          @media(max-width: 700px) {
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
            @media(max-width: 700px) {
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
        color: #FFFFFF;
        text-align: center;
        font-size: 60px;
        font-family: "Khmer MN";
        color: rgb(255, 255, 255);
      }
      @media(max-width: 650px){
        h1{
          font-size: 33px;
        }
      }
      @media(max-width: 1650px) {
      }

      .vs-button {
        font-size: 25px;
        font-family: "Helvetica Neue";
        color: rgb(54, 55, 54);
      }
    }
  }

  .paper {
    padding: 20px;
    display: flex;
    /* flex-direction: column; */
    align-items: flex-start;
}

.paper h3 {
    margin-bottom: 18px;
    flex-grow: 1;
    margin-bottom: 28px;
    font-family: "Khmer MN", Georgia, 'Times New Roman', Times, serif;
    font-size: 2.1rem;
    max-width: 320px;
}

.paper p {
    margin-bottom: 22px;
    font-size: 16px;
    flex-grow: 1;
    padding-left: 20px;
}

.paper button {
    padding: 11px 2px;
    border: 1px solid #dfdfdf;
    /* flex-grow: 1; */
    width: 160px;
}

.legal-papers {
    flex-direction: column;
}
</style>
