export default {
  data: {
    name: "Jeppe",
    level: 1,
    exp: 110,
    hp: 110
  },
  computed: {
    player_expToNextLevel() {
      return Math.floor(this.player.level * 10 + 100);
    },
    player_maxHp() {
      return this.player.level * 10 + 100;
    },
    player_hpRegeneration() {
      return this.player.level / 2 + 3;
    }
  },
  methods: {
    player_levelUp() {
      this.player.level++;
      this.player.hp = this.player_maxHp;
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
        this.fyis_spawnInfo("Level up!");
      } else {
        this.fyis_spawnInfo(`+${gainedExp}exp`);
      }
    },
    player_receiveHitFromTarget(target) {
      const damage = target.level + 10;
      const willDie = this.player.hp - damage <= 0 && this.player.hp > 0;
      this.player.hp -= damage;
      this.targets.selected = target;
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
    },
    player_everySecond() {
      const inFight = this.targets.all.filter(t => t.aggro).length > 0;
      if (this.player.hp > 0 && !inFight) {
        this.player.hp = Math.min(
          this.player.hp + this.player_hpRegeneration,
          this.player_maxHp
        );
      }
    }
  }
};
