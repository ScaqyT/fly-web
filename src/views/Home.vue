<template>
  <div class="homeContainer">
    <el-container>
      <!-- Aside content -->
      <el-aside width="300px">
          <el-menu router unique-opened>
            <template v-for="(item, index) in routes">
              <el-menu-item :index="item.path" :key="index" v-if="item.children == null" @click="panes = []">
                <i :class="item.iconCls"></i>
                <span>{{ item.name }}</span>
              </el-menu-item>
              
              <el-submenu :index="index + ''" :key="index" v-if="item.children != null">
                <template slot="title">
                  <i :class="item.iconCls"></i>
                  <span>{{ item.name }}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    :index="children.path"
                    v-for="(children, indexj) in item.children"
                    :key="indexj"
                    @click="addTab(children.name, children.path)"
                    >{{ children.name }}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>
      <el-container>
        <el-header class="homeHeader" height="80px">
          <!-- Header content -->
          <h1 class="title">飞翔物流管理系统</h1>
          <div class="user">
            <span>您好，</span>
            <span>{{user.name}}</span>
          </div>
          <el-button class="logoutBt" type="danger" size="default" @click="logout">登出</el-button>
          
        </el-header>
        <el-main>
          <!-- Main Context -->
          <template v-if="this.panes.length>0">
            <el-tabs
              v-model="editableTabValue"
              type="card"
              closable
              tab-position="top"
              @tab-click="clickTab"
              @tab-remove="removeTab"
            >
              <el-tab-pane v-for="item in panes"
                :key="item.name"
                :label="item.label"
                :name="item.name"
                v-loading="loading"
              >
              <router-view></router-view>
              </el-tab-pane>
            </el-tabs>
          </template>
          <template v-else>
            <HomeContext></HomeContext>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import qs from 'qs';
import HomeContext from '../components/HomeContext';


export default {
  components: {
    HomeContext
  },
  name: "Home",
  data() {
    return {
      editableTabValue: "",
      panes: [],
      tabIndex: "",
      loading: false,
      user:{},
    };
  },
  mounted(){
    this.getAdminInfo();
  },
  methods: {
    flushPanes(){
      this.panes=[];
    },
    clickTab(target) {
      this.$router.push(target);
      this.loading = true;
      var that = this;
      setTimeout(() => {
        that.loading = false;
      }, 500);
    },
    addTab(targetName,targetPath) {
      let tabIndex = targetName;
      let num = 0;
      for (let pane of this.panes) {
        if (pane.name == targetName) {
          num++;
        }
      }
      if (num == 0) {
        this.panes.push({
          name: targetName,
          label: targetName,
          path: targetPath
        });
      }
      this.editableTabValue = tabIndex;
      num = 0;
      this.loading = true;
      var that = this;
      setTimeout(() => {
        that.loading = false;
      }, 500);
    },
    removeTab(targetName) {
        let tabs = this.panes;
        let activeName = this.editableTabValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                this.$router.push(nextTab.path)
              }
            }
          });
        }
        this.editableTabValue = activeName;
        this.panes = tabs.filter(tab => tab.name !== targetName);
        if(this.panes.length==0){
          this.$router.push('/home');
        }
      },
      logout(){
        this.$confirm('是否退出登录', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.getRequest('/logout').then(resp=>{
            if(resp){
              window.sessionStorage.removeItem('tokenStr');
              this.$store.commit('initRoutes','');
              this.$router.replace('/');
            }
          })
        }).catch(() => {
          this.$message({
            message: '已取消登出',
            type: 'info'
          });
        });
      },
      getAdminInfo(){
        let user = window.sessionStorage.getItem('user');
        let user2 =  JSON.parse(user);
        this.user = user2;
      }
  },
  computed: {
    routes() {
      return this.$store.state.routes;
    },
  }
};
</script>
<style scoped>
.homeHeader {
  border-bottom: 1px solid #409EFF;
}
.homeHeader .user{
  margin: 10px;
  /* align-items: center; */
  position: fixed;
  right: 100px;
  top: 20px;
}
.title {
  float: left;
  margin: 20px 0 0 0;
  font-size: 30px;
  font-family: 'FangSong';
}
.logoutBt {
  float: right;
  margin: 20px 0 0 0;
}
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>