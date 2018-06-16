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
            display: name === current ? 'block' : 'none'
          }"
        >
          <slot></slot>
        </div>
      `
    });
  }
};
