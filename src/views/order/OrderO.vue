<template>
   <div>
      <el-button type="primary" size="default" @click="addOrder">添加送货单</el-button>

      <el-table :data="OrderOInfo.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe>
         <el-table-column prop="id" label="订单编号" width="90"></el-table-column>
         <el-table-column prop="number" label="订单号" width="320"></el-table-column>
         <el-table-column prop="stateName.name" label="订单状态" width="180"></el-table-column>
         <el-table-column prop="oid" label="所属托运单" width="90"></el-table-column>
         <el-table-column prop="quality" label="数量" width="90"></el-table-column>
         <el-table-column prop="goods.id" label="货物编号" width="90"></el-table-column>  
         <el-table-column prop="goods.name" label="订单名称" width="180"></el-table-column>
         <el-table-column prop="createdate" label="创建时间" width="180"></el-table-column>
         <el-table-column prop="customer.name" label="收货人名称" width="180"></el-table-column>
         <el-table-column prop="customer.phone" label="收货人电话" width="180"></el-table-column>
         <el-table-column prop="customer.address" label="收货人地址" width="320"></el-table-column>
         <el-table-column>
            <template slot-scope="scope">
               <el-button type="primary" size="default" :disabled="scope.row.state==4 ? false:true" @click="successorder(scope.$index,scope.row)">到货签收</el-button>                     
            </template>
         </el-table-column>
         
         <el-table-column fixed="right" label="操作" width="220">
            <template slot-scope="scope">
               <el-button type="primary" size="default" :disabled="scope.row.state==2 ? false:true" @click="successorder(scope.$index,scope.row)">发货</el-button>                     
               <el-button type="danger" size="default" @click="deleteOrder(scope.$index,scope.row)">删除</el-button>
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
         <span><AddOrder v-on:closeAddDialog="closeAddDialog()"></AddOrder></span>
         
      </el-dialog>
      
   </div>
</template>

<script>
import qs from 'qs';
import AddOrder from '../../components/order/order/AddOrder.vue';

export default {
   components:{
         AddOrder,
   },
   name: 'OrderO',
      data() {
         return {
            OrderOInfo: [],
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
         addOrder(){
            this.addDialog = true;
         },
         closeAddDialog(){
            this.initOrderInfo();
            this.addDialog = false;
         },
         successorder(index,data){
            let id = data.id;
            this.$confirm('是否确认发货', {
               confirmButtonText: '是',
               cancelButtonText: '否',
               type: 'warning'
            }).then(() => {
               this.putRequest('/order/o/',qs.stringify({id})).then(resp=>{
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
                  message: '已取消发货',
                  type: 'info'
               });
            });
         },
         deleteOrder(index,data){
            this.$confirm('是否确认删除', {
               confirmButtonText: '是',
               cancelButtonText: '否',
               type: 'warning'
            }).then(() => {
               this.deleteRequest('/order/o/?id='+data.id).then(resp=>{
                  if(resp){
                     this.initOrderInfo();
                  }
               })
            }).catch(() => {});
         },
         initOrderInfo(){
            this.getRequest('/order/o/',this.orderSearch).then(resp=>{
               if(resp){
                  this.OrderOInfo = resp;
                  this.total = this.OrderOInfo.length;
               }
            })
         }
      }
   }
</script>
<style scoped>

</style>