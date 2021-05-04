<template>
  <div class="va-array-list">
      <transition-group name="list" tag="div" class="array-list">
        <div class="array-list-item" v-for="item in list" :key="item">
          <div>{{item}}</div>
        </div>
      </transition-group>
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

const selectionSort = stepInterval(async() => {
  let i, j, k, t;
  for (i = 0; i < list.length; i++) {
    for (j = k = i; j < list.length; j++) {
      if ( Number(list[j]) < Number(list[k]) ) {
        k = j;
      }
    }
    await sleep();
    t = list[i];
    list[i] = list[k];
    list[k] = t;
  }
}, props.actionDelay);


async function partition(l: number, h: number) {
  let i = l;
  let j = h;
  let pirot = list[l];

  console.log('partition', l, h);

  let t;
  do {
    do { i++; } while (Number(list[i]) <= Number(pirot));
    do { j--; } while (Number(list[j]) > Number(pirot));
    if (i < j) {
      t = list[i];
      list[i] = list[j];
      list[j] = t;
      await sleep();
    }
  } while (i < j);

  t = list[l];
  list[l] = list[j];
  list[j] = t;
  await sleep();

  return j;
}

const quickSort = stepInterval(async function quickSort(l: number = 0, h: number = list.length) {
  console.log('_quickSort', l, h);
  let j;
  if (l < h) {
    j = await partition(l,h);
    quickSort(l, j);
    quickSort(j+1, h);
  }
}, props.actionDelay);


useContext().expose({
  insert,
  pop,
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort
})
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.va-array-list {
}

.array-list {
  height: 100px;
  display: flex;
  overflow-x: scroll;
  padding-top: 40px;
  @include phone {
    flex-direction: column;
    height: 100vh;
    align-items: center;
  }
}



.array-list-item {
  display: inline-block;
  width: 60px;
  height: 60px;
  line-height: 60px;
  margin: 1px;
  background-color: #58b2dc;
  transition: all 0.8s ease;

}

.array-list-item div {
  color: #fff;
  font-size: 24px;
  font-weight: 500;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.8s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  background-color: #999;

  transform: translateY(-30px);
}
</style>
