<template>
  <div>
    <template>
      <el-button type="primary" size="default" @click="addCarDialog = true"
        >添加车辆</el-button
      >

      <el-table
        class="carInfoTable"
        :data="carInfoForm.slice((currentPage - 1) * size, currentPage * size)"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="车辆编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="车辆名称" width="180">
        </el-table-column>
        <el-table-column prop="type.type" label="车辆类型" width="100"></el-table-column>
        <el-table-column prop="type.quality" label="载重(吨)" width="100"></el-table-column>
        <el-table-column prop="type.length" label="长(米)" width="100"></el-table-column>
        <el-table-column prop="type.width" label="宽(米)" width="100"></el-table-column>
        <el-table-column prop="type.high" label="高(米)" width="100"></el-table-column>
        <el-table-column prop="price" label="价格(万)" width="100">
        </el-table-column>
        <el-table-column
          prop="carState.name"
          label="状态"
          width="180"
        ></el-table-column>
        <el-table-column prop="location" label="区位" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="default"
              @click="deleteCarInfo(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="size"
        :page-sizes="pageSizes"
        layout="total,sizes,prev, pager, next,jumper"
        :total="total"
        background
      >
      </el-pagination>

      <!-- 添加车辆对话框 -->
      <el-dialog title="添加车辆" :visible.sync="addCarDialog" width="500px">
        <AddCarInfo
          v-bind:addCarDialog="addCarDialog"
          v-on:closeAddDialog="closeAddDialog(res)"
        ></AddCarInfo>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import AddCarInfo from "../../components/car/carinfo/AddCarInfo";

export default {
  components: {
    AddCarInfo,
  },
  name: "CarInfo",
  data() {
    return {
      //表单数据
      carInfoForm: [],
      //搜索条件
      searchCarInfo: {
        name: "",
        typeId: "",
        price: "",
        stateId: "",
        locationId: "",
      },
      //分页配置
      currentPage: 1,
      size: 5,
      pageSizes: [5, 10, 15, 20],
      total: 0,
      //对话框
      addCarDialog: false,
      updateCarDialog: false,
      res: null,
    };
  },
  mounted() {
    this.initCarinfo();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleSizeChange(size) {
      this.size = size;
    },
    closeAddDialog(res) {
      this.addCarDialog = res;
      this.initCarinfo();
    },
    //删除车辆
    deleteCarInfo(index, data) {
      this.$confirm("这一操作将永久删除{" + data.name + "}这一角色", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRequest("/car/info/" + data.id).then((resp) => {
            if (resp) {
              this.initCarinfo();
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
        .catch(() => {
          this.$message({
            message: "已取消删除",
            type: "info",
          });
        });
    },
    initCarinfo() {
      this.getRequest("/car/info/", this.searchCarInfo).then((resp) => {
        if (resp) {
          this.carInfoForm = resp.data;
          this.total = resp.total;
        }
      });
    },
  },
};
</script>
<style scoped>
.pagination {
  text-align: center;
}
.carInfoTable {
  margin: 20px 0 20px 0;
}
</style>