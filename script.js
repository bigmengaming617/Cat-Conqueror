const ROWS = 20;
const COLS = 20;
const HEX_W = 90;
const HEX_H = 103.5;
let enemyRow=0
let enemyCol=0
//basic variables
let industry=200;
let army=0;
let capitalLevel=0;
let enduranceBonus=0;
let intel=false;
let politicalPower=50;
let generalStrength=100;
let tyranny=0;
//multipliers/discounts
let discount=1
let barracksMultiplier=1;
let budgetcut=false;
let barrel=false;
let warPoliticalBonus=0;
let zedBuff=1;
//enemy variable
let enemyPoliticalPower=50;
let enemyStrength=700;
let enemySpaces=0;
let enemyOilDerrick=0;


//wardecide
let peace=false;

let war=false;
let gameOver=false;

//pcp
let politicians=0

//owned industry
let ownedSpace=0;
let ownedIndustry=0;

let ownedFarms=0;
let ownedBarracks=0;
let ownedPatrol=0;
let ownedFactory=0
let militaryFactoryBonus=0;
let ownedOilDerrick=0;
const rand=(min,max) => Math.floor(Math.random()*(max-min+1))+min;
function musicplayer(){
  if (war!=true){
    num=rand(2,2)
    
    if (num==2){
      document.getElementById("185").play()
    }

    
  }
  else if (war==true){
    document.getElementById("145").play();
  }
}





const grid = document.getElementById("grid");
let hashome = false;
const hexMap = {};
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const hex = document.createElement("div");
    hex.className = "hex";
    // hex.textContent = `${row},${col}`;

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
        homeRow=row;
        homeCol=col;
        hashome = true;
        capitalLevel+=1;
        ownedSpace+=1;
        generalStrength+=600;
        hex.textContent="Capital *"
        document.getElementById("catpower").textContent=generalStrength;
      } else {
        if (hex.classList.contains("enemy")&&isAdjacentToOwned(row,col)&&politicalPower>100-warPoliticalBonus&&generalStrength>4000){
          hex.classList.remove("enemy")
          hex.classList.add("owned");
          
          ownedSpace+=1;
          enemySpaces-=1
          generalStrength-=4000;
          politicalPower-=100-warPoliticalBonus;
          war=true;
          peace=false;
          document.getElementById("WAR!").play();
          console.log("hay")
          tyranny+=5000

        }
        if (hex.classList.contains("enemyOilDerrick")&&isAdjacentToOwned(row,col)&&politicalPower>100-warPoliticalBonus&&generalStrength>4000){
            hex.classList.remove("enemy");
            hex.classList.remove("enemyOilDerrick");
            hex.classList.add("owned","oilDerrick");
            hex.textContent = "Oil Derrick";
            ownedSpace+=1;
            enemySpaces-=1
            generalStrength-=4000;
            politicalPower-=100-warPoliticalBonus;
            ownedOilDerrick+=1;
            ownedIndustry+=1;
            war=true;
            peace=false;
            document.getElementById("WAR!").play();
            tyranny+=5000

          }


        
        if (isAdjacentToOwned(row, col) && politicalPower>35 && generalStrength>650 -enduranceBonus&& hex.classList.contains("owned")==false && hex.classList.contains("home")!=true) {
          hex.classList.add("active", "owned")
          ownedSpace+=1;
          generalStrength-=650-enduranceBonus;
          politicalPower-=35;
          document.getElementById("politics").textContent=politicalPower;
          document.getElementById("catpower").textContent=generalStrength;
          
          
        }
        

        else if (hex.classList.contains("home")==true && hex.classList.contains("owned")==false && politicalPower>=500 && capitalLevel==1){
          hex.textContent="Capital **";
          politicalPower-=500;
          capitalLevel+=1;
          console.log("caplvl2")
        }
        else if (hex.classList.contains("home")==true && hex.classList.contains("owned")==false && politicalPower>=1000 && capitalLevel==2){
            hex.textContent="Capital ***";
            politicalPower-=1000;
            capitalLevel+=1;
          }
        else if (hex.classList.contains("home")==true && hex.classList.contains("owned")==false && politicalPower>=2000 && capitalLevel==3){
            hex.textContent="Capital ****";
            politicalPower-=2000;
            capitalLevel+=1;
          }
        else if (hex.classList.contains("home")==true && hex.classList.contains("owned")==false && politicalPower>=4000 && capitalLevel==4){
            hex.textContent="Capital *****";
            politicalPower-=4000;
            capitalLevel+=1;
          }
        else if (hex.classList.contains("owned")==true &&hex.classList.contains("home")==false && hex.classList.contains("fortified1")==false && politicalPower>=35 && generalStrength>650 && hex.classList.contains("oilDerrick")==false &&capitalLevel>=3){
            hex.textContent="[*]";
            politicalPower-=35;
            generalStrength-=650;
            
            hex.classList.add("fortified1");
            console.log("Hey")
          }
        else if (hex.classList.contains("owned")==true && hex.classList.contains("home")==false && hex.classList.contains("fortified1")==true && hex.classList.contains("fortified2")==false && politicalPower>=35 && generalStrength>650&&capitalLevel>=4){
            hex.textContent="[**]";
            politicalPower-=35;
            generalStrength-=650;
            console.log("fortified2")
            hex.classList.add("fortified2");
          }
        // else if (hex.classList.contains("enemy")&&isAdjacentToOwned(row,col)&&politicalPower>100&&generalStrength>4000){
        //   hex.classList.remove("enemy")
        //   hex.classList.add("active","owned");
        //   ownedSpace+=1;
        //   generalStrength-=4000;
        //   politicalPower-=100;
        //   war=true;
          
        // }
        
        
        
        else {
          console.log("Too far away! You can only expand to neighbors.");
        }
      }



      
    });


    

    grid.appendChild(hex);
  }
}

