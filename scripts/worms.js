let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');


let mouse = 
{
    x: undefined,
    y: undefined
}

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


Worms = function()
{
    RandomColor = () =>
    {
        return "#" + Math.floor((Math.random() * 16777125)).toString(16);
    }

    class Circle 
    {
        constructor() 
        {
            this.radius = 40;
            this.x = Math.random() * (window.innerWidth - this.radius * 2) + this.radius;
            this.y = Math.random() * (window.innerHeight - this.radius * 2) + this.radius;
            this.dx = (Math.random() - 0.5) * 5;
            this.dy = (Math.random() - 0.5) * 5;
        }
        
        draw() 
        {
            c.beginPath();    
            c.strokeStyle = RandomColor();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.stroke();
            //c.fill();
        }
        
        update() 
        {
            if (this.x + this.radius >= window.innerWidth || this.x - this.radius <= 0) this.dx = -this.dx;
            if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) this.dy = -this.dy;
            
            this.x += this.dx;
            this.y += this.dy;
            
            this.draw();
        }
    }

    let circleArray = [];
    
    for (let i = 0; i < 100; i++) 
    {
        circleArray.push(new Circle());
    }


    function animate() 
    {
        requestAnimationFrame(animate);
        // c.fillStyle = 'rgba(255, 255, 255, 0.05)';
        // c.fillRect(0, 0, canvas.width, canvas.height);
        for (circle of circleArray)
        {
            circle.update();
        }
    }
    animate();
}

Worms();