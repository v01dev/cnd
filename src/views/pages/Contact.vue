<template>
  <div class="contact">
    <div class="section-title">
      <div class="overlay"></div>
      <h1 class="mb-2">Contact</h1>
      <!-- <h4>Subtitle of the section here</h4> -->
    </div>
    <!-- <div class="faq">
      <div class="faq-inner">
        <div class="faq__header">
          <h2>Content title here</h2>
          <span class="mt-2">Are theese opportunities verified and avaliable?</span>
        </div>
        <div class="faq__qas">
          <div class="faq__qas-qa">
            <span class="faq__qas-qa__answer"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur consequuntur cupiditate deserunt ducimus hic maxime, minima modi necessitatibus nulla obcaecati officia optio possimus praesentium, quo rem sit suscipit tenetur!</span><span>Ad consectetur doloremque error et eum labore modi nobis quaerat similique velit? Expedita rerum saepe sint soluta veritatis! Consequatur cum distinctio excepturi minima minus nam nisi quam qui quo, ratione!</span><span>Accusantium ad animi at distinctio doloribus, eligendi exercitationem explicabo, laboriosam nulla numquam odit possimus, rem repudiandae tempora temporibus veniam voluptas. Adipisci blanditiis consectetur dolor nam necessitatibus non, odit quam totam.</span><span>Adipisci aut corporis deleniti dolorum, eligendi enim impedit in ipsum nemo neque nesciunt officiis optio perspiciatis provident quae qui reprehenderit repudiandae similique tempora voluptatem. Blanditiis commodi doloribus in velit voluptatem.</span></span>
          </div>
          <div class="faq__qas-qa">
            <span class="faq__qas-qa__answer"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cum delectus ea, eos fuga impedit inventore ipsam laboriosam, minus, molestiae molestias mollitia nesciunt odit quae recusandae voluptatem voluptates? Alias, corporis?</span><span>Ex facilis magnam, nihil possimus sed tempora ullam ut velit. Ab alias aperiam, at culpa dolor eveniet harum id, ipsum laborum non provident sapiente ullam. Consequuntur ducimus labore provident voluptate.</span><span>Accusamus aliquam aut beatae consectetur dicta earum fugit nostrum odio provident quisquam vel, vero voluptate voluptatem. Asperiores corporis cupiditate deleniti eos, et molestiae praesentium repudiandae soluta tempore temporibus velit voluptatibus.</span><span>A adipisci aperiam aut dicta dolorem enim est illo inventore labore, laborum minus nulla officiis quam. Fuga, quo tempore. Consectetur delectus eaque est exercitationem laborum nulla quas ratione. Animi, deleniti?</span></span>
          </div>
          <div class="faq__qas-qa">
            <span class="faq__qas-qa__answer"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto dolorem ea ex facilis laborum maiores molestiae nisi numquam odio officia perspiciatis quasi quisquam rem sapiente sequi, sit tempora vel voluptate!</span><span>Asperiores assumenda cupiditate debitis, ducimus eaque eligendi, ipsa libero minus molestiae porro quidem rerum voluptate? Ab aut consequuntur, doloribus inventore molestias placeat quidem reiciendis rem rerum sequi soluta sunt tenetur.</span><span>Adipisci deserunt dolor dolores, eaque esse fuga iure maiores minima nesciunt numquam omnis quaerat quos ratione rerum sequi tempora temporibus. Architecto at eveniet explicabo mollitia tempora temporibus velit! In, modi.</span></span>
          </div>
          <div class="faq__qas-qa">
            <span class="faq__qas-qa__answer"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda esse est ex facere fugiat, hic, incidunt magni minima modi mollitia necessitatibus nesciunt quaerat sapiente sit totam vero voluptate voluptatibus.</span><span>Adipisci animi aperiam dolorum eum incidunt iste nisi, placeat quaerat quam, ratione tempore ullam veniam vero! Adipisci aspernatur dolorem eaque facere incidunt minus nihil odit officiis quae quo sed, velit.</span><span>Accusantium aliquid, amet aperiam atque aut distinctio dolorem illum iure laudantium minima minus, modi nostrum numquam, perspiciatis recusandae rem vel? Accusantium animi corporis et eum impedit ipsam rem sapiente voluptatibus!</span></span>
          </div>
          <div class="faq__qas-qa">
            <span class="faq__qas-qa__answer"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ex nulla quae quasi tempora voluptates! A aliquid dolore expedita fugiat illum molestias qui quibusdam sed vitae voluptatem! Accusamus, eum quisquam.</span><span>Ab adipisci architecto aut commodi, corporis culpa debitis deleniti dolorem doloremque dolorum esse incidunt inventore magni minima molestiae non omnis porro provident quam, quas rem repudiandae similique sint ut veniam.</span></span>
          </div>
          <div class="faq__qas-qa">
            <span class="faq__qas-qa__answer"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda aut blanditiis deserunt dignissimos, distinctio eaque eos et, hic itaque iure labore magnam nemo officia, praesentium similique temporibus totam veritatis voluptate.</span><span>A accusantium at, cumque debitis dicta fuga impedit iure nam officiis omnis pariatur porro quia recusandae totam ullam ut veritatis voluptatem. Alias dolore doloremque eveniet ipsa molestias provident similique vel!</span></span>
          </div>
        </div>
      </div>
    </div> -->
    
    <div class="contact-section w-full h-full p-8 md:p-24 flex justify-center">
      
    <div class="contact-left w-1/3 h-full flex justify-center">
        <ul class="headquarters">
          <li>
            <h4>Headquarters</h4>
            <div class="location-map" style='background-image: url("https://maps.googleapis.com/maps/api/staticmap?center=2801+SW+31st+Avenue+Miami,FL&zoom=12&size=450x650&scale=2&key=AIzaSyAnWJGsQaK0z0tQyLPKeuWHifPTmhR8zcI");'></div>
          </li>
          <li>
            <h4>Address</h4>
            <span>2801 SW 31st Avenue<br>Suite 2B<br>Miami, FL 33133</span>

            
          </li>
        
        </ul>
      </div>
      <form
        class="contact-form w-full md:w-8/12 xl:w-1/3 flex flex-col justify-center items-left"
        @submit.prevent="sendEmail"
      >
        <h2>Contact Form</h2>
        <div class="name flex flex-wrap justify-between w-full mt-4 mb-4">
          <h5 class="w-full">Your Name</h5>
          <vs-input
            label-placeholder="FIRST NAME"
            v-model="firstName"
            class="w-adjust mb-2"
            name="user_firstName"
          ></vs-input>
          <vs-input
            label-placeholder="LAST NAME"
            v-model="lastName"
            class="w-adjust mb-2"
            name="user_lastName"
          ></vs-input>
        </div>
        <div class="contact-info flex flex-wrap justify-between w-full mb-4">
          <h5 class="w-full mb-2">Contact Info</h5>
          <vs-input
            label-placeholder="EMAIL ADDRESS"
            v-model="email"
            class="w-full mb-2"
            name="user_email"
          ></vs-input>
          <vs-input
            label-placeholder="PHONE NUMBER"
            v-model="phone"
            class="w-full"
            name="user_phone"
          ></vs-input>
        </div>
        <div class="message flex flex-wrap justify-between w-full">
          <h5 class="w-full mt-1 mb-2">Message</h5>
          <vs-textarea
            v-model="message"
            class="contact-message"
            height="200px"
            name="message"
          ></vs-textarea>
        </div>
        <vs-button button="submit" color="success" class="mt-4">Send</vs-button>
      </form>
      <div class="contact-left w-1/3 h-full flex justify-center">
      <ul>
        <li>
          <h4>General Inquiries</h4>
          <span>+1 (954) 401-5100</span><br>
          <a href="mailto:info@BulkCondoDeals.com">info@BulkCondoDeals.com</a>
        </li>
        <li>
          <h4>Technical Support</h4>
          <!-- <span>305.442.2323</span><br> -->
          <a href="mailto:support@BulkCondoDeals.com">support@BulkCondoDeals.com</a>
        </li>
        <li>
          <h4>Legal</h4>
          <a href="mailto:legal@BulkCondoDeals.com">legal@BulkCondoDeals.com</a>
        </li>
        <li>
          <h4>Press</h4>
          <a href="mailto:press@BulkCondoDeals.com">press@BulkCondoDeals.com</a>
        </li>
      </ul>
    </div>
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
import emailjs from "emailjs-com";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    };
  },
  methods: {
    async sendEmail(e) {
      await emailjs
        .sendForm(
          "gmail",
          "template_XqSYuDkm",
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
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.phone = "";
      this.message = "";
      this.$vs.notify({
        color: "success",
        title: "Success",
        text: "Message successfully sent!",
        position: "top-center",
      });
    },
  },
};
</script>

