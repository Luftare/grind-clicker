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
    player_getWeaponDamage(target) {
      return {
        value: Math.floor(Math.random() * 20 + 30),
        crit: Math.random() > 0.93
      };
    }
  }
};
