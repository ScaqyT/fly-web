<template>
   <div>
      <el-button type="primary" size="default" @click="whwInfoAddDialog= true">添加仓库</el-button>
      
      <el-table :data="wareHouseInfo.slice((currentPage-1)*size,currentPage*size)" border>
         <el-table-column prop="id" label="仓库编号" width="90"></el-table-column>
         <el-table-column prop="name" label="仓库姓名" width="180"></el-table-column>
         <el-table-column prop="type" label="仓库类型" width="90"></el-table-column>
         <el-table-column prop="wphone" label="仓库电话" width="180"></el-table-column>
         <el-table-column prop="address" label="联系地址" width="320"></el-table-column>
         <el-table-column prop="location.name" label="区位" width="180"></el-table-column>
         <el-table-column prop="employee.name" label="管理员" width="180"></el-table-column>
         <el-table-column prop="employee.phone" label="管理员电话" width="180"></el-table-column>

         <el-table-column fixed="right" label="操作" width="180" >
            <template slot-scope="scope">
               <el-button type="info" size="default" @click="updateDialog(scope.$index,scope.row)">编辑</el-button>
               <el-button type="danger" size="default" @click="deletewhw(scope.$index,scope.row)">删除</el-button>
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
      
      <!-- 添加仓库 -->
      <el-dialog
         title="添加仓库"
         :visible.sync="whwInfoAddDialog"
         width="30%"
         >
         <span><Addwarehouse v-on:closeAddDialog="closeAddDialog(res)"></Addwarehouse></span>
         
      </el-dialog>

      <!-- 更新仓库 -->
      <el-dialog
         title="编辑仓库"
         :visible.sync="whwInfoUpdateDialog"
         width="30%"
         >
         <span><Updatewarehouse v-bind:updateId="updateId" v-on:closeUpdateDialog="closeUpdateDialog(res)"></Updatewarehouse></span>
         
      </el-dialog>
      
   </div>
</template>

<script>
import Addwarehouse from '../../components/whw/Addwarehouse';
import Updatewarehouse from '../../components/whw/Updatewarehouse';

export default {
   components:{
      Addwarehouse,
      Updatewarehouse
   },
   name: 'whwInfo',
   data () {
    return {
       wareHouseInfo: [],
       id: '',
       //对话框
       whwInfoAddDialog: false,
       whwInfoUpdateDialog: false,
       updateId: '',

      //分页
      currentPage: 1,
      size: 5,
      total: 0,

      res: null,
    }
   },
   mounted(){
      this.initwhwInfo();
   },
    methods:{
       currentChange(currentPage){
          this.currentPage = currentPage;
       },
       sizeChange(size){
         this.size = size;
       },
       closeAddDialog(res){
          this.initwhwInfo();
          this.whwInfoAddDialog  = res;
       },
       closeUpdateDialog(res){
          this.initwhwInfo();
          this.whwInfoUpdateDialog  = res;
         //  this.updateId = 0;
       },
       updateDialog(index,data){
          this.updateId = data.id;
          this.whwInfoUpdateDialog = true;
       },
       deletewhw(index,data){
         this.$confirm('是否删除[ '+data.name+' ]', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
         }).then(() => {
            this.deleteRequest('/warehouse/w/info/'+data.id).then(resp=>{
            if(resp){
               this.initwhwInfo();
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
       initwhwInfo(){
          this.getRequest('/warehouse/w/info/?id=').then(resp=>{
             if(resp){
                this.wareHouseInfo = resp;
                this.total = this.wareHouseInfo.length;
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