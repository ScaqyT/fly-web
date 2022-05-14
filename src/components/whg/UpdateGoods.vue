<template>
  <div>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="80px"
      size="normal"
    >
      <el-form-item label="货物名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="货物价格" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="quantity">
        <el-input v-model="form.quantity"></el-input>
      </el-form-item>
      <el-form-item label="货物类型" prop="type">
        <!-- <el-select v-model="form.type" @visible-change="goodstype.length==0 ? getgoodstype:false">
                   <template v-for="item in goodstype">
                       <el-option :key="item.id" :label="item.name" :value="item.id"></el-option>
                   </template>
               </el-select> -->
        <el-cascader
          :options="goodstype"
          v-model="form.type"
          placeholder="请选择货物类型"
          :props="{ expandTrigger: 'hover', value: 'id', label: 'name' }"
          @visible-change="getgoodstype"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="仓库" prop="warehouse">
        <el-select
          v-model="form.warehouse"
          placeholder="请选择仓库"
          @visible-change="getwarehouse"
        >
          <el-option
            v-for="item in warehouse"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updategoods('form')">确认</el-button>
        <el-button @click="closeUpdateDialog">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["updateId"],
  name: "UpdateGoods",
  data() {
    return {
      form: {
        id: "",
        name: "",
        price: "",
        quantity: "",
        type: "",
        warehouse: "",
        remark: "",
      },
      goodsSearch: {
        goodsId: "",
        goodsType: "",
        goodsName: "",
        goodsInWhId: "",
        goodsQuantity: "",
        goodsPrice: "",
      },
      warehouse: [],
      goodstype: [],
      disable: false,
    };
  },
  watch: {
    updateId: function () {
      this.initgoodsInfo();
    },
  },
  mounted() {
    this.initgoodsInfo();
  },
  methods: {
    closeUpdateDialog() {
      this.$emit("closeUpdateDialog", false);
    },
    updategoods(formName) {
      this.form.id = this.updateId;
      this.form.type = this.form.type.pop();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否确认更改", {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.putRequest("/warehouse/g/info/", this.form).then((resp) => {
                if (resp.code == 200) {
                  this.$emit("closeUpdateDialog", false);
                } else {
                  this.$message({
                    message: resp.msg,
                    type: "dage",
                  });
                }
              });
            })
            .catch(() => {
              this.$message({
                message: "已取消更改",
                type: "info",
              });
            });
        }
      });
    },
    getwarehouse() {
      let len = this.warehouse.length;
      if (len == 0) {
        this.getRequest("/warehouse/w/info/?id=").then((resp) => {
          if (resp) {
            this.warehouse = resp;
          }
        });
      }
    },
    getgoodstype() {
      let len = this.goodstype.length;
      if (len == 0) {
        this.getRequest("/warehouse/g/info/goodstype").then((resp) => {
          if (resp) {
            this.goodstype = resp;
            console.log("已执行");
          }
        });
      }
    },
    initgoodsInfo() {
      this.goodsSearch.goodsId = this.updateId;
      this.getRequest("/warehouse/g/info/", this.goodsSearch).then((resp) => {
        if (resp) {
          this.form = resp[0];
        }
      });
    },
  },
};
</script>
<style scoped>
</style>