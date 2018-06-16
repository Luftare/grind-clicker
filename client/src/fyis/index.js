export default {
  data: {
    all: [],
    timeoutId: 0
  },
  registerComponent(Vue) {
    Vue.component("fyi-instance", {
      props: ["fyi"],
      template: `
        <div
          :style="{
            top: fyi.y + 'px',
            left: fyi.x + 'px'
          }"
          class="fyi"
          :class="{
            'fyi--important': fyi.important
          }"
        >
          {{fyi.text}}
        </div>
      `
    });
  },
  methods: {
    fyis_spawnAtPosition(text = "", position, important = false) {
      const msg = {
        text,
        important,
        x: position.x,
        y: position.y,
        time: Date.now()
      };
      this.fyis.all.push(msg);
      clearTimeout(this.fyis.timeoutId);
      this.fyis.timeoutId = setTimeout(() => {
        const now = Date.now();
        this.fyis.all = this.fyis.all.filter(f => f.time + 2000 > now);
      }, 2000);
    }
  }
};
