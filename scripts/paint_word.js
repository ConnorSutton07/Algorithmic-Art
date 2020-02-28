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


PaintWord = function()
{
   let isDrawing = false;
   let text = 'peepee b'
   document.addEventListener('mousedown', () => {isDrawing = true;});
   document.addEventListener('mouseup', () => {isDrawing = false;});
   document.addEventListener('mousemove', (e) =>
   {
       if (isDrawing)
       {
           c.fillText(text, mouse.x, mouse.y) 
       }
   });
}

