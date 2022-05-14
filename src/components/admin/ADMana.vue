<template>
  <div>
    <div>
      <el-button type="primary" @click="dialogFormAdd = true"
        >添加操作员</el-button
      >
    </div>
    <el-table
      class="rolesTable"
      :data="ADForm"
      border
    >
      <el-table-column prop="id" label="编号" width="90"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column label="性别" width="180">
          <template slot-scope="scope">
              <span v-if="scope.row.sex==0">男</span>
              <span v-else>女</span>
          </template>
      </el-table-column>
      <el-table-column prop="telephone" label="联系电话" width="180"> </el-table-column>
      <el-table-column prop="address" label="联系地址" width="180"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="180"> </el-table-column>
      <el-table-column prop="remark" label="备注" width="320"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="280px">
        <template slot-scope="scope">
          <el-button
            type="info"
            size="default"
            @click="updateAdmin(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="default"
            @click="deleteAdmin(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="添加操作员"
        :visible.sync="dialogFormAdd"
        width="30%"
        >
        <span><AddAdmin v-on:successAdd="successAdd(res)"></AddAdmin></span>
    </el-dialog>
    
  </div>
</template>

<script>
import axios from "axios";
import AddAdmin from '../admin/ad/AddAdmin';

export default {
  components: {
      AddAdmin,
  },
  name: "AdminRole",
  data() {
    return {
      ADForm: [],
      dialogFormAdd: false,
      dialogUpdateRole: false,
      res: '',
      keyWords: ''
    
    };
  },
  mounted() {
    this.initAdmin();
  },
  methods: {
    //添加操作员
    successAdd(res) {
        this.dialogFormAdd = res;
    },
    //编辑角色
    updateRole() {
      if(mids != null ){
      this.$confirm("是否确认更新", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      })
        .then(() => {
          axios.put(
            "/admin/role/",
            mids +
              "id=" +
              role.id +
              "&name=" +
              role.name +
              "&nameZh=" +
              role.nameZh
          ).then((resp) => {
            if (resp) {
              this.initAdminRole();
              this.$message({
                message: "更新成功",
                type: "success",
              });
              this.dialogUpdateRole = false;
            } else {
              this.$message({
                message: "更新失败",
                type: "danger",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消更新",
            type: "info",
          });
        });
      }

    },
    //删除角色
    deleteAdmin(index, data) {
      this.$confirm("这一操作将永久删除{" + data.name + "}", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest("/admin/" + data.id).then((resp) => {
            if (resp.code==200) {
                this.$message({
                    message: resp.msg,
                    type: 'success'
                });
              this.initAdmin();
            }else{
                this.$message({
                    message: resp.msg,
                    type: 'danger'
                });
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
            type: "info",
          });
        });
    },
    initAdmin() {
      this.getRequest("/admin/?keyWords="+this.keyWords).then((resp) => {
        if (resp) {
          this.ADForm = resp;
          this.total = this.ADForm.length;
        }
      });
    },
  }
};
</script>
<style scoped>
.deleteRoles,
.rolesTable {
  margin-top: 20px;
}

</style>