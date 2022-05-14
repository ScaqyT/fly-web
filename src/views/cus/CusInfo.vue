<template>
   <div>
      <el-button type="primary" size="default" @click="cusInfoAddDialog= true">添加收货人</el-button>
      
      <el-table :data="customerInfo.slice((currentPage-1)*size,currentPage*size)" border>
         <el-table-column prop="id" label="编号" width="90"></el-table-column>
         <el-table-column prop="name" label="收货人姓名" width="180"></el-table-column>
         <el-table-column prop="phone" label="联系电话" width="180"></el-table-column>
         <el-table-column prop="address" label="联系地址" width="320"></el-table-column>
         <el-table-column fixed="right" label="操作" width="180" >
            <template slot-scope="scope">
               <el-button type="info" size="default" @click="updateDialog(scope.$index,scope.row)">编辑</el-button>
               <el-button type="danger" size="default" @click="deleteCus(scope.$index,scope.row)">删除</el-button>
            </template>

         </el-table-column>
      </el-table>

      <el-pagination
         @size-change="sizeChange"
         @current-change="currentChange"
         :current-page="currentPage"
         :page-sizes="[5, 10, 15, 20]"
         :page-size="size"
         layout="total, sizes, prev, pager, next, jumper"
         :total="total" background>
      </el-pagination>
      
      <!-- 添加收货人 -->
      <el-dialog
         title="添加收货人"
         :visible.sync="cusInfoAddDialog"
         width="30%"
         >
         <span><AddCustomer v-bind:cusInfoAddDialog="cusInfoAddDialog" v-on:closeAddDialog="closeAddDialog(res)"></AddCustomer></span>
         
      </el-dialog>

      <!-- 更新收货人 -->
      <el-dialog
         title="编辑收货人"
         :visible.sync="cusInfoUpdateDialog"
         width="30%"
         >
         <span><UpdateCustomer v-bind:cusInfoUpdateDialog="cusInfoUpdateDialog" v-bind:updateId="updateId" v-on:closeUpdateDialog="closeUpdateDialog(res)"></UpdateCustomer></span>
         
      </el-dialog>
      
   </div>
</template>

<script>
import AddCustomer from '../../components/cus/AddCustomer';
import UpdateCustomer from '../../components/cus/UpdateCustomer';

export default {
   components:{
      AddCustomer,
      UpdateCustomer
   },
   name: 'CusInfo',
   data () {
    return {
       customerInfo: [],
       //对话框
       cusInfoAddDialog: false,
       cusInfoUpdateDialog: false,
       updateId: '',

      //分页
      currentPage: 1,
      size: 5,
      total: 0,

      res: null,
    }
   },
   mounted(){
      this.initCusInfo();
   },
    methods:{
       currentChange(currentPage){
          this.currentPage = currentPage;
       },
       sizeChange(size){
         this.size = size;
       },
       closeAddDialog(res){
          this.initCusInfo();
          this.cusInfoAddDialog  = res;
       },
       closeUpdateDialog(res){
          this.initCusInfo();
          this.cusInfoUpdateDialog  = res;
       },
       updateDialog(index,data){
          this.updateId = data.id;
          this.cusInfoUpdateDialog = true;
       },
       deleteCus(index,data){
         this.$confirm('是否删除[ '+data.name+' ]', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
         }).then(() => {
            this.deleteRequest('/customer/info/'+data.id).then(resp=>{
            if(resp){
               this.initCusInfo();
               this.$message({
                  message: '删除成功',
                  type: 'success'
               });
            }else{
               this.$message({
                  message: '删除失败',
                  type: 'danger'
               });
            }
         })
         }).catch(() => {
            this.$message({
               message: '已取消删除',
               type: 'info'
            });
         });
       },
       initCusInfo(){
          this.getRequest('/customer/info/?id=').then(resp=>{
             if(resp){
                this.customerInfo = resp;
                this.total = this.customerInfo.length;
             }
          })
       }
    }
 }
</script>
<style scoped>
   .el-table{
      margin: 20px 0 20px 0;
   }
</style>