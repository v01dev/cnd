<template>
  <div class="company">
    <div class="section-title">
      <h1 class="mb-2">Broker FAQs</h1>
      <h4>Subtitle of the section here</h4>
    </div>
    <div class="faq">
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
</style>
