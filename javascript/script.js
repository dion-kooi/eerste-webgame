let maxGold = parseFloat(localStorage.getItem("gold")) || 250;
let maxElixir = parseFloat(localStorage.getItem("elixir")) || 200;
let maxDarkElixir = parseFloat(localStorage.getItem("darkElixir")) || 50;


let goldStorageLevel = parseInt(localStorage.getItem('goldStorageLevel')) || 1;
let UpgradeCostGoldStorage = calculateUpgradeCostGoldStorage();


let ElixirStorageLevel = parseInt(localStorage.getItem('elixirStorageLevel')) || 1;
let UpgradeCostElixirStorage = calculateUpgradeCostElixirStorage();

// let gems =
let gold = Math.min(parseFloat(localStorage.getItem('gold')) || 0, maxGold);
let elixir = Math.min(parseFloat(localStorage.getItem('elixir')) || 0, maxElixir);
let darkelixir = Math.min(parseFloat(localStorage.getItem('darkelixir')) || 0, maxDarkElixir);
let buildingLevel = parseInt(localStorage.getItem('buildingLevel')) || 1;
let upgradeCost = calculateUpgradeCost();
let lastBuildingLevel = buildingLevel; 
let alertShown = false; 


const buildingNames = [
    "StormCitadel",
    "EmberCitadel",
    "CelestiaCitadel",
    "ShadowCitadel",
    "RadiantCitadel",
    "MirageCitadel",
    "NovaCitadel",
    "VortexCitadel",
    "AzureCitadel",
    "FrostbiteCitadel",
    "InfernoCitadel",
    "ZenithCitadel",
    "PhantomCitadel",
    "NebulaCitadel",
    "ObsidianCitadel",
    "SolarisCitadel",
    "MidnightCitadel",
    "QuantumCitadel",
    "ThunderCitadel",
    "ZenCitadel",
    
];

function updateElixir() {
  const roundedElixir = elixir.toFixed(0); // Round elixir to two decimal places
  document.getElementById('elixir').innerText = `${roundedElixir} (max: ${maxElixir})`;

}
function updateGold() {
  const roundedGold = gold.toFixed(0); // Round gold to two decimal places
  document.getElementById('gold').innerText = `${roundedGold} (max: ${maxGold})`;

}

function updateDarkelixir() {
  const roundedDarkelixir = darkelixir.toFixed(0); // Round darkelixir to two decimal places
  document.getElementById('darkelixir').innerText = `${roundedDarkelixir} (max: ${maxDarkElixir})`;
}
function updateGems() {
    
}

function updateBuildingLevel() {
  document.getElementById('buildingLevel').innerText = buildingLevel;
  document.getElementById('buildingName').innerText = buildingNames[buildingLevel - 1];
  localStorage.setItem('buildingLevel', buildingLevel);
}

function updateUpgradeCost() {
  document.getElementById('upgradeCost').innerText = upgradeCost;
}


function updategoldStorageLevel() {
  document.getElementById('goldStorageLevel').innerText = goldStorageLevel;
}

function updateUpgradeCostGoldStorage() {
  document.getElementById('goldStorageUpgradeCost').innerText = UpgradeCostGoldStorage;
}

function updateElixirStorageLevel() {
  document.getElementById('elixirStorageLevel').innerText = ElixirStorageLevel;
}

function updateUpgradeCostElixirStorage() {
  document.getElementById('elixirStorageUpgradeCost').innerText = UpgradeCostElixirStorage;
}




// Initialize manualGoldAmount outside the function
const manualGoldAmount = 100;

// Update the UI with the initial value
document.getElementById('addGoldManually').innerText = `${manualGoldAmount} `;

function addGoldManually() {
  gold = Math.min(gold + manualGoldAmount, maxGold);
  updateGold();
  localStorage.setItem('gold', gold);
  
  // Update the UI
  const mga = manualGoldAmount;
  document.getElementById('addGoldManually').innerText = `${mga} `;
}


const manualElixirAmount = 80;

// Update the UI with the initial value
document.getElementById('addElixirManually').innerText = `${manualElixirAmount} `;

function addElixirManually() {
  elixir = Math.min(elixir + manualElixirAmount, maxElixir);
  updateElixir();
  localStorage.setItem('elixir', elixir);
  
  // Update the UI
  const mea = manualElixirAmount;
  document.getElementById('addElixirManually').innerText = `${mea} `;
}




