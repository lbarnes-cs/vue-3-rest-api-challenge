<template>
  <v-tooltip :text="tooltipText" :location="tooltipLocation">
    <template #activator="{ props: tooltipProps }">
      <v-hover>
        <template #default="{ isHovering, props: hoverProps }">
          <v-btn
            v-bind="{
              ...tooltipProps,
              ...hoverProps,
              color: isHovering ? 'secondary' : 'grey-darken-2',
            }"
            :size="size"
            :class="className"
            class="hover-fade"
            :aria-label="tooltipText"
            variant="text"
            icon
            @click="$emit('click')"
            @mouseenter="tooltipProps.onMouseenter"
            @mouseleave="tooltipProps.onMouseleave"
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </template>
      </v-hover>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
  type PropsType = {
    tooltipText: string;
    icon: string;
    // eslint-disable-next-line vue/require-default-prop
    className?: string;
    size?: 'x-large' | 'large' | 'default' | 'small' | 'x-small';
    tooltipLocation?:
      | 'top'
      | 'bottom'
      | 'start'
      | 'end'
      | 'left'
      | 'right'
      | 'center'
      | 'center center'
      | 'top start' // Fixed from "top-start"
      | 'top end'
      | 'top left'
      | 'top right'
      | 'top center'
      | 'bottom start'
      | 'bottom end'
      | 'bottom left'
      | 'bottom right'
      | 'bottom center'
      | 'start top'
      | 'start bottom'
      | 'start center'
      | 'end top'
      | 'end bottom'
      | 'end center'
      | 'left top'
      | 'left bottom'
      | 'left center'
      | 'right top'
      | 'right bottom'
      | 'right center';
  };

  withDefaults(defineProps<PropsType>(), {
    size: 'small',
    tooltipLocation: 'left',
  });

  defineEmits(['click']);
</script>

<style lang="scss" scoped>
  .hover-fade {
    transition: color ease-in-out 200ms;
  }
</style>
