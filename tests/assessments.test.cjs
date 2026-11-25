const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const s=fs.readFileSync('public/app.js','utf8');const code=s.slice(s.indexOf('const storedControls='),s.indexOf('let customLessons='));
const canonical=Array.from({length:5},(_,i)=>({id:'exam_'+i,subject:'Subject '+i,type:'Экзамен',date:''}));
const old=[{...canonical[0],date:'2027-01-20'},{id:'rk',subject:'Subject 0',type:'РК'}];
const data={exams:old};vm.runInNewContext(code,{data,seed:{initialExams:canonical},read:()=>[{id:'kr',type:'КР'}]});
assert.equal(data.exams.length,5);assert.equal(data.exams[0].date,'2027-01-20');assert.equal(data.controls.length,2);assert.equal(data.controls[1].id,'rk');
vm.runInNewContext(code,{data,seed:{initialExams:canonical},read:()=>data.controls});assert.equal(data.controls.length,2);
console.log('OK: five exams, preserved date, independent controls, repeat migration');
