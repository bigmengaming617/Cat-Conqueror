const ROWS= 5;
const COLS = 5;
const HEX_W = 60;
const HEX_H =  69;

const grid=document.getElementById('grid');

for (let row=0; row <ROWS;row++){
  // loop thru each column with current row
  for (let col=0;col<COLS;col++){
    // Create new element 1 hex
    const hex=document.createElement('div');
    // hex css class so styled as a hexagon
    hex.className='hex';
    // rol col coords as text
    hex.textContent = `${row},${col}`;
    //odd rows shifted right
    const xOffset = row %2===1 ? HEX_W / 2:0;
    // cal x position
    const x=col*HEX_W+xOffset;
    //cal y pos
    const y =  row*(HEX_H * 0.75);
    hex.style.left=`${x}px`;
    hex.style.top=`${y}px`;
    hex.addEventListener("click",()=>hex.classList.toggle("active"));
    grid.appendChild(hex);
    
  }
  
}
grid.style.width=`${COLS*HEX_W + HEX_W/2}px`;
grid.style.height=`${ROWS*(HEX_H*0.75) + HEX_H*0.25}px`;