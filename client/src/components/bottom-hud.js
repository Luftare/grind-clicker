export default {
  registerComponent(Vue) {
    Vue.component("bottom-hud", {
      props: ["exp", "max-exp"],
      template: `
        <div
          style="
            position: absolute;
            width: 100%;
            pointer-events: none;
            display: flex;
            bottom: 0px;
            left: 0px;
            justify-content: center;
          "
          :style="{

          }"
        >
          <div
            style="
              position: relative;
              width: 70%;
              background: rgba(0, 0, 0, 0.7);
              border: 2px solid grey;
            "
          >
            <div
              style="
                background: purple;
                height: 10px;
                transition: width 500ms;
              "
              :style="{
                width: (100 * exp / maxExp) + '%'
              }"
            ></div>
          </div>
        </div>
      `
    });
  }
};
