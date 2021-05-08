<template>
  <div class="cursors-box">
    <slot class="cursors-container"></slot>

    <transition-group name="cursor-anima" tag="div" class="cursors-list">
      <div
        v-for="(item, index) in cursors"
        :key="index"
        class="cursor-item"
        :class="`cursor-item-${index + 1}`"
        :style="cursorItemStyle[index]"
      >
        {{ CURSOR_FLAGS[index] }}
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts"></script>
<script name="ArrayList" setup lang="ts">
import { computed, defineEmit, defineProps, reactive, ref, useContext } from '@vue/runtime-core';
import { isPhone } from '@/common/utils';

const props = defineProps({
  modelValue: {
    type: Array,
    default() {
      return [];
    },
  },
  itemRefs: {
    type: Map,
    default() {
      return new Map();
    },
  },
});
const emit = defineEmit();

const CURSOR_FLAGS = ['i', 'j', 'k'];

// const itemRefs = new Map<number, HTMLDivElement | any>();

const cursors = reactive<number[]>(props.modelValue as number[]);
let actives = reactive<number[]>([]);

const cursorItemStyle = computed(() => {
  return cursors.map((index, i) => {
    let styles: any = {};
    if (isPhone()) {
      styles['top'] = `${(props.itemRefs as any).get(index).offsetTop}px`;
    } else {
      console.log(props.itemRefs.get(index));

      styles['left'] = `${(props.itemRefs as any).get(index).offsetLeft}px`;
    }
    return styles;
  });
});

useContext().expose({});
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

$cursor_colors: #e16b8c, #fb966e;
.cursors-box {
  position: relative;
}
.cursors-container {
  position: relative;
}
.cursors-list {
  $breadth: 40px;

  position: absolute;
  width: 100%;
  height: $breadth;
  bottom: 0;
  left: 0;
  @include phone {
    top: 0;
    height: 100%;
    width: $breadth;
    right: 0;
    left: auto;
    bottom: auto;
  }
}
.cursor-item {
  position: absolute;
  display: inline-block;
  height: 0;
  width: 0;
  border: 10px solid;
  line-height: 40px;
  text-align: center;
  transform: scaleX(0.5);
  transition: all 0.5s ease;
}
@each $cursor_color in $cursor_colors {
  $i: index($cursor_colors, $cursor_color);
  .cursor-item-#{$i} {
    border-color: transparent transparent nth($cursor_colors, $i) transparent;
    @include phone {
      border-color: transparent nth($cursor_colors, $i) transparent transparent;
    }
  }
}
</style>
