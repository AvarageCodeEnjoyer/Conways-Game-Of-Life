var time = 1000;
const rules = document.getElementById('accordion')
const strBtn = document.getElementById('strBtn'); 
const stopBtn = document.getElementById('stopBtn'); 
const playArea = document.getElementById('genNum')
var clickCount = 0;
start()

strBtn.addEventListener('click', () => {
  startCheck()
  // strBtn.style.display = 'none',
  endBtn.style.display = 'visible',
  playArea.style.display= 'flex',
  clickCount = 0;
  return clickCount
});

stopBtn.addEventListener('click', () => {
  clickCount = 1
  return clickCount
})

// document.getElementById('button').addEventListener('click', () => {requestAnimationFrame(update)})

function start(){
  
  let canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  let i = 0;
  const resolution = 10;
  canvas.width = 700;
  canvas.height = 700;

  const COLS = canvas.width / resolution;
  const ROWS = canvas.height / resolution

  function buildGrid(){
  return new Array(COLS).fill(null)
    .map(() => new Array(ROWS).fill(null)
      .map(() => Math.floor(Math.random() * 2)));
  }

  let grid = buildGrid();

  // render(grid);
  function update(){
    grid = nextGen(grid)
    render(grid);
    // requestAnimationFrame(update);
    i++
    playArea.innerHTML = i 
  } 

setInterval( function startCheck(){
  if (clickCount === 0){
    console.log("hello")
    requestAnimationFrame(update)
  }
  else{
    return
  }
},time) 

  
 

  function nextGen(grid){
    const nextGen = grid.map(arr => [...arr]);
      for(let col = 0; col < grid.length; col++){
        for(let row = 0; row < grid[col].length; row++){
          const cell = grid[col][row];
          let numNeighbor = 0;
          for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
              if(i === 0 && j ===0){
                continue;
              }
              const x_cell = col + i;
              const y_cell = row + j;

              if(x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS){
                const currentNeighbor = grid[col + i][row + j];
                numNeighbor += currentNeighbor;
              }
          }
        }

        // Rules
        if(cell ===1 && numNeighbor < 2){
          nextGen[col][row] = 0;
        }else if(cell === 1 && numNeighbor > 3){
          nextGen[col][row] = 0;
        }else if(cell === 0 && numNeighbor === 3){
          nextGen[col][row] = 1;
        }
      }
    }
    return nextGen
  }

  function render(grid){
    for(let col = 0; col < grid.length; col++){
      for(let row = 0; row < grid[col].length; row++){
        const cell = grid[col][row];
        ctx.beginPath();
        ctx.rect(col * resolution, row * resolution, resolution, resolution);
        ctx.fillStyle = cell ? 'black' : 'white';
        // ctx.stroke()
        ctx.fill();
      }
    }
  }


  // console.log(grid)
    
}
