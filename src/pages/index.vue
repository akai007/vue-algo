<template>
  <div class="array-list">
    <div class="array-list-item" v-for="item in array" :key="item">
      {{item}}
    </div>
  </div>
</template>

<script setup lang="ts">
  const array = [2, 3, 5, 7, 11, 13];

</script>

<style>
  .array-list {
    height: 100px;
    display: flex;
  }

  .array-list-item {
    width: 60px;
    height: 60px;
    background-color: #58B2DC;
    vertical-align: middle;
  }
</style>
