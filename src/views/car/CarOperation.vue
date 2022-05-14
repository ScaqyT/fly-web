<template>
   <div>
      <el-button type="primary" size="default" @click="addDialog = true">添加托运单</el-button>
      

      <el-table :data="operationInfo.slice((currentPage-1)*size,currentPage*size)" border>
         <el-table-column prop="id" label="编号" width="60"></el-table-column>
         <el-table-column prop="way" label="路线" width="160"></el-table-column>
         <el-table-column prop="o.name" label="发货地址" width="250">
            <template slot-scope="scope">
               {{initAddress(scope.row.o,scope.row.origin)}}
            </template>
         </el-table-column>
         <el-table-column prop="d.name" label="收货地址" width="250">
            <template slot-scope="scope">
               {{initAddress(scope.row.d,scope.row.destination)}}
            </template>
         </el-table-column>
         <el-table-column prop="c.name" label="计费方式" width="110"></el-table-column>
         <el-table-column prop="qmoney" label="取货费(元)" width="110"></el-table-column>
         <el-table-column prop="smoney" label="送货费(元)" width="110"></el-table-column>
         <el-table-column prop="ymoney" label="托运费(元)" width="110"></el-table-column>

         <el-table-column fixed="right" width="110">
            <template slot-scope="scope">
               <el-button type="danger" size="default" @click="selectGoods(scope.$index,scope.row)">查看</el-button>
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
         :total="total" 
         background
      >
      </el-pagination>

      <el-dialog
         title="添加托运单"
         :visible.sync="addDialog"
         width="50%"
         >
         <span><AddOperation v-on:closeAddDialog="closeAddDialog()"></AddOperation></span>
      </el-dialog>

      <el-dialog
         title="查看托运单"
         :visible.sync="selectDialog"
         width="50%"
         >
         <span><SelectOperation v-bind:index="index" v-on:closeSelectDialog="closeSelectDialog()"></SelectOperation></span>
      </el-dialog>
      
      
   </div>
</template>

<script>
import AddOperation from '../../components/car/operation/AddOperation';
import SelectOperation from '../../components/car/operation/SelectOperation';

export default {
   components:{
      AddOperation,
      SelectOperation,
   },
   name: 'CarOperation',
   data () {
      return {
            operationInfo:[],
            //弹窗
            addDialog: false,
            selectDialog: false,
            //分页
            currentPage: 1,
            size: 5,
            total: 0,

            index: 0,
         }
   },
   mounted(){
      this.initOperationInfo();
   },
   methods:{
      currentChange(currentPage){
         this.currentPage = currentPage;
      },
      sizeChange(size){
         this.size = size;
      },
      selectGoods(i,data){
         this.index = data.id;
         this.selectDialog = true;
      },
      initOperationInfo(){
         this.getRequest('/car/operation/').then(resp=>{
            if(resp){
               this.operationInfo = resp;
               this.total = this.operationInfo.length;
            }
         })
      },
      //@parem i 地区名
      //@parem j 详细地址
      initAddress(i,j){
         return i.name + j;
      },
      closeAddDialog(){
         this.initOperationInfo();
         this.addDialog = false;
      },
      closeSelectDialog(){
         this.selectDialog = false;
      },
   }
}
</script>
<style scoped>
   .el-pagination{
      text-align: center;
      margin-top: 20px;
   }
</style>