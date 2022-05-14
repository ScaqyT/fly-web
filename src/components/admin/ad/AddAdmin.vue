<template>
   <div>
       <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px" class="demo-ruleForm">
         <el-form-item label="姓名" prop="name">
           <el-input v-model="addForm.name" placeholder="请输入姓名"></el-input>
         </el-form-item>
         <el-form-item label="性别" prop="sex">
            <el-select v-model="addForm.sex" placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="联系电话" prop="telephone">
            <el-input v-model="addForm.telephone" placeholder="请输入联系电话"></el-input>
         </el-form-item>
         <el-form-item label="联系地址" prop="address">
           <el-input type="textarea" v-model="addForm.address"></el-input>
         </el-form-item>
         <el-form-item label="是否启用" prop="enable">
             <el-switch v-model="addForm.enable" active-value="1" inactive-value="0">
             </el-switch>
         </el-form-item>
         <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" placeholder="请输入密码"></el-input>
         </el-form-item>
         <el-form-item label="备注" prop="remark">
             <el-input v-model="addForm.remark" type="textarea"></el-input>
         </el-form-item>
         
         <el-form-item>
           <el-button type="primary" @click="addAdmin('addForm')">立即添加</el-button>
           <el-button @click="resetForm('addForm')">重置</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>
export default {
   name: 'AddAdmin',
   data () {
    return {
        addForm: {
          name: '',
          username: '',
          password: '',
          address: '',
          telephone: '',
          enable: '',
          userFace: '',
          remark: '',
          sex: '',
          phone: '',
       },
       rules: {
            name: [
               { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            sex: [
               { required: true, message: '请选择性别', trigger: 'change' }
            ],
            address: [
               { required: true, message: '请输入联系地址', trigger: 'blur' },
               { max: 64, message: '最多不能超过64个字', trigger: 'blur' },
            ],
            telephone: [
               { required: true, message: '请输入联系电话', trigger: 'blur' },
               { min: 11,max: 11, message: '格式不正确', trigger: 'blur'}
            ],
            username: [
               { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password: [
               { required: true, message: '请输入密码', trigger: 'blur' },
            ],
          },
    }
   },
    methods:{
      addAdmin(formName){
          this.$refs[formName].validate(valid=>{
              if(valid){
                this.$confirm("是否添加操作员",{
              confirmButtonText: "是",
              cancelButtonText: "否",
              type: "warning",
            })
              .then(() => {
                this.postRequest('/admin/',this.addForm)
                  .then((resp) => {
                    if (resp.code==200) {
                      this.$message({
                        message: resp.msg,
                        type: "success",
                      });
                      this.$emit('successAdd',false);
                    } else {
                      this.$message({
                        message: resp.msg,
                        type: "danger",
                      });
                    }
                  });
              })
              .catch(() => {
                this.$message({
                  message: "已取消添加",
                  type: "info",
                });
              });
          } 
        });
      }
    }
 }
</script>