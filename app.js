const calculateAttack  = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const app = Vue.createApp({
    data() {
        return {
            playerHP: 100,
            monsterHP: 100,
            currentTurn: 0
        }
    },
    methods: {
        playerAttack() {
            this.monsterHP -= calculateAttack(5, 12);
            this.monsterAttack();
            this.currentTurn += 1;
        },
        monsterAttack() {
            this.playerHP -= calculateAttack(8, 15);
        },
        specialAttack() {
            this.monsterHP -= calculateAttack(10, 25);
            this.monsterAttack();
            this.currentTurn += 1;
        }
    },
    computed: {
        playerBarWidth() {
            return {width: this.playerHP + '%'}
        },
        monsterBarWidth() {
            return {width: this.monsterHP + '%'}
        },
        specialAttackAvailable() {
            return this.currentTurn % 3 !== 0;
        }
    },
});

app.mount('#game');