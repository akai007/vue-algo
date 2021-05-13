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
        <div class="cursor-item-text">{{ CURSOR_FLAGS[index] }}</div>
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

const CURSOR_FLAGS = ['i', 'j', 'k', 'x', 'y', 'z'];

const cursors = reactive<number[]>(props.modelValue as number[]);
let actives = reactive<number[]>([]);

const cursorItemStyle = computed(() => {
  let points = new Map();

  return cursors.map((index, i) => {
    let styles: any = {};

    const OFFSET_DIS = 12;
    let point, offsetCount;
    offsetCount = 0;

    points.set(i, index);
    for (const _index of points.keys()) {
      if (index != _index) offsetCount++;
    }

    const itemRef = (props.itemRefs as any).get(index);
    if (isPhone()) {
      point = itemRef.offsetTop + offsetCount * OFFSET_DIS;
      styles['transform'] = `translateY(${point}px)`;
    } else {
      point = itemRef.offsetLeft + offsetCount * OFFSET_DIS;
      styles['transform'] = `translateX(${point}px)`;
    }
    return styles;
  });
});

useContext().expose({});
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

$cursor_colors: #cb1b45, #e16b8c, #fb966e, #fedfe1;
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
  display: flex;
  align-items: center;
  transition: all 0.5s ease;

  flex-direction: column;
  @include phone {
    flex-direction: row;
  }

  &-text {
    margin: 4px 0 0 0;
    @include phone {
      margin: 0 0 0 4px;
    }
  }

  &::before {
    content: '';
    display: inline-block;
    height: 0;
    width: 0;
    border: 10px solid;
    text-align: center;

    transform: scaleX(0.5);
    @include phone {
      transform: scaleY(0.5);
    }
  }
}
@each $cursor_color in $cursor_colors {
  $i: index($cursor_colors, $cursor_color);
  .cursor-item-#{$i} {
    color: nth($cursor_colors, $i);
    &::before {
      border-color: transparent transparent nth($cursor_colors, $i) transparent;
      @include phone {
        border-color: transparent nth($cursor_colors, $i) transparent transparent;
      }
    }
  }
}
</style>
