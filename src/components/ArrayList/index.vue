<template>
  <div class="va-array-list">
    <div class="array-list">
      <div class="array-list-item" v-for="(item, index) in list" :key="index">
        <div>{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script name="ArrayList" setup lang="ts">
import { defineEmit, defineProps, reactive, useContext } from "@vue/runtime-core";
import { sleep } from '../_utils';


const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return [1, 2, 3]
    }
  }
})
const emit = defineEmit();
const list = reactive(props.modelValue);

const insert = async (x: string) => {
  await sleep();
  list.push(x);
}

useContext().expose({
  insert
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
</style>

<!--
// onMounted(async () => {

  //   const insertList = [2, 4, 6];
  //   for (const insertItem of insertList) {
  //     await sleep();
  //     array.push(insertItem);
  //   }
  
  //   const result: unknown = await Promise.race([sleep(1000, 1), sleep(5000, 2), sleep(500, 3)]);
  //   array.push(Number(result as string));
  
  //   let lazyList: number[] = [];
  //   [...lazyList] = await Promise.all([sleep(1000, 4), sleep(5000, 5), sleep(500, 6)]);
  //   // [...lazyList] = await Promise.allSettled([sleep(1000, 4), sleep(5000, 5), sleep(500, 6)]);
  
  //   for (const insertItem of lazyList) {
  //     array.push(insertItem);
  //   }
  // })
  -->