<template>
   <div>
      <el-form :model="form" ref="form" :rules="rules" label-width="80px" :inline="false" size="normal">
         <el-form-item label="仓库名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入仓库名称"></el-input>
         </el-form-item>
         <el-form-item label="仓库面积" prop="area">
            <el-input v-model.number="form.area" placeholder="请输入仓库面积"></el-input>
         </el-form-item>
         <el-form-item label="仓库电话" prop="wphone">
            <el-input v-model="form.wphone" placeholder="请输入仓库电话"></el-input>
         </el-form-item>
         <el-form-item label="仓库类型" prop="type">
            <el-input v-model="form.type" placeholder="请输入仓库类型"></el-input>
         </el-form-item>           
         <el-form-item label="区位" prop="locationId">
            <el-select v-model="form.locationId" placeholder="请选择区位" @visible-change="getLocation">
               <el-option v-for="item in location"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
               </el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="管理员" prop="uid">
            <el-select v-model="form.uid" placeholder="请选择管理员" @visible-change="getEmployee">
               <el-option v-for="item in employee"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
               </el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="仓库地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入仓库地址" type="textarea"></el-input>
         </el-form-item>
         
         <el-form-item>
            <el-button type="primary" @click="addwarehouse('form')">确定</el-button>
            <el-button @click="closeAddDialog">取消</el-button>
         </el-form-item>
      </el-form>
      
   </div>
</template>

<script>
export default {
   props: ['whwInfoAddDialog'],
   name: 'Addwarehouse',
   data () {
    return {
       form:{
          name: '',
          locationId: '',
          area: '',
          type: '',
          uid: '',
          wphone: '',
          address: ''
       },
       location: [],
       employee: [],
       rules: {
          name: [
               { required: true, message: '请输入仓库名称' , trigger: 'blur'}
          ],
          wphone: [
              { required: true, message: '请输入仓库电话' , trigger: 'blur'},
          ],
          address: [
              { required: true, message: '请输入仓库地址' , trigger: 'blur'}
          ], 
          type: [
              { required: true, message: '请输入仓库类型' , trigger: 'blur'}
          ], 
          area: [
              { required: true, message: '请输入仓库面积' , trigger: 'blur'},
              { type: 'number' , message: '请输入数字' , trigger: 'blur' }
          ], 
          locationId: [
             { required: true, message: '区位不能为空' , trigger: 'change' }
          ],
          uid: [
             { required: true, message: '管理员不能为空' , trigger: 'change' }
          ]
       }
    }
   },
    methods:{
       addwarehouse(formName){
          this.$refs[formName].validate(valid=>{
             if(valid){
                this.$confirm('是否确定添加', {
                   confirmButtonText: '是',
                   cancelButtonText: '否',
                   type: 'warning'
                }).then(() => {
                   this.postRequest("/warehouse/w/info/",this.form).then(resp=>{
                      if(resp.code==200){
                         this.$message({
                         message: resp.msg,
                         type: 'success'
                        });
                        this.$emit('closeAddDialog',false);
                      }else{
                         this.$message({
                            message: resp.msg,
                            type: 'danger'
                         });
                      }
                   })
                }).catch(() => {
                   this.$message({
                      message: '已取消添加',
                      type: 'info'
                   });
                });
             }
          })
       },
       closeAddDialog(){
          this.$emit("closeAddDialog",false);
       },
       getLocation(){
          if(this.location.length == 0){
            this.getRequest("/warehouse/w/info/location").then(resp=>{
               if(resp){
                  this.location = resp;
               }
            })
          }

       },
       getEmployee(){
          if(this.employee.length == 0){
            this.getRequest("/warehouse/w/info/employee").then(resp=>{
               if(resp){
                  this.employee = resp;
               }
            })
          }
       }
    }
 }
</script>
<style scoped>

</style>