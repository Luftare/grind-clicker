export default {
  data: {
    all: [],
    selected: {}
  },
  registerComponent(Vue) {
    Vue.component("targets-instance", {
      props: ["target"],
      template: `
        <div
          class="target"
          :class="{
            'target--dead': target.hp <= 0,
            'target--aggro': target.aggro,
            'target--striking': target.striking
          }"
          @mousedown="$emit('hit')"
          @mouseenter="$emit('hover')"
          @mouseleave="$emit('hover-end')"
        >
          <div class="hp">
            <div class="hp-value" :style="{ width: target.hp + '%' }"></div>
          </div>
          <slot></slot>
        </div>`
    });
  },
  methods: {
    targets_select(target) {
      this.targets.selected = target;
    },
    targets_unselect() {
      if (
        this.targets.selected &&
        this.targets.selected.hp > 0 &&
        this.targets.selected.aggro
      )
        return;
      this.targets.selected = {};
    },
    targets_receiveWeaponHit(target) {
      const damage = this.player_getMeleeDamage(target);
      const position = {
        x: this.weapon.x,
        y: this.weapon.y
      };
      this.fyis_spawnAtPosition(damage.value, position, damage.crit);
      this.targets_receiveDamage(target, damage);
    },
    targets_receiveDamage(target, damage) {
      const willDie = target.hp <= damage.value && target.hp > 0;
      target.hp -= damage.value;
      target.aggro = true;
      this.targets_startAttacks(target);
      if (willDie) {
        this.targets_die(target);
      }
    },
    targets_startAttacks(target) {
      if (target.attackTimerId) return;
      target.attackTimerId = setInterval(() => {
        this.player_receiveHitFromTarget(target);
        target.striking = true;
        setTimeout(() => {
          target.striking = false;
        }, 1000);
      }, 2000);
    },
    targets_spawn(count = 3) {
      this.targets.all = [...Array(count)].map(this.targets_generateNew);
    },
    targets_generateNew() {
      return {
        name: "Lokki",
        hp: 100,
        maxHp: 100,
        level: 1,
        aggro: false,
        attacking: false,
        attackTimerId: null,
        striking: false
      };
    },
    targets_die(target) {
      this.player_receiveExpFromKill(target);
      target.aggro = false;
      target.striking = false;
      if (this.targets.selected === target) {
        this.targets_unselect();
      }
      clearInterval(target.attackTimerId);
      setTimeout(() => {
        this.targets.all = this.targets.all.map(t => {
          if (t === target) {
            return this.targets_generateNew();
          }
          return t;
        });
      }, 5000);
    },
    targets_everySecond() {}
  }
};
