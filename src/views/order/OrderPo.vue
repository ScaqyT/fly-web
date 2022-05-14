<template>
   <div>
      <el-button type="primary" size="default" @click="addPo">添加提货单</el-button>
      
      <el-table :data="OrderPoInfo.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe>
         <el-table-column prop="id" label="订单编号" width="90"></el-table-column>
         <el-table-column prop="number" label="订单号" width="320"></el-table-column>
         <el-table-column prop="stateName.name" label="订单状态" width="180"></el-table-column>
         <el-table-column prop="name" label="订单名称" width="180"></el-table-column>
         <el-table-column prop="oid" label="所属托运单" width="90"></el-table-column>
         <el-table-column prop="quality" label="数量" width="90"></el-table-column>
         <el-table-column prop="createdate" label="创建时间" width="180"></el-table-column>
         <el-table-column prop="supplier.id" label="供应商编号" width="110"></el-table-column>
         <el-table-column prop="supplier.name" label="供应商名称" width="180"></el-table-column>
         <el-table-column prop="supplier.phone" label="供应商电话" width="180"></el-table-column>
         <el-table-column prop="supplier.address" label="供应商地址" width="320"></el-table-column>
         <el-table-column fixed="right" label="操作" width="180">
               <template slot-scope="scope">
                    <el-button type="primary" :disabled="scope.row.state==4 || scope.row.state==1 ? false:true" size="default" @click="successpo(scope.$index,scope.row)">签收</el-button>
                    <el-button type="danger" size="default" @click="deletePo(scope.$index,scope.row)">删除</el-button>
               </template>
         </el-table-column>
      </el-table>

      <el-pagination
         @size-change="sizeChange"
         @current-change="currentChange"
         :current-page.sync="currentPage"
         :page-sizes="[5, 10, 15, 20]"
         :page-size="pageSize"
         layout="total, sizes, prev, pager, next, jumper"
         :total="total" background>
      </el-pagination>
      
      <el-dialog
         title="添加提货单"
         :visible.sync="addDialog"
         width="30%"
         >
         <span><AddPo v-on:closeAddDialog="closeAddDialog()"></AddPo></span>
         
      </el-dialog>
      
      
   </div>
</template>

<script>
import qs from 'qs';
import AddPo from '../../components/order/po/AddPo';

   export default {
      components:{
         AddPo,
      },
      name: 'OrderPo',
         data() {
         return {
            OrderPoInfo: [],
            orderSearch:{
               orderId: '',
               orderState: '',
            },
            addDialog: false,
            //分页
            currentPage: 1,
            pageSize: 5,
            total: 0,
         
         }
      },
      mounted(){
         this.initOrderInfo();
      },
      methods: {
         currentChange(currentPage){
            this.currentPage = currentPage;
         },
         sizeChange(pageSize){
            this.pageSize = pageSize;
         },
         addPo(){
            this.addDialog = true;
         },
         closeAddDialog(){
            this.initOrderInfo();
            this.addDialog = false;
         },
         successpo(index,data){
            let id = data.id;
            this.$confirm('是否确认签收', {
               confirmButtonText: '是',
               cancelButtonText: '否',
               type: 'warning'
            }).then(() => {
               this.putRequest('/order/po/',qs.stringify({id})).then(resp=>{
                     if(resp.code == 200){
                        this.$message({
                              message: resp.msg,
                              type: 'success'
                        });
                        this.initOrderInfo();
                     }else{
                        this.$message({
                              message: resp.msg,
                              type: 'danger'
                        });
                     }
               })
            }).catch(() => {
               this.$message({
                     message: '已取消',
                     type: 'info'
                  });
            });
         },
         deletePo(index,data){
            this.$confirm('是否确认删除', {
               confirmButtonText: '是',
               cancelButtonText: '否',
               type: 'warning'
            }).then(() => {
               this.deleteRequest('/order/po/?id='+data.id).then(resp=>{
                  if(resp){
                     this.initOrderInfo();
                  }
               })
            }).catch(() => {});
         },
         initOrderInfo(){
            this.getRequest('/order/po/',this.orderSearch).then(resp=>{
               if(resp){
                  this.OrderPoInfo = resp;
                  this.total = this.OrderPoInfo.length;
               }
            })
         }
      }
   }
</script>
<style scoped>

</style>