<template>
  <div class="va-array-list">
    <div class="array-list">
      <div class="array-list-item" v-for="(item, index) in list" :key="index">
        <div>{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
</script>
<script name="ArrayList" setup lang="ts">
import { defineEmit, defineProps, reactive, ref, useContext, watchEffect } from "@vue/runtime-core";
import {sleep, stepInterval} from '@/common/utils';

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return []
    }
  },
  actionDelay: {
    type: Number,
    default: 1
  }
})
const emit = defineEmit();

const list = reactive(props.modelValue || []);

const insert = stepInterval((data: number) => {
   list.push(data);
   emit('insert', data);
}, props.actionDelay)

const remove = stepInterval((data: number) => {
   list.push(data);
}, props.actionDelay)

const push = stepInterval((data: number) => {
   list.push(data);
}, props.actionDelay)

const pop = stepInterval(() => {
   list.pop();
}, props.actionDelay);

const bubbleSort = stepInterval(async() => {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - i - 1; j++) {
      if (Number(list[j]) > Number(list[j+1])) {
        await sleep();
        let t = list[j];
        list[j] = list[j+1];
        list[j+1] = t;
      }
    }
  }
}, props.actionDelay);

const insertionSort = stepInterval(async() => {
  for (let i = 1; i < list.length; i++) {
    let j = i - 1;
    let x = Number(list[i]);
    await sleep();
    while (j > -1 && Number(list[j]) > x) {
      await sleep();
      list[j+1] = list[j];
      j--;
    }
    list[j+1] = x;
  }
}, props.actionDelay);



useContext().expose({
  insert,
  pop,
  bubbleSort,
  insertionSort
})
</script>

<style scoped>
.va-array-list {
}

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
  color: #fff;
  font-size: 24px;
  font-weight: 500;
}
</style>
