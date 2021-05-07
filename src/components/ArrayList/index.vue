<template>
  <div class="va-array-list">
    {{ actives }}
    <transition-group name="list" tag="div" class="array-list">
      <div
        v-for="item in list"
        :key="item"
        class="array-list-item"
        :class="{
          'is-active-first': actives[0] == item,
          'is-active-second': actives[1] == item,
        }"
      >
        <div>{{ item }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts"></script>
<script name="ArrayList" setup lang="ts">
import { defineEmit, defineProps, reactive, ref, useContext } from '@vue/runtime-core';
import { sleep, stepInterval } from '@/common/utils';

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return [];
    },
  },
  actionDelay: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmit();

const list = reactive(props.modelValue as number[]);

let actives = reactive([] as number[]);

const addActives = function (...items: any[]) {
  actives.push(...items);
  setTimeout(() => {
    // TODO ready to optimize
    clearActives();
  }, 1000);
};

const clearActives = function () {
  actives.length = 0;
};

const insert = stepInterval((data: number) => {
  list.push(data);
  emit('insert', data);
}, props.actionDelay);

const remove = stepInterval((data: number) => {
  list.push(data);
}, props.actionDelay);

const push = stepInterval((data: number) => {
  list.push(data);
}, props.actionDelay);

const pop = stepInterval(() => {
  list.pop();
}, props.actionDelay);

const update = async (index: number, x: number) => {
  await sleep();
  addActives(list[index]);
  list[index] = x;
};

const swap = async (x: number, y: number) => {
  await sleep();
  addActives(list[x], list[y]);
  let t = list[x];
  list[x] = list[y];
  list[y] = t;
};

const bubbleSort = async () => {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - i - 1; j++) {
      if (list[j] > list[j + 1]) {
        await swap(j, j + 1);
      }
    }
  }
};

const insertionSort = async () => {
  for (let i = 1; i < list.length; i++) {
    let j = i - 1;
    let x = list[i];
    await sleep();
    while (j > -1 && list[j] > x) {
      await sleep();
      list[j + 1] = list[j];
      j--;
    }
    list[j + 1] = x;
  }
};

const selectionSort = async () => {
  let i, j, k, t;
  for (i = 0; i < list.length; i++) {
    for (j = k = i; j < list.length; j++) {
      if (list[j] < list[k]) {
        k = j;
      }
    }
    await swap(i, k);
  }
};

async function partition(l: number, h: number) {
  let i = l;
  let j = h;
  let pirot = list[l];

  let t;
  do {
    do {
      i++;
    } while (list[i] <= pirot);
    do {
      j--;
    } while (list[j] > pirot);
    if (i < j) {
      await swap(i, j);
    }
  } while (i < j);
  await swap(l, j);

  return j;
}

const quickSort = async function quickSort(l: number = 0, h: number = list.length) {
  let j;
  if (l < h) {
    j = await partition(l, h);
    await quickSort(l, j);
    await quickSort(j + 1, h);
  }
};

const mergeSort = async function mergeSort() {};

useContext().expose({
  insert,
  pop,
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
});
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

.va-array-list {
}

.array-list {
  height: 100px;
  display: flex;
  overflow-x: scroll;
  padding: 40px 0;
  justify-content: center;
  @include phone {
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 0 40px;
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
  transition: all 0.8s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move.is-active-first {
  background-color: #999;
  transform: translateY(-30px);
  @include phone {
    transform: translateX(-30px);
  }
}
.list-move.is-active-second {
  background-color: #999;
  transform: translateY(30px);
  @include phone {
    transform: translateX(30px);
  }
}
</style>
