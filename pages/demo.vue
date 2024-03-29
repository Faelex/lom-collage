<template lang="html">
  <div id="app">
    <div class="menu-container">
      <drop-area @drop="drop(selected.id)">
        <div slot="over" class="icon" v-html="icons.download"></div>
        <small v-if="!droppeds.length">Drop dialog here</small>
        <div
          v-for="(dialog, idx) in droppeds"
          :key="idx"
          class="dropped"
          @click="unDrop(dialog.id)"
        >
          <div class="icon" v-html="dialog.id"></div>
          <p class="name">{{ dialog.data.title }}</p>
        </div>
      </drop-area>
      <small v-if="droppeds.length"
        ><em>Click item to restore dialog</em></small
      >
    </div>
    <div v-if="selected" class="console">
      <p>Dialog Selected</p>
      <small>{{ selected }}</small>
    </div>
    <div class="dialogs">
      <dialog-drag
        v-for="dialog in projects"
        :id="dialog.data.id"
        :key="'dialog-' + dialog.id"
        :ref="'dialog-' + dialog.data.id"
        class="dialog-1"
        :is-active="isActive"
        :options="
          dialog.options ? dialog.options : { width: 200, buttonPin: true }
        "
        @click.native="isActive = dialog.data.id"
        @close="removeDialog(dialog)"
        @drag-end="dialogDragEnd(dialog)"
        @drag-start="selectDialog(dialog)"
        @move="dialogDragEnd(dialog)"
      >
        <div v-if="dialog.data.cover" class="dialog-image">
          <img :src="dialog.cover" />
        </div>
        <span slot="title">{{ dialog.data.title }}</span>
        <h3>{{ dialog.data.title }}</h3>
        <p
          class="dialog-text"
          v-html="
            dialog.data.abstract ? dialog.data.abstract : dialog.data.text
          "
        ></p>
        <small>
          <p>
            {{ dialog.tags.length }}&nbsp;Tags:&nbsp;<small
              ><em>{{
                dialog.tags
                  .slice(1, 4)
                  .toString()
                  .split(',')
                  .join(', ')
              }}</em></small
            >
          </p>
        </small>
      </dialog-drag>
    </div>
  </div>
</template>

<script>
import DialogDrag from '~/components/vue-dialog-drag.vue'
import DropArea from '~/components/drop-area.vue'
// import browserIcon from '~/assets/browser.svg?raw'
// import dialogIcon from '~/assets/dialog.svg?raw'
// import downloadIcon from '~/assets/download.svg?raw'

import { RepoFactory } from '~/api/RepoFactory'

const ProjectsRepo = RepoFactory.get('projects')