<style lang="scss">
.contact {
  .section-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 350px;
    background-image: url(../../../public/AdobeStock_243144195_Preview.jpeg);
    background-image: url(../../../public/AdobeStock_243144195.jpg);
    background-size: cover;
    background-position: 100% 67%;
    position:relative;
    @media (max-width:768px){
      height:250px;
    }
    h1 {
      color: #ffffff;
      font-size: 60px;
      font-weight: 500;
      text-align: center;
       position:relative;
       font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
       @media (max-width:786px){
         font-size:3rem;
       }
    }
    h4 {
      color: #ffffff;
      font-size: 20px;
      font-weight: 100;
       position:relative;
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
}
.contact-section {
  background: #ffffff;
  @media (max-width:768px){
    flex-direction: column;
  }
  h2 {

    font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
    font-size: 1.6rem;
    color: #9d9d9d;
  }


  .w-adjust {
    width: 47%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .contact-form {
    max-width: 800px;
    padding-right:0;

    @media (max-width:768px){
      margin-bottom:80px;
    }
  }
}
.contact-message {
  margin-top: 17px;
  .vs-textarea {
    height: 200px;
  }
  .vs-textarea:focus {
    resize: none !important;
  }
}

.contact-left {

  @media (max-width:768px){
    width: 100% !important;
  }

  li {

    padding-bottom: 20px;
    padding-top: 0px;

    h4 {
      font-family: "Khmer MN",'khmer_mnregular',Georgia, 'Times New Roman', Times, serif;
      font-size: 1.6rem;color: #9d9d9d;
      margin-bottom:10px;
    }

    span {

font-size:1.1rem;

    }

    a {
      margin-bottom: 6px;
    display: inline-block;
    font-size: 1.1rem;

    }
  }
}

 .overlay {
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.1;
    position: absolute;
  }

  ul.headquarters {
    width: 75%;

    @media (max-width:768px){
      width: 100%;
    }
}

.location-map {
  border-radius:6px;
      margin-top: 24px;
      height: 200px;
    background-size: cover;
}
</style>