function generateResources() {
  // Adjust the power factor as needed for a balanced game
  const goldPowerFactor = 1.7; // You can adjust this value
  const elixirPowerFactor = 1.5; // You can adjust this value
  const darkElixirPowerFactor = 1.3; // You can adjust this value

  const totalGoldGeneration = Math.pow(buildingLevel, goldPowerFactor) * 15;
  const totalElixirGeneration = Math.pow(buildingLevel, elixirPowerFactor) * 10;
  const totalDarkElixirGeneration = Math.pow(buildingLevel, darkElixirPowerFactor) * 5;

  darkelixir = Math.min(darkelixir + totalDarkElixirGeneration, maxDarkElixir);
  gold = Math.min(gold + totalGoldGeneration, maxGold);
  elixir = Math.min(elixir + totalElixirGeneration, maxElixir);

  updateDarkelixir();
  updateGold();
  updateElixir();
  updateBuildingLevel();

  lastBuildingLevel = buildingLevel;

  localStorage.setItem('gold', gold);
  localStorage.setItem('elixir', elixir);
  localStorage.setItem('darkelixer', darkelixir);

  setTimeout(generateResources, 1750
    );
}



function calculateUpgradeCost() {
  return buildingLevel * 25 + Math.pow(buildingLevel, 4);
}

function upgradeBuilding() {
  if (gold >= upgradeCost) {
    gold -= upgradeCost;
    buildingLevel++;
    upgradeCost = calculateUpgradeCost();
    updateGold();
    updateBuildingLevel();
    updateUpgradeCost();
    localStorage.setItem('gold', gold);
    localStorage.setItem('elixir', elixir);
    localStorage.setItem('buildingLevel', buildingLevel);
  }
}






function calculateUpgradeCostGoldStorage() {
  const cost = Math.min(Math.pow(goldStorageLevel, 2).toFixed(0) * goldStorageLevel + 300, maxGold);
  return cost;
}

function upgradeGoldStorage() {
  if (elixir >= UpgradeCostGoldStorage) {
    // Calculate the upgrade factor based on the goldStorageLevel
    const upgradeFactor = 2.5
    // Calculate the new maxGold based on the upgrade factor
    maxGold = goldStorageLevel * 300 * upgradeFactor;
    
    elixir -= UpgradeCostGoldStorage;
    goldStorageLevel++;
    UpgradeCostGoldStorage = calculateUpgradeCostGoldStorage();
    
    updategoldStorageLevel();
    updateUpgradeCostGoldStorage();
    
    localStorage.setItem('elixir', elixir);
    localStorage.setItem('goldStorageLevel', goldStorageLevel);
    localStorage.setItem('maxGold', maxGold);
  }
}





function calculateUpgradeCostElixirStorage() {
  const cost = Math.min(Math.pow(ElixirStorageLevel, 2).toFixed(0) * ElixirStorageLevel + 300, maxElixir);
  return cost;
 
}

function upgradeelixirStorage() {
  if (gold >= UpgradeCostElixirStorage) {

   // Calculate the upgrade factor based on the ElixirStorageLevel
const upgradeFactor = 2.5

// Calculate the new maxElixir based on the upgrade factor
maxElixir = ElixirStorageLevel * 300 * upgradeFactor ;

    gold -= UpgradeCostElixirStorage;
    ElixirStorageLevel++;
    UpgradeCostElixirStorage = calculateUpgradeCostElixirStorage();
    updateElixirStorageLevel();
    updateUpgradeCostElixirStorage();
    localStorage.setItem('gold', gold);
    localStorage.setItem('elixirStorageLevel', ElixirStorageLevel);
    localStorage.setItem('maxElixir', maxElixir);
  }
}







function resetProgress() {
  if (confirm('Are you sure you want to reset all progress?')) {
    gold = 0;
    elixir = 0;
    darkelixir = 0;
    buildingLevel = 1;
    goldStorageLevel = 1;
    ElixirStorageLevel = 1; 
    maxGold = 400;
    maxElixir = 400;
    maxDarkElixir = 50;
    UpgradeCostGoldStorage = calculateUpgradeCostGoldStorage();
    UpgradeCostElixirStorage = calculateUpgradeCostElixirStorage(); 
    upgradeCost = calculateUpgradeCost();
    lastBuildingLevel = buildingLevel;
    alertShown = false;
    updateGold();
    updateElixir();
    updateDarkelixir();
    updateBuildingLevel();
    updateUpgradeCost();
    updategoldStorageLevel();
    updateUpgradeCostGoldStorage();
    updateElixirStorageLevel(); 
    updateUpgradeCostElixirStorage(); 
    localStorage.removeItem('gold');
    localStorage.removeItem('elixir');
    localStorage.removeItem('darkelixir');
    localStorage.removeItem('buildingLevel');
    localStorage.removeItem('goldStorageLevel');
    localStorage.removeItem('elixirStorageLevel');
    localStorage.removeItem('updateUpgradeCostElixirStorage');
    localStorage.removeItem('maxGold');
    localStorage.removeItem('maxElixir');
    localStorage.removeItem('maxDarkElixir');
    alert('Progress reset to initial state.');
  }
}

// Initial setup
updateGold();
updateElixir();
updateDarkelixir();
updateBuildingLevel();
updateUpgradeCost();
generateResources();
updategoldStorageLevel();
updateUpgradeCostGoldStorage();
updateElixirStorageLevel();
updateUpgradeCostElixirStorage();