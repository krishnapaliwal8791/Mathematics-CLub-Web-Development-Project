const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
 // Note: we might not have glob, better to use recursive read dir
const sharp = require('sharp');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

async function run() {
  const projectDir = 'C:\\Users\\Krishna\\ABC\\Workspace\\Mathematics-CLub-Web-Development-Project';
  
  const allFiles = await getFiles(projectDir);
  
  const imageFiles = allFiles.filter(f => 
    !f.includes('node_modules') && 
    !f.includes('.git') && 
    !f.includes('dist') && 
    !f.includes('scratch') &&
    /\.(png|jpe?g)$/i.test(f)
  );

  let totalOriginalSize = 0;
  let totalNewSize = 0;
  const report = [];
  const replacements = [];

  console.log('Converting images...');
  for (const file of imageFiles) {
    const parsed = path.parse(file);
    const webpPath = path.join(parsed.dir, parsed.name + '.webp');
    
    const originalSize = fs.statSync(file).size;
    
    await sharp(file)
      .webp({ quality: 92 })
      .toFile(webpPath);
      
    const newSize = fs.statSync(webpPath).size;
    
    totalOriginalSize += originalSize;
    totalNewSize += newSize;
    
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);
    
    const relativeOriginal = path.relative(projectDir, file);
    const relativeWebp = path.relative(projectDir, webpPath);
    
    report.push({
      file: relativeOriginal,
      originalSize: (originalSize / 1024).toFixed(2) + ' KB',
      newSize: (newSize / 1024).toFixed(2) + ' KB',
      reduction: reduction + '%'
    });
    
    replacements.push({
      oldName: parsed.base,
      newName: parsed.name + '.webp',
      oldExt: parsed.ext
    });
  }

  // Find and replace references
  const textFiles = allFiles.filter(f => 
    !f.includes('node_modules') && 
    !f.includes('.git') && 
    !f.includes('dist') && 
    !f.includes('.png') && 
    !f.includes('.jpg') && 
    !f.includes('.jpeg') && 
    !f.includes('.webp') && 
    !f.includes('.svg') && 
    (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.json'))
  );

  let filesChanged = 0;
  const modifiedFilesList = [];

  for (const file of textFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    for (const r of replacements) {
      // Very basic replace, usually fine for unique filenames
      const regex = new RegExp(r.oldName.replace(/\./g, '\\.'), 'g');
      if (regex.test(content)) {
        content = content.replace(regex, r.newName);
        changed = true;
      }
    }
    
    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      filesChanged++;
      modifiedFilesList.push(path.relative(projectDir, file));
    }
  }

  // Delete original files after successful replacement and conversion
  for (const file of imageFiles) {
    fs.unlinkSync(file);
  }

  console.log('\n--- WEBP MIGRATION REPORT ---');
  console.table(report);
  
  console.log(`\nTotal Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total New Size: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Overall Reduction: ${((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(2)}%`);
  
  console.log(`\nFiles Modified (References Updated): ${filesChanged}`);
  modifiedFilesList.forEach(f => console.log(`- ${f}`));
}

run().catch(console.error);
