export default {
  data: {
    level: 1,
    exp: 40,
    hp: 110
  },
  computed: {
    player_expToNextLevel() {
      return Math.floor(this.player.level * 10 + 100);
    },
    player_maxHp() {
      return this.player.level * 10 + 100;
    }
  },
  methods: {
    player_levelUp() {
      this.player.level++;
      this.player.hp = this.player.maxHp;
    },
    player_receiveExpFromKill(target) {
      const gainedExp = target.level + 10;
      const addedExp = this.player.exp + gainedExp;
      const willLevelUp = addedExp > this.player_expToNextLevel;
      this.player.exp = willLevelUp
        ? addedExp - this.player_expToNextLevel
        : addedExp;
      if (willLevelUp) {
        this.player_levelUp();
      }
    },
    player_receiveHitFromTarget(target) {
      const damage = target.level + 10;
      const willDie = this.player.hp - damage <= 0 && this.player.hp > 0;
      this.player.hp -= damage;
      if (willDie) {
        this.player_die();
      }
    },
    player_die() {
      this.views.current = "ghost";
      this.targets.all.forEach(t => {
        if (t.attackTimerId) clearInterval(t.attackTimerId);
      });
      this.targets.all = [];
    },
    player_spawn() {
      this.player.hp = this.player_maxHp;
      this.targets_spawn();
      this.views.current = "grind";
    },
    player_getMeleeDamage(target) {
      const crit = Math.random() > 0.9;
      const baseDamage = this.player.level + 10;
      const variance = 0.3;
      const varianceInstance = Math.random() * variance + (1 - variance);
      const variedDamage = Math.floor(varianceInstance * baseDamage);
      const value = crit ? variedDamage * 2 : variedDamage;
      return { value, crit };
    }
  }
};
