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

