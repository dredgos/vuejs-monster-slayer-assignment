const calculateAttack  = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const app = Vue.createApp({
    data() {
        return {
            playerHP: 100,
            monsterHP: 100
        }
    },
    methods: {
        playerAttack () {
            this.monsterHP -= calculateAttack(5, 12);
            this.monsterAttack()
        },
        monsterAttack() {
            this.playerHP -= calculateAttack(8, 15);
        }
    }

});

app.mount('#game');