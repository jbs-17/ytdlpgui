import fs from 'node:fs/promises';

const dirs = ['public/profile-pictures',
'tmp', 'logs'];


let buildDirs = [];
for (let i = 0; i < dirs.length; i++) {
  buildDirs.push(buildDir(dirs[i]));
};
await Promise.allSettled(buildDirs);



async function logBuild(log) {
  console.log(`[BUILD] ${log}`);
};
async function buildDir(pathdir) {
try {
  await fs.access(pathdir, fs.constants.R_OK | fs.constants.W_OK);
  await logBuild(`dir ${pathdir} exist, can acces!`);
} catch{
logBuild(`dir ${pathdir} doesnt exist, cant acces!`);
logBuild(`building dir ${pathdir} ,...`)
  fs.mkdir(pathdir, {recursive: true})
  .then(()=>{
    logBuild(`succes to build directory ${pathdir}!`);
  })
  .catch(e => {
    logBuild(`fail to build ${pathdir}`);
    process.exit(1);
  });
};
};