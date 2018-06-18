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
            'fyi--important': fyi.important,
            'fyi--info': fyi.isInfo
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
        time: Date.now(),
        isInfo: false
      };
      this.fyis.all.push(msg);
      clearTimeout(this.fyis.timeoutId);
      this.fyis.timeoutId = setTimeout(() => {
        const now = Date.now();
        this.fyis.all = this.fyis.all.filter(f => f.time + 2000 > now);
      }, 2000);
    },
    fyis_spawnInfo(text, important = false) {
      const msg = {
        text,
        important,
        x: this.weapon.x,
        y: this.weapon.y,
        time: Date.now(),
        isInfo: true
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
