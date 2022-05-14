<template>
   <div>
  <el-tabs v-model="activeName">
    <el-tab-pane label="用户管理" name="frist"><ADMana></ADMana></el-tab-pane>
    <el-tab-pane label="角色管理" name="ARMana"><ARMana></ARMana></el-tab-pane>
  </el-tabs>
     
   </div>
</template>

<script>
import ARMana from '../../components/admin/ARMana';
import ADMana from '../../components/admin/ADMana';

export default {
   name: 'AdminRole',
   data () {
    return {
      activeName: 'ARMana'
    }
   },
    methods:{},
    components: {
      ARMana,
      ADMana,

    }
 }
</script>
<style scoped>

</style>