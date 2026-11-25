import React from 'react';
import {createRoot, type Root} from 'react-dom/client';
import {flushSync} from 'react-dom';
import {MobileNavigation,DesktopNavigation,type IconRenderer} from './navigation';
import {Assessments,type Assessment} from './assessments';
let assessmentRoot:Root|undefined;
let desktopRoot:Root|undefined, mobileRoot:Root|undefined;
let mobilePage:string|undefined;
const bridge={
 clearAssessments(){assessmentRoot?.unmount();assessmentRoot=undefined;},
 assessments(host:HTMLElement,mode:'exams'|'controls',rows:Assessment[],subjects:string[],save:(row:Assessment)=>void,remove:(id:string)=>void){assessmentRoot=createRoot(host);flushSync(()=>assessmentRoot!.render(<Assessments {...{mode,rows,subjects,save,remove}}/>));},
 desktop(page:string,study:string,icon:IconRenderer){
  if(!desktopRoot){const host=document.createElement('div');host.style.display='contents';document.getElementById('app')!.prepend(host);desktopRoot=createRoot(host);}
  flushSync(()=>desktopRoot!.render(<DesktopNavigation page={page} study={study} icon={icon}/>));
 },
 mobile(page:string,icon:IconRenderer){
  if(!mobileRoot){const host=document.createElement('div');host.id='nova-nav';document.body.append(host);mobileRoot=createRoot(host);}
  if(mobilePage===page)return;
  flushSync(()=>mobileRoot!.render(<MobileNavigation page={page} icon={icon}/>));
  document.getElementById('nova-nav')!.dataset.page=page;mobilePage=page;
 }
};
Object.assign(window,{BaumanReact:bridge});
const script=document.createElement('script');script.src=`${import.meta.env.BASE_URL}app.js?v=4002`;document.body.append(script);
