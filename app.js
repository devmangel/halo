// Components container

const parentBox = document.getElementById('window-results');

// Components builders, here we can decide the components content

const SpartanStats = ({data, tittle, image}) => {

    return `
    <div class="spartanRank results__container">
        <img class="results__img" src="${image}" alt="spartan-image">
        <p class="results__tittle">${tittle}</p>
        <p class="results__number">${data}</p>
    </div>
    `
    
}

let spartan = {} // Save spartan info
let gunInfo = {} // save gun info

// Async function that return components from HALO 5 API

async function newWindow(){

    const gamertagName = document.getElementById('gamertag').value;

    await fetch(`https://www.haloapi.com/stats/h5/servicerecords/campaign?players=${gamertagName}`,{
        method: 'GET',
        headers: {'Ocp-Apim-Subscription-Key':'1896f33d410b431bb219833b4cd1876b'}
    })

    .then(response => response.json())
    .then(data => {
        spartan = data.Results[0];
    })
    
    const imageReponse = await imageSpartan();
    let gunId = spartan.Result.CampaignStat.WeaponWithMostKills.WeaponId.StockId;
    
    await translateWeapon(gunId);

    // Components we can modify the order and the contend we want to render here!

    parentBox.innerHTML += SpartanStats({data: spartan.Result.SpartanRank, tittle: 'Spartan Rank', image: imageReponse});
    parentBox.innerHTML += SpartanStats({data: spartan.Result.Xp, tittle: 'Experience Points', image: './images/halo.png'});
    parentBox.innerHTML += SpartanStats({data: spartan.Result.CampaignStat.TotalKills, tittle: 'Total Kills', image: './images/Spree-extermination.png'});
    parentBox.innerHTML += SpartanStats({data: spartan.Result.CampaignStat.TotalHeadshots, tittle: 'Headshots', image: './images/Kill-headshot.png'});
    parentBox.innerHTML += SpartanStats({data: spartan.Result.CampaignStat.TotalShotsFired, tittle: 'Shots Fired', image: './images/Spree-untouchable.png'});
    parentBox.innerHTML += SpartanStats({data: gunInfo.name, tittle: 'Weapon Most Kills', image: gunInfo.image});
    parentBox.innerHTML += SpartanStats({data: spartan.Result.CampaignStat.TotalMeleeKills, tittle: 'Melee Kills', image: './images/Kill-melee.png'});
    parentBox.innerHTML += SpartanStats({data: spartan.Result.CampaignStat.TotalAssassinations, tittle: 'Assassinations', image: './images/Kill-assassination.png'});
    parentBox.innerHTML += SpartanStats({data: spartan.Result.CampaignStat.TotalPowerWeaponKills, tittle: 'Power Weapon Kills', image: './images/Kill-sniper-rifle-kill.png'});
    parentBox.innerHTML += SpartanStats({data: spartan.Result.CampaignStat.TotalDeaths, tittle: 'Total Deaths', image: './images/death.png'});
    parentBox.innerHTML += SpartanStats({data: spartan.Result.CampaignStat.TotalGrenadeKills, tittle: 'Grenade Kills', image: './images/Kill-grenade-kill.png'});

    document.getElementById("change-background").style.display = 'none';
    document.getElementById("window-results").style.display = 'flex';

}

// Find rank image API

async function imageSpartan(){
    
    let image;

    await fetch('https://www.haloapi.com/metadata/h5/metadata/spartan-ranks',{
        method: 'GET',
        headers: {'Ocp-Apim-Subscription-Key':'1896f33d410b431bb219833b4cd1876b'}
    })

    .then(response => response.json())
    .then(data => {
        const rank = (spartan.Result.SpartanRank)
        data.map((item) => {

            if (item.id == rank){

                image = item.reward.requisitionPacks[0].largeImageUrl;
            }
        })
    })
    return image;
}

// Find weapon name and image from the Weapon Id

async function translateWeapon(ide){

    await fetch('https://www.haloapi.com/metadata/h5/metadata/weapons',{
        method: 'GET',
        headers: {'Ocp-Apim-Subscription-Key':'1896f33d410b431bb219833b4cd1876b'}
    }) 
    .then(response => response.json())
    .then(data => {
        let name;
        let image;

       data.map(item => {

            if(item.id == ide){

                gunInfo.name = item.name;
                gunInfo.image = item.smallIconImageUrl
            }    
        })
        
    })
}