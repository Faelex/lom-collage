<template lang="html">
  <div
    ref="droparea"
    class="drop-area"
    @drop.stop="drop"
    @dragover.prevent="dragEnter"
    @dragleave.prevent="dragLeave"
  >
    <slot></slot>
    <div v-if="isOver" class="over">
      <slot name="over"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DropArea',
  data() {
    return {
      isFront: false,
      isOver: false,
      isLoading: true
    }
  },
  methods: {
    drop(event) {
      this.isOver = false
      const id = event.dataTransfer.getData('text')
      this.$emit('drop', id)
    },
    dragEnter(event) {
      this.isOver = true
    },
    dragLeave(event) {
      this.isOver = false
    }
  }
}
</script>
<style lang="scss">
.drop-area,
.over {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.drop-area {
  position: relative;
  border: #21deb5 dotted 2px;
  min-height: 10em;
  text-align: center;
  margin-bottom: 0.5em;
  background-color: transparentize(green, 0.4);
}
.drop-area small {
  color: #21deb5;
}
.over {
  background-color: rgba(227, 168, 38, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 105;
  pointer-events: none;
}
.dropped {
  border: #1aad8d dashed 1px;
  margin: 0.125em;
  background-color: #fff;
  cursor: pointer;
}
.dropped:hover {
  border-color: #e3a826;
}
.dropped:hover .icon svg {
  fill: #e3a826;
}
.dropped .name {
  font-size: 0.6em;
  margin: 0 0.5em 0.25em 0.5em;
}
.dropped .icon,
.dropped .icon svg {
  margin: 0;
  padding: 0;
}
.dropped .icon svg {
  fill: #1aad8d;
  background: transparent;
}
</style>
