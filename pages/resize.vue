<template>
  <div class="page">
    <Resize style="position: absolute">
      <v-zoomer
        style="width: 500px; height: 400px; text-align: center; background: grey"
      >
        <img
          :src="list[0]"
          style="object-fit: contain; width: 100%; height: 100%;"
        />
      </v-zoomer>
    </Resize>
  </div>
</template>

<script>
import Resize from '@/components/Resize'

export default {
  components: {
    Resize
  },
  data() {
    return {
      selIndex: 1,
      list: ['/1.jpg', '/2.jpg', '/3.jpg']
    }
  },
  methods: {
    next() {
      if (this.selIndex <= this.list.length - 2) {
        this.selIndex += 1
      } else {
        this.selIndex = 0
      }
    }
  }
}
</script>
