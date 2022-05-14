<template>
   <div>
       <el-table :data="inInfo.slice((currentPage-1)*size,currentPage*size)" border stripe>
           <el-table-column prop="id" label="订单编号" width="90"></el-table-column>
           <el-table-column prop="name" label="货物名称" width="180"></el-table-column>
           <el-table-column prop="price" label="货物价格" width="90"></el-table-column>
           <el-table-column prop="quantity" label="数量" width="90"></el-table-column>
           <el-table-column prop="date" label="入库日期" width="180"></el-table-column>
           <el-table-column label="状态" width="100">
               <template slot-scope="scope">
                   <span v-if="scope.row.state==0">未入库</span>
                   <span v-else>已入库</span>
               </template>
           </el-table-column>
           <el-table-column prop="warehouse.id" label="仓库编号" width="90"></el-table-column>
           <el-table-column prop="warehouse.name" label="仓库名称" width="180"></el-table-column>
           <el-table-column prop="orderId" label="订单号" width="90"></el-table-column>
           <el-table-column prop="supplier.id" label="供应商编号" width="110"></el-table-column>
           <el-table-column prop="supplier.name" label="供应商名称" width="180"></el-table-column>
           <el-table-column prop="supplier.phone" label="供应商电话" width="180"></el-table-column>
           <el-table-column prop="supplier.address" label="供应商地址" width="320"></el-table-column>
           <el-table-column fixed="right" label="操作" width="180">
               <template slot-scope="scope">
                   <el-button type="primary" :disabled="scope.row.state==0 ? false:true" size="default" @click="successIn(scope.$index,scope.row)">入库</el-button>
                    <el-button type="danger" size="default" @click="deleteIn(scope.$index,scope.row)">删除</el-button>
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

       
   </div>
</template>

<script>
import qs from 'qs';

export default {
   name: 'WhIn',
   data () {
    return {
        inInfo: [],
        inSearch: {
            id: '',
            otherId: '',
            name: '',
        },
        //对话框
        whiInfoAddDialog: false,
        //分页
        currentPage: 1,
        size: 5,
        total: 0,

      res: null,
    }
   },
   mounted(){
       this.initInInfo();
   },
    methods:{
        currentChange(currentPage){
          this.currentPage = currentPage;
       },
       sizeChange(size){
         this.size = size;
       },
       successIn(index,data){
          let id = data.id;
          this.$confirm('是否确认入库', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
          }).then(() => {
              this.putRequest('/warehouse/in/',qs.stringify({id})).then(resp=>{
                  if(resp.code == 200){
                       this.$message({
                           message: resp.msg,
                           type: 'success'
                       });
                       this.initInInfo();
                   }else{
                       this.$message({
                           message: resp.msg,
                           type: 'danger'
                       });
                   }
              })
          }).catch(() => {
              this.$message({
                   message: '已取消更新',
                   type: 'info'
               });
          });
       },
       deleteIn(index,data){
           this.$confirm('是否删除', {
               confirmButtonText: '是',
               cancelButtonText: '否',
               type: 'warning'
           }).then(() => {
               this.deleteRequest('/warehouse/in/'+data.id).then(resp=>{
                   if(resp.code == 200){
                       this.$message({
                           message: resp.msg,
                           type: 'success'
                       });
                       this.initInInfo();
                   }else{
                       this.$message({
                           message: resp.msg,
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
        initInInfo(){
            this.getRequest('/warehouse/in/',this.inSearch).then(resp=>{
                if(resp){
                    this.inInfo = resp;
                    this.total = this.inInfo.length;
                }
            })
        }
    }
 }
</script>
<style scoped>

</style>