export default {
  data: {
    level: 1,
    exp: 0
  },
  computed: {
    player_expToNextLevel() {
      return Math.floor(this.player.level * 0.1 + 100);
    }
  },
  methods: {
    player_levelUp() {
      this.player.level++;
    },
    player_receiveExpFromKill(target) {
      this.player.exp += 50;
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
