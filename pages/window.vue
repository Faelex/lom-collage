<template lang="html">
  <div id="app">
    <div class="window">
      <no-ssr>
        <lom-window-default>
          <lom-window
            v-for="(item, idx) in projects"
            :key="idx"
            :width="220"
            :is-scrollable="true"
            :title="item.data.title"
            :resizable="true"
            :min-width="250"
            :min-height="250"
            :max-width="640"
            :max-height="480"
            :close-button="true"
            :is-open.sync="isOpen[idx]"
          >
            <div class="lom window-content">
              <img
                :key="idx + '-image'"
                ondragstart="event.preventDefault();
                        event.stopPropagation();"
                :src="item.cover"
              />
              <p
                v-html="
                  item.data.abstract
                    ? item.data.abstract.slice(0, 300)
                    : item.data.text.slice(0, 10)
                "
              ></p>
            </div>
          </lom-window>
        </lom-window-default>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { RepoFactory } from '~/api/RepoFactory'

const ProjectsRepo = RepoFactory.get('projects')

export default {
  name: 'Example',
  data() {
    return {
      activityKey: 0,
      projects: [],
      covers: {},
      style: null,
      loaded: false,
      isOpen: {},
      app: process.env.APP
    }
  },

  computed: {
    fetched() {
      return this.$store.state.api.projects
    }
  },

  created() {
    this.fetch(this.$store.state.api.projects)
    // this.$nextTick(() => this.applyImages)
    /* for (let i = 0; i < this.projects.length; i++) {
      const index = this.newDialog(i) - 1
      console.log(index)
      /!* this.projects[index].options.left =
          index * this.dialogWidth + 50 * index + 1 *!/
    } */
  },
  methods: {
    fetch(data) {
      for (let i = 0; i < data.length; i++) {
        this.projects.push({
          data: { ...data[i] },
          cover: this.getImage(data[i].id),
          options: {
            zIndex: i + 10,
            top: i * (data.length + 100),
            left: i * (data.length + 10),
            total: data.length
          }
        })

        this.loaded = true
      }
    },

    getImage(id) {
      // Apply images async
      ProjectsRepo.getCover(id).then((res) => {
        if (res) {
          this.projects.filter((item) => item.data.id === id)[0].cover =
            res.data.thumbnails[0].url
        }
      })
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
