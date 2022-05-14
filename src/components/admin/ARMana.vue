<template>
  <div>
    <div>
      <el-button type="primary" @click="dialogFormAddRole = true"
        >添加角色</el-button
      >
    </div>
    <el-table
      class="rolesTable"
      :data="adminRole"
      style="width: auto"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column prop="id" label="编号" width="90"> </el-table-column>
      <el-table-column prop="name" label="角色" width="180"> </el-table-column>
      <el-table-column prop="nameZh" label="角色名" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="default"
            @click="selectRole(scope.$index, scope.row)"
            >查看权限</el-button
          >
          <el-button
            type="info"
            size="default"
            @click="selectUpdateRole(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="default"
            @click="deleteRole(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button
      class="deleteRoles"
      type="danger"
      size="default"
      :disabled="this.mulSelectionVal.length == 0"
      @click="deleteRoles"
      >批量删除</el-button
    >

 
    <!-- 添加角色弹出框 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormAddRole" center>
      <el-form :model="addAR">
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="addAR.name" autocomplete="off">
            <template slot="prepend">ROLE_</template>
          </el-input>
        </el-form-item>
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="addAR.nameZh" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="权限菜单" :label-width="formLabelWidth">
          <el-tree
            ref="tree"
            :data="menus"
            node-key="id"
            :props="defaultProps"
            show-checkbox
            default-expand-all
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddRole = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色弹出框 -->
    <el-dialog title="编辑角色" :visible.sync="dialogUpdateRole"  center>
      <el-form :model="updateAR">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="updateAR.id"  disabled></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="updateAR.name" autocomplete="off">
            <template slot="prepend">ROLE_</template>
          </el-input>
        </el-form-item>
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="updateAR.nameZh" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="权限菜单" :label-width="formLabelWidth">
          <el-tree
            ref="updatetree"
            :data="menus"
            node-key="id"
            :props="defaultProps"
            show-checkbox
            default-expand-all
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateRole = false">取 消</el-button>
        <el-button type="primary" @click="updateRole">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查看角色权限 -->
    <el-dialog title="查看权限" width="30%" :visible.sync="dialogSelectRole" center>
      <span> 权限菜单 </span>
      <el-tree
        ref="tree"
        :data="menu"
        node-key="id"
        :props="defaultProps"
        default-expand-all
      ></el-tree>
      <span slot="footer">
        <el-button type="primary" @click="dialogSelectRole = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminRole",
  data() {
    return {
      AR: [
        {
          id: "",
          name: "",
          nameZh: "",
        },
      ],
      adminRole: [],
      mulSelectionVal: [],
      dialogFormAddRole: false,
      dialogSelectRole: false,
      dialogUpdateRole: false,
      addAR: {
        name: "",
        nameZh: "",
      },
      updateAR: {
        id: "",
        name: "",
        nameZh: "",
      },
      menus: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      formLabelWidth: "130px",
      menuids: [],
      menuid: [],
      menu: [],
    };
  },
  mounted() {
    this.initAdminRole();
    this.initMenus();
  },
  methods: {
    //查看角色
    selectRole(index, data) {
      this.dialogSelectRole = true;
      this.initMenu(index, data);
    },
    //添加角色
    addRole() {
      this.menuids = this.$refs.tree.getCheckedKeys();
      let mids = "?";
      this.menuids.forEach((id) => {
        mids += "mids=" + id + "&";
      });
      let role = this.addAR;
      if (this.addAR.name != null && this.addAR.nameZh != null) {
        this.$confirm("是否添加角色", "添加确认", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        })
          .then(() => {
            axios
              .post(
                "admin/role/",
                mids + "name=" + role.name + "&nameZh=" + role.nameZh
              )
              .then((resp) => {
                if (resp) {
                  this.initAdminRole();
                  this.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  this.dialogFormAddRole = false;
                } else {
                  this.$message({
                    message: "添加失败",
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
      } else {
        this.$message({
          message: "请输入角色名",
          type: "info",
        });
      }
    },
    //显示编辑角色界面
    selectUpdateRole(index, data) {
      this.dialogUpdateRole = true;
			var _this = this;
			_this.initMenu(index,data)
			
			setTimeout(function() {
				_this.initMenuid();
				// console.log(_this.menuid);
				_this.$nextTick(()=>{
				  _this.$refs.updatetree.setCheckedKeys(_this.menuid);
				})
			},500);
      let name = data.name.substr(5);			
      this.updateAR = {
        id: data.id,
        name: name,
        nameZh: data.nameZh,
      };
    },
    //编辑角色
    updateRole() {
      this.menuids = this.$refs.updatetree.getCheckedKeys();
      let mids = "?";
      this.menuids.forEach((id) => {
        mids += "mids=" + id + "&";
      });
      let role = this.updateAR;
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
    deleteRole(index, data) {
      this.$confirm("这一操作将永久删除{" + data.nameZh + "}这一角色", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest("/admin/role/" + data.id).then((resp) => {
            if (resp) {
              this.initAdminRole();
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
    //批量删除角色
    deleteRoles() {
      this.$confirm(
        "这一操作将永久删除[" +
          this.mulSelectionVal.length +
          "]条数据，是否继续",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let ids = "?";
          this.mulSelectionVal.forEach((item) => {
            ids += "ids=" + item.id + "&";
          });
          this.deleteRequest("admin/role/" + ids).then((resp) => {
            if (resp) {
              this.initAdminRole();
              this.$message({
                message: "删除成功",
                type: "success",
              });
            } else {
              this.$message({
                message: "删除失败",
                type: "danger",
              });
            }
          });
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {
      this.mulSelectionVal = val;
    },
    initAdminRole() {
      this.getRequest("/admin/role/").then((resp) => {
        if (resp) {
          this.adminRole = resp;
          this.AR.nameZh = "";
        }
      });
    },
    //初始化权限菜单
    initMenus() {
      this.getRequest("/admin/role/menus").then((resp) => {
        if (resp) {
          this.menus = resp;
        }
      });
    },
    initMenu(index, data) {
      this.getRequest("/admin/role/menu?rid=" + data.id).then((resp) => {
        if (resp) {
          this.menu = resp;
        }
      });
    },
		initMenuid() {
			var _this = this;
			let mid = [];
			_this.menu.forEach(item=>{
				item.children.forEach(item=>{
					mid.push(item.id);
				})
			})
			_this.menuid = mid;
		}
  },
};
</script>
<style scoped>
.deleteRoles,
.rolesTable {
  margin-top: 20px;
}

</style>