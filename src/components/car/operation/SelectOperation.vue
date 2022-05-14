<template>
    <div class="conditionBox">
        <div class="mask"></div>
        <el-form class="main-form" label-position="right" label-width="120px" :inline="false">
            <!-- 托运单 -->
            <el-card shadow="hover" width="100%">
                <el-col :span="12" >
                    <template>
                        <!-- 托运人 -->
                        <el-form-item label="托运人" >
                            <el-input v-model="operation.supplier.name" style="width:70%"></el-input>
                        </el-form-item>
                    </template>
                </el-col>
                <el-col :span="12" >
                    <template>
                        <!-- 收货人 -->
                        <el-form-item label="收货人">
                            <el-input v-model="operation.customer.name"></el-input>
                        </el-form-item>
                    </template>
                </el-col>
            </el-card>
            <el-card el-card shadow="hover" width="100%" style="margin: 15px 0;">
                <el-col :span="12" >
                    <template>
                        <!-- 托运人 -->
                        <el-form-item label="提货单司机">
                            <el-input v-model="poList.driver.name" placeholder="未分配单"></el-input>
                        </el-form-item>
                    </template>
                </el-col>
                <el-col :span="12" >
                    <template>
                        <!-- 收货人 -->
                        <el-form-item label="送货单司机">
                            <el-input v-model="orderList.driver.name"></el-input>
                        </el-form-item>
                    </template>
                </el-col>
            </el-card>
            <el-form-item label="计费" >
                <el-input v-model="operation.c.name" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="起始地">
                <el-col :span="7">
                    <el-form-item >
                        <el-input v-model="operation.o.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" >—</el-col>
                <el-col :span="16">
                    <el-form-item prop="address">  
                        <el-input v-model="operation.origin"></el-input>                
                    </el-form-item>
                </el-col> 
            </el-form-item>
            <el-form-item label="目的地">
                <el-col :span="7">
                    <el-form-item prop="addressId">
                        <el-input v-model="operation.d.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1" >—</el-col>
                <el-col :span="16">
                    <el-form-item prop="address">        
                        <el-input v-model="operation.destination"></el-input>                 
                    </el-form-item>
                </el-col> 
            </el-form-item>
            <el-col :span="8">
                <el-form-item prop="cost" label="取货费">
                    <el-input v-model="operation.qmoney"></el-input>     
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item prop="cost" label="送货费">
                    <el-input v-model="operation.smoney"></el-input>     
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item prop="cost" label="托运费">
                    <el-input v-model="operation.ymoney"></el-input>     
                </el-form-item>
            </el-col>
            
            <template>
                    <el-card shadow="hover" width="100%">
                        <el-table :data="goodsList" border stripe>
                            <el-table-column
                                prop="name"
                                label="货物名称"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="goodsType.name"
                                label="类型"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="quantity"
                                label="数量"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="weight"
                                label="重量"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="volume"
                                label="体积"
                                >
                            </el-table-column>
                        </el-table>
                    </el-card>           
            </template>

        </el-form>

    </div>
</template>

<script>
export default {
    name: 'SelectOperation',
    props:['index'],
    data () {
        return {
            operation:{},
            goodsList:[],
            poList:{
                driver:{
                    name: ''
                }
            },
            orderList:{
                driver:{
                    name: ''
                }
            },
            rules:{},
        };
    },
    watch:{
        index:function(){
            this.initOperation();
            this.initGoodsList();
            this.initPo();
            this.initOrder();
        }
    },
    mounted(){
        this.initOperation();
        this.initGoodsList();
        this.initPo();
        this.initOrder();
    },
    methods:{
        initOperation(){
            this.getRequest('/car/operation/').then(resp=>{
                if(resp){
                    var that = this;
                    let list = resp.filter(function(array){
                        return array.id === that.index;
                    })
                    this.operation = list[0];
                }

            })
        },
        initGoodsList(){
            this.getRequest('/car/operation/goods?oid='+this.index).then(resp=>{
                if(resp){
                    this.goodsList = resp;
                }
            })
        },
        initPo(){
            this.getRequest('/order/po/?orderId=&orderState=&oid='+this.index).then(resp=>{
                if(resp.length>0){
                    this.poList = resp[0];
                    
                }
            })
        },
        initOrder(){
            this.getRequest('/order/o/?orderId=&orderState=&oid='+this.index).then(resp=>{
                console.log(resp.length)
                if(resp.length>0){
                    this.orderList = resp[0];
                }
            })
        },



        close(){
            this.$emit('closeAddDialog');
        },
    }
 }
</script>
<style scoped>
    .box-card{
        width: 100%;
    }
    .conditionBox{
    /* position: relative; */
    display: flex;
    /* margin-bottom: 10px;
    align-items: center; */
    }
    .mask{
        position:absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
</style>