function generateStartingPoint(){
  let randomRow=rand(1,ROWS-1);
  let randomCol=rand(1,COLS-1);
  console.log(`row${randomRow}`);
  console.log(`col${randomCol}`);
  const hex=hexMap[`${randomRow}-${randomCol}`];
  
  hex.classList.add('enemy');
  enemySpaces+=1;
  hex.textContent="Gerbil Capital";
  enemyRow=randomRow
  enemyCol=randomCol
  
}
function enemyBuild(){
  randomNumber=rand(1,10);
  
  if (randomNumber==3 && enemyPoliticalPower>=50){
    check=false;
    while (check!=true){
      randrow=rand(0,ROWS-1);
      randcol=rand(0,COLS-1);
      const buildTile=hexMap[`${randrow}-${randcol}`];
      if (buildTile.classList.contains("enemy")==true && buildTile.textContent!="Gerbil Capital"){
        randomNumber=rand(1,1)
        if (randomNumber==1 && enemyPoliticalPower>50){
          buildTile.classList.add("enemyOilDerrick");
          enemyPoliticalPower-=50;
          buildTile.textContent="Oil Derrick";
          enemyOilDerrick+=1;
          console.log("oil drick built")
          check=true;
          break
          
        }
        else{
          check=true;
          break
        }
      }
      

    }
    
  }
  else{return console.log("skip build")}
  
  
}
function enemyCapture(){
  randomNumber=rand(1,3);
  
  
  if (enemyPoliticalPower>50){
    check=false;
    enemyPoliticalPower-=50
    while (check!=true){
      randrow=rand(0,ROWS-1);
      randcol=rand(0,COLS-1);
      if (isAdjacentToEnemy(randrow,randcol)==true){
        const capturedTile=hexMap[`${randrow}-${randcol}`];


        if(capturedTile.classList.contains("owned")==true && enemyStrength>500 && war==true && capturedTile.classList.contains("fortified1")!=true && capturedTile.classList.contains("fortified2")!=true && capturedTile.classList.contains("oilDerrick")==false){
          generalStrength-=1000;
          console.log(enemyStrength);
          enemyStrength-=500;
          capturedTile.classList.add("enemy");
          capturedTile.classList.remove("owned","fortified1");
          capturedTile.textContent="0"
          check=true;
          war=true;
          peace=false;
          ownedSpace-=1;
          politicalPower-=100
          ownedIndustry-=1;
          document.getElementById("WAR!").play();
          enemySpaces+=1
          console.log("cap reg")
          
      
          break
          
        }
        if(capturedTile.classList.contains("fortified1")==true && capturedTile.classList.contains("fortified2")==false && enemyStrength>5000 && war==true && capturedTile.classList.contains("oilDerrick")==false ){
          generalStrength-=1000;
          console.log(enemyStrength);
          enemyStrength-=5000;
          capturedTile.classList.add("enemy");
          capturedTile.classList.remove("fortified1","owned")
          capturedTile.textContent="0"
          check=true;
          war=true;
          peace=false;
          ownedSpace-=1;
          politicalPower-=100
          ownedIndustry-=1;
          document.getElementById("WAR!").play();
          enemySpaces+=1
          console.log("captured for1")


          break
        

        }
        if(capturedTile.classList.contains("fortified2") && enemyStrength>10000 && war==true && capturedTile.classList.contains("oilDerrick")==false){
          generalStrength-=1000;
          console.log(enemyStrength);
          enemyStrength-=10000;
          capturedTile.classList.add("enemy");
          capturedTile.classList.remove("fortified1","owned","fortified2")
          capturedTile.textContent="0"
          check=true;
          war=true;
          peace=false;
          ownedSpace-=1;
          politicalPower-=100
          ownedIndustry-=1;
          document.getElementById("WAR!").play();
          enemySpaces+=1
          console.log("captured fort2")


          break


        }
        if(capturedTile.classList.contains("oilDerrick")==true && capturedTile.classList.contains("owned")==true && enemyStrength>10000 && war==true){
          generalStrength-=1000;
          console.log("hello");
          enemyStrength-=10000;
          capturedTile.classList.add("enemyOilDerrick");
          capturedTile.classList.add("enemy")
          capturedTile.classList.remove("owned");
          capturedTile.classList.remove("oilDerrick");
          capturedTile.textContent="Oil Derrick";
          check=true;
          war=true;
          peace=false;
          ownedSpace-=1;
          politicalPower-=100
          ownedIndustry-=1;
          ownedOilDerrick-=1;
          enemyOilDerrick+=1;
          document.getElementById("WAR!").play();
          enemySpaces+=1;


          break


        }
        if(capturedTile.classList.contains("home")&&enemyStrength>5000 && war==true){
          generalStrength-=100000;
          capturedTile.classList.add("enemy");
          check=true;
          war=true;
          peace=false;
          ownedSpace-=1;
          ownedIndustry-=1;
          politicalPower-=1000;
          document.getElementById("WAR!").play();
          enemySpaces+=1
          console.log("cap home")
        }
        
        
        
        else if(capturedTile.classList.contains("owned")==false  && capturedTile.classList.contains("home")==false && capturedTile.classList.contains("enemy")==false && capturedTile.classList.contains("enemyOilDerrick")==false){
        capturedTile.classList.add("enemy");
        capturedTile.textContent="0"
        check=true;
        enemySpaces+=1;
        console.log("cap empty")
        break
        }
        else{
          console.log("no turn")
          enemyPoliticalPower+=50;
          break
        }
        
        
        
      }
    }
    
    
  }
}
//Make Enemy be able to capture/expand
function isAdjacentToEnemy(r,c){
  const isOdd = r % 2 === 1;
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
    if (neighborHex && (neighborHex.classList.contains("enemy"))) {
      return true; // Found an adjacent owned hex!
    }
  }
  return false;
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
    if (neighborHex && (neighborHex.classList.contains("owned") || neighborHex.classList.contains("home") || neighborHex.classList.contains("fortified1") || neighborHex.classList.contains("fortified2") || neighborHex.classList.contains("oilDerrick"))) {
      return true; // Found an adjacent owned hex!
    }
  }
  return false;
}

