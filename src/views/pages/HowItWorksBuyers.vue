<template>
  <div class="company">
    <div class="section-title">
       <h1>BULK CONDO SALES<br>
                HOW IT WORKS FOR BUYERS / INVESTORS</h1>
            <h3>August 26th, 2020</h3>
    </div>
    <section class="header" style="">
        <div class="guide_header_zone">
            
            <h2>The Process of Buying / Investing in Bulk Condo Units on BulkCondoDeals.com</h2>
            <p>BulkCondoDeals.com is a global marketplace where investors come to find curated and verified deals on new and pre-construction condos.  Listings are either single or multi-unit bulk opportunities.  Deals are required to be priced with a minimum 20% discount to the average price per square foot in the building or zip code based on recent sales.</p>
            <p>Additional savings for investors may be available on a deal by deal basis in the form of a BulkCondoDeals.com buyer rebate or seller incentive. Each deal describes all savings and rebate opportunities when applicable.</p>

            <h2>QUALIFYING AS AN INVESTOR / BUYER</h2>
            <p>In order to ensure the site continues to receive high quality opportunities, it is critical that our investor network is qualified or referred from a pre-qualified investor. Qualification is satisfied by demonstrating the accredited investor criteria of having a net worth of $1 million, excluding your primary residence, or income of $200,000 for the past two years ($300,00 if combined with a spouse) with the expectation of the same income for the current year. </p>

            <h2>HOW DOES THE BULK CONDO BUYING / INVESTING PROCESS WORK?</h2>
            <p>The 4-step qualification process is simple.</p>
            <ol class="condos-list-1">
                <li class="number-list-item">1. Register to view private deals on BulkCondoDeals.com.</li>
                <li clas="number-list-item">2. Verify your email address by entering the confirmation code sent to you during registration.  Once your email is verified, you will be able to view available deals. Deal details are hidden until you request access to view a specific deal.</li>
                <li class="number-list-item">3. In order to view deal details, our seller clients require you to be a qualified investor. Investor qualification eliminates unqualified buyers from submitting inquiries or otherwise contacting sellers. Investor qualification is a 1-time process and enables you to access and review all site listings.  Qualification is completed in 1 of 3 ways: (i) submitting a completed Investor Qualification Form; (ii) having a 5 minute phone call with one of our Investment Advisors.</li>
                <li class="number-list-item">4. The final step is to complete a Non-Disclosure & Non-Circumvent Agreement for each deal you are interested in viewing. This allows the BulkCondoDeals.com to matain confidentiality for sellers that do not want the public to see the discounted pricing.</li>
            </ol>
            <h2>WHEN CAN YOU BUY/INVEST?</h2>
            <p>Once you have been email verified and investor qualified, you can view deals. Deals are typically posted confidentially and sellers require you to complete an online Non-Disclosure & Non-Circumvent Agreement for each deal you are interested in viewing. Here is a <a href="./ndnc.html" target="_blank" rel="nofollow">our NDNC Agreement</a> to review.</p>

            <h2>Who Determines the &ldquo;Bulk Condo Sales&rdquo; Pricing?</h2>
            <p>In a bulk condo sale, the developer and their lender will agree on a below market price they would accept to sell a block of units at a discount in exchange for a fast sale.&nbsp; The developer and their sales team would then offer the units in bulk to investors through a private sale or broader offering to the public.</p>

            <h2>WHY BUY / INVEST USING BulkCondoDeals.com</h2>
            <p>Once you’ve been verified, qualified and have completed the deal-specific Non-Disclosure & Non-Circumvent Agreement, you are able to access deal details including all of the applicable financial data to analyze the opportunity.  This process helps to maintain the institutional quality of the deals and investors that transact business on the marketplace.  When you return to the site to see newly added deals, you will only need to complete the deal-specific Non-Disclosure & Non-Circumvent Agreement.</p>
            <p>Once you’ve identified a deal you are interested in pursuing, you can call, email or live chat with one of our Condo Investment Advisors.  Our advisors are all highly trained and are able to help you value and submit an offer.</p>
        </div>
        <div class="quote_marketing_zone">
            <div class="quote_zone">
                <span>
                    <p>“Our goal is to help you analyze and purchase investment quality condos at below market prices.” </p>
                    <p><strong>Bruce Goldstein,</strong> CEO</p>
                </span>
            </div>
            <!-- <div class="mkt_zone">
                <a class="mkt_area" href="./developer.html">
                    Developer Solutions
                    <span>Learn More</span>
                </a>
            </div> -->
        </div>
    </section>
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
        font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
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

  .quote_marketing_zone {
    flex-direction: column;
    align-items: center;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 50px;
    padding-bottom: 50px;
}

.mkt_zone {
    margin-top: 30px;
    max-width: 100%;
    padding-right: 0;
}

.quote_zone {
    flex-direction: column;
    /* max-width: 90%; */
    text-align: center;
    margin-right: 0;
}

a.testim_image {
    height: 100px;
    margin-top: 30px;
    width: 100px;
    margin-bottom: 10px;
}

a.mkt_area {
    display: flex;
    flex-direction: column;
    align-items: center;
}

a.mkt_area span {max-width: 100px;padding-bottom: 5px;margin-top: 15px;}




.guide_header_zone {
    max-width: 900px;
    margin: auto;
    flex-grow: 1;
    background: #fff;
    display: flex;
    flex-direction: column;
    font-family: 'khmer_mnregular';
    padding-top: 0px;
    box-sizing: border-box;
    padding-left:5%;
    padding-right:5%;
    margin-top: 50px;
    border-radius: 5px;
        padding-bottom: 50px;
}

.guide_header_zone h1 {
    display: block;
    width: 100%;
    /* flex-grow: 1; */
    font-family: 'khmer_mnregular';
    line-height: 1.1;
    font-size: 2.5rem;
    color: #494949;
    margin-bottom: 10px;
    -webkit-font-smoothing: subpixel-antialiased;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    margin-top: 0;
    margin-top: 24px;
}

.guide_header_zone h5 {
    text-transform: uppercase;
    margin-bottom: 11px;
    font-size: 23px;
    /* font-family: 'Helvetica Nueue',sans-serif; */
    /* font-weight: 400; */
    opacity: 0.4;
    letter-spacing: 0px;
}

.guide_header_zone h3 {
    display: block;
    width: 100%;
    /* flex-grow: 0; */
    font-family: 'Helvetica Nueue',sans-serif;
    font-weight: 300;
    font-size: 1.6rem;
    margin-top: 0;
    padding-top: 0;
    line-height: 1;
    color: #36363699;
    margin-bottom: 40px;
}

.guide_header_zone h2 {
    margin-bottom: 23px;
    /* display: block; */
    font-size: 2.3rem;
    margin-top: 60px;
        text-transform: uppercase;
}

.guide_header_zone form {
    display: block;
    width: 100%;
    /* flex-grow: 0; */
    box-sizing: border-box;
}

.guide_header_zone p {
    margin-bottom: 20px;
}

p {
    font-size: 1.2em;
    font-family: sans-serif;
    font-weight: 300;
}

li {
    font-size: 1.2em;
    font-family: sans-serif;
    font-weight: 300;
    margin-bottom: 12px;
}

h3.guide-h3 {
    margin-bottom: 0px;
    font-size: 1.4em;
    font-weight: bold;
    margin-top: 18px;
    font-family: 'khmer_mnregular';
}

.company .section-title h3 {
  color:white;
}
</style>
