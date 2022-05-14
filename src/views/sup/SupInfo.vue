<template>
   <div>
      <el-button type="primary" size="default" @click="supInfoAddDialog= true">添加托运人</el-button>
      
      <el-table :data="supplierInfo.slice((currentPage-1)*size,currentPage*size)" border>
         <el-table-column prop="id" label="编号" width="90"></el-table-column>
         <el-table-column prop="name" label="托运人姓名" width="180"></el-table-column>
         <el-table-column prop="phone" label="联系电话" width="180"></el-table-column>
         <el-table-column prop="address" label="联系地址" width="320"></el-table-column>
         <el-table-column fixed="right" label="操作" width="180" >
            <template slot-scope="scope">
               <el-button type="info" size="default" @click="updateDialog(scope.$index,scope.row)">编辑</el-button>
               <el-button type="danger" size="default" @click="deletesup(scope.$index,scope.row)">删除</el-button>
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
         
         <!-- 添加托运人 -->
         <el-dialog
            title="添加托运人"
            :visible.sync="supInfoAddDialog"
            width="30%"
            >
            <span><Addsupplier v-bind:supInfoAddDialog="supInfoAddDialog" v-on:closeAddDialog="closeAddDialog(res)"></Addsupplier></span>
            
         </el-dialog>

         <!-- 更新托运人 -->
         <el-dialog
            title="编辑托运人"
            :visible.sync="supInfoUpdateDialog"
            width="30%"
            >
            <span><UpdateSupplier v-bind:supInfoUpdateDialog="supInfoUpdateDialog" v-bind:updateId="updateId" v-on:closeUpdateDialog="closeUpdateDialog(res)"></UpdateSupplier></span>
            
         </el-dialog>
         
      </div>
   </template>

   <script>
   import Addsupplier from '../../components/sup/AddSupplier';
   import UpdateSupplier from '../../components/sup/UpdateSupplier';

   export default {
      components:{
         Addsupplier,
         UpdateSupplier,
      },
      name: 'SupInfo',
      data () {
      return {
         supplierInfo: [],
         
         //对话框
         supInfoAddDialog: false,
         supInfoUpdateDialog: false,
         updateId: '',

         //分页
         currentPage: 1,
         size: 5,
         total: 0,

         res: null,
      }
   },
   mounted(){
      this.initsupInfo();
   },
      methods:{
         currentChange(currentPage){
            this.currentPage = currentPage;
         },
         sizeChange(size){
            this.size = size;
         },
         closeAddDialog(res){
            this.initsupInfo();
            this.supInfoAddDialog  = res;
         },
         closeUpdateDialog(res){
            this.initsupInfo();
            this.supInfoUpdateDialog  = res;
         },
         updateDialog(index,data){
            this.updateId = data.id;
            this.supInfoUpdateDialog = true;
         },
         deletesup(index,data){
            this.$confirm('是否删除[ '+data.name+' ]', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
         }).then(() => {
            this.deleteRequest('/supplier/info/'+data.id).then(resp=>{
            if(resp){
               this.initsupInfo();
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
         initsupInfo(){
            this.getRequest('/supplier/info/?id=',).then(resp=>{
               if(resp){
                  this.supplierInfo = resp;
                  this.total = this.supplierInfo.length;
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