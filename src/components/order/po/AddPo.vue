<template>
    <div>
        <el-form
            :model="form"
            ref="form"
            :rules="rules"
            label-width="80px"
            :inline="false"
            size="normal"
        >
        <el-form-item label="托运单">
            <el-select v-model="form.oid" placeholder="请选择托运单" @change="initWay()" >
                <el-option
                v-for="item in operation"
                :key="item.id"
                :label="item.id"
                :value="item.id"
                >
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="目的地">
            <el-input v-model="way" clearable disabled></el-input>
        </el-form-item>

        <el-form-item label="司机">
            <el-select v-model="form.did" placeholder="请选择司机" >
                <el-option v-for="item in driver"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="货车">
            <el-select v-model="form.carId" placeholder="请选择货车" >
                <el-option v-for="item in car"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="订单名称">
            <el-input v-model="form.name" placeholder="请输入订单名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit()">立即创建</el-button>
            <el-button type="info"  @click="closeDialog()">取消</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "AddPo",
    data() {
        return {
            form: {
            },
            operation: [],
            driver: [],
            car:[],
            goods: [],
            way: '',
            rules:{

            },
        };
    },
    mounted() {
        this.initOperation();
        this.initDriver();
        this.initCar();
    },
    methods: {
    initOperation() {
        this.getRequest("/order/po/operation").then((resp) => {
            if (resp) {
                this.operation = resp;
            }
        });
    },
    initDriver(){
        this.getRequest("/car/driver/info/?id=&name=&state=%E7%A9%BA%E9%97%B2").then((resp)=>{
            if(resp) {
                this.driver = resp.data;
            }
        })
    },
    initCar(){
        this.getRequest("/car/info/?name=&typeId=&stateId=1&locationId=&price=").then((resp)=>{
            if(resp) {
                this.car = resp.data;
            }
        })
    },
    initWay(){
        var oid = this.form.oid;
        console.log(oid)
        for(var o of this.operation){
            if(o.id==oid){
                this.way = o.o.name+o.origin;
                this.form.addressId = o.o.id;
                this.form.dAddress = o.origin;
                
            }
        }
    },
    onSubmit() {
        this.$refs["form"].validate((valid) => {
            if (valid) {
            this.$confirm("是否确认创建", {
                confirmButtonText: "是",
                cancelButtonText: "否",
                type: "warning",
            })
                .then(() => {
                this.postRequest("/order/po/", this.form).then((resp) => {
                    if (resp) {
                        this.form = {};
                        this.$emit('closeAddDialog',false);
                        this.initOperation();
                        this.initDriver();
                        this.initCar();
                    }
                });
                })
                .catch(() => {});
            }
        });
        },
        closeDialog(){
            this.$emit("closeAddDialog", false);
        }
    },
    
};
</script>
<style scoped>
</style>