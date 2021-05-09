<template>
  {{ actives }}
  <div class="va-array-list">
    <Cursors :modelValue="cursors" :itemRefs="itemRefs">
      <transition-group name="list" tag="div" class="array-list">
        <div
          v-for="(item, index) in list"
          :key="item"
          class="array-list-item"
          :class="[
            actives.first.includes(item) ? 'is-active-first' : '',
            actives.second.includes(item) ? 'is-active-second' : '',
            sorted.includes(index) ? 'is-sorted' : '',
          ]"
          :ref="(el) => itemRefs.set(index, el)"
        >
          <div>{{ item }}</div>
        </div>
      </transition-group>
    </Cursors>
  </div>
</template>

<script lang="ts">
export default { name: 'ArrayList' };
</script>
<script setup lang="ts">
import Cursors from './cursors.vue';
import { computed, defineEmit, defineProps, reactive, ref, useContext } from '@vue/runtime-core';
import { isPhone, sleep, stepInterval } from '@/common/utils';

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

const list = reactive<number[]>(props.modelValue as number[]);
const itemRefs = new Map<number, HTMLDivElement | any>();

let cursors = reactive<number[]>([]);
let actives = reactive<{first: [], second: []}>({first: [], second: []});
let sorted = reactive<number[]>([]);

const addActives = function (first?: number[], second?: number[]) {
  //@ts-ignore
  first?.forEach(item => actives.first.push(item))
  //@ts-ignore
  second?.forEach(item => actives.second.push(item))

  setTimeout(() => {
    // TODO ready to optimize
    clearActives();
  }, 1000);
};

const clearActives = function () {
  actives.first.length = 0;
  actives.second.length = 0;
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
  addActives([list[index]]);
  list[index] = x;
};

const swap = async (x: number, y: number) => {
  await sleep();
  addActives([list[x]], [list[y]]);
  let t = list[x];
  list[x] = list[y];
  list[y] = t;
};

const bubbleSort = async () => {
  let i, j;
  for (i = 0; i < list.length; i++) {
    cursors[0] = i;
    await sleep();
    for (j = 0; j < list.length - i - 1; j++) {
      cursors[1] = j;
      await sleep(1);
      if (list[j] > list[j + 1]) {
        await swap(j, j + 1);
      }
    }
    await sleep();
    sorted.push(j);
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

async function merge(l:number, mid:number, h:number) {
  let i, j, k;
  i = l;
  j = mid;
  k = 0;
  let firstActives = [];
  let secondActives = [];

  let mergeList = [];
  while (i<mid && j<=h) {
    await sleep();
    cursors[0] = i;
    cursors[1] = j;
    if(list[i] < list[j]) {
      firstActives.push(list[i]);
      mergeList[k] = list[i];
      k++, i++;
    } else {
      secondActives.push(list[j]);
      mergeList[k] = list[j];
      k++, j++;
    }
  }

  while (i<mid) {
    firstActives.push(list[i]);
    mergeList[k] = list[i];
    k++, i++;
  }
  while (j<=h) {
    secondActives.push(list[j]);
    mergeList[k] = list[j];
    k++, j++;
  }

  await sleep();
  addActives(firstActives, secondActives);
  for (let i = h; i >= l; i--) {
    list[i] = mergeList[k-1];
    k--;
  }
  
}


const mergeSort = async function mergeSort() {
  let p,i,n,l,mid,h;
  n = list.length;

  for (p = 2; p <= n; p=p*2) {
    for (i = 0; i+p-1 < n; i = i+p) {
      l = i;
      h = i + p - 1;
      mid = Math.round( (l + h) / 2 );
      await merge(l, mid, h);
    }

    if (n-i > p/2) {
      l = i;
      h = i + p - 1;
      mid = Math.round( (l + h) / 2 );
      console.log(l, mid, n-1);
      
      await merge(l, mid, n-1);
    }
  }
  if (p/2 < n) {
    await merge(0, Math.round(p/2), n-1);
  }
  await sleep();
  list.forEach((item,index) => sorted.push(index));
};

useContext().expose({
  insert,
  pop,
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
  mergeSort,
});
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

$moving_color: #e98b2a;
$sorted_color: #86c166;

.va-array-list {
  position: relative;
  display: flex;
  justify-content: center;
  @include phone {
    // align-items: center;
  }
}

.array-list {
  height: 100px;
  position: relative;
  display: flex;
  overflow-x: hidden;
  padding: 40px 0;
  @include phone {
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 0 60px;
  }
}

.array-list-item {
  $size: 3.5rem;

  display: inline-block;
  width: $size;
  height: $size;
  line-height: $size;
  text-align: center;
  margin: 1px;
  border-radius: 100%;
  background-color: #58b2dc;
  transition: all 0.8s ease;

  &.is-sorted {
    background-color: $sorted_color;
  }
}

.array-list-item {
  position: relative;
  div {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
  }
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
  background-color: $moving_color;
  transform: translateY(-30px);
  @include phone {
    transform: translateX(-30px);
  }
}
.list-move.is-active-second {
  background-color: $moving_color;
  transform: translateY(30px);
  @include phone {
    transform: translateX(30px);
  }
}
</style>
