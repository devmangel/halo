let menu = document.getElementById("menu");


const menuClick = () => {

    let menuList = document.getElementById("menu-hide");
    let tittle = document.getElementById("tittle-hide");
    

    if(menuList.classList.contains("menu-inactive")){

        menuList.classList.remove("menu-inactive");
        menuList.classList.add("menu-active");
        tittle.classList.remove("menu-active");
        tittle.classList.add("menu-inactive");
        
    } else{
        
        menuList.classList.remove("menu-active");
        menuList.classList.add("menu-inactive");
        tittle.classList.remove("menu-inactive");
        tittle.classList.add("menu-active");
    }

}

menu.addEventListener("click", menuClick);


// onclick="this.classList.toggle('open');


const btnRequest = document.getElementById("btn");



btnRequest.addEventListener("click",()=>{

        const gamertagName = document.getElementById("gamertag").value;

        let xhr;

         if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
         else hxr = new ActiveXObject("Microsoft.XMLHTTP")
    
        
    
         xhr.open('GET',`https://www.haloapi.com/stats/h5/servicerecords/campaign?players=${gamertagName}`)
         xhr.setRequestHeader('Ocp-Apim-Subscription-Key','1896f33d410b431bb219833b4cd1876b')
    
         xhr.addEventListener("load", (data) => {
    
             let spartanRank = JSON.parse(data.target.response).Results[0].Result.SpartanRank;
             let experiencePoints = format(JSON.parse(data.target.response).Results[0].Result.Xp);
             let totalKills = format(JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalKills);
             let totalHeadshots = format(JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalHeadshots);
             let totalShotsFired = format(JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalShotsFired);
             let weaponWithMostKills = JSON.parse(data.target.response).Results[0].Result.CampaignStat.WeaponWithMostKills.WeaponId.StockId;
             let totalMeleeKills = format(JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalMeleeKills);
             let totalAssassinations = format(JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalAssassinations);
             let totalPowerWeaponKills = format(JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalPowerWeaponKills);
             let totalDeaths = format(JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalDeaths);
             let totalGrenadeKills = format(JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalGrenadeKills);



             document.getElementById("spartanRank-result").innerHTML = spartanRank;
             imageRank(spartanRank);
             document.getElementById("experiencePoints-result").innerHTML = experiencePoints;
             document.getElementById("totalKills-result").innerHTML = totalKills;
             document.getElementById("totalHeadshots-result").innerHTML = totalHeadshots;
             document.getElementById("totalShotsFired-result").innerHTML = totalShotsFired;
             translateWeapon(weaponWithMostKills);
             document.getElementById("totalMeleeKills-result").innerHTML = totalMeleeKills;
             document.getElementById("totalAssassinations-result").innerHTML = totalAssassinations;
             document.getElementById("totalPowerWeaponKills-result").innerHTML = totalPowerWeaponKills;
             document.getElementById("totalDeaths-result").innerHTML = totalDeaths;
             document.getElementById("totalGrenadeKills-result").innerHTML = totalGrenadeKills;

         })
         xhr.send()

})


const newWindow = () => {

    document.getElementById("change-background").style.display = 'none';
    document.getElementById("window-results").style.display = 'flex';
};


function translateWeapon(ide){


        let xhr;

        if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
        else hxr = new ActiveXObject("Microsoft.XMLHTTP");

         xhr.open('GET',`https://www.haloapi.com/metadata/h5/metadata/weapons`)

         xhr.setRequestHeader('Ocp-Apim-Subscription-Key',getId.id)
    
         xhr.addEventListener("load", (data) => {


            let listOfItems = JSON.parse(data.target.response);

            for (item in listOfItems){

                if(listOfItems[item].id == ide){

                    document.getElementById("weaponWithMostKills-result").innerHTML = listOfItems[item].name;
                    const imgWeapon = listOfItems[item].smallIconImageUrl;
                    document.getElementById("weaponMostKill").style.backgroundImage = `url(${imgWeapon})`;
                }
            }

         })

         xhr.send()

};

const format = num => 
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');


function imageRank(rank){

        let xhr;

        if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
        else hxr = new ActiveXObject("Microsoft.XMLHTTP");

        xhr.open('GET','https://www.haloapi.com/metadata/h5/metadata/spartan-ranks')
        xhr.setRequestHeader('Ocp-Apim-Subscription-Key',getId.id)

        xhr.addEventListener('load',(data) => {

            let listOfRanks = JSON.parse(data.target.response);

             listOfRanks.map((item) => {

                 if (item.id == rank){

                     let image = item.reward.requisitionPacks[0].largeImageUrl;
                     document.getElementById('spartanRank__img').style.backgroundImage = `url(${image})`;
                 }
             })
        })

        xhr.send()

};

const getId = {

    id: "1896f33d410b431bb219833b4cd1876b"
}

Object.freeze(getId);

