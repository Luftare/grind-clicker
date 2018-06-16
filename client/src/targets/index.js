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
            'target--dead': target.hp <= 0
          }"
        >
          <div class="hp">
            <div class="hp-value" :style="{ width: target.hp + '%' }"></div>
          </div>
          {{target.hp}}
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
      target.hp -= damage.value;
      if (target.hp <= 0) {
        this.targets_kill(target);
      }
    },
    targets_spawn(count) {
      this.targets.all.push(
        ...[...Array(count)].map(() => ({
          hp: 100,
          fyis: []
        }))
      );
    },
    targets_kill(target) {
      //this.targets.all = this.targets.all.filter(t => t !== target);
      this.player_receiveExpFromKill(target);
    }
  }
};
