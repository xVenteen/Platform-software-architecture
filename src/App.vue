<script setup>

import { ElConfigProvider } from "element-plus"
import zhCn from "element-plus/lib/locale/lang/zh-cn"
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

.el-message {
  top: 20px !important;
}
</style>
