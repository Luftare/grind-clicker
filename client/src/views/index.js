export default {
  data: {
    current: "grind"
  },
  registerComponent(Vue) {
    Vue.component("views-route", {
      props: ["name", "current"],
      template: `
        <div
          :style="{
            display: name === current ? 'default' : 'none'
          }"
        >
          <slot></slot>
        </div>
      `
    });
  }
};
