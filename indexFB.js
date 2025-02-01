//Flappy Bird game using javascript canvas

//Getting constants
const canvas = document.getElementById("canv");
const context = canvas.getContext("2d");
const beginBtn = document.getElementById("btn")
const jumpBtn = document.getElementById("jumpbtn")
beginBtn.addEventListener("click", begin)

//Setting the canvas size
canvas.height = 600
canvas.width = 600
let isJumping = false
const gravity = 0.6


//bird object
let faby = 
{
    //Faby's spawn position
    y: 1,
    x: canvas.width * 0.1,
    fallSpeed: 0,
    //Faby's Size
    width: 60,
    height: 60,
    //Update position and speed
    set updateX(change)
    {
        this.x += change
    },
    set updateY(change)
    {
        this.y += change
    },
    set updateFallSpeed(change)
    {
        this.fallSpeed += change
    },
    jumpSpeed: 45,  
    targetY: null,
}

//Pipe object
class pipes
{
    constructor(x, height, interval, width)
    {
        this.x = x
        this.height = height
        this.interval = interval
        this.width = width
    }
    drawPipe()
    {
        context.fillStyle = "#42f560"
        //top and bottom pipes
        context.fillRect(this.x, 0, this.width, canvas.height - this.height - this.interval)
        context.fillRect(this.x, canvas.height - this.height, this.width, this.height)   
    }
    updatePipe()
    {
        let speed = 6
        this.x -= speed
        if(this.x <= 0)
        { 
            this.x += 602
            this.height = Math.random() * 450 + 30
        }
    }
}

//Jump trigger, using a button for now
document.addEventListener("keydown", jump)
//jumpBtn.addEventListener("click", jump)

//function to clear and prepare canvas
function initializeCanvas()
{
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = "rgb(52, 177, 182)"
    context.fillRect(0, 0, canvas.width, canvas.height)   
}


//jump function
function jump(e)
{
    if(e.key == "a" && isJumping == false)
    {
        isJumping = true
        faby.fallSpeed = 0
        if(faby.targetY == null)
        {
            faby.targetY = Math.max(faby.y - faby.jumpSpeed * 6, 0)
        }
        console.log("fall speed = " + faby.fallSpeed, "targetY = " +faby.targetY, "Y position = " +faby.y, "Gravity = " +gravity)
    }   
}

//Function to update faby's position including gravity
function updateFaby() 
{
    if(isJumping)
    {
        if (faby.y  <= 0) 
        {
            faby.y = 0;
            isJumping = false
            faby.targetY = null
            faby.fallSpeed = 0; // Reset fall speed when hitting the ground
        } else if (faby.y > faby.targetY)
        {
            faby.y -= faby.jumpSpeed / 3
        } else
        {
            isJumping = false
            faby.fallSpeed = 0;
            faby.targetY = null
            console.log("fall speed = " + faby.fallSpeed, "targetY = " +faby.targetY, "Y position = " +faby.y, "Gravity = " +gravity)
        }
    } else if (faby.y + faby.height < canvas.height) 
    {
        // Update fall speed incrementally
        faby.fallSpeed += gravity;

        // Update position using the current fall speed
        faby.y += faby.fallSpeed;

        // Prevent the bird from overshooting the bottom of the canvas
        if (faby.y + faby.height > canvas.height) {
            faby.y = canvas.height - faby.height;
            faby.fallSpeed = 0; // Reset fall speed when hitting the ground
        }
    }
    // else {
    //     faby.y = canvas.height - faby.height; // Ensure bird stays on the ground
    //     faby.fallSpeed = 0;
    // }
}


//self explanatory
function drawFaby()
{
    context.fillStyle = "#ecf542"
    context.fillRect(faby.x, faby.y, faby.width, faby.height)
}

let pipe1 = new pipes(605, Math.random() * 450 + 45, 120, 50)
let pipe2 = new pipes(605 + 300, Math.random() * 450 + 45, 120, 50)
//game loop; Update, draw and loop
function begin()
{
   
    function gameLoop()
    {
        initializeCanvas();
        updateFaby();
        pipe1.updatePipe()
        pipe2.updatePipe()
        drawFaby();
        pipe1.drawPipe()
        pipe2.drawPipe()
        
        requestAnimationFrame(gameLoop)
    }
    gameLoop();
    
}


