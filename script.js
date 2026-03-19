const ROWS = 15;
const COLS = 15;
const HEX_W = 60;
const HEX_H = 69;

//basic variables
let industry=6000;

let politicalPower=50;
let generalStrength=100;
let tyranny=0;



//owned industry
let ownedSpace=0;
let ownedIndustry=0;

let ownedFarms=0;
let ownedBarracks=0;









const grid = document.getElementById("grid");
let hashome = false;
const hexMap = {};
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const hex = document.createElement("div");
    hex.className = "hex";
    hex.textContent = `${row},${col}`;

    // Store row/col on the element for easy access
    hex.dataset.row = row;
    hex.dataset.col = col;

    // Save to our map: "0-5" = hex element
    hexMap[`${row}-${col}`] = hex;
    // Odd rows shifted right for a staggered grid
    const xOffset = row % 2 === 1 ? HEX_W / 2 : 0;

    // Calculate positions
    const x = col * HEX_W + xOffset;
    const y = row * (HEX_H * 0.75);

    hex.style.left = `${x}px`;
    hex.style.top = `${y}px`;
   // click determine
    hex.addEventListener("click", () => {
      if (!hashome) {
        hex.classList.add("home");
        hashome = true;
        ownedSpace+=1;
        generalStrength+=600;
        document.getElementById("catpower").textContent=generalStrength;
      } else {
        if (isAdjacentToOwned(row, col) && politicalPower>40 && generalStrength>600) {
          hex.classList.add("active", "owned")
          ownedSpace+=1;
          generalStrength-=550;
          politicalPower-=35;
          document.getElementById("politics").textContent=politicalPower;
          document.getElementById("catpower").textContent=generalStrength;
          
          
        } else {
          console.log("Too far away! You can only expand to neighbors.");
        }
      }
    });

    grid.appendChild(hex);
  }
}

function isAdjacentToOwned(r, c) {
  const isOdd = r % 2 === 1;

  // Define the 6 relative directions based on row parity
  const neighbors = isOdd
    ? [
        [0, -1],
        [0, 1],
        [-1, 0],
        [-1, 1],
        [1, 0],
        [1, 1],
      ] // Odd row
    : [
        [0, -1],
        [0, 1],
        [-1, -1],
        [-1, 0],
        [1, -1],
        [1, 0],
      ]; // Even row

  for (let [dr, dc] of neighbors) {
    const neighborHex = hexMap[`${r + dr}-${c + dc}`];
    if (neighborHex && (neighborHex.classList.contains("owned") || neighborHex.classList.contains("home"))) {
      return true; // Found an adjacent owned hex!
    }
  }
  return false;
}

// Ensure the container is large enough for the absolute positioned children
grid.style.position = "relative";
grid.style.width = `${COLS * HEX_W + HEX_W / 2}px`;
grid.style.height = `${ROWS * (HEX_H * 0.75) + HEX_H * 0.25}px`;







//others

setInterval(()=>{
  
  console.log("I repeat")
  //industry snowballing

  //farms
  industry+=5*ownedFarms
  generalStrength+=1*ownedFarms
  //barracks
  generalStrength+=25*ownedBarracks
  
  //Political power
  politicalPower+=1
  
  
  
  document.getElementById("politics").textContent=politicalPower;
  document.getElementById("catpower").textContent=generalStrength;
  document.getElementById("industry").textContent=industry;
                
                
                
                },1000);

function farm(){
  if (industry>500 && politicalPower>2 && ownedIndustry<ownedSpace){
    industry-=75
    politicalPower-=1
    generalStrength+=5
    ownedFarms+=1
    ownedIndustry+=1
    document.getElementById("ownedFarms").textContent=ownedFarms
    
  }
    
  
};



function enlistment(){
  if (politicalPower>2){
    generalStrength+=50;
    politicalPower-=1;
    tyranny+=1;
    document.getElementById("catpower").textContent=generalStrength;
    document.getElementById("politics").textContent=politicalPower;
  }

  
};



function barracks(){
  if (politicalPower>2 && ownedIndustry<ownedSpace){
    politicalPower-=1;
    industry-=3000;
    ownedIndustry+=1;
    ownedBarracks+=1;
    document.getElementById("barracksOwned").textContent=ownedBarracks;
      
  };
}


function propaganda(){
  if (industry>5 && generalStrength>100){
    politicalPower+=5;
    industry-=100;
    generalStrength-=100;
    tyranny+=2;
    document.getElementById("politics").textContent=politicalPower;
    document.getElementById("catpower").textContent=generalStrength;
    document.getElementById("industry").textContent=industry;

  }
}


function patrol(){
  if (industry>6000 && generalStrength>350){
    industry-=6000;
  }
}
