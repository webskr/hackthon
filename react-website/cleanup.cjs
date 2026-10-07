const fs = require('fs');
const path = require('path');

const scan = dir => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) scan(p);
    else if (p.endsWith('.jsx')) {
      let c = fs.readFileSync(p, 'utf8');
      if (c.endsWith('\\n')) {
        fs.writeFileSync(p, c.slice(0, -2) + '\n');
      }
    }
  });
};
scan('d:/app/hackthon/react-website/src');
console.log('Cleanup done!');
