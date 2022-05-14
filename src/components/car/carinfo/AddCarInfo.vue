<template>
  <!-- 添加车辆组件 -->
  <div>
    <el-form
      :model="CarInfoForm"
      ref="CarInfoForm"
      :rules="rules"
      label-width="80px"
      size="normal"
      style="width: 400px"
    >
      <el-form-item label="车辆名称" prop="name">
        <el-input v-model="CarInfoForm.name"></el-input>
      </el-form-item>
      <el-form-item label="车辆类型" prop="cartype">
        <el-select v-model="CarInfoForm.cartype" @visible-change="getCarType">
          <template v-for="item in carType">
            <el-option
              :key="item.id"
              :label="
                item.type +
                ' (' +
                item.quality +
                '吨,长:' +
                item.length +
                '米 宽:' +
                item.width +
                '米 高:' +
                item.high +
                '米)'
              "
              :value="item.id"
            ></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="区位" prop="location">
        <el-select v-model="CarInfoForm.location" @visible-change="getLocation">
          <template v-for="item in location">
            <el-option
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="CarInfoForm.price">
            <template slot="append">万元</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-button @click="closeDialog">取消</el-button>
        </el-col>
        <el-col :span="12">
          <el-button id="addCarButton" type="primary" @click="addCar">确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddCarInfo",
  props: ["addCarDialog"],
  data() {
    return {
      CarInfoForm: {
        name: "",
        cartype: "",
        price: "",
        location: "",
      },
      carType: [],
      location: [],
      rules: {
        name: [
          { required: true, message: "请输入车辆名称", trigger: "blur" },
        ],
        cartype: [
          { required: true, message: "请选择车辆类型", trigger: "change" },
        ],
        location: [
          {
            required: true,
            message: "请选择区位",
            trigger: "change",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入价格",
          },
          {
            type: 'number',
            message: "价格必须是数字"
          }
        ],
      },
    };
  },
  methods: {
    //添加车辆
    addCar() {
      this.postRequest("/car/info/", this.CarInfoForm).then((resp) => {
        if (resp.code==200) {
          this.$emit("closeAddDialog", false);
        } else {
        }
      });
    },
    closeDialog() {
      this.$emit("closeAddDialog", false);
    },
    getCarType() {
      if (this.carType.length == 0) {
        this.getRequest("/car/info/type").then((resp) => {
          if (resp) {
            this.carType = resp;
          }
        });
      }
    },
    getLocation() {
      if (this.location.length == 0) {
        this.getRequest("/car/info/location").then((resp) => {
          if (resp) {
            this.location = resp;
          }
        });
      }
    },
    // getCarState(){
    //     if(this.carState.length == 0){
    //         this.getRequest('/car/info/state').then(resp=>{
    //             if(resp){
    //                 this.carState = resp;
    //             }
    //         })
    //     }

    // },
  },
};
</script>
<style scoped>
    #addCarButton{
        float: right;
    }
</style>