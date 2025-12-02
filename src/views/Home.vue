<template>
  <div class="home">
    <!-- 背景图片 -->
    <div class="background"></div>

    <!-- 头像和信息 -->
    <div class="profile-card">
      <el-avatar
        :size="100"
        :src="user.photo"
        shape="circle"
        fit="cover"
        :class="{ 'is-loading': loadingProfile }"
        @click="dialogVisible = true"
      />
      <h2>{{ user.name }}</h2>
      <p>年龄: {{ user.age }}</p>
      <p>{{ user.details }}</p>
    </div>

    <!-- 编辑信息的弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑个人信息" width="420px">
      <el-form
        ref="profileForm"
        :model="user"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="头像">
          <!-- 上传头像（需要后端支持） -->
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/upload" 
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
          >
            <el-button type="primary">上传头像</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model.trim="user.name" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model.number="user.age" type="number" />
        </el-form-item>
        <el-form-item label="详细信息">
          <el-input v-model.trim="user.details" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="saveInfo">
          保存
        </el-button>
      </template>
    </el-dialog>

    <!-- 搜索框 -->
    <div class="search-box">
      <el-input
        v-model.trim="searchQuery"
        placeholder="搜索本站或外网..."
        clearable
      >
        <template #append>
          <el-button
            type="primary"
            :disabled="isSearchDisabled"
            @click="doSearch"
          >
            搜索
          </el-button>
        </template>
      </el-input>
    </div>

    <!-- 三个按钮 -->
    <div class="button-group">
  <el-button type="success" round @click="$router.push('/study')">学习资料库</el-button>
  <el-button type="warning" round @click="$router.push('/entertainment')">娱乐</el-button>
  <el-button type="info" round @click="$router.push('/profile')">个人中心</el-button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  name: "Home",
  data() {
    return {
      dialogVisible: false,
      loadingProfile: false,
      saving: false,
      user: {
        photo: "https://picsum.photos/200", // 默认头像
        name: "Azher",
        age: 25,
        details: "这里是个人简介，可以写兴趣爱好、职业等信息"
      },
      searchQuery: "",
      formRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          {
            type: "number",
            min: 1,
            max: 120,
            message: "年龄需在 1-120 岁之间",
            trigger: "blur"
          }
        ],
        details: [
          { required: true, message: "请输入详细信息", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    isSearchDisabled() {
      return !this.searchQuery;
    }
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    handleAvatarSuccess(response) {
      if (response && response.url) {
        this.user.photo = response.url;
        ElMessage.success("头像更新成功");
      } else {
        ElMessage.warning("后端未返回头像地址");
      }
    },
    handleAvatarError() {
      ElMessage.error("上传失败，请稍后重试");
    },
    async fetchUserProfile() {
      this.loadingProfile = true;
      try {
        // TODO: 替换为真实 API 调用
        const remoteUser = await this.mockFetchUser();
        this.user = { ...this.user, ...remoteUser };
      } catch (error) {
        console.error("获取用户信息失败:", error);
        ElMessage.error("获取用户信息失败");
      } finally {
        this.loadingProfile = false;
      }
    },
    mockFetchUser() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            name: "Azher",
            age: 25,
            details: "热爱编程与设计，正在搭建个人博客",
            photo: "https://picsum.photos/200?grayscale"
          });
        }, 600);
      });
    },
    saveInfo() {
      this.$refs.profileForm.validate(async (valid) => {
        if (!valid) return;
        this.saving = true;
        try {
          // TODO: 调用后端 API 保存数据
          console.log("保存用户信息:", this.user);
          ElMessage.success("保存成功（示例）");
          this.dialogVisible = false;
        } catch (error) {
          console.error("保存失败:", error);
          ElMessage.error("保存失败，请稍后再试");
        } finally {
          this.saving = false;
        }
      });
    },
    doSearch() {
      const query = this.searchQuery;
      if (!query) {
        ElMessage.warning("请输入搜索关键字");
        return;
      }
      window.open(`https://www.baidu.com/s?wd=${encodeURIComponent(query)}`, "_blank");
    },
    goToSection(section) {
      // TODO: 连接路由或锚点
      console.log(`跳转到板块: ${section}`);
      ElMessage.info("该模块将在后端准备好后开放");
    }
  }
};
</script>

<style scoped>
.home {
  position: relative;
  height: 100vh;
  color: #fff;
  text-align: center;
  padding: 20px 16px 40px;
  overflow-y: auto;
}

/* 背景图片 */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/bg.jpg') no-repeat center center;
  background-size: cover;
  filter: brightness(0.7);
  z-index: -1;
}

/* 头像卡片 */
.profile-card {
  margin: 60px auto 0;
  padding: 24px;
  width: min(90%, 420px);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  transition: box-shadow 0.2s;
}

.profile-card.is-loading {
  opacity: 0.6;
}

/* 搜索框 */
.search-box {
  margin: 30px auto;
  width: min(90%, 420px);
}

/* 按钮组 */
.button-group {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

@media (max-width: 600px) {
  .home {
    padding-top: 40px;
  }

  .profile-card {
    margin-top: 20px;
  }
}
</style>
