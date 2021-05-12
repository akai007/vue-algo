<template>
  <div class="layout__title">{{ $route.meta.title }}</div>
  <router-view></router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.layout__title {
  font-size: 1.6rem;
}
</style>
