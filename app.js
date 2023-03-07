const calculateRandomValue = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const app = Vue.createApp({
  data() {
    return {
      playerHP: 100,
      monsterHP: 100,
      currentTurn: 0,
      winner: null,
      battleLogs: [],
    };
  },
  methods: {
    playerAttack() {
      const attackValue = calculateRandomValue(5, 12);
      this.monsterHP -= attackValue;
      this.monsterAttack();
      this.addLogMessage("player", "attack", attackValue);
      this.currentTurn += 1;
    },
    monsterAttack() {
      const attackValue = calculateRandomValue(8, 15);
      this.playerHP -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttack() {
      const attackValue = calculateRandomValue(10, 25);
      this.monsterHP -= attackValue;
      this.monsterAttack();
      this.addLogMessage("player", "special-attack", attackValue);
      this.currentTurn += 1;
    },
    playerHeal() {
      const healAmount = calculateRandomValue(8, 20);
      if (this.playerHP + healAmount > 100) {
        this.playerHP = 100;
      } else {
        this.playerHP += healAmount;
      }
      this.monsterAttack();
      this.addLogMessage("player", "heal", healAmount);
      this.currentTurn += 1;
    },
    startNewGame() {
      (this.monsterHP = 100),
        (this.playerHP = 100),
        (this.currentTurn = 0),
        (this.winner = null),
        (this.battleLogs = []);
    },
    surrender() {
      this.winner = "monster";
      this.playerHP = 0;
    },
    addLogMessage(who, what, value) {
      this.battleLogs.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  computed: {
    playerBarWidth() {
      return this.playerHP < 0
        ? { width: "0%" }
        : { width: this.playerHP + "%" };
    },
    monsterBarWidth() {
      return this.monsterHP < 0
        ? { width: "0%" }
        : { width: this.monsterHP + "%" };
    },
    specialAttackAvailable() {
      return this.currentTurn % 3 !== 0;
    },
  },
  watch: {
    playerHP(value) {
      if (value <= 0 && this.monsterHP <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHP(value) {
      if (value <= 0 && this.playerHP <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
});

app.mount("#game");
