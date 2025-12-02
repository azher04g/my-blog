<template>
  <div id="app">
    <header class="site-header">
      <h1>欢迎来到 AZHER 的博客网站 🎉</h1>
    </header>

    <main class="site-content">
      <!-- 路由出口：这里会显示不同的页面 -->
      <router-view />
    </main>
    
    <footer class="site-footer">
      <p>© 2025 Azher Blog. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
.site-header {
  text-align: center;
  padding: 24px 12px;
  color: #5217523b;
  text-shadow: 0 2px 8px rgba(57, 41, 129, 0.582);
}

.site-content {
  min-height: calc(100vh - 120px);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>