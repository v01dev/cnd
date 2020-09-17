<template>
  <div class="brokers">
    <div class="section-title">
      <div class="overlay"></div>
      <h1 class="">Broker Participation</h1>
      <!-- <h4>Subtitle of the section here</h4> -->
    </div>
     <div class="about">
      <div class="about__row justify-end">
        <div class="row--left flex flex-col justify-start items-center order-2 xl:order-first row--text text-left">
          <p class="broker-sub-head">We welcome the participation of real estate brokers and other professionals and offer compensation as appropriate.</p>
         
        </div>
        <div class="row--right flex items-center justify-center w-full xl:w-1/2">
          <!-- <img class="row__img" src="../../../public/dealcards.png" width="544"> -->
           <p class="row-text--lower">
If you are representing a buyer that is interested in one of the properties available on our marketplace, please see the Broker Participation Requirements below.<br><br>
We must receive the Buyer’s Broker Registration at or before any online access is granted or physical inspection of the property by the prospective buyer or their broker.<br><br> 
If you are a broker representing a seller, <a href="./contact">contact us</a> to find out about the advantages that come with participation in our property listing referral program.
</p>
        </div>
      </div>
      <div class="about__row items-center justify-center ">
        <div class="row flex  justify-end items-center w-full xl:w-full team">
          <h3 class="w-full row-text--upper access text-center" style="margin-bottom:80px;">Broker Participation Requirements</h3>
          </div>
          <div class="row flex  justify-start items-between space-between w-full xl:w-full team">
            
            <div class="w-1/3 sm:w-full xl:w-1/2" >
            <p class="row-text--lower access text-left" style="width:90%;" >BulkCondoDeals.com will share its commission with any broker whose qualified buyer pays in full and settles on the property.<br><br>To qualify for a commission, the real estate agent must be a qualified and duly licensed broker, and must first register the buyer by sending in the <a href="/" target="_blank">Buyer’s Broker Registration Form</a>.<br><br>Both you and your prospect must sign and date the form where indicated. BulkCondoDeals.com must receive the Buyer’s Broker Registration Form at or before any online access to see property details is granted or physical inspection of the property by the buyer.<br><br>The broker must inspect the property with the buyer and sign-in with the buyer during a scheduled property inspection.</p>
            </div>
            <div class="w-1/3 sm:w-full xl:w-1/2" >
            <p class="row-text--lower access text-left" style="width:90%;">A complete registration file on all brokers and buyers will be maintained. No commission will be paid by the seller to any broker participating in the purchase of the property and an affidavit will be required that the broker is serving only as a broker and not as principal and is not related to or affiliated with the buyer in any way.<br><br>BulkCondoDeals.com will pay a commission upon receipt of its full commission. If for any reason BulkCondoDeals.com fails to receive its full commission, then the cooperating broker will receive a discounted commission commensurate with the reduction of BulkCondoDeals.com’s commission.<br><br>No commission will be paid to any broker unless all of these requirements are satisfied. There can be no exceptions and no oral registrations will be accepted.</p>
            </div>
            
          </div>
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

  .brokers{
    .section-title{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 350px;
      background-image: url(../../../public/AdobeStock_356531782_Preview.jpeg);
      background-image: url(../../../public/AdobeStock_369200009_Preview.jpeg);
      background-size: cover;
      background-position: 30% 52%;
      background-position: 30% 89%;
      position: relative;

      @media (max-width:768px){
         height: 250px;
        }

      h1{
        color: #FFFFFF;
        font-size: 60px;
        font-weight: 500;
        text-align: center;
        position: relative;
        font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;

        @media (max-width:768px){
         font-size: 3rem;
         line-height: 1;
        }
      }
      h4{
        color: #FFFFFF;
        font-size: 20px;
        font-weight: 100;
        position: relative;
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
        font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
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


  .about {
    .team {
        width: 100%;
        padding-left:15%;
        padding-right:15%;

        @media (max-width:768px){
          padding-left:4%;
          padding-right:4%;
          flex-direction: column;

        }

          h3 {

              font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
              font-size:40px;
              margin-bottom: 20px;

               @media (max-width:768px){
            font-size:2rem;
          }
          }

          p {

            font-size:16px;
          }

          @media (max-width:786px){
          div {
            width:100% !important;
          }
          }

        }

    
    .team-grid {
    padding-left: 8%;
    padding-right: 8%;
}
    
    .about__row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    margin-top: 170px;
    margin-bottom: 200px;

      @media(max-width: 1200px) {
        padding: 0 15%;
        margin-top: 100px;
        margin-bottom: 75px;
      }
       @media(max-width: 768px) {
        padding: 0 8%;
        margin-top:20px;

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
          @media(max-width: 768px) {
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
          font-size: 3.1rem;
    font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
    width: 71%;
    line-height: 1.1;
    margin-bottom: 20px;
    text-align:left;
          @media(max-width: 900px){
            font-size: 3rem;
            width:100%;
          }
        }

        .row-text--lower {
          font-size: 17px;
          font-family: "Helvetica Neue";
          line-height: 1.5;
          margin-left: 20%;
          width: 58%;
          @media(max-width:768px){
            width:100% !important;
          }
        }

        @media(max-width: 1440px) {
          .row-text--upper {
            font-size: 3.7rem;
          }
          .row-text--lower {
            font-size: 14px;
          }
        }
        @media(max-width: 1200px) {

          .row-text--upper {
            width: 100%;
            margin-left: 0;
          }
          .row-text--lower {
            width: 100%;
            margin-left: 0;
          }
        }

        @media (max-width:768px){
          .row-text--lower {
            width:100% !important;
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
      .card-row-wrapper{
        @media(max-width:1200px){
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
    font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
        margin-bottom: 20px;
          @media(max-width: 900px){
            font-size: 3rem;
          }
        }

        .row-text--lower {
          font-size: 17px;
          font-family: "Helvetica Neue";
          line-height: 1.5;
          margin-right: 20%;
          width: 58%;

           @media (max-width:768px){
            margin-right:0;
            width:100% !important;
          }
        }

        @media(max-width: 1440px) {
          .row-text--upper {
            font-size: 3.7rem;
          }
          .row-text--lower {
            font-size: 17px;
            width: 70%;
          }
        }

        .access {
          width: 70%;
        }

        @media (max-width:768px){
          .row-text--lower {
            width:100% !important;
          }
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

        @media(max-width: 1200px) {

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

      @media(max-width: 1200px) {
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
        .row--right{
          margin-bottom: 30px;
          margin-top: 30px;
        }
      }
    }
  }
  }


  .team-grid {
    padding-left: 8%;
    padding-right: 8%;
}

.member {
    background: #dfdfdf;
    border-radius: 5px;
    margin-right: 1%;
    height: 400px;
}

.team-grid {
    box-sizing: border-box;
    flex-wrap: inherit !important;
    /* margin-top: 10px !important; */
}

.team-grid .member {
    padding: 20px 29px;
}

.team-grid .member h3 {
    font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
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

  .broker-sub-head {
  width: 70%;
          line-height: 1.1;
          margin-right: 10%;
           font-size: 2.6rem;
    font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
        margin-bottom: 20px;
          @media(max-width: 900px){
            font-size: 30px;
          }

           @media (max-width:768px){
           width:100%;
           margin-right:0;
           font-size:1.8rem;
           text-align:center;
          }

  }

  .row-text--lower {
          font-size: 17px;
          font-family: "Helvetica Neue";
          line-height: 1.5;
          margin-right: 20%;
          width: 58%;
        }

</style>
