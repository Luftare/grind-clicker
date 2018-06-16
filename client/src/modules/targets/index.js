export default {
  data: {
    all: []
  },
  registerComponent(Vue) {
    Vue.component("targets-instance", {
      props: ["target"],
      template: `
        <div
          class="target"
          @mousedown="$emit('hit')"
          :class="{
            'target--dead': target.hp <= 0,
            'target--aggro': target.aggro,
            'target--striking': target.striking
          }"
        >
          <div class="hp">
            <div class="hp-value" :style="{ width: target.hp + '%' }"></div>
          </div>
          <slot></slot>
        </div>`
    });
  },
  methods: {
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
        this.targets_kill(target);
      }
    },
    targets_startAttacks(target) {
      if (target.attackTimerId) return;
      target.attackTimerId = setInterval(() => {
        target.striking = true;
        setTimeout(() => {
          target.striking = false;
        }, 1000);
      }, 2000);
    },
    targets_spawn(count) {
      this.targets.all.push(...[...Array(count)].map(this.targets_generateNew));
    },
    targets_generateNew() {
      return {
        hp: 100,
        level: 1,
        aggro: false,
        attacking: false,
        attackTimerId: null,
        striking: false
      };
    },
    targets_kill(target) {
      this.player_receiveExpFromKill(target);
      clearInterval(target.attackTimerId);
      setTimeout(() => {
        this.targets.all = this.targets.all.map(t => {
          if (t === target) {
            return this.targets_generateNew();
          }
          return t;
        });
      }, 5000);
    }
  }
};
