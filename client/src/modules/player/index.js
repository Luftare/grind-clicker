export default {
  data: {
    level: 1,
    exp: 0,
    hp: 100
  },
  computed: {
    player_expToNextLevel() {
      return Math.floor(this.player.level * 10 + 100);
    }
  },
  methods: {
    player_levelUp() {
      this.player.level++;
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
