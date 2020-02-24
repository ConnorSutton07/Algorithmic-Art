Balloon = function() 
{
    
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
    
    class Circle 
    {
        constructor() 
        {
            this.radius = 30;
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
           
            //interactivity
            if (mouse.x - this.x < this.radius && mouse.x - this.x > -this.radius
                && mouse.y - this.y < this.radius && mouse.y - this.y > -this.radius)
            {
                this.radius += 1;
            } 
            
            this.draw();
        }
    }

    let circleArray = [];
    let squareArray = [];
    for (let i = 0; i < 75; i++) 
    {
        circleArray.push(new Circle());
    }


    function animate() 
    {
        requestAnimationFrame(animate);
        c.clearRect(0, 0 , window.innerWidth, window.innerHeight);
        for (let i = 0; i < circleArray.length; i++) 
        {
            circleArray[i].update();
        }
    }
    console.log(circleArray);
    animate();
}
