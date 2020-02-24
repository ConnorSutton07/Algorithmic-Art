Chaos = function()
{
    RandomColor = () =>
    {
        return "#" + Math.floor((Math.random() * 16777125)).toString(16);
    }
    c.fillStyle = RandomColor();
    c.strokeStyle = c.fillStyle;
    setInterval(function(){c.fillStyle = RandomColor();}, 1000);

    class Square {
        constructor() 
        {
            this.length = 50;
            this.x = Math.random() * (window.innerWidth - this.length);
            this.y = Math.random() * (window.innerHeight - this.length);
            this.dx = (Math.random() - 0.5) * 5;
            this.dy = (Math.random() - 0.5) * 5;
        }
        
        draw()
        {
            c.beginPath();

            c.fillRect(this.x, this.y, this.length, this.length);
            c.stroke();
        }
        
        update()
        {
            if (this.x >= window.innerWidth - this.length || this.x <= 0) this.dx = -this.dx;
            if (this.y >= window.innerHeight - this.length || this.y <= 0) this.dy = -this.dy;
            
            this.x += this.dx;
            this.y += this.dy;
            
            this.draw();
        }
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
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.stroke();
            c.fill();
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
    let squareArray = [];
    for (let i = 0; i < 100; i++) 
    {
        circleArray.push(new Circle());
        squareArray.push(new Square());
    }


    function animate() 
    {
        requestAnimationFrame(animate);
        //c.clearRect(window.innerWidth * (1/3), window.innerHeight * (1/3), window.innerWidth * (1/3), window.innerHeight * (1/3));
        for (let i = 0; i < circleArray.length; i++) 
        {
            circleArray[i].update();
            //squareArray[i].update();
        }
    }
    animate();
}
