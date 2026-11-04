import fs from 'fs';
import vm from 'vm';

function inspectLevel(file, globalVar) {
  const code = fs.readFileSync(file, 'utf8');
  const ctx = { window: {}, console };
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  const data = ctx.window[globalVar];
  console.log(`=== ${globalVar} (${data.number} - ${data.title}) ===`);
  data.lessons.forEach((l) => {
    const secCount = l.sections ? l.sections.length : 0;
    const exCount = l.exercises ? l.exercises.length : 0;
    const pitCount = l.callouts?.pitfalls ? l.callouts.pitfalls.length : (l.commonMistakes ? l.commonMistakes.length : 0);
    const tipCount = l.callouts?.tips ? l.callouts.tips.length : 0;
    console.log(`${l.number.padEnd(5)} [${l.id.padEnd(7)}] ${l.title.slice(0, 45).padEnd(45)} | Sec: ${secCount} | Ex: ${exCount} | Pit: ${pitCount} | Tip: ${tipCount}`);
  });
}

inspectLevel('data/linux/level1.js', 'LX_LEVEL1_DATA');
inspectLevel('data/linux/level2.js', 'LX_LEVEL2_DATA');
inspectLevel('data/linux/level3.js', 'LX_LEVEL3_DATA');
inspectLevel('data/linux/level4.js', 'LX_LEVEL4_DATA');
