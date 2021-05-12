<template>
  <ArrayList ref="arrayList" v-model="array"></ArrayList>
</template>

<script setup lang="ts">
import { ArrayList } from '@/components';
import { onMounted, reactive, ref, useContext } from '@vue/runtime-core';
import { IArrayList } from '@/components/ArrayList/index.d';
const arrayList = ref<IArrayList | undefined>(undefined);

let array = reactive([11, 13, 7, 12, 16, 9, 24, 5, 10, 3]);

onMounted(async () => {
  const arrayListRef = arrayList.value;

  // arrayListRef.insert(2);
  // arrayListRef.insert(1);
  // arrayListRef.pop();

  // arrayListRef.quickSort();
  await arrayListRef?.insertionSort();
  console.log('done');

  // await arrayListRef.quickSort();
  // console.log('done');
  useContext().expose({
    ArrayList,
  });
});
</script>

<style></style>
