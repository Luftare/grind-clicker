export default {
  registerComponent(Vue) {
    Vue.component("top-hud", {
      props: ["level", "hp", "maxHp", "target"],
      template: `
        <div
          style="
            position: absolute;
            display: flex;
            top: 8px;
          "
          :style="{

          }"
        >
          <!-- Avatar -->
          <div
            style="
              position: relative;
              background: url('https://www.hastac.org/sites/default/files/upload/images/group/nyan_cat.png');
              background-size: cover;
              background-position: center;
              display: block;
              width: 60px;
              height: 60px;
              border-radius: 30px;
              transform: translateX(4px);
              border: 2px solid grey;
            "
          >
            <!-- Level badge -->
            <div
              style="
                background: black;
                width: 25px;
                height: 25px;
                border-radius: 30px;
                position: absolute;
                left: 0;
                bottom: -6px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: yellow;
                font-size: 0.8em;
                border: 2px solid grey;
              "
            >
              {{level}}
            </div>
          </div>
          <!-- Right section -->
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
            "
          >
            <div
              style="
                border: 2px solid grey;
              "
            >
              <!-- Name -->
              <div
                style="
                  padding: 4px;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: yellow;
                  background: rgba(0, 0, 0, 0.5);
                "
              >
                Cat!
              </div>
              <!-- Level bar -->
              <div
                style="
                  position: relative;
                  width: 130px;
                  height: 10px;
                  background-color: red;
                "
              >
                <div
                  style="
                    position: absolute;
                    background: lightgreen;
                    height: 100%;
                    transition: width 200ms;
                  "
                  :style=" {
                    width: (100 * hp / maxHp) + '%'
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      `
    });
  }
};
