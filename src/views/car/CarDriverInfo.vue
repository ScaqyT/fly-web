<template>
   <div>
      <el-button type="primary" size="default" @click="addDriverDialog = true">添加司机</el-button>
      

      <el-table class="driverInfoTable" :data="driverInfo.slice((currentPage-1)*size,currentPage*size)" 
                border >
         <el-table-column prop="id" label="编号" width="100">
         </el-table-column>
         <el-table-column prop="name" label="姓名" width="180">
         </el-table-column>
         <el-table-column prop="sex" label="性别" width="100">
         </el-table-column>
         <el-table-column prop="age" label="年龄" width="100">
         </el-table-column>
         <el-table-column prop="state" label="状态" width="100">
         </el-table-column>
         <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
               <el-button type="primary" size="default" @click="selectDriver(scope.$index,scope.row)">查看</el-button>  
               <el-button type="danger" size="default" @click="deleteDriver(scope.$index,scope.row)">删除</el-button>               
            </template>
         </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="size"
        :page-sizes="pageSizes"
        layout="total,sizes,prev, pager, next,jumper"
        :total="total"
        background
      >
      </el-pagination>

      <!-- 查看司机 -->
      <el-dialog
         title="司机信息"
         :visible.sync="selectDriverDialog"
         >
         <span><SelectDriverInfo v-bind:currentId='currentId'></SelectDriverInfo></span>
         <span slot="footer">
            <el-button type="primary" @click="selectDriverDialog = false">关闭</el-button>
         </span>
      </el-dialog>

      <!-- 添加司机 -->
      <el-dialog
         title="司机信息"
         :visible.sync="addDriverDialog"
         width="700px"
         >
         <span><AddDriverInfo v-bind:addDriverDialog="addDriverDialog" v-on:addSuccess='addSuccess(res)'></AddDriverInfo></span>
      </el-dialog>
      
      
   </div>
</template>

<script>
import SelectDriverInfo from '../../components/car/driverInifo/SelectDriverInfo';
import AddDriverInfo from '../../components/car/driverInifo/AddDriverInfo';

export default {
   components:{
      SelectDriverInfo,
      AddDriverInfo
   },
   name: 'CarDriverInfo',
   data () {
    return {

       driverInfo:[],
       searchCarInfo:{
          id: '',
          name: '',
          state: '',
       },
       //分页
       currentPage: 1,
       size: 5,
       pageSizes: [5, 10, 15, 20],
       total: 0,
       //对话框
       addDriverDialog: false,
       selectDriverDialog: false,
       currentId: '',

       res: null,
       
    }
   },
   mounted(){
      this.initDriverInfo();
   },
   methods:{
       handleCurrentChange(currentPage){
          this.currentPage = currentPage;
       },
       handleSizeChange(size){
          this.size = size
       },
       //查看
       selectDriver(index,data){
          this.selectDriverDialog = true;
          this.currentId = data.id;
       },
       //删除
       deleteDriver(index,data){
         this.$confirm('是否确认删除', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
         }).then(() => {
            this.deleteRequest('car/driver/info/'+data.id).then(resp=>{
               if(resp){
                  this.initDriverInfo();
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
       addSuccess(res){
          this.initDriverInfo();
          this.addDriverDialog = res;
       },
       //初始化
       initDriverInfo(){
          this.getRequest('car/driver/info/',this.searchCarInfo).then(resp=>{
             if(resp){
                this.driverInfo = resp.data;
                this.total = resp.total;
             }
          })
       }
    }
 }
</script>
<style scoped>
   .driverInfoTable{
      margin: 20px 0 0 0;
   }
   .pagination{
      margin: 20px 0 0 140px;
   }
</style>