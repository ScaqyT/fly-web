<template>
   <div id="div">
      <div class="block">
         <el-carousel trigger="click" height="600px">
            <el-carousel-item v-for="item in img" :key="item">
                <!-- <el-image :src="'../assets/'+item+'.png'"></el-image> -->
                <el-image style="width:100%;height:600px" :src="item"></el-image>
            </el-carousel-item>
         </el-carousel>
      </div>


       <el-card class="outGoodsCard" shadow="hover" style="text-align:center" :body-style="{ padding: '20px' }">
          <div class="header" slot="header">
             <span>出库货物总数</span>
          </div>
          <!-- card body -->
         <span class="number">{{outGoodsNum}}</span>
       </el-card>
       <el-card class="outGoodsCard" shadow="hover" style="text-align:center" :body-style="{ padding: '20px' }">
          <div class="header" slot="header">
             <span>入库货物总数</span>
          </div>
          <!-- card body -->
         <span class="number">{{inGoodsNum}}</span>
       </el-card>
       <el-card class="outGoodsCard" shadow="hover" style="text-align:center" :body-style="{ padding: '20px' }">
          <div class="header" slot="header">
             <span>提货次数</span>
          </div>
          <!-- card body -->
         <span class="number">{{poNum}}</span>
       </el-card>
       <el-card class="outGoodsCard" shadow="hover" style="text-align:center" :body-style="{ padding: '20px' }">
          <div class="header" slot="header">
             <span>送货次数</span>
          </div>
          <!-- card body -->
         <span class="number">{{orderNum}}</span>
       </el-card>
   </div>
</template>

<script>
export default {
   name: 'HomeContext',
   data () {
      return {
         outGoodsNum: 0,
         inGoodsNum:0,
         poNum:0,
         orderNum:0,
         img:[
            require("../assets/1.png"),
            require("../assets/2.png"),
            require("../assets/3.png"),
            require("../assets/4.png"),
         ],
         orderSearch:{
               orderId: '',
               orderState: '',
            },
      }
   },
   mounted(){
      this.getOutGoods();
      this.getInGoods();
      this.getPoNum();
      this.getOrderNum();
   },
    methods:{
       getOutGoods(){
          this.getRequest('/warehouse/out/outGoods').then(resp=>{
             if(resp){
                this.outGoodsNum = resp;
             }
          })
       },
       getInGoods(){
         this.getRequest('/warehouse/in/inGoods').then(resp=>{
             if(resp){
                this.inGoodsNum = resp;
             }
          })  
       },
       getPoNum(){
          this.getRequest('/order/po/',this.orderSearch).then(resp=>{
            if(resp){
               this.poNum = resp.length;
            }
         })
       },
       getOrderNum(){
         this.getRequest('/order/o/',this.orderSearch).then(resp=>{
            if(resp){
               this.orderNum = resp.length;
            }
         })
       }

    },
 }
</script>
<style scoped>
   .block{
      padding: 0 50px;
   }
   .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
   }

   .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
   }
   
   .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
   }

   .outGoodsCard{
      background-color: darkturquoise;
      border-radius: 50px;
      width: 20%;
      margin: 20px 40px;
      float: left;
   }
   .outGoodsCard .header{
      font-size: 20px;
      font-weight: 900;
      border: 2px black;
   }
   .outGoodsCard .number{
      font-size: 30px;
   }
</style>