// Ensure the container is large enough for the absolute positioned children
grid.style.position = "relative";
grid.style.width = `${COLS * HEX_W + HEX_W / 2}px`;
grid.style.height = `${ROWS * (HEX_H * 0.75) + HEX_H * 0.25}px`;



for (let i=0;i<1;i++){
  generateStartingPoint();
}



//others

setInterval(()=>{
  enemyPoliticalPower+=0.5*enemySpaces+5*enemyOilDerrick;
  enemyStrength+=50*enemySpaces+100*enemyOilDerrick;
  enemyBuild();

  enemyCapture();
  if (intel==true){
    document.getElementById("enemyPCP").textContent=`Enemy Political power ${enemyPoliticalPower}`
    document.getElementById("enemyStrength").textContent=`Enemy Strength ${enemyStrength}`
  }
  else{console.log("yo")}

  //news
  if (0>generalStrength && 0>politicalPower){
    document.getElementById("newsH2").textContent="We have LOST!";
    gameOver=true;
  }
  else if (0>politicalPower){
    document.getElementById("newsH2").textContent="Government Shutdown"
  }
  if (gameOver==true){
    window.location.href="gameOver.html"
  }
  if (enemySpaces==0){
    document.getElementById("newsH2").textContent="We have WON!"
  }


  if (10000>tyranny&& tyranny>1000){
    document.getElementById("newsCapital").textContent="kitty leader makes questionable decisions"
  }
  else if (100000>tyranny&&tyranny>10000){
    document.getElementById("newsCapital").textContent="New rival political parties form against kitty leader"
  }
  else if (1000000>tyranny&&tyranny>100000){
    document.getElementById("newsCapital").textContent="protests form in the streets"
  }
  //techtree
  if (peace==true){
    politicalPower+=1;
    industry+=25;
  }

  

  document.getElementById("openSpace").textContent=ownedSpace-ownedIndustry
  
  // console.log("I repeat")
  army=generalStrength/50;
  document.getElementById("army").textContent=Math.round(army);



  if(war==true){
    document.getElementById("newsH1").textContent="WAR!!!"
  }
  //industry snowballing



  
  //farms
  industry+=25*ownedFarms
  generalStrength+=5*ownedFarms
  document.getElementById("ownedFarms").textContent=ownedFarms;
  //factory
  industry+=75*ownedFactory
  generalStrength+=militaryFactoryBonus*ownedFactory
  //politics
  politicalPower+=5*politicians;
  

  //barracks
  generalStrength+=(25*ownedBarracks)*barracksMultiplier;
  document.getElementById("barracksOwned").textContent=ownedBarracks;

  //zed
  generalStrength+=(900*zedBuff)*ownedPatrol;
  //Political power
  
  politicalPower+=0.5+capitalLevel**2;


  //oil
  industry+=100000*ownedOilDerrick;
  
  
  
  document.getElementById("politics").textContent=politicalPower;
  document.getElementById("catpower").textContent=generalStrength;
  document.getElementById("industry").textContent=Math.round(industry);
                
                
                
                },1000);

