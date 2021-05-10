<template>
  <ArrayList ref="arrayList" v-model="array"></ArrayList>
  <ArrayList action> </ArrayList>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from '@vue/runtime-core';
import { ArrayList } from '@/components';
import { IArrayList } from '@/components/ArrayList/index';
const arrayList = ref<IArrayList>({});

let array = reactive([11, 13, 7, 12, 16, 9, 24, 5, 10, 3]);

onMounted(async () => {
  const arrayListRef = arrayList.value;

  // arrayListRef.insert(2);
  // arrayListRef.insert(1);
  // arrayListRef.pop();

  // arrayListRef.quickSort();
  // console.log(arrayListRef.bubbleSort);
  await arrayListRef.mergeSort();
  console.log('done');

  // await arrayListRef.quickSort();
  // console.log('done');
});
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
  background-color: #58b2dc;
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
  background-color: #58b2dc;
  vertical-align: middle;

  color: #fff;
  font-weight: 500;
  font-size: 26px;
}
</style>
