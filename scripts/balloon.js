let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');


let mouse = 
{
    x: undefined,
    y: undefined
}

let isClicked = false;
let isPointer = false;
window.addEventListener('mousemove', 
    function(e) 
    {
        mouse.x = e.x;
        mouse.y = e.y;
    }
);

window.addEventListener('resize', () => 
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousedown', ()=> { isClicked = true; });
window.addEventListener('mouseup', () => { isClicked = false; });
window.addEventListener('touchstart', ()=> { isClicked = true; });
window.addEventListener('touchend', () => { isClicked = false; });


//make game - pop all the balloons in a certain amount of time, gets harder each level -- more balloons, less time, etc.


Balloon = function()
{
    let minRadius = Math.floor(window.innerWidth / 15);
    let colorArray = [
        '#2DDFFF',
        '#F5F474',
        '#E33CC7',
        '#FFAA47',
        '#F54D28'];


    class Circle
    {
        constructor(i)
        {
            this.radius = 40;
            this.index = i
            this.x = Math.random() * (window.innerWidth - this.radius * 2) + this.radius;
            this.y = Math.random() * (window.innerHeight - this.radius * 2) + this.radius;
            this.dx = (Math.random() - 0.5) * 5;
            this.dy = (Math.random() - 0.5) * 5;
            this.color = c.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
            this.popped = false;
            this.hasMouse = false;
        }

        draw()
        {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
        }

        update()
        {
            if (!this.popped)
            {
                if (this.x + this.radius >= window.innerWidth || this.x - this.radius <= 0) this.dx = -this.dx;
                if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) this.dy = -this.dy;

                this.x += this.dx;
                this.y += this.dy;

                //interactivity
                if (mouse.x - this.x < this.radius && mouse.x - this.x > -this.radius
                    && mouse.y - this.y < this.radius && mouse.y - this.y > -this.radius)
                {
                    this.radius += 1;
                    this.hasMouse = true;
                    isPointer = true;
                    console.log("balloon at" + this.index + " should be popped.");
                }
                else if (this.radius > minRadius)
                {
                    this.radius -= 1;
                    this.hasMouse = false;
                }
                else 
                {
                    this.hasMouse = false;
                }

                this.draw();
            }
        }
    }

    let circleArray = [];

    for (let i = 0; i < Math.floor(window.innerWidth / 18); i++)
    {
        circleArray.push(new Circle(i));
    }

    function animate()
    {
        if (isPointer == true) document.body.style.cursor = 'pointer';
        else document.body.style.cursor = 'default';
        isPointer = false;

        requestAnimationFrame(animate);
        c.clearRect(0, 0 , window.innerWidth, window.innerHeight);
        c.fillStyle = '#4d004d';
        c.fillRect(0, 0, innerWidth, innerHeight);
        for (let i = circleArray.length - 1; i >= 0; i--)
        {
            circleArray[i].update();
        }

        for (let i = 0; i < circleArray.length; i++)
        {
            if (circleArray[i].hasMouse && isClicked && !circleArray[i].popped)
            {
                circleArray[i].popped = true;
                isClicked = false;
            }
        }
        isClicked = false;
        
    }
    animate();
}

Balloon();