function farm(){

  if (budgetcut==true){
    if (industry>75-75/discount && politicalPower>2 && ownedIndustry<ownedSpace){
      industry-=75-75/discount
      politicalPower-=1
      generalStrength+=5
      ownedFarms+=1
      ownedIndustry+=1
      document.getElementById("ownedFarms").textContent=ownedFarms;
      document.getElementById("construct").play();

  }
  
  }
  else{
    if (industry>75 && politicalPower>2 && ownedIndustry<ownedSpace){
      industry-=75
      politicalPower-=1
      generalStrength+=5
      ownedFarms+=1
      ownedIndustry+=1
      document.getElementById("ownedFarms").textContent=ownedFarms;
      document.getElementById("construct").play();

   }
  }
    
  
};



function enlistment(){
  if (politicalPower>2){
    if (army>0){
      generalStrength+=20
    }
    else if(army>50){
      generalStrength+=10
    }
    else if(army>100){
      generalStrength+=5
    }
    politicalPower-=1;
    tyranny+=1;
    
    
    document.getElementById("catpower").textContent=generalStrength;
    document.getElementById("politics").textContent=politicalPower;
    document.getElementById("enlist").play();
  }

  
};



function barracks(){
  if (politicalPower>2 && ownedIndustry<ownedSpace && industry>3000){
    politicalPower-=1;
    industry-=3000;
    ownedIndustry+=1;
    ownedBarracks+=1;
    document.getElementById("barracksOwned").textContent=ownedBarracks;
    document.getElementById("construct").play()
  };
};


function propaganda(){
  if (industry>5 && generalStrength>100){
    politicalPower+=5;
    industry-=100;
    generalStrength-=100;
    tyranny+=2;
    document.getElementById("politics").textContent=politicalPower;
    document.getElementById("catpower").textContent=generalStrength;
    document.getElementById("industry").textContent=industry;
    document.getElementById("newspeak").play();

  };
};

function patrol(){
  if (industry>400000 && ownedIndustry<ownedSpace){
    industry-=400000;
    ownedIndustry+=1;
    ownedPatrol+=1;
    document.getElementById("patrol").textContent=ownedPatrol;
    document.getElementById("industry").textContent=industry;
    document.getElementById("construct").play();
  };
}

