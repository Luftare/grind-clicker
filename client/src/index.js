import Vue from "vue/dist/vue.js";
import player from "./modules/player";
import targets from "./modules/targets";
import weapon from "./modules/weapon";
import fyis from "./modules/fyis";

import views from "./views";
import topHud from "./components/top-hud";
import bottomHud from "./components/bottom-hud";

views.registerComponent(Vue);
topHud.registerComponent(Vue);
bottomHud.registerComponent(Vue);

targets.registerComponent(Vue);
weapon.registerComponent(Vue);
fyis.registerComponent(Vue);

const app = new Vue({
  el: "#root",
  data: {
    player: player.data,
    weapon: weapon.data,
    fyis: fyis.data,
    targets: targets.data,
    views: views.data
  },
  methods: {
    ...targets.methods,
    ...player.methods,
    ...weapon.methods,
    ...fyis.methods
  },
  computed: {
    ...player.computed
  },
  mounted() {
    this.targets_spawn();
    setInterval(() => {
      this.player_everySecond();
      this.targets_everySecond();
    }, 1000);
  }
});

export default app;
