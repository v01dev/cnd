<template>
  <vx-card actionable no-shadow class=" first" style="" id="#preview-big">
    <div class="flex flex-col items-end justify-between h-full">
      <div class="h-1/3" style="height: 33%;">
        <span class=""> </span>
      </div>
      <div class="card-info-container card-info-container-first ">
        <span class="info">Published 10 days ago<span class="ml-4 font-bold info">{{item.status}}</span></span>
        <h1 class="name name-first">{{ item.buildingName }}</h1>
        <div class="rates rates-first">
          <span>{{item.capRate}} Cap Rate, </span>
          <span>{{item.rental}} /mo Rental</span>
        </div>
      </div>
    </div>
  </vx-card>
</template>

<script>
    export default {
        name: "card-preview-big",
        props: {
            item: Object,
        }
    }
</script>

<style lang="scss">
  .vx-card{
    border-radius: 15px;
    height: 364px;
    width:23%;
    background-color: #e6e6e6;
    margin-top: 20px;
    cursor: pointer;
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
    width: 95%;
    overflow-wrap: break-word;
  }
  .name-first{
    font-size: 57px;
    overflow-wrap: break-word;
  }
  .rates{

  }
  .rates-first{
    font-size: 21px;
  }
  @media(max-width:1200px){
    .vx-card{
      width: 48%;
    }
    .first{
      width: 100%;
    }
    .name{
      width: 90%;
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
  @media(max-width: 750px){
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
      font-size: 35px;
    }
    .rates-first{
      font-size: 14px;
    }
    .card-info-container-first{
      font-size: 10px;
    }
    .info{
      font-size: 10px;
    }
  }
</style>