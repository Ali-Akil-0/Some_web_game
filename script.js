window.onload = function () {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var canvasWidth = 900;
    var canvasHeight = 600;
    var increment = 20;
    var blocksize = 30;
    var delay = 100;
    var snakee;
    var v_apple;
    var total=0 ; 
    var total_check=0 ; 

    start();

    function start() {
        // this part is just to steup the canvas 
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid black";
        document.body.appendChild(canvas);
        //the initial the snakes body and position
        snakee = new snake([[1, 1], [1, 2], [1, 3], [1, 4]], "down");
        v_apple = new apple([5, 5]);

        // u got to setup the update 
        update();
    }

    function update() {
        // clear the canvas and then draw the next thing
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        //draw the apple 
        v_apple.draw();
        // call out the draw function
        snakee.draw();
        //eating check
        snakee.eat();
        // changing position of the apple after eating 
        changingposition();
        // checking for collisions
        snakee.collision();
        // stopping the snake 
        snakee.stop();
        //advance 
        snakee.advance();
        // show the total
        showingtotal();

        // set a timer for when the updates happen
        setTimeout(update, delay);
    }

    // the drawing function

    function drawBlock(ctx, position) {
        // the array elements have two parameters x and y so position[0] refers to the x in the array element
        var x = position[0] * blocksize;
        // pour prendre la position en pixel
        // la position en pixel = la position * la taille des blocks 
        var y = position[1] * blocksize;

        // we fill the block with the color
        ctx.fillRect(x, y, blocksize, blocksize);

    }

    // stop the snake 
    function stopsnake(position){
        var x = position[0];
        var y =  position[1];
        console.log("the x is : ",x);
        console.log("the y is : " , y);
        if(x < 0 || y < 0 || x>=canvasWidth/blocksize ||y>=canvasHeight/blocksize){
        alert("Nope Restart plz ");
        location.reload();
        }

    }

    // check for collisions 
    function checkcollision(position1,position2){
        if(position1[0]===position2[0] && position1[1 ]===position2[1]) {
            alert("Collision detected");
            location.reload(); 

        }
    } ;


    // eating check 

    function eatingckeck(){

        var the_snake = snakee.body[0] ; 
        var the_apple_x = v_apple.body[0] ; 
        var the_apple_y = v_apple.body[1] ; 


        console.log("Will this actually like work  : " , the_snake[0]);
        console.log("Will this actually like work  : " , the_snake[1]);

        if(the_snake[0]===the_apple_x && the_snake[1]===the_apple_y){
            return 1 ;
        }
        else {
            return 0 ;
        }

    };

    // changing position

    function changingposition(){
        var check = eatingckeck();
        if(check ===1){
          v_apple.body[0]=Math.round(Math.random() * ((canvasWidth/blocksize)-1)) ;
          v_apple.body[1]=Math.round(Math.random() * ((canvasHeight/blocksize)-1)) ;
        }
    };


    //showing the total

    function showingtotal(){
        ctx.save();
        ctx.font = "bold 50px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.fillText(total,100,canvasHeight-5);
        ctx.restore();

    };



    // the Apple 

    function apple(body) {
        this.body = body;
        //drawing the cercle
        this.draw = function () {
            ctx.save;
            ctx.fillStyle = "red";
            ctx.beginPath();
            var radius = blocksize / 2;
            var x = body[0] * blocksize + radius;
            var y = body[1] * blocksize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };
    }


    // the snake constructor 
    function snake(body, direction) {
        // the body of the snake is te array setup in the start
        this.body = body;
        // the bodys direction
        this.direction = direction;
        // we draw the body
        this.draw = function () {
            ctx.save;
            // filing colors
            ctx.fillStyle = "blue";
            // we draw each block of the body
            for (var i = 0; i < this.body.length; i++) {
                // we call the draw function for each block of the body
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };

        // making the snake advance 

        this.advance = function () {
            // slice copies the array block to the new variable 
            var nextposition = this.body[0].slice();
            // analyse direction
            switch (this.direction) {
                case "left":
                    // the new variable moves 
                    nextposition[0]--;
                    break;
                case "right":
                    nextposition[0]++;
                    break;
                case "up":
                    nextposition[1]--;
                    break;
                case "down":
                    nextposition[1]++;
                    break;
                default:
                    alert("No plz");

            }
            // the new variable is added to the beginning of the array with unshift
            this.body.unshift(nextposition);
            if(total > total_check ){
                total_check++ ;
            }
            else {
                this.body.pop();
            }
            

            
        };


        // setting the direction 

        this.setDirection = function (newDirection) {
            // setting the new direction ???
            // but there's just not no return 
            var allowedDirection;

            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirection = ["up", "down"];
                    break;

                case "up":
                case "down":
                    allowedDirection = ["right", "left"];
                    break;
            }
            if (allowedDirection.indexOf(newDirection) != -1) {
                this.direction = newDirection;
            }

        };

        this.stop = function(){

             stopsnake(this.body[0]);
        };

        this.collision = function(){
            checkcollision(this.body[0],this.body[this.body.length-1]);

        };

        // I need both the direction of v_apple and the snake 
        this.eat = function (){
            total +=eatingckeck();
            console.log("The total is  : ", total);
        }


    }


    document.onkeydown = function keydown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default:
                return;
        }
        console.log("what's the new direction : ", newDirection);
        snakee.setDirection(newDirection);
    }
    


}