import './style.scss'
import './components/cheat-codes/cheat-codes'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
        <h1>Strange woods (working title)</h1>
    </div>
`

// please check the document in this link:
// https://medieinstitutet-my.sharepoint.com/:w:/g/personal/alda_catovic_medieinstitutet_se/IQApMQpuaX8YToqheHZBk5Y4AQvnQa3uXsRg0XzjSP18ehU?rtime=AQuzKQlr3kg

/** Pseudo engine architecture (scrap)
 * Each room has an enterable state, unlocked when conditions met, trigger with a unlockRoom() function 
 * The progress bar could also be used as a quicktravel, trigger with a travelTo() function
 * Some sort of state knowing what room the player is currently at
 * Consider storing scores and time in localstorage
 * Each artifact has a relevancy metadata: true if needed to complete the escape, false if not
 * For the first engine architecture scrap, there will be cheat code buttons
 */

/** Cheact code view (uesd for development)
 * Make a cheat code script that display buttons to test the logic
 */