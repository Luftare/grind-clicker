import Vue from "vue/dist/vue.js";
import player from "./player";
import targets from "./targets";
import weapon from "./weapon";
import fyis from "./fyis";

targets.registerComponent(Vue);
weapon.registerComponent(Vue);

const app = new Vue({
  el: "#root",
  data: {
    player: player.data,
    weapon: weapon.data,
    fyis: fyis.data,
    targets: targets.data
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
    this.targets_spawn(3);
  }
});

export default app;
