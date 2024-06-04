#!/user/bin/env node 

import inquirer from "inquirer";
import { readFile } from "fs/promises"

const drugInteractions = JSON.parse(
    await readFile(
        new URL('./interactions.json', import.meta.url)
    )
)

let listOfDrugsInquired = []

function checkDrugInteractions() {
    let mostSevereInteractions = []
    for( let drugs of listOfDrugsInquired){
        let interactions = []
        interactions =  drugInteractions.filter((drugInteraction)=>{
            if(drugInteraction['drugs'].every(val => drugs.includes(val))){
                return drugInteraction
            }
        })
        let mostSevereInteraction = findMostSevereInteraction(interactions)
        if(!mostSevereInteraction) {
            mostSevereInteractions.push("No Interaction")
        }else if(mostSevereInteraction['severity'] == 'contraindication') {
            //In the ReadMe of the take home master, the drug interaction between sildenafil and nitroglycerin was displayed as a major interaction despite the interactions.json file having listed it as contraindication. 
            mostSevereInteractions.push(`There is a major interaction between ${mostSevereInteraction["drugs"][0]} and ${mostSevereInteraction["drugs"][1]}. ${mostSevereInteraction['description']}`)
        }else {
            mostSevereInteractions.push(`There is a ${mostSevereInteraction['severity']} interaction between ${mostSevereInteraction["drugs"][0]} and ${mostSevereInteraction["drugs"][1]}. ${mostSevereInteraction['description']}`)
        }
    }
    mostSevereInteractions.forEach((severeInteraction) => console.log(severeInteraction))
}

function findMostSevereInteraction(interactions) {
    const severity = {
        major: 3,
        //listed contraindication as a greater risk than moderate drug interaction but less risk than an actual major drug interaction,
        contraindication:2,
        moderate: 1,
        minor: 0,
    }
    interactions.sort(function(a, b){
        return severity[b.severity] - severity[a.severity]
    })
    return interactions[0]
}

async function beginInquiry() {
    let count = 0
    let response = true
    while (response && count < 10000) {
        const answers = await inquirer.prompt({
            name: 'drugsInquired', 
            type: 'input', 
            message: 'Please provide single spaced drug names to check if there are any interactions. Enter "Done" to get the results for drug interactions. Enter crtl+c to exit the program.'
        })
        let  drugsInquired = answers.drugsInquired.split(" ")
        if (answers.drugsInquired === "Done") response = false
        else if (drugsInquired.length < 2) {
            console.log("Please enter atleast two drugs to check for interactions.")
        }else if (drugsInquired.length > 20){
            console.log("No more than 20 drug interactions may be inquired at a time.")
        }else {
            count++
            listOfDrugsInquired.push(drugsInquired)
        }
    }
}

await beginInquiry()
checkDrugInteractions(listOfDrugsInquired)