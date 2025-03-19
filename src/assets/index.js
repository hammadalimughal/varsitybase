const fs = require('fs');
const path = require('path');

const patchesDir = path.join(process.cwd(), 'patches'); // Adjust path if necessary
const outputFile = path.join(process.cwd(), 'patchesData.js');

const generateImportStatements = () => {
    const categories = fs.readdirSync(patchesDir).filter(folder => fs.statSync(path.join(patchesDir, folder)).isDirectory());

    let importStatements = '';
    let patchesArray = [];

    categories.forEach(category => {
        const categoryPath = path.join(patchesDir, category);
        const images = fs.readdirSync(categoryPath).filter(file => /\.(png|jpg|jpeg|svg)$/i.test(file));

        const imageObjects = images.map((image, index) => {
            const varName = `${category.replace(/\s+/g, '')}${index}`;
            importStatements += `import ${varName} from './patches/${category}/${image}';\n`;
            return { name: image, url: varName };
        });

        patchesArray.push({ category, children: imageObjects });
    });

    const jsonData = JSON.stringify(patchesArray, null, 4).replace(/"url": "(.*?)"/g, '"url": $1');
    
    const finalOutput = `${importStatements}\nexport const patchesData = ${jsonData};\n`;
    fs.writeFileSync(outputFile, finalOutput, 'utf8');
    console.log('patchesData.js has been generated!');
};

generateImportStatements();