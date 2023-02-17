const calculateRandomValue  = (min, max) => Math.floor(Math.random() * (max - min)) + min;

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
            this.monsterHP -= calculateRandomValue(5, 12);
            this.monsterAttack();
            this.currentTurn += 1;
        },
        monsterAttack() {
            this.playerHP -= calculateRandomValue(8, 15);
        },
        specialAttack() {
            this.monsterHP -= calculateRandomValue(10, 25);
            this.monsterAttack();
            this.currentTurn += 1;
        },
        playerHeal() {
            const healAmount = calculateRandomValue(8, 20);
            if (this.playerHP + healAmount > 100) {
                this.playerHP = 100
            } else {
                this.playerHP += healAmount
            }
            this.monsterAttack();
            this.currentTurn +=1;
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