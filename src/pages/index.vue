<template>
  <div>{{title}}</div>
  <div class="array-list">
    <div class="array-list-item" v-for="item in array" :key="item">
      {{item}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "@vue/runtime-core";

let array = reactive([2, 3, 5]);
const title = 'HaHa';

function sleep(delay: number = 1000, result?: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(()=>{
      console.log(result);
      
      resolve(result||0);
    }, delay)
  })
}

onMounted(async () => {

  const insertList = [2, 4, 6];
  for (const insertItem of insertList) {
    await sleep();
    array.push(insertItem);
  }

  const result: unknown = await Promise.race([sleep(1000, 1), sleep(5000, 2), sleep(500, 3)]);
  array.push(Number(result as string));

  let lazyList: number[] = [];
  [...lazyList] = await Promise.all([sleep(1000, 4), sleep(5000, 5), sleep(500, 6)]);
  // [...lazyList] = await Promise.allSettled([sleep(1000, 4), sleep(5000, 5), sleep(500, 6)]);

  for (const insertItem of lazyList) {
    array.push(insertItem);
  }
})

</script>

<style>
  .array-list {
    height: 100px;
    display: flex;
  }

  .array-list-item {
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
