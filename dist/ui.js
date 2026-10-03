/* The listbox is fully themed, including its options, and retains keyboard access. */
const signalTrigger=document.getElementById('signal');
const signalMenu=document.getElementById('signalOptions');
const signalControl=document.getElementById('signalControl');
const signalValue=document.getElementById('signalValue');
const signalOptions=[...signalMenu.querySelectorAll('[role="option"]')];
signalTrigger.value='0';
let signalActive=0;
function highlightSignal(index){signalActive=(index+signalOptions.length)%signalOptions.length;signalOptions.forEach((o,i)=>o.classList.toggle('highlighted',i===signalActive));signalTrigger.setAttribute('aria-activedescendant',signalOptions[signalActive].id);signalOptions[signalActive].scrollIntoView({block:'nearest',behavior:'instant'})}
function openSignal(){signalMenu.hidden=false;signalTrigger.setAttribute('aria-expanded','true');highlightSignal(Number(signalTrigger.value))}
function closeSignal(){signalMenu.hidden=true;signalTrigger.setAttribute('aria-expanded','false');signalTrigger.removeAttribute('aria-activedescendant');signalOptions.forEach(o=>o.classList.remove('highlighted'))}
function chooseSignal(index){signalTrigger.value=String(index);signalValue.textContent=signalOptions[index].querySelector('span:nth-child(2)').textContent;signalOptions.forEach((o,i)=>o.setAttribute('aria-selected',String(i===index)));closeSignal();signalTrigger.dispatchEvent(new Event('change'));signalTrigger.focus({preventScroll:true})}
signalTrigger.addEventListener('click',()=>signalMenu.hidden?openSignal():closeSignal());
signalOptions.forEach((option,i)=>{option.addEventListener('click',()=>chooseSignal(i));option.addEventListener('pointermove',()=>{signalActive=i;signalOptions.forEach((o,j)=>o.classList.toggle('highlighted',i===j));signalTrigger.setAttribute('aria-activedescendant',option.id)})});
signalTrigger.addEventListener('keydown',e=>{const open=!signalMenu.hidden;if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(!open)openSignal();else highlightSignal(signalActive+(e.key==='ArrowDown'?1:-1))}else if(open&&(e.key==='Home'||e.key==='End')){e.preventDefault();highlightSignal(e.key==='Home'?0:signalOptions.length-1)}else if(e.key==='Enter'||e.key===' '){e.preventDefault();if(open)chooseSignal(signalActive);else openSignal()}else if(e.key==='Escape'){e.preventDefault();closeSignal()}else if(e.key==='Tab'){closeSignal()}});
document.addEventListener('pointerdown',e=>{if(!signalControl.contains(e.target))closeSignal()});
signalControl.addEventListener('focusout',e=>{if(!signalControl.contains(e.relatedTarget))closeSignal()});
/* app.js renders the initial diagnosis before the native fallback is replaced. */
showDiagnostic();
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function animateState(element){if(reducedMotion.matches)return;element.classList.remove('state-enter');void element.offsetWidth;element.classList.add('state-enter')}
document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>{animateState(document.querySelector('.detail'));animateState(b.querySelector('.category-icon'))}));
document.querySelectorAll('[data-day]').forEach(b=>b.addEventListener('click',()=>animateState(document.querySelector('.day-detail'))));
signalTrigger.addEventListener('change',()=>animateState(document.querySelector('.diagnosis>div:last-child')));
document.getElementById('theme').addEventListener('click',()=>{const icon=document.querySelector('#theme .icon');if(!reducedMotion.matches){icon.classList.remove('icon-pulse');void icon.offsetWidth;icon.classList.add('icon-pulse')}});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.03,rootMargin:'0px 0px -25px 0px'});document.querySelectorAll('main section[id]').forEach(section=>{section.classList.add('reveal-ready');observer.observe(section)})}
const primaryLinks=[...document.querySelectorAll('.primary-nav a')];
function updatePrimary(){let current='start';const ids=['categories','setup','review','conversation'];ids.forEach(id=>{if(document.getElementById(id).getBoundingClientRect().top<190)current=id});primaryLinks.forEach(a=>{const active=a.hash==='#'+current;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}
addEventListener('scroll',updatePrimary,{passive:true});updatePrimary();
