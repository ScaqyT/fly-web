<template>
   <div>
       <el-table  :data="goodsInfo.slice((currentPage-1)*size,currentPage*size)" border >
           <el-table-column prop="id" label="货物编号" width="90"></el-table-column>
           <el-table-column prop="name" label="货物名称" width="180"></el-table-column>
           <el-table-column prop="price" label="货物价格" width="90"></el-table-column>
           <el-table-column prop="quantity" label="库存" width="90"></el-table-column>
           <el-table-column prop="goodsType.name" label="货物类型" width="90"></el-table-column>
           <el-table-column prop="wh.name" label="仓库" width="180"></el-table-column>
           <el-table-column prop="remark" label="备注" width="180"></el-table-column>
           <el-table-column fixed="right" label="操作" width="280">
               <template slot-scope="scope">
                    <el-button type="info" size="default" @click="updateDialog(scope.$index,scope.row)">编辑</el-button>
                    <el-button type="danger" size="default" @click="deletegoods(scope.$index,scope.row)">删除</el-button>
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
       
        <!--编辑商品-->
       <el-dialog
           title="编辑商品"
           :visible.sync="whgInfoUpdateDialog"
           width="30%"
           >
           <span><UpdateGoods v-bind:updateId="updateId" v-on:closeUpdateDialog='closeUpdateDialog(res)'></UpdateGoods></span>
       </el-dialog>

        <!--待完成-->
       <el-dialog
           title="商品详情"
           :visible.sync="selectDialog"
           width="30%"
           >
           <span></span>
           <span slot="footer">
               <el-button @click="selectDialog = false">关闭</el-button>
           </span>
       </el-dialog>
       
       
   </div>
</template>

<script>
import UpdateGoods from '../../components/whg/UpdateGoods';

export default {
    components:{
        UpdateGoods
    },
   name: 'WhGInfo',
   data () {
    return {
       goodsInfo: [],
       goodsSearch: {
           goodsId: '',
           goodsType: '',
           goodsName: '',
           goodsInWhId: '',
           goodsQuantity: '',
           goodsPrice: '',
       },
       //对话框
       whgInfoAddDialog: false,
       whgInfoUpdateDialog: false,
       updateId: '',

      //分页
      currentPage: 1,
      size: 5,
      total: 0,

      res: null,

    }
   },
   mounted(){
       this.initgoods();
   },
    methods:{
        currentChange(currentPage){
          this.currentPage = currentPage;
       },
       sizeChange(size){
         this.size = size;
       },
       closeAddDialog(res){
          this.initgoods();
          this.whgInfoAddDialog  = res;
       },
       closeUpdateDialog(res){
          this.initgoods();
          this.whgInfoUpdateDialog  = res;
         //  this.updateId = 0;
       },
       updateDialog(index,data){
          this.updateId = data.id;
          this.whgInfoUpdateDialog = true;
       },
       deletegoods(index,data){
           this.$confirm('是否删除', {
               confirmButtonText: '是',
               cancelButtonText: '否',
               type: 'warning'
           }).then(() => {
               this.deleteRequest('/warehouse/g/info/'+data.id).then(resp=>{
                   if(resp.code == 200){
                       this.$message({
                           message: resp.msg,
                           type: 'success'
                       });
                       this.initgoods();
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
        initgoods(){
            this.getRequest('/warehouse/g/info/',this.goodsSearch).then(resp=>{
                if(resp){
                    this.goodsInfo = resp;
                    this.total = this.goodsInfo.length;
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