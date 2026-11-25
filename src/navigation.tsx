import React from 'react';
export type IconRenderer = (name: string, size?: number) => string;
const mobileItems = [['home','Главная'],['schedule','Пары'],['tasks','Задания'],['study','Учёба'],['profile','Профиль']] as const;
const desktopItems = [['home','Главная','page:home'],['profile','Профиль','page:profile'],['schedule','Расписание','page:schedule'],['tasks','Задания','page:tasks'],['study','Сессия','study:exams'],['tasks','Контрольные','page:controls'],['chart','Успеваемость','study:scores'],['clock','Физкультура','page:pe']] as const;
export function MobileNavigation({page,icon}:{page:string;icon:IconRenderer}) {
 const index=Math.max(0,mobileItems.findIndex(([id])=>id===(page==='controls'||page==='pe'?'study':page)));
 return <nav className="nav" aria-label="Основные разделы"><div className="nav-indicator" style={{transform:`translateX(calc(${index*100}% + ${index*6}px))`}}/>{mobileItems.map(([id,label])=><button key={id} data-action={`page:${id}`} className={index===mobileItems.findIndex(([key])=>key===id)?'active':''} aria-label={label} aria-current={mobileItems[index][0]===id?'page':false} dangerouslySetInnerHTML={{__html:icon(id)}}/>)}</nav>;
}
export function DesktopNavigation({page,study,icon}:{page:string;study:string;icon:IconRenderer}) {
 return <aside id="bm-desktop"><div className="bm-brand"><span dangerouslySetInnerHTML={{__html:icon('study',30)}}/><div><strong>Моя Бауманка</strong><small>МГТУ им. Н. Э. Баумана</small></div></div>{desktopItems.map(([id,label,action])=><button key={action} className={action===`page:${page}`||page==='study'&&action===`study:${study}`?'selected':''} data-action={action}><span dangerouslySetInnerHTML={{__html:icon(id,21)}}/><span>{label}</span></button>)}</aside>;
}
