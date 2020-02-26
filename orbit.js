Orbit = function()
{
    const num_particles = Math.floor(window.innerHeight / 6);
    const colors = [
        '#F27781',
        '#18298C',
        '#04BF8A',
        '#F2CF1D',
        '#F29F05'];
    
    //Utility Functions
    function randomIntFromRange(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function randomColor(colors)
    {
        return colors[Math.floor(Math.random() * colors.length)];
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
            this.velocity = 0.05;
            this.distanceFromCenter = randomIntFromRange(50, window.innerHeight/1.5);
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
            this.radians += this.velocity;
            
            //Circular motion
            this.x = mouse.x + Math.cos(this.radians) * this.distanceFromCenter;
            this.y = mouse.y + Math.sin(this.radians) * this.distanceFromCenter;
            
            this.draw(last_point)
        }
    }

    // Implementation
    let particles = [];
    for (let i = 0; i < num_particles; i++) 
    {
        const radius = (Math.random() * 10) + 1;
        particles.push(new Particle(canvas.width/2, canvas.height/2, radius, randomColor(colors)));
    }
    
    console.log(particles);


    // Animation Loop
    function animate() 
    {

        requestAnimationFrame(animate)
       // c.clearRect(0, 0, canvas.width, canvas.height)
        c.fillStyle = 'rgba(255, 255, 255, 0.05)';
        c.fillRect(0, 0, canvas.width, canvas.height);
        for (particle of particles)
        {
            particle.update();
        }
    }
    console.log(window.innerHeight);
    animate();
}