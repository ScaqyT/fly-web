<template>
   <div>
       <el-form :model="cusForm" ref="cusForm" :rules="rules" label-width="80px"  size="normal">
           <el-form-item label="客户姓名" prop="name">
               <el-input v-model="cusForm.name" placeholder="请输入客户姓名"></el-input>
           </el-form-item>
           <el-form-item label="联系电话" prop="phone">
               <el-input v-model="cusForm.phone" placeholder="请输入联系电话"></el-input>
           </el-form-item>
           <el-form-item label="联系地址" prop="address">
               <el-input type="textarea" v-model="cusForm.address" placeholder="请输入联系地址"></el-input>
           </el-form-item>
           <el-form-item>
               <el-button type="primary" @click="addCusInfo('cusForm')">确定</el-button>
               <el-button @click="closeDialog">取消</el-button>
           </el-form-item>
       </el-form>
       
   </div>
</template>

<script>
export default {
   name: 'AddCustomer',
   props: ['cusInfoAddDialog'],
   data () {
    return {
        cusForm: {
            name: '',
            phone: '',
            address: '',
        },
        rules: {
            name: [
                { required: true, message: '请输入客户姓名' , trigger: 'blur'}
            ],
            phone: [
                { required: true, message: '请输入联系电话' , trigger: 'blur'},
                { min:11,max:11, message: '格式不正确' , trigger: 'blur'},
            ],
            address: [
                { required: true, message: '请输入联系地址' , trigger: 'blur'}
            ],                  
        }
    }
   },
    methods:{
        closeDialog() {
          this.$emit("closeAddDialog", false);
        },
        addCusInfo(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    this.$confirm('是否确认添加', {
                        confirmButtonText: '是',
                        cancelButtonText: '否',
                        type: 'warning'
                    }).then(() => {
                        this.postRequest('customer/info/',this.cusForm).then(resp=>{
                            if(resp.code==200){
                                this.$emit('closeAddDialog',false);
                            }else{
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            message: '已取消添加',
                            type: 'info'
                        });
                    });
                }else{
                    this.$message({
                        message: '请填好表单',
                        type: 'danger'
                    });
                    return false;
                }
            })
        }
    }
 }
</script>
<style scoped>

</style>