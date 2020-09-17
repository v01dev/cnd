<template>
  <div class="company">
    <div class="section-title">
      <h1 class="mb-2">Privacy Policy</h1>
      <!-- <h4>Subtitle of the section here</h4> -->
    </div>
    <div class="generic-text">
      <h4>Privacy Policy</h4>
      <p>
        We know you're concerned about protecting your privacy online. So are
        we. At BulkCondoDeals.com, we treat your personal information with
        the highest degree of safety and security. This policy explains how we
        collect information about you and how we use that information. We also
        outline the choices you have. By conducting business on Condo.com, you
        accept the practices outlined in this Privacy Policy. If you have any
        questions about our privacy policy, contact us via e-mail at
        info@BulkCondoDeals.com.
      </p>
      <h4>How Secure is My Information?</h4>

      <p>
        Protecting your personal information:<br /><br />
        BulkCondoDeals.com pledges a safe and secure transaction experience
        for all Users on our site. We use the industry standard for Internet
        security. This encryption makes it difficult for anyone to read your
        information in transit. We protect all of your personal information,
        including your name, address and password information.<br /><br />
        Protecting your password:<br /><br />
        If you forget your password, you can create a new one. You can do your
        part to protect your personal information by keeping your password a
        secret and making sure you log off completely if you share a
        computer.<br /><br />
      </p>
      <h4>Personal Information</h4>
      <p>
        What we gather:<br /><br />
        We need your name, billing address, mailing address, e-mail address to
        create your acconut on the site. If we have a question about your
        activities, we may contact you by e-mail or by phone. In addition, we
        may use your information to recommend real estate investment
        opportunities based on your criteria, to personalize our newsletters if
        you choose to subscribe, to maintain your account and to improve your
        site experience.
      </p>

      <h4>Who We Share It With</h4>
      <p>
        BulkCondoDeals.com wil not sell, rent or give information about you
        to third parties for them to use for themselves or their affiliates
        without your prior permission. We may disclose aggregate customer
        information (such as number of visits or average time on site) to
        advertisers or other third parties. <br /><br />
        By submitting your contact information you agree to our Terms &
        Conditions and Privacy Policy. You also expressly consent to having us,
        our real estate agents and potentially our partners contact you about
        your inquiry by text message or phone (including automatic telephone
        dialing systems and/or artificial or prerecorded voice, and potentially
        including telemarketing calls or messages) to the telephone number you
        have provided, even if that telephone number is on a corporate, state or
        National Do Not Call Registry, and you agree that your act of submitting
        contact information is intended to serve as your signature or electronic
        signature. Your phone or telecommunications company may charge you for
        such calls or messages. You do not have to agree to receive such calls
        or messages as a condition of getting any services from our real estate
        company or its affiliates.
      </p>
      <h4>Special Services and Promotions:</h4>
      <p>
        If you want to participate in BulkCondoDeals.com special promotions,
        you must enter your name and e-mail address. We will add your e-mail
        address to our investor newsletter mailing list and give you the option
        to sign up for additional newsletters. You always have the option to
        unsubscribe.<br /><br />
        Contacting BulkCondoDeals.com Customer Service: <br /><br />
        If you contact BulkCondoDeals.com Customer Service, we will use your
        name, e-mail address and phone number to answer your questions or solve
        your problem. On occasion, we may contact you later to verify
        information or to check on the quality of your Customer Service contact.
      </p>
      <h4>Legal Requests</h4>
      <p>
        We may release customer account or other information if we're advised
        that such release is necessary to comply with the law, or to protect the
        rights, property and safety of BulkCondoDeals.com or law enforcement
        for loss prevention and credit risk reduction.
      </p>

      <h4>What About My Account?</h4>
      <p>
        Creating an Account:<br /><br />
        Creating an account makes it fast and easy to view and make offers on
        real estate investment opportunities on BulkCondoDeals.com.
        ABulkCondoDeals.com account provides you with the ability to post
        listings, save searches, request alerts and view favorite properties on
        BulkCondoDeals.com. You also have the option to sign up for email
        notification services.
      </p>
    </div>
    <div class="browse">
      <h1>Ready to browse our<br />private deal inventory?</h1>
      <vs-button color="#FFFFFF" text-color="#000000" to="../register"
        >Get Started</vs-button
      >
    </div>
  </div>
</template>

<script>
export default {};
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
    background-image: url(../../../public/landing-overlaid.png);
    background-size: cover;
    background-position: center;
    h1 {
      color: #ffffff;
      font-size: 60px;
      font-weight: 500;
      text-align: center;
    }
    h4 {
      color: #ffffff;
      font-size: 20px;
      font-weight: 100;
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

  .generic-text {
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    padding-bottom: 75px;
  }

  .generic-text h4 {
    font-size: 2.4rem;
    margin-bottom: 30px;
    margin-top: 48px;
    font-family: "Khmer MN";
  }

  .generic-text p {
    font-size: 16px;
  }
}
</style>
