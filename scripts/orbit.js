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


Orbit = function()
{
    const num_particles = Math.floor(window.innerHeight / 6);
    const colors = [
        '#DA3761',
        '#A42481',
        '#793089',
        '#3B3B91',
        '#E44048'];
    
    //Utility Functions
    function randomIntFromRange(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function randomColor(colors)
    {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    class Star
    {
        constructor()
        {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.length = 3;
        }
        update()
        {
            c.fillStyle = 'white';
            c.fillRect(this.x, this.y, this.length, this.length);
        }

    }
    class Particle
    {
        constructor(x, y, radius, color) 
        {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.radians = Math.random() * (Math.PI * 2);
            this.velocity = 0.002;
            this.distanceFromCenter = randomIntFromRange(50, window.innerHeight/1.5);
            this.lastMouse = {x: x, y: y};
        }
        draw(last_point) 
        {
            c.beginPath()
            c.strokeStyle = this.color;
            c.lineWidth = this.radius;
            c.moveTo(last_point.x, last_point.y);
            c.lineTo(this.x, this.y);
            c.stroke();
            c.closePath()
        }
        update() 
        {
            const last_point = {x: this.x, y: this.y};

            console.log(this.velocity);
            //move points
            if (this.velocity <= .05)
            {
                this.velocity += this.velocity * 0.01;
            }
            else
            {
                this.velocity = 0.05;
            }

            this.radians += this.velocity;
            
            //Circular motion
            if (mouse.x == undefined)
            {
                this.x = canvas.width/2 + Math.cos(this.radians) * this.distanceFromCenter;
                this.y = canvas.height/2 + Math.sin(this.radians) * this.distanceFromCenter;
            }
            else {
                this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
                this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
                this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
                this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
            }

            
            this.draw(last_point)
        }
    }

    // Implementation
    let particles = [];
    let stars = [];
    for (let i = 0; i < num_particles; i++) 
    {
        const radius = (Math.random() * 7) + 1;
        particles.push(new Particle(canvas.width/2, canvas.height/2, radius, randomColor(colors)));
        stars.push(new Star());
    }

    // Animation Loop
    function animate() 
    {

        requestAnimationFrame(animate)
       // c.clearRect(0, 0, canvas.width, canvas.height)
        c.fillStyle = 'rgba(0, 0, 0, .07)';
        c.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < num_particles; i++)
        {
            particles[i].update();
            stars[i].update();

        }
    }
    console.log(window.innerHeight);
    animate();
}

Orbit();