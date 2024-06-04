# Engineering Take-Home Exercise
Hi, my name is Tashi Dolma. I have created a command line application that accepts space-separated drugs and determines if there is a risk of interaction between any of the drugs in the list. 

If there are multiple interactions detected, the most severe interaction is returned. If there are multiple of the same severity of interaction then the two drugs that are listed first in the interactions.json file is returned. 

There was one drug interaction that was listed as "contraindication". I took the liberty of having it be expressed as "major" after reviewing the output examples listed in the ReadMe of the master file. But when I sorted the severity I had its severity be lower of that of a real "major" severity and higher of that of a "moderate" severity. 

## Examples

### Input
    sildenafil nitroglycerin tamsulosin
    sildenafil nitroglycerin lovastatin

### Output
    There is a major interaction between sildenafil and nitroglycerin. Phosphodiesterase-5 (PDE5) inhibitors may potentiate the hypotensive effect of organic            nitrates.
    There is a major interaction between sildenafil and lovastatin. The metabolism of Sildenafil can be decreased when combined with Lovastatin.


# Packages Used
inquirer 
npm i inquirer

# Getting Started
This app was built using Node.js
To launch this app run `node .` in your terminal. 