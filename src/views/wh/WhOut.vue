<template>
   <div>
       <el-table :data="outInfo.slice((currentPage-1)*size,currentPage*size)" border stripe>
           <el-table-column prop="id" label="编号" width="90"></el-table-column>
           <el-table-column prop="name" label="订单名称" width="180"></el-table-column>
           <el-table-column prop="quantity" label="数量" width="90"></el-table-column>
           <el-table-column prop="date" label="出库日期" width="180"></el-table-column>
           <el-table-column label="状态" width="100">
               <template slot-scope="scope">
                   <span v-if="scope.row.state==0">未出库</span>
                   <span v-else>已出库</span>
               </template>
           </el-table-column>
           <el-table-column prop="warehouse.id" label="仓库编号" width="90"></el-table-column>
           <el-table-column prop="warehouse.name" label="仓库名称" width="180"></el-table-column>
           <el-table-column prop="orderId" label="订单号" width="90"></el-table-column>
           <el-table-column prop="customer.id" label="客户编号" width="90"></el-table-column>
           <el-table-column prop="customer.name" label="客户名称" width="180"></el-table-column>
           <el-table-column prop="customer.phone" label="客户电话" width="180"></el-table-column>
           <el-table-column prop="customer.address" label="客户地址" width="320"></el-table-column>
           <el-table-column fixed="right" label="操作" width="180">
               <template slot-scope="scope">
                    <el-button type="primary" size="default" :disabled="scope.row.state==0 ? false:true" @click="successOut(scope.$index,scope.row)">出库</el-button>
                    <el-button type="danger" size="default" @click="deleteOut(scope.$index,scope.row)">删除</el-button>
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
import qs from "qs";

export default {
   name: 'WhOut',
   data () {
    return {
        outInfo: [],
        outSearch: {
            id: '',
            otherId: '',
            name: '',
        },

        //分页
        currentPage: 1,
        size: 5,
        total: 0,

      res: null,
    }
   },
   mounted(){
       this.initOutInfo();
   },
    methods:{
        currentChange(currentPage){
          this.currentPage = currentPage;
       },
       sizeChange(size){
         this.size = size;
       },
       successOut(index,data){
           let id = data.id;
          this.$confirm('是否确认出库', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
          }).then(() => {
              this.putRequest('/warehouse/out/',qs.stringify({id})).then(resp=>{
                  if(resp.code == 200){
                       this.initOutInfo();
                   }
              })
          }).catch(() => {
              this.$message({
                   message: '已取消更新',
                   type: 'info'
               });
          });
       },
       deleteOut(index,data){
           this.$confirm('是否删除', {
               confirmButtonText: '是',
               cancelButtonText: '否',
               type: 'warning'
           }).then(() => {
               this.deleteRequest('/warehouse/out/'+data.id).then(resp=>{
                   if(resp.code == 200){
                       this.initOutInfo();
                   }
               })
           }).catch(() => {
               this.$message({
                   message: '已取消删除',
                   type: 'info'
               });
           });
       },
        initOutInfo(){
            this.getRequest('/warehouse/out/',this.outSearch).then(resp=>{
                if(resp){
                    this.outInfo = resp;
                    this.total = this.outInfo.length;
                }
            })
        }
    }
 }
</script>
<style scoped>

</style>