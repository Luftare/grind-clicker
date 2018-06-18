export default {
  registerComponent(Vue) {
    Vue.component("top-hud", {
      props: [
        "name",
        "level",
        "hp",
        "maxHp",
        "targetName",
        "targetLevel",
        "targetHp",
        "targetMaxHp"
      ],
      template: `
        <div
          style="
            pointer-events: none;
            position: absolute;
            display: flex;
            top: 16px;
            left: 16px;
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
                {{name}}
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

          <!-- Target -->

          <!-- Left section -->
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 48px;
            "
            :style="{
              display: targetLevel ? 'flex' : 'none'
            }"
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
                  background: rgba(255, 0, 0, 0.7);
                "
              >
                {{targetName}}
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
                    width: (100 * targetHp / targetMaxHp) + '%'
                  }"
                ></div>
              </div>
            </div>
          </div>

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
              transform: translateX(-4px);
              border: 2px solid grey;
            "
            :style="{
              display: targetLevel ? 'flex' : 'none'
            }"
          >
            <!-- Level badge -->
            <div
              style="
                background: black;
                width: 25px;
                height: 25px;
                border-radius: 30px;
                position: absolute;
                right: 0;
                bottom: -6px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: yellow;
                font-size: 0.8em;
                border: 2px solid grey;
              "
            >
              {{targetLevel}}
            </div>
          </div>

        </div>
      `
    });
  }
};
