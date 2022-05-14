<template>
   <div>
      <template :v-model='driverInfo' >
         <el-container >
            <el-aside width="300px">
               <!-- Aside content -->
               <div>
                  <el-image
                    style="width: 100%; height: auto"
                    :src="driverInfo.image"
                    fit="fill ">
                  </el-image>
               </div>
               
            </el-aside>

            <el-main >
               <!-- Main content -->
               <el-descriptions title="用户信息" :column="2" border>
                  <el-descriptions-item label="姓名">{{driverInfo.name}}</el-descriptions-item>
                  <el-descriptions-item label="性别">{{driverInfo.sex}}</el-descriptions-item>
                  <el-descriptions-item label="年龄">{{driverInfo.age}}</el-descriptions-item>
                  <el-descriptions-item label="手机号">{{driverInfo.telphone}}</el-descriptions-item>  
                  <el-descriptions-item label="状态">{{driverInfo.state}}</el-descriptions-item>
                  <el-descriptions-item label="身高">{{driverInfo.high}}</el-descriptions-item>
                  <el-descriptions-item label="体重">{{driverInfo.weigth}}</el-descriptions-item>
                  <el-descriptions-item label="联系地址">{{driverInfo.address}}</el-descriptions-item>
                  <el-descriptions-item label="紧急联系人">{{driverInfo.sosName}}</el-descriptions-item>
                  <el-descriptions-item label="紧急联系电话">{{driverInfo.sosphone}}</el-descriptions-item>              
               </el-descriptions>
            </el-main>
         </el-container>
      </template>
   </div>
</template>

<script>
export default {
   name: 'SelectDriverInfo',
   props: ['currentId'],
   data () {
    return {
       driverInfo:{},
       searchCarInfo:{
          id: '',
          name: '',
          state: '',
       },

    }
   },
   watch:{
      currentId:function(){
         this.initDriverInfo();
      }
   },
    methods:{
       initDriverInfo(){
          this.searchCarInfo.id = this.currentId;
          this.getRequest('car/driver/info/',this.searchCarInfo).then(resp=>{
             if(resp){
                this.driverInfo = resp.data[0];
             }
          })
       }
    }
 }
</script>
<style scoped>
   .el-image{
     
   }
</style>