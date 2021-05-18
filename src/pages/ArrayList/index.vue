<template>
  <ArrayList ref="arrayList" v-model="array"></ArrayList>
  <button class="array-list__action" @click="reset()">reset</button>
  <button class="array-list__action" @click="arrayList?.insertionSort()">insertion<br />sort</button>
  <button class="array-list__action" @click="arrayList?.selectionSort()">selection<br />sort</button>
  <button class="array-list__action" @click="arrayList?.bubbleSort()">bubble<br />sort</button>
  <button class="array-list__action" @click="arrayList?.quickSort()">quick<br />sort</button>
  <button class="array-list__action" @click="arrayList?.mergeSort()">merge<br />sort</button>
</template>

<script setup lang="ts">
import { ArrayList } from '@/components';
import { onMounted, reactive, ref, useContext } from '@vue/runtime-core';
import { IArrayList } from '@/components/ArrayList/index.d';
const arrayList = ref<IArrayList | undefined>(undefined);

// const initValue = [11, 13, 7, 12, 16, 9, 24, 5, 10, 3];
const initValue = [237, 146, 259, 348, 152, 163, 235, 48, 36, 62];

let array = reactive([...initValue]);

const reset = function () {
  array = [...initValue];
};

onMounted(async () => {
  const arrayListRef = arrayList.value;

  arrayListRef?.radixSort();
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
