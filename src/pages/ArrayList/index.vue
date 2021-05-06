<template>
  <div >{{title}}</div>
  <ArrayList ref="arrayList" v-model="array" ></ArrayList>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { ArrayList } from "@/components";

const title = 'ArrayList';
const arrayList = ref(null);

let array = reactive([11,13,7,12,16,9,24,5,10,3]);

onMounted(() => {
  const arrayListRef = arrayList.value as ArrayList;
  
  // arrayListRef.insert(2);
  // arrayListRef.insert(1);
  // arrayListRef.pop();

  // arrayListRef.quickSort();

  // array = [11, 7, 5, 3];
  arrayListRef.bubbleSort();

})

</script>

<style>
  .array-list {
    height: 100px;
    display: flex;
    overflow-x: scroll;
  }

  .array-list-item {
    width: 60px;
    
    height: 60px;
    line-height: 60px;
    margin: 1px;
    background-color: #58B2DC;
    vertical-align: middle;

  }

  .array-list-item div {
    width: 60px;
  }

  .array-list2 {
    height: 100px;
    display: flex;
    overflow-x: scroll;
  }

  .array-list-item2 {
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin: 1px;
    background-color: #58B2DC;
    vertical-align: middle;

    color: #FFF;
    font-weight: 500;
    font-size: 26px;
  }
</style>
