<template>
  <ArrayList ref="arrayList" v-model="array"></ArrayList>

  <button class="array-list__action" @click="reset()">reset</button>
  <button class="array-list__action" @click="arrayList.insertionSort()">insertion<br />sort</button>
  <button class="array-list__action" @click="arrayList.selectionSort()">selection<br />sort</button>
  <button class="array-list__action" @click="arrayList.bubbleSort()">bubble<br />sort</button>
  <button class="array-list__action" @click="arrayList.quickSort()">quick<br />sort</button>
  <button class="array-list__action" @click="arrayList.mergeSort()">merge<br />sort</button>
</template>

<script setup lang="ts">
import { ArrayList } from '@/components';
import { onMounted, ref } from '@vue/runtime-core';
import type { IArrayList } from '@/components/ArrayList/index.d';
import { SortStatusEnum } from '@/components/ArrayList/index.d';
const arrayList = ref({} as IArrayList);

const initValue = [11, 13, 7, 12, 16, 9, 24, 5, 10, 3];
// const initValue = [237, 146, 259, 348, 152, 163, 235, 48, 36, 62];

let array = ref([...initValue]);

const reset = function () {
  console.log('reset');
  array.value = [...initValue];
};

onMounted(async () => {
  const arrayListRef = arrayList.value;

  for (const item in arrayListRef) {
    console.log(item);
  }

  // arrayListRef.radixSort();
  console.log('done');

  ArrayList;
});
</script>

<style lang="scss">
.array-list__action {
  position: relative;
  display: inline-block;
  width: 4rem;
  height: 4rem;
  text-align: center;
  border-radius: 100%;

  font-size: 0.8rem;

  margin-left: 10px;
  &:hover {
    border-radius: 100%;
  }
  &:focus {
    outline: none;
  }
}
</style>
