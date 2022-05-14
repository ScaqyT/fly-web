<template>
   <div>
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="120px" class="demo-ruleForm">
         <el-form-item label="姓名" prop="name">
           <el-input v-model="addForm.name" placeholder="请输入姓名"></el-input>
         </el-form-item>
         <el-form-item label="年龄" prop="age">
           <el-input v-model.number="addForm.age" placeholder="请输入年龄"></el-input>
         </el-form-item>
         <el-form-item label="性别" prop="sex">
            <el-select v-model="addForm.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="联系电话" prop="telphone">
            <el-input v-model="addForm.telphone" placeholder="请输入联系电话"></el-input>
         </el-form-item>
         <el-form-item label="联系地址" prop="address">
           <el-input type="textarea" v-model="addForm.address"></el-input>
         </el-form-item>
         <el-form-item label="紧急联系人" prop="sosName">
            <el-input v-model="addForm.sosName" placeholder="请输入紧急联系人姓名"></el-input>
         </el-form-item>
         <el-form-item label="紧急联系电话" prop="sosPhone">
            <el-input v-model="addForm.sosPhone" placeholder="请输入紧急联系人电话"></el-input>
         </el-form-item>
         <el-form-item label="身高" prop="high">
            <el-input v-model.number="addForm.high" placeholder="请输入身高"></el-input>
         </el-form-item>
         <el-form-item label="体重" prop="weigth">
            <el-input v-model.number="addForm.weigth" placeholder="请输入体重"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="addDriverInfo()">立即添加</el-button>
           <el-button @click="resetForm('addForm')">重置</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>
export default {
   name: 'AddDriverInfo',
   data () {
    return {
       addForm: {
          name: '',
          state: '',
          age: '',
          weigth: '',
          high: '',
          address: '',
          telphone: '',
          sosPhone: '',
          sosName: '',
          image: '',
          sex: '',
       },
       rules: {
            name: [
               { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            age: [
               { required: true, message: '请输入年龄', trigger: 'blur' },
               { type: 'number',message: '年龄必须是数字'}
            ],
            sex: [
               { required: true, message: '请选择性别', trigger: 'change' }
            ],
            high: [
               { required: true, message: '请输入身高', trigger: 'blur' },
               { type: 'number',message: '身高必须是数字'}
            ],
            weigth: [
               { required: true, message: '请输入体重', trigger: 'blur' },
               { type: 'number',message: '体重必须是数字'}
            ],
            address: [
               { required: true, message: '请输入联系地址', trigger: 'blur' },
               { max: 64, message: '最多不能超过64个字', trigger: 'blur' },
            ],
            telphone: [
               { required: true, message: '请输入联系电话', trigger: 'blur' },
               { min: 11,max: 11, message: '格式不正确', trigger: 'blur'}
            ],
            sosPhone: [
               { required: true, message: '请输入紧急联系人电话', trigger: 'blur' },
            ],
            sosName: [
               { required: true, message: '请输入紧急联系人姓名', trigger: 'blur' },
            ],
          },
    }
   },
    methods:{
       addDriverInfo(){
          this.postRequest('car/driver/info/',this.addForm).then(resp=>{
             if(resp.code==200){
                this.$emit('addSuccess',false);
             }else{
             }
          })
       },
       resetForm(formName){
          this.$refs[formName].resetFields();
       }
    }
 }
</script>
<style scoped>

</style>