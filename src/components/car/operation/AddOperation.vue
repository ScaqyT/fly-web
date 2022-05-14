<template>
    <div>
        <el-form class="main-form" :model="operation" ref="operationForm" :rules="rules" label-width="80px" :inline="false">
            <!-- 托运单 -->
            <template>
                <!-- 托运人选择 -->
                <el-form-item label="托运人" v-if="addS == false" prop="supplier">
                    <el-select v-model="operation.supplierId" placeholder="请选择托运人">
                        <el-option v-for="item in supplierList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" style="margin:0 0 0 20px;padding: 7px;" icon="el-icon-plus" @click="addSup" v-if="addS == false"></el-button>
                </el-form-item>
                <el-card class="box-card" v-else>
                    <el-form :model="supplier" ref="supplierForm" :rules="rules" label-width="80px" :inline="true">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="supplier.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="supplier.phone" placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="邮箱" prop="email">
                            <el-input v-model="supplier.mail"></el-input>
                        </el-form-item> -->
                        <el-form-item label="地址" prop="address">
                            <el-input v-model="supplier.address"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveSupplier">保存</el-button>
                            <el-button @click="closeSup">取消</el-button>
                        </el-form-item>
                    </el-form> 
                </el-card>
            </template>

            <hr/>
            <!-- 托运单 -->
            <template>
                <!-- 收货人选择 -->
                <el-form-item label="收货人" v-if="addC == false" prop="customer">
                    <el-select v-model="operation.customerId" placeholder="请选择收货人">
                        <el-option v-for="item in customerList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" style="margin:0 0 0 20px;padding: 7px;" icon="el-icon-plus" @click="addCus" v-if="addC == false"></el-button>
                </el-form-item>
                <el-card class="box-card" v-else >
                    <el-form :model="customer" ref="customerForm" :rules="rules" label-width="80px" :inline="true">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="customer.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" >
                            <el-input v-model.number="customer.phone" placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="邮箱" prop="email">
                            <el-input v-model="customer.mail"></el-input>
                        </el-form-item> -->
                        <el-form-item label="地址" prop="address">
                            <el-input v-model="customer.address"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveCustomer">保存</el-button>
                            <el-button @click="closeCus">取消</el-button>
                        </el-form-item>
                    </el-form> 
                </el-card>
            </template>
            <hr/>
            <el-form-item label="计费方式" prop="chargeMode">
                <el-select v-model="operation.chargeMode">
                    <el-option v-for="item in chargeModeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="起始地">
                <el-col :span="7">
                    <el-form-item prop="addressId">
                        <el-cascader :options="addressList" v-model="operation.originId"
                            :props="{ expandTrigger: 'hover', value:'id' , label:'name'}" @change="changeOrigin">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="1" >—</el-col>
                <el-col :span="16">
                    <el-form-item prop="address">
                        <el-input v-model="operation.origin" placeholder="请输入详细地址"></el-input>                        
                    </el-form-item>
                </el-col> 
            </el-form-item>
            <el-form-item label="目的地">
                <el-col :span="7">
                    <el-form-item prop="addressId">
                        <el-cascader :options="addressList" v-model="operation.destinationId"
                            :props="{ expandTrigger: 'hover', value:'id' , label:'name'}" @change="changeDestination">
                        </el-cascader>                       
                    </el-form-item>
                </el-col>
                <el-col :span="1" >—</el-col>
                <el-col :span="16">
                    <el-form-item prop="address">
                        <el-input v-model="operation.destination" placeholder="请输入详细地址"></el-input>                        
                    </el-form-item>
                </el-col> 
            </el-form-item>
            <el-form-item label="费用" required>
                <el-col :span="8">
                    <el-form-item prop="cost">
                        <el-input v-model.number="operation.qmoney" placeholder="请输入取货费" style="width:90%">
                            <template slot="prepend">取货费</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="cost">
                        <el-input v-model.number="operation.smoney" placeholder="请输入送货费" style="width:90%">
                            <template slot="prepend">送货费</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="cost">
                        <el-input v-model.number="operation.ymoney" placeholder="请输入托运费" style="width:90%">
                            <template slot="prepend">托运费</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            
            <template>
                    <el-card shadow="hover" width="100%">
                        <el-table :data="goodsList" border stripe>
                            <el-table-column
                                prop="name"
                                label="货物名称"
                                >
                            </el-table-column>
                            <el-table-column
                                prop="type"
                                label="类型"
                                >
                                >
                                <template slot-scope="scope">
                                    {{typeStr(scope.row.type)}}
                                </template>
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
                            <el-table-column
                            align="center"
                                >
                                <template slot="header">
                                    <el-button type="primary" icon="el-icon-plus" style="padding:3px" @click="addGoodsDialog = true"></el-button>
                                </template>
                                <template slot-scope="scope">
                                    <el-button type="danger" icon="el-icon-minus" style="padding:3px" @click="removeGoods(scope.$index,goodsList)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>           
            </template>

            <!-- 货物 -->
            <el-form-item style="text-align:center;margin: 20px" >
                <el-button type="primary" @click="onSubmit()">立即创建</el-button>
                <el-button @click="close">取消</el-button>
            </el-form-item>
        </el-form>


        <el-dialog
            title="添加货物"
            :visible.sync="addGoodsDialog"
            width="30%"
            append-to-body
            >
            <span>
                <el-form :model="goods" ref="goodsForm" :rules="rules" label-width="80px" size="normal">
                    <el-form-item label="货物名称" prop="name">
                        <el-input v-model="goods.name"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="quantity">
                        <el-input v-model.number="goods.quantity"></el-input>
                    </el-form-item>
                    <el-form-item label="货物类型" prop="type">
                        <el-cascader :options="goodstype" v-model="goods.type" placeholder="请选择货物类型"
                            :props="{ expandTrigger: 'hover' , value: 'id' , label: 'name' }" @visible-change="getgoodstype">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="单个质量" prop="weight"> 
                        <el-input v-model.number="goods.weight"></el-input>
                    </el-form-item>
                    <el-form-item label="单个体积" prop="volume">
                        <el-input v-model.number="goods.volume"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="goods.remark"></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer">
                <el-button @click="addGoodsDialog = false">取消</el-button>
                <el-button type="primary" @click="addGoods(goods)">添加</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
    name: 'AddOperation',
    data () {
        return {
            //总数据表
            operation:{},
            goods:{},
            goodsList:[],
            map:{
                "operation": {},
                "goodsList": [],
            },
            supplier: {},
            supplierList:[],
            customer: {},
            customerList:[],
            chargeModeList:[],
            addressList:[],
            goodstype:[],
            
            //添加货物对话框
            addGoodsDialog: false,
            //托运人添加选择按钮
            addS: false,
            //收货人添加选择按钮
            addC: false,

            rules:{
                name:[
                    { require:true,message:'姓名不能为空',trigger:'blur'},
                    { min:3,message:'太短啦',trigger:['blur','change']},
                    { max:16,message:'太长啦',trigger:['blur','change']},
                ],
                phone:[
                    { require:true,message:'联系电话不能为空',trigger:'blur'},
                    { min:11,max:11,message:'格式错误',trigger:['blur','change']},
                ],
                address:[
                    { require:true,message:'地址不能为空',trigger:'blur'},
                    { max:24,message:'太长啦',trigger:['blur','change']},
                ],
                email:[
                    { require:true,message:'邮箱不能为空',trigger:'blur'},
                    { type: 'email',message:'请输入正确的邮箱',trigger:['blur']},
                ],
                quantity:[
                    {type:'number',message:'请输入数字',trigger:'blur'},
                ],
                weight:[
                    {type:'number',message:'请输入数字',trigger:'blur'},
                ],
                volume:[
                    {type:'number',message:'请输入数字',trigger:'blur'},
                ],
                cost:[
                    {type:'number',message:'请输入数字',trigger:['blur','change']},
                    {require:true,message:'费用不能为空',trigger:'blur'},
                ],
                address:[
                    {require:true,message:'详细地址不能为空',trigger:'blur'},
                    {max:24,message:'太长啦',trigger:'blur'},
                ],
            }
        };
    },
    mounted(){
        this.initsupplierList();
        this.initcustomerList();
        this.initchargeModeList();
        this.initaddressList();
    },
    methods:{
        changeOrigin(){
            this.operation.originId = this.operation.originId.pop();
        },
        changeDestination(){
            this.operation.destinationId = this.operation.destinationId.pop();
        },
        onSubmit(){
            
            this.map['operation'] = this.operation;
            this.map['goodsList'] = this.goodsList;
            this.postRequest('/car/operation/',this.map).then(resp=>{
                if(resp){
                    this.$emit('closeAddDialog');
                }
            })
            
        },

        //删除货物
        removeGoods(index,rows){
            rows.splice(index,1);
        },
        addGoods(data){
            this.$refs['goodsForm'].validate((valid)=>{
                if(valid){
                    data.type = data.type.pop();
                    this.goodsList.push(data);
                    this.addGoodsDialog = false;
                    this.goods = {};
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                }
            })
            
        },

        initsupplierList(){
            this.getRequest('/supplier/info/').then(resp=>{
                if(resp){
                    this.supplierList = resp;
                }
            })
        }, 
        initcustomerList(){
            this.getRequest('/customer/info/').then(resp=>{
                if(resp){
                    this.customerList = resp;
                }
            })
        }, 
        initchargeModeList(){
            this.getRequest('/car/operation/chargemode').then(resp=>{
                if(resp){
                    this.chargeModeList = resp;
                }
            })
        }, 
        initaddressList(){
            this.getRequest('/car/operation/address').then(resp=>{
                if(resp){
                    this.addressList = resp;
                }
            })
        },
        getgoodstype(){
            this.getRequest('/warehouse/g/info/goodstype').then(resp=>{
                if(resp){
                    this.goodstype = resp;
                }
            })
        },

        //货物类型显示
        typeStr(data){
            let goodstype = this.goodstype;
            for(var item of goodstype){
                let children = item.children;
                for(let type of children){
                    if(type.id === data){
                        return type.name;
                    }
                }
            }
            return '不存在';
        },

        saveSupplier(){
            this.$refs['supplierForm'].validate((valid)=>{
                if(valid){
                    this.operation.supplier = this.supplier;
                    console.log(this.operation.supplier)
                    console.log(this.operation.supplierId)
                }
            })
            
        },
        saveCustomer(){
            this.$refs['customerForm'].validate((valid)=>{
                if(valid){
                    this.operation.customer = this.customer;
                    console.log(this.operation.customer)
                    console.log(this.operation.customerId)
                }
            })
            
        },

        addSup(){
            this.addS = true;
            this.operation.supplierId = null;
        },
        closeSup(){
            this.addS = false;
            this.operation.supplier = null;
        },
        addCus(){
            this.addC = true;
            this.operation.customerId = null;
        },
        closeCus(){
            this.addC = false;
            this.operation.customer = null;
        },

        close(){
            this.$emit('closeAddDialog');
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
 }
</script>
<style scoped>
    .box-card{
        width: 100%;
    }
</style>