export default {
  name: 'Example',
  components: {
    DropArea,
    DialogDrag
  },
  data() {
    return {
      dialogs: [],
      projects: [],
      projectId: 0,
      styles: [
        { name: 'dialog-1', options: { width: 400 } },
        { name: 'dialog-2', options: { width: 150, buttonPin: false } },
        { name: 'dialog-3' }
      ],
      covers: {},
      style: null,
      loaded: false,
      isOpen: {},
      isActive: null,
      selected: null,
      dialogWidth: 400,
      droppeds: [],
      icons: {
        browser: 'Browser',
        download: 'Download',
        dialog: 'Dialog'
      },
      app: process.env.APP
    }
  },

  computed: {
    fetched() {
      return this.$store.state.api.projects
    }
  },

  mounted() {
    this.fetch(this.$store.state.api.projects)
    for (let i = 0; i < this.projects.length; i++) {
      const index = this.newDialog(i) - 1
      console.log(index)
    }
  },
  methods: {
    fetch(data) {
      for (let i = 0; i < data.length; i++) {
        this.projects.push({
          id: i,
          data: { ...data[i] },
          cover: null,
          options: {
            zIndex: i + 10,
            top: i * (data.length + 100),
            left: i * (data.length + 10),
            total: data.length
          },
          tags: []
        })

        this.getImage(data[i].id)
        this.loaded = true
      }

      // this.getImage(data[i].id)
      /*    console.log(
        this.projects.map((item) => [item.data.id, this.getImage(item.data.id)])
      ) */
    },

    /*    applyImages() {
      for (let i = 0; i < this.projects.length; i++) {
        if (this.covers.hasOwnProperty(this.projects[i].data.id)) {
          console.log('sdfkgöoskfölsdkf', this.covers[this.projects[i].data.id])
        }
      }
    }, */

    getImage(id) {
      let cover = {}

      const project = this.projects.filter((item) => item.data.id === id)

      ProjectsRepo.getCover(id).then((res) => {
        if (res.data.data.cover && res.data.data.cover.data.thumbnails) {
          // console.log(res.data.data.cover.data.thumbnails[0].url)
          cover = res.data.data.cover.data.thumbnails[0].url
        }
        this.covers[id] = cover

        console.log(cover)
        project[0].cover = cover

        // console.log(project)
        // this.projects[id] = project[0]
        // console.log(this.projects[id])
        return cover
      })

      this.loaded = true

      console.log(this.projects)
    },

    drop(id) {
      const index = this.findDialog(id)
      if (index !== null) {
        this.droppeds.push(this.projects[index])
        this.projects.splice(index, 1)
      }
    },
    unDrop(id) {
      const index = this.findDialog(id, this.droppeds)
      if (index !== null) {
        this.projects.push(this.droppeds[index])
        this.droppeds.splice(index, 1)
      }
    },
    newDialog(sId) {
      if (sId === null) sId = Math.floor(Math.random() * this.styles.length)
      // return this.projects.push(this.dialog(this.styles[sId]))
    },
    removeDialog(dialog) {
      const id = dialog.id
      const index = this.findDialog(id)
      this.projects.splice(index, 1)
      if (this.selected && this.selected.id === id) this.selected = null
    },
    findDialog(id, dialogs) {
      if (!dialogs) dialogs = this.projects
      const index = dialogs.findIndex((val) => {
        return val.id === id
      })
      return index > -1 ? index : null
    },
    dialog(style) {
      const id = this.projectId.toString()
      this.projectId++
      const name = 'Dialog ' + id
      let options = {}
      if (style.options) options = Object.assign({}, style.options)
      if (!options.left) options.left = 30 * id
      if (!options.top) options.top = 30 * id
      if (!options.active) options.active = false
      return { id, name, style, options }
    },
    dialogDragEnd(obj) {
      const index = this.findDialog(obj.id)
      this.$set(this.projects[index].options, 'left', obj.left)
      this.$set(this.projects[index].options, 'top', obj.top)
    },
    selectDialog(obj) {
      const index = this.findDialog(obj.id)
      this.selected = this.projects[index]
    }
  }
}
</script>
<style lang="scss">
body {
  font-family: 'Asap', sans-serif;
}

.menu-container {
  position: fixed;
  bottom: 0;
  z-index: 50;
  margin: 5em;
  width: 25em;
  max-width: 25em;
}

.menu {
  border: #0d5948 1px solid;
  border-top-width: 10px;
  border-bottom-width: 5px;
  padding: 1em 2em;
  background-color: #1aad8d;
  color: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  margin-top: 1em;
}

.menu .title {
  border: 1.5px #d3f8f0;
  border-style: dotted none;
  padding: 0.5em 0;
  letter-spacing: 0.0625em;
}

.menu .title h1,
.menu .title h2 {
  margin: 0 0 0.5em 0;
}

.menu .title h1 {
  font-size: 1.7em;
  letter-spacing: 0.0325em;
  font-family: 'Belgrano', serif;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5), 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.menu .title h2 {
  font-size: 0.8em;
  font-style: italic;
}

.links {
  margin: 1em 5em 0 0;
  position: absolute;
  list-style: none;
  top: 0;
  right: 0;
}

.icon svg {
  padding: 0.1em;
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  width: 3em;
  height: 3em;
  fill: #1aad8d;
}

.set {
  margin: 1em;
  display: inline-block;
}

.console {
  display: block;
  max-width: 20em;
  position: fixed;
  margin: 5em;
  right: 0;
  bottom: 0;
  color: #0d5948;
}

#app {
  text-align: center;
  user-select: none;
}

.dropped {
  border: #1aad8d dashed 1px;
  margin: 0.125em;
  background-color: #fff;
  cursor: pointer;
  width: 120px;
  height: 50px;
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

.dialog-image {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  width: 200px;
  max-height: 100%;
  max-width: 100%;
}

.dialog-text {
  max-width: 100%;
}

@import './../assets/css/dialog-styles.css';
</style>
