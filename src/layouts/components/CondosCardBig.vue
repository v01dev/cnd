<template>
  <vx-card actionable no-shadow class="card-alignment first" style="">
    <router-link :to="'../detailed-view/'+itemID">
    <div class="flex flex-col items-end justify-between h-full">
      <div class="h-1/3" style="height: 33%;">
        <span class=""> </span>
      </div>
      <div class="card-info-container card-info-container-first">
        <span>Published 2 days ago<span class="ml-4 font-bold">New Construction</span></span>
        <h1 class="name name-first">Downtown Brickell</h1>
        <div class="rates rates-first">
          <span>10% Cap Rate, </span>
          <span>$100k+ /mo Rental</span>
        </div>
      </div>
    </div>
    </router-link>
  </vx-card>
</template>

<script>
    export default {
        name: "card-big",
        props: {

        }
    }
</script>

<style>
  .vx-card{
    border-radius: 15px;
    height: 364px;
    width:23%;
    background-color: #e6e6e6;
    margin-top: 20px;
    cursor: pointer;
  }
  .vx-card a{
    color: #707070;
  }
  .first{
    width: 48.6%;
  }
  .vx-card__collapsible-content{
    height: 100%;
  }
  .vx-card__body{
    height: 100%;
  }
  .card-info-container{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 14px;
    color: #707070;
    text-align: end;
  }
  .card-info-container-first{

  }
  .name{
    text-align: end;
    font-size: 31px;
    color: #fbbf81;
    width: 100%;
  }
  .name-first{
    font-size: 57px;
  }
  .rates{

  }
  .rates-first{
    font-size: 21px;
  }

    .card-alignment {
      margin-right: 1.5%;
      margin-top: 1.5%;
    }
  @media(max-width:1200px){
    .vx-card{
      width: 30%;
    }
    .first{
      width: 65%;
    }
    .name{
      width: 100%;
    }
  }
  @media(max-width: 800px){
    .vx-card {
      width: 48%;
    }
    .first{
      width: 100%;
    }
    .name{
      width: 80%;
    }
  }
  @media(max-width: 602px){
    .vx-card{
      width: 100%;
    }
    .first{
      width: 100%;
    }
    .name{
      width: 100%;
    }
    .name-first{
      font-size: 40px;
    }
    .rates-first{
      font-size: 14px;
    }
    .card-info-container-first{
      font-size: 10px;
    }
  }
</style>
query listUnits{
listUnits(filter:{images:{contains: "5200444a-c9bd-429e-9394-cc3236472e71ba39ae7d-1893-4162-ad3f-5a516c945ca0Layer 5.png"}}) {
items{
id
nickname
}
}
}
