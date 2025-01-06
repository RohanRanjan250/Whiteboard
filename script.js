const canvas = document.querySelector('canvas')
ctx = canvas.getContext('2d')
let isDrawing = false

window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

const startDraw = () =>{
    isDrawing = true;
    ctx.beginPath()
}
const startErase = () => {
    isDrawing = true;
    ctx.beginPath()
    // ctx.lineWidth = 50
    ctx.strokeStyle = 'white'
}

const drawing = (e) => {
    if(!isDrawing) return
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
}

canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => isDrawing = false);

let tool = document.querySelectorAll('.tool')

tool.forEach( i => i.addEventListener('click', (e) => {
        tool.forEach(i => {
            i.style.boxShadow = '';
            i.style.transform = '';
        })
        
        canvas.removeEventListener('mousedown', startDraw);
        canvas.removeEventListener('mousedown', startErase);
        i.style.boxShadow = `0 0 10px green`;
        i.style.transform = 'scale(1.3)';

        if(i.classList.contains('pen')){
            canvas.addEventListener('mousedown', startDraw);
        }
        
        else if(i.classList.contains('eraser')){
            canvas.addEventListener('mousedown', startErase);
        }
        
        else{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            i.style.boxShadow = '';
            i.style.transform = '';
        }
}))

let clr = document.querySelector('.clr')

clr.addEventListener('input', e => {
    ctx.strokeStyle = clr.value
})

let range = document.querySelector('.range')

range.addEventListener('change', e => {
    ctx.lineWidth = range.value
})