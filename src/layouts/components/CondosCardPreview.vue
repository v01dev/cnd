<template>
  <vx-card actionable no-shadow class="" style="">
      <div class="flex flex-col items-end justify-between h-full">
        <div class="h-1/3" style="height: 33%;">
          <span class="">10 days ago</span>
        </div>
        <div class="card-info-container">
          <span class="ml-4 font-bold">{{item.status}}</span>
          <h1 class="name">{{ item.buildingName }}</h1>
          <div class="rates">
            <div>{{item.capRate}} Cap Rate, </div>
            <div>{{item.rental}} /mo Rental</div>
          </div>
        </div>
      </div>
  </vx-card>
</template>

<script>
    export default {
        name: "card-preview",
        props: {
            item: Object,
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
  .vx-card__collapsible-content{
    height: 100%;
  }
  .vx-card__body{
    height: 100%;
  }
  .vx-card .card-info-container{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 14px;
    color: #707070;
    text-align: end;
  }
  .vx-card a{
    color: #707070;
  }
  .name{
    text-align: end;
    font-size: 31px;
    color: #fbbf81;
    width: 100%;
    overflow-wrap: normal;
  }
  @media(max-width:1200px){
    .vx-card{
      width: 48%;
    }
    .name{
      width: 100%;
    }
  }
  @media(max-width: 800px){
    .vx-card {
      width: 48%;
    }
    .name{
      width: 80%;
    }
  }
  @media(max-width: 750px){
    .vx-card{
      width: 100%;
    }
  }
  @media(max-width: 360px){
    .name{
      width: 100%;
    }
  }

</style>