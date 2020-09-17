<template>
  <div class="company">
    <div class="section-title">
       <h1>BULK CONDO SALES<br>
                HOW IT WORKS FOR SELLERS</h1>
            <h3>August 26th, 2020</h3>
    </div>
    <section class="header" style="">
        <div class="guide_header_zone">
            
            <h2>The Process of Selling Bulk Condo Units on BulkCondoDeals.com</h2>
            <p>BulkCondoDeals.com is a global marketplace where developers and other sellers can confidentially post deals on new and pre-construction condos.  Deals can be either single or multi-unit bulk opportunities.  Deals are required to be priced with a minimum 20% discount to the average price per square foot in the building or zip code based on recent sales.</p>
            <p>Deals are added to the site by BulkCondoDeals.com Client Concierge Team. There is no fee to post a listing, but there is a brokerage commission paid at the time of closing with an investor that came through BulkCondoDeals.com. Sellers have the option to offer an additional commission incentive to buyer’s brokers.</p>  <p><strong>Please see the following marketplace brokerage fee table to understand the fees payable upon sale of a deal:</strong></p>
            <h3>Sale Amount and Brokerage Fee</h3>
            <ul>
                <li>$0 - $1 million = 3%</li>
                <li>$1 million - $5 million = 2.5%</li>
                <li>$5 million - $10 million = 2%</li>
                <li>$10 million - $20 million = 1.5%</li>
                <li>$20 million + = 1%</li>
            </ul>
            <h2>WHO ARE THE BUYERS</h2>
            <p>In order to ensure that developers and others sell their deals through the site, BulkCondoDeals.com has developed a global network of qualified investors. Our investor network is either pre-qualified or referred from another qualified investor. Qualification is satisfied by demonstrating accredited investor criteria of (i) net worth of $1 million, excluding your primary residence, or (ii) income of $200,000 for the past two years ($300,000 if combined with a spouse) with the expectation of the same income for the current year.</p>

            <h2>HOW DOES THE SALES PROCESS WORK?</h2>
            <p>The 4-step sales process is simple.</p>
            <ol class="condos-list-1">
                <li class="number-list-item">1. Post your deal on BulkCondoDeals.com</li>
                <li class="number-list-item">2. Track investor engagement and activity on your deal.</li>
                <li class="number-list-item">3. Receive notification of online offers to negotiate.</li>
                <li class="number-list-item">4. A BulkCondoDeals.com Customer  Concierge Team Member will coordinate property showings, inspection, due-diligence, financing and closing.</li>
            </ol>
            <h2>CONFIDENTIALITY</h2>
            <p>In order to maintain project and developer confidentiality, all deal postings can be confidential. Confidential postings do not display any identifiable information including building names, addresses or photos. Investors are not able to view deals until they have been qualified and have executed a Non-Disclosure & Non-Circumvent Agreement.  Once the Non-Disclosure & Non-Circumvent Agreement has been executed, a seller can approve final deal access.</p>

            <h2>WHY LIST WITH BulkCondoDeals.com</h2>
            <p>Listing on BulkCondoDeals.com allows sellers to market and sell units confidentially to investors for fast liquidity without disclosing discounted pricing to retail buyers or financial institutions.</p> 
            
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
