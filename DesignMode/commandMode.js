class player{
    play(){
        console.log("play");
    }

    pause(){
        console.log("pause");
    }
}


class PlayerCommand{
    constructor(player){
        this.player = player;
    }
    execute(){
        this.player.play();
    }
}

class PauseCommand{
    constructor(player){
        this.player = player;
    }
    execute(){
        this.player.pause();
    }
}

class Button{
    click(command){
        command.execute();  
    }
}

const button = new Button();
const playerInstance = new player();

const playCommand = new PlayerCommand(playerInstance);
const pauseCommand = new PauseCommand(playerInstance);

button.click(playCommand);  // 输出: play
button.click(pauseCommand); // 输出: pause  