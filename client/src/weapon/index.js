export default {
  data: {
    x: 0,
    y: 0,
    vX: 0,
    vY: 0,
    strike: false,
    name: "sword"
  },
  registerComponent(Vue) {
    Vue.component("weapon-instance", {
      props: ["weapon"],
      template: `
        <div
          class="weapon"
          :style="{
            top: weapon.y + 'px',
            left: weapon.x + 'px'
          }"
          :class="{
            'weapon--strike': weapon.strike,
            ['weapon--'+ weapon.name]: true
          }"
        ></div>`
    });
  },
  methods: {
    weapon_followMouse(e) {
      this.weapon.x = e.pageX;
      this.weapon.y = e.pageY;
      this.weapon.vX = e.movementX;
      this.weapon.vY = e.movementY;
    },
    weapon_strike() {
      this.weapon.strike = true;
    },
    weapon_endStrike() {
      this.weapon.strike = false;
    }
  }
};