function destroyFarms(){
  if (industry>60&&ownedFarms>=1){
    ownedFarms-=1;
    document.getElementById("ownedFarms").textContent=ownedFarms;

    industry-=60;
    ownedIndustry-=1;
    
    document.getElementById("ownedFarms").textContent=ownedFarms;
    
    
    
  }
  document.getElementById("ownedFarms").textContent=ownedFarms;


}
function destroyBarracks(){
  if (industry>60&&ownedBarracks>=1){
    ownedBarracks-=1;
    industry-=60;
    ownedIndustry-=1
    document.getElementById("barracksOwned").textContent=ownedBarracks;
    
  }
}
function destroyPatrol(){
  if (industry>60&&ownedPatrol>=1){
    ownedPatrol-=1;
    industry-=60;
    ownedIndustry-=1;
    document.getElementById("patrol").textContent=ownedPatrol;

  }
}

function factory(){
  if(budgetcut==true){
    if (industry>5000-5000/discount&&ownedSpace>ownedIndustry){
      industry-=5000-5000/discount;
      ownedIndustry+=1;
      ownedFactory+=1;
      document.getElementById("ownedFactory").textContent=ownedFactory;
      document.getElementById("construct").play();
    }
  }
  else{
    if (industry>5000&&ownedSpace>ownedIndustry){
      industry-=5000;
      ownedIndustry+=1;
      ownedFactory+=1;
      document.getElementById("ownedFactory").textContent=ownedFactory;
      document.getElementById("construct").play();
    }
  }
  
}
function destroyFactory(){
  if (industry>60&&ownedFactory>=1){
    industry-=60;
    ownedIndustry-=1;
    ownedFactory-=1;
    document.getElementById("ownedFactory").textContent=ownedFactory;
  }
}
function politician(){
  if (politicalPower>250){
    politicians+=1;
    politicalPower-=250;
    document.getElementById("politicians").textContent=politicians;
    tyranny+=70;
    document.getElementById("newspeak").play();
  }
}
function peacetime(){
  if(politicalPower>10 && war!=true && peace==false && capitalLevel>=1){
    politicalPower-=10;
    peace=true;
    document.getElementById("newsH1").textContent="Peacetime Increases Gains"
    document.getElementById("research").play();
  }
}

function budgetCuts(){
  if(politicalPower>50 && budgetcut!=true && capitalLevel>=1){
    discount+=9;
    politicalPower-=50;
    budgetcut=true;
    document.getElementById("research").play();
    document.getElementById("newsH3").textContent="Industrial plants face budget cuts";
    tyranny+=50;
  }
}

function scrapeBarrel(){
  if(politicalPower>300 && barrel==false && capitalLevel>=1){
    barracksMultiplier=1.5;
    politicalPower-=300;
    tyranny+=5000;
    barrel=true;
    document.getElementById("research").play();
    document.getElementById("newsH4").textContent="Extreme Drafts Target Able-Bodied Cats";
  }
}


function militaryFactories(){
  if (politicalPower>500 && capitalLevel>=2 && militaryFactoryBonus==0){
    militaryFactoryBonus=15;
    politicalPower-=500;
    tyranny+=5000;
    document.getElementById("research").play();
    document.getElementById("newsH3").textContent="Industrial plants now construct weaponry";
    
  }
}
function endurance(){
  if (politicalPower>=500 && capitalLevel>=2 && enduranceBonus==0){
    enduranceBonus+=150;
    politicalPower-=500;
    document.getElementById("research").play();
    document.getElementById("newsH4").textContent="Endurance of Expedition Teams Bolstered";
  }
}
let warGoal=false;
function warGoals(){
  if (politicalPower>=500 && capitalLevel>=3 &&warGoal==false){
    politicalPower-=500;
    warPoliticalBonus+=50;
    war=true;
    tyranny+=50000
    document.getElementById("WAR!").play();
    document.getElementById("grinder").play();
  }
}
function GED(){
  if (politicalPower>=2500 && capitalLevel>=4 && zedBuff==1){
    politicalPower-=2500;
    zedBuff+=2;
    tyranny+=500000;
    document.getElementById("research").play();
  }
}
function intelligence(){
  if (politicalPower>=300 && capitalLevel>=4 && intel==false){
    politicalPower-=300;
    intel=true;
    document.getElementById("research").play();
  }
}
