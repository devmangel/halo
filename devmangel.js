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
             let experiencePoints = JSON.parse(data.target.response).Results[0].Result.Xp;
             let totalKills = JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalKills;
             let totalHeadshots = JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalHeadshots;
             let totalShotsFired = JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalShotsFired;
             let WeaponWithMostKills = JSON.parse(data.target.response).Results[0].Result.CampaignStat.WeaponWithMostKills.WeaponId.StockId;
             let TotalMeleeKills = JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalMeleeKills;
             let TotalAssassinations = JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalAssassinations;
             let TotalPowerWeaponKills = JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalPowerWeaponKills;
             let TotalDeaths = JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalDeaths;


             let TotalGrenadeKills = JSON.parse(data.target.response).Results[0].Result.CampaignStat.TotalGrenadeKills;

             console.log(experiencePoints);
             console.log(totalKills);
             console.log(totalHeadshots);
             console.log(totalShotsFired);
             console.log(WeaponWithMostKills);
             console.log(TotalMeleeKills);
             console.log(TotalPowerWeaponKills);
             console.log(TotalAssassinations);
             console.log(TotalDeaths);
             console.log(TotalGrenadeKills);
         })
         xhr.send()

})






