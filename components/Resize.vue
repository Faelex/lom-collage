<template>
  <div
    style="height: 100vh; min-width: 1200px; border: 1px solid red; position: relative; z-index: 2"
  >
    <vue-draggable-resizable
      :w="500"
      :h="400"
      :parent="true"
      @dragging="onDrag"
      @resizing="onResize"
    >
      <slot></slot>
      <p>
        Hello! I'm a flexible component. You can drag me around and you can
        resize me.<br />
        X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}
      </p>
    </vue-draggable-resizable>
    <vue-draggable-resizable
      :w="100"
      :h="100"
      :parent="true"
      @dragging="onDrag"
      @resizing="onResize"
    >
      <p>
        Hello! I'm a seconde one resize me.<br />
        X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}
      </p>
    </vue-draggable-resizable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  },
  methods: {
    onResize(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag(x, y) {
      this.x = x
      this.y = y
    }
  }
}
</script>
