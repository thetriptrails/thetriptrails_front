import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Star, ArrowRight, Compass, SlidersHorizontal, X, ChevronDown, Globe, Clock, Calendar, Search, MapPin, Flame } from 'lucide-react';

/* ━━━ DATA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const DEST = [
  { id:1,  title:'Santorini',    country:'Greece',      city:'Oia',             place:'Coastal',    time:'Morning',   days:'5-7',   rating:'4.9', price:85000,  tagline:'Where sunsets are a religion',              image:'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800', continent:'Europe'        },
  { id:2,  title:'Kyoto',        country:'Japan',       city:'Kyoto',           place:'Cultural',   time:'Afternoon', days:'7-10',  rating:'5.0', price:110000, tagline:'Ancient temples meet modern serenity',       image:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800', continent:'Asia'          },
  { id:3,  title:'Machu Picchu', country:'Peru',        city:'Aguas Calientes', place:'Mountain',   time:'Morning',   days:'3-5',   rating:'4.9', price:95000,  tagline:'Lost city of the Inca Empire',               image:'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=800', continent:'South America' },
  { id:4,  title:'Amalfi Coast', country:'Italy',       city:'Positano',        place:'Coastal',    time:'Evening',   days:'5-7',   rating:'4.8', price:92000,  tagline:'Cliffside villages draped in bougainvillea', image:'https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=800', continent:'Europe'        },
  { id:5,  title:'Bali',         country:'Indonesia',   city:'Ubud',            place:'Forest',     time:'Morning',   days:'7-10',  rating:'4.7', price:45000,  tagline:'Island of the Gods',                        image:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800', continent:'Asia'          },
  { id:6,  title:'Patagonia',    country:'Argentina',   city:'El Calafate',     place:'Wilderness', time:'Afternoon', days:'10-14', rating:'4.9', price:130000, tagline:'End of the world, beginning of wonder',     image:'https://images.unsplash.com/photo-1531761535209-83bbc081d0a8?q=80&w=800', continent:'South America' },
  { id:7,  title:'Marrakech',    country:'Morocco',     city:'Marrakech',       place:'Desert',     time:'Evening',   days:'5-7',   rating:'4.6', price:58000,  tagline:'A kaleidoscope of colors and spices',       image:'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=800', continent:'Africa'        },
  { id:8,  title:'Queenstown',   country:'New Zealand', city:'Queenstown',      place:'Mountain',   time:'Morning',   days:'7-10',  rating:'4.8', price:115000, tagline:'Adventure capital of the world',             image:'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=800', continent:'Oceania'       },
  { id:9,  title:'Maldives',     country:'Maldives',    city:'Malé',            place:'Coastal',    time:'Afternoon', days:'5-7',   rating:'5.0', price:145000, tagline:'Paradise found, reality left behind',       image:'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800', continent:'Asia'          },
  { id:10, title:'Iceland',      country:'Iceland',     city:'Reykjavik',       place:'Wilderness', time:'Evening',   days:'7-10',  rating:'4.9', price:120000, tagline:'Land of fire, ice, and northern lights',    image:'https://images.unsplash.com/photo-1531956656798-56686eeef3d4?q=80&w=800', continent:'Europe'        },
];
const CONTINENTS  = ['Asia','Europe','South America','Africa','Oceania'];
const PLACE_TYPES = [...new Set(DEST.map(d=>d.place))];
const DAY_RANGES  = [...new Set(DEST.map(d=>d.days))];
const TRENDING    = [{label:'Bali',emoji:'🌴'},{label:'Maldives',emoji:'🏝️'},{label:'Santorini',emoji:'🌅'},{label:'Kyoto',emoji:'⛩️'},{label:'Iceland',emoji:'🌌'}];

/* ━━━ TOKENS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const G = {
  gold:'#C9A84C', goldL:'#E8C97A', goldD:'#A07830', goldP:'#FBF3DC', goldB:'#EDD98A',
  white:'#FFFFFF', off:'#FDFAF2', dark:'#2C1F0A', mid:'#7A6035', soft:'#B39B6E',
  sh:'rgba(180,130,40,0.15)', shD:'rgba(180,130,40,0.28)',
};

/* ━━━ SCOPED CSS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CSS = `
.W,. W*,.W *::before,.W *::after{box-sizing:border-box;}
.W{font-family:'Segoe UI',system-ui,sans-serif;background:${G.off};min-height:100vh;color:${G.dark};-webkit-font-smoothing:antialiased;overflow-x:hidden;}

/* ── scrollbar ── */
.W .noscroll::-webkit-scrollbar{display:none;}
.W .noscroll{-ms-overflow-style:none;scrollbar-width:none;}

/* ── header ── */
.W .hdr{text-align:center;padding:28px 16px 32px;position:relative;}
@media(min-width:540px){.W .hdr{padding:40px 24px 40px;}}
@media(min-width:900px){.W .hdr{padding:52px 40px 48px;}}

/* ── title ── */
.W .ttl{font-family:Georgia,serif;font-size:clamp(1.6rem,5.5vw,3.4rem);font-weight:300;line-height:1.18;margin-bottom:6px;color:${G.dark};}
.W .sub{font-size:clamp(10px,2.2vw,13px);color:${G.soft};letter-spacing:.07em;margin-bottom:24px;}
@media(min-width:540px){.W .sub{margin-bottom:30px;}}

/* ── search container ── */
.W .srch-wrap{position:relative;width:calc(100% - 0px);max-width:640px;margin:0 auto;z-index:40;}
.W .srch-pill{display:flex;align-items:center;gap:7px;background:${G.white};border-radius:13px;padding:8px 8px 8px 13px;transition:box-shadow .25s;}
@media(min-width:540px){.W .srch-pill{border-radius:15px;padding:10px 10px 10px 17px;gap:9px;}}

.W .srch-inp{flex:1;min-width:0;border:none;outline:none;background:transparent;font-size:13px;color:${G.dark};font-weight:500;}
@media(min-width:540px){.W .srch-inp{font-size:14px;}}
.W .srch-inp::placeholder{color:${G.soft};}

/* search button */
.W .srch-btn{flex-shrink:0;display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,${G.goldL},${G.gold});color:${G.white};border:none;border-radius:50%;width:34px;height:34px;min-width:34px;cursor:pointer;box-shadow:0 2px 8px ${G.sh};transition:opacity .15s,transform .15s;}
.W .srch-btn:active{transform:scale(.96);}
.W .srch-lbl{display:none;}
@media(min-width:460px){
  .W .srch-btn{border-radius:10px;width:auto;height:auto;min-width:unset;padding:8px 16px;gap:5px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;}
  .W .srch-lbl{display:inline;}
}
@media(min-width:540px){.W .srch-btn{padding:9px 20px;font-size:12px;border-radius:11px;}}

/* search clear btn */
.W .srch-clr{flex-shrink:0;width:22px;height:22px;border-radius:50%;background:${G.goldP};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;}

/* ── dropdown ── */
.W .drop{position:absolute;top:calc(100% + 7px);left:0;right:0;background:${G.white};border-radius:14px;border:1.5px solid ${G.goldB};box-shadow:0 16px 52px ${G.shD};z-index:100;overflow:hidden;}

/* ── active query pill ── */
.W .qpill{display:inline-flex;align-items:center;gap:5px;background:${G.goldP};color:${G.goldD};font-size:11px;font-weight:700;padding:4px 11px;border-radius:999px;border:1px solid ${G.goldB};margin-top:11px;}

/* ── body ── */
.W .body{max-width:1300px;margin:0 auto;padding:0 12px 56px;}
@media(min-width:540px){.W .body{padding:0 18px 64px;}}
@media(min-width:900px){.W .body{padding:0 28px 80px;}}

/* ── mobile filter bar ── */
.W .fbar{display:flex;align-items:center;justify-content:space-between;position:sticky;top:8px;z-index:30;margin-bottom:14px;background:rgba(253,250,242,.94);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);padding:10px 14px;border-radius:12px;border:1.5px solid ${G.goldB};box-shadow:0 2px 12px ${G.sh};}
@media(min-width:900px){.W .fbar{display:none!important;}}

/* ── layout ── */
.W .layout{display:block;}
@media(min-width:900px){.W .layout{display:flex;gap:24px;align-items:flex-start;}}

/* ── desktop sidebar ── */
.W .sdsk{display:none;}
@media(min-width:900px){.W .sdsk{display:block;width:210px;flex-shrink:0;position:sticky;top:24px;}}
@media(min-width:1100px){.W .sdsk{width:230px;}}

/* ── results bar ── */
.W .rbar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:16px;}
@media(min-width:540px){.W .rbar{margin-bottom:20px;}}

/* ── card grid ── */
.W .grid{display:grid;gap:14px;}
/* xs: 1 col */
.W .grid{grid-template-columns:1fr;}
/* sm 460+: 2 col */
@media(min-width:460px){.W .grid{grid-template-columns:repeat(2,1fr);gap:14px;}}
/* md 700+: 2 col bigger gap */
@media(min-width:700px){.W .grid{grid-template-columns:repeat(2,1fr);gap:18px;}}
/* lg 900+: 2 col (sidebar takes space) */
@media(min-width:900px){.W .grid{grid-template-columns:repeat(2,1fr);gap:20px;}}
/* xl 1180+: 3 col */
@media(min-width:1180px){.W .grid{grid-template-columns:repeat(3,1fr);gap:22px;}}

/* ── card ── */
.W .card-out{border-radius:17px;padding:2px;height:100%;cursor:pointer;transition:box-shadow .4s,background .4s;}
.W .card-in{background:${G.white};border-radius:15px;overflow:hidden;height:100%;display:flex;flex-direction:column;}
.W .card-img-wrap{position:relative;overflow:hidden;aspect-ratio:4/3;}
@media(min-width:460px){.W .card-img-wrap{aspect-ratio:16/10;}}
.W .card-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease;}
.W .card-out:hover .card-img{transform:scale(1.07);}
.W .card-body{padding:12px 14px 14px;display:flex;flex-direction:column;flex-grow:1;}
@media(min-width:540px){.W .card-body{padding:13px 15px 15px;}}

/* ── sidebar panel ── */
.W .spanel{background:${G.white};border:1.5px solid ${G.goldB};border-radius:17px;padding:17px;box-shadow:0 4px 20px ${G.sh};}

/* ── checkboxes: 2-col mobile in drawer, 1-col desktop sidebar ── */
.W .chk-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.W .sdsk .chk-grid{grid-template-columns:1fr;}

/* ── range ── */
.W .rng{-webkit-appearance:none;appearance:none;width:100%;height:4px;background:transparent;cursor:pointer;position:absolute;top:0;left:0;margin:0;padding:0;opacity:0;pointer-events:auto;}
.W .rng::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:${G.gold};cursor:pointer;}
.W .rng::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:${G.gold};border:none;}

/* ── trending chips horizontal scroll on tiny screens ── */
.W .tchips{display:flex;flex-wrap:wrap;gap:7px;}
@media(max-width:380px){.W .tchips{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;-webkit-overflow-scrolling:touch;}
.W .tchips>*{flex-shrink:0;}}
`;

/* ━━━ HIGHLIGHT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Hi({text,q}){
  if(!q?.trim())return<>{text}</>;
  const esc=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const parts=text.split(new RegExp(`(${esc})`,'gi'));
  return<>{parts.map((p,i)=>p.toLowerCase()===q.toLowerCase()?<mark key={i} style={{background:G.goldP,color:G.goldD,borderRadius:3,padding:'0 2px',fontWeight:700}}>{p}</mark>:p)}</>;
}

/* ━━━ SEARCH BAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SearchBar({sq,setSQ}){
  const [val,setVal]=useState(sq);
  const [focused,setFocused]=useState(false);
  const inpRef=useRef(null);
  const wRef=useRef(null);

  useEffect(()=>{setVal(sq);},[sq]);
  useEffect(()=>{
    const fn=e=>{if(wRef.current&&!wRef.current.contains(e.target))setFocused(false);};
    document.addEventListener('mousedown',fn);
    return()=>document.removeEventListener('mousedown',fn);
  },[]);

  const sugg=useMemo(()=>{
    const q=val.trim().toLowerCase();
    if(!q)return[];
    return DEST.filter(d=>
      d.title.toLowerCase().includes(q)||d.country.toLowerCase().includes(q)||
      d.continent.toLowerCase().includes(q)||d.city.toLowerCase().includes(q)||
      d.place.toLowerCase().includes(q)||d.tagline.toLowerCase().includes(q)
    ).slice(0,5);
  },[val]);

  const commit=useCallback(v=>{setVal(v);setSQ(v);setFocused(false);inpRef.current?.blur();},[setSQ]);

  const showS=focused&&val.trim().length>0;
  const showT=focused&&val.trim().length===0;

  const ring=focused
    ?`0 0 0 2.5px ${G.gold},0 8px 28px ${G.sh}`
    :`0 2px 18px ${G.sh}`;

  return(
    <div ref={wRef} className="srch-wrap">
      {/* pill */}
      <div className="srch-pill" style={{boxShadow:ring}}>
        <Search size={15} style={{color:focused?G.gold:G.soft,flexShrink:0,transition:'color .2s'}}/>
        <input ref={inpRef} className="srch-inp" type="text" value={val}
          placeholder="Search destinations, countries, vibes…"
          onFocus={()=>setFocused(true)}
          onChange={e=>{setVal(e.target.value);setSQ(e.target.value);}}
          onKeyDown={e=>{if(e.key==='Enter')commit(val);if(e.key==='Escape'){setFocused(false);inpRef.current?.blur();}}}
        />
        {val&&(
          <button className="srch-clr" onMouseDown={e=>{e.preventDefault();commit('');}}>
            <X size={10} style={{color:G.mid}}/>
          </button>
        )}
        <button className="srch-btn" onClick={()=>commit(val)}>
          <Search size={13}/>
          <span className="srch-lbl">Search</span>
        </button>
      </div>

      {/* dropdown */}
      {(showS||showT)&&(
        <div className="drop">
          {/* suggestions */}
          {showS&&(
            <div style={{padding:7}}>
              <p style={{padding:'5px 11px 3px',fontSize:9,fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:G.soft}}>Destinations</p>
              {sugg.length>0?sugg.map(d=>(
                <button key={d.id} onMouseDown={e=>{e.preventDefault();commit(d.title);}}
                  style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'8px 9px',borderRadius:9,background:'transparent',border:'none',cursor:'pointer',textAlign:'left'}}
                  onMouseEnter={e=>e.currentTarget.style.background=G.goldP}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                >
                  <div style={{width:40,height:40,borderRadius:8,overflow:'hidden',flexShrink:0,border:`1.5px solid ${G.goldB}`}}>
                    <img src={d.image} alt={d.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:G.dark,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                      <Hi text={d.title} q={val}/>
                    </div>
                    <div style={{fontSize:10,color:G.soft,marginTop:1,display:'flex',alignItems:'center',gap:3}}>
                      <MapPin size={9} style={{color:G.gold,flexShrink:0}}/>
                      <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:130}}>
                        <Hi text={`${d.city}, ${d.country}`} q={val}/>
                      </span>
                      <span style={{color:G.goldB,flexShrink:0}}>·</span>
                      <span style={{color:G.gold,fontWeight:700,fontSize:9,textTransform:'uppercase',letterSpacing:'.05em',flexShrink:0}}>{d.continent}</span>
                    </div>
                  </div>
                  <div style={{flexShrink:0,textAlign:'right'}}>
                    <div style={{display:'flex',alignItems:'center',gap:2,justifyContent:'flex-end',marginBottom:2}}>
                      <Star size={10} style={{fill:G.gold,color:G.gold}}/>
                      <span style={{fontSize:11,fontWeight:700,color:G.gold}}>{d.rating}</span>
                    </div>
                    <div style={{fontSize:10,color:G.soft}}>₹{(d.price/1000).toFixed(0)}k</div>
                  </div>
                </button>
              )):(
                <div style={{padding:'13px 11px',textAlign:'center'}}>
                  <p style={{fontSize:13,color:G.soft,marginBottom:5}}>No results for <strong style={{color:G.dark}}>"{val}"</strong></p>
                  <button onMouseDown={e=>{e.preventDefault();commit('');}} style={{fontSize:11,color:G.gold,fontWeight:700,background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}>Clear</button>
                </div>
              )}
            </div>
          )}
          {/* trending */}
          {showT&&(
            <div style={{padding:'13px 14px 17px'}}>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:11}}>
                <span style={{background:G.goldP,borderRadius:7,padding:'3px 6px',display:'flex',alignItems:'center'}}><Flame size={12} style={{color:G.gold}}/></span>
                <span style={{fontSize:9,fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:G.mid}}>Trending Now</span>
              </div>
              <div className="tchips">
                {TRENDING.map(t=>(
                  <button key={t.label} onMouseDown={e=>{e.preventDefault();commit(t.label);}}
                    style={{display:'inline-flex',alignItems:'center',gap:5,padding:'6px 13px',borderRadius:999,background:G.goldP,border:`1.5px solid ${G.goldB}`,fontSize:12,fontWeight:600,color:G.goldD,cursor:'pointer',whiteSpace:'nowrap'}}
                    onMouseEnter={e=>{e.currentTarget.style.background=G.goldB;e.currentTarget.style.borderColor=G.gold;}}
                    onMouseLeave={e=>{e.currentTarget.style.background=G.goldP;e.currentTarget.style.borderColor=G.goldB;}}
                  >
                    <span style={{fontSize:15,lineHeight:1}}>{t.emoji}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
              <div style={{marginTop:11,paddingTop:11,borderTop:`1px solid ${G.goldP}`}}>
                <p style={{fontSize:9,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:G.soft,marginBottom:7}}>Browse by type</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                  {PLACE_TYPES.map(p=>(
                    <button key={p} onMouseDown={e=>{e.preventDefault();commit(p);}}
                      style={{padding:'4px 11px',borderRadius:999,background:G.white,border:`1px solid ${G.goldB}`,fontSize:11,fontWeight:500,color:G.mid,cursor:'pointer'}}
                      onMouseEnter={e=>{e.currentTarget.style.background=G.goldP;e.currentTarget.style.color=G.goldD;e.currentTarget.style.borderColor=G.gold;}}
                      onMouseLeave={e=>{e.currentTarget.style.background=G.white;e.currentTarget.style.color=G.mid;e.currentTarget.style.borderColor=G.goldB;}}
                    >{p}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ━━━ CHECK GROUP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CG({label,options,selected,onChange}){
  const [open,setOpen]=useState(true);
  return(
    <div style={{marginBottom:16}}>
      <button onClick={()=>setOpen(o=>!o)} style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'space-between',background:'none',border:'none',cursor:'pointer',padding:'0 0 7px'}}>
        <span style={{fontSize:9,letterSpacing:'.2em',textTransform:'uppercase',fontWeight:700,color:G.soft}}>{label}</span>
        <ChevronDown size={11} style={{color:G.soft,transform:open?'rotate(180deg)':'none',transition:'transform .2s'}}/>
      </button>
      {open&&(
        <div className="chk-grid">
          {options.map(opt=>{
            const on=selected.includes(opt);
            return(
              <label key={opt} onClick={()=>onChange(opt)} style={{display:'flex',alignItems:'center',gap:7,cursor:'pointer'}}>
                <span style={{width:14,height:14,borderRadius:3,flexShrink:0,border:`1.5px solid ${on?G.gold:G.goldB}`,background:on?G.gold:G.white,display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}>
                  {on&&<svg width="8" height="7" viewBox="0 0 8 7" fill="none"><path d="M1 3.5L3 5.5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
                <span style={{fontSize:11,fontWeight:500,color:on?G.goldD:G.soft,lineHeight:1.2}}>{opt}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ━━━ SIDEBAR CONTENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SC({pr,setPR,sc,setSC,sp,setSP,sd,setSD,afc,clearAll,tog,fc,onApply}){
  const p0=(pr[0]/150000)*100, p1=(pr[1]/150000)*100;
  return(
    <div className="spanel">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
        <span style={{fontSize:9,fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:G.soft}}>Preferences</span>
        {afc>0&&<button onClick={clearAll} style={{fontSize:9,fontWeight:700,color:G.gold,background:'none',border:'none',cursor:'pointer',letterSpacing:'.08em',textTransform:'uppercase'}}>Reset</button>}
      </div>
      {/* budget */}
      <div style={{marginBottom:18}}>
        <p style={{fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',fontWeight:700,color:G.soft,marginBottom:9}}>Budget (INR)</p>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:9}}>
          <span style={{fontSize:11,fontWeight:700,color:G.gold}}>₹{pr[0]/1000}k</span>
          <span style={{fontSize:11,fontWeight:700,color:G.gold}}>₹{pr[1]/1000}k</span>
        </div>
        <div style={{position:'relative',height:4,background:G.goldP,borderRadius:99}}>
          <div style={{position:'absolute',height:4,background:`linear-gradient(90deg,${G.goldL},${G.gold})`,borderRadius:99,left:`${p0}%`,right:`${100-p1}%`}}/>
          <input type="range" min="0" max="150000" step="5000" value={pr[0]} className="rng"
            onChange={e=>setPR([Math.min(+e.target.value,pr[1]-5000),pr[1]])}/>
          <input type="range" min="0" max="150000" step="5000" value={pr[1]} className="rng"
            onChange={e=>setPR([pr[0],Math.max(+e.target.value,pr[0]+5000)])}/>
        </div>
      </div>
      <CG label="Continent"  options={CONTINENTS}  selected={sc} onChange={tog(sc,setSC)}/>
      <CG label="Place Type" options={PLACE_TYPES}  selected={sp} onChange={tog(sp,setSP)}/>
      <CG label="Duration"   options={DAY_RANGES}   selected={sd} onChange={tog(sd,setSD)}/>
      {onApply&&(
        <button onClick={onApply}
          style={{width:'100%',marginTop:12,padding:'11px 0',background:`linear-gradient(135deg,${G.goldL},${G.gold})`,color:G.white,border:'none',borderRadius:11,fontWeight:700,fontSize:12,cursor:'pointer',letterSpacing:'.06em',boxShadow:`0 3px 10px ${G.sh}`}}
          onMouseEnter={e=>e.currentTarget.style.opacity='.88'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}
        >Show {fc} Result{fc!==1?'s':''}</button>
      )}
    </div>
  );
}

/* ━━━ DESTINATION CARD ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Card({d,sq}){
  const [hov,setHov]=useState(false);
  return(
    <div className="card-out"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:hov?`linear-gradient(135deg,${G.goldL},${G.gold},${G.goldD})`:`linear-gradient(135deg,${G.goldB}44,${G.goldP})`,
        boxShadow:hov?`0 12px 32px ${G.shD}`:`0 3px 14px ${G.sh}`,
      }}
    >
      <div className="card-in">
        {/* image */}
        <div className="card-img-wrap">
          <img src={d.image} alt={d.title} className="card-img"/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(20,12,0,.76) 0%,transparent 52%)'}}/>
          {/* rating */}
          <div style={{position:'absolute',top:9,left:9,background:'rgba(255,255,255,.93)',backdropFilter:'blur(6px)',borderRadius:999,padding:'3px 9px',display:'flex',alignItems:'center',gap:3,fontSize:10,fontWeight:700,color:G.dark}}>
            <Star size={9} style={{fill:G.gold,color:G.gold}}/>{d.rating}
          </div>
          {/* place badge */}
          <div style={{position:'absolute',top:9,right:9,background:`rgba(201,168,76,.88)`,backdropFilter:'blur(4px)',borderRadius:999,padding:'3px 9px',fontSize:9,fontWeight:700,color:G.white,letterSpacing:'.07em',textTransform:'uppercase'}}>
            {d.place}
          </div>
          <h3 style={{position:'absolute',bottom:10,left:12,right:12,fontFamily:'Georgia,serif',fontSize:'clamp(15px,2.8vw,20px)',fontWeight:300,color:G.white,lineHeight:1.2,margin:0}}>
            <Hi text={d.title} q={sq}/>
          </h3>
        </div>
        {/* body */}
        <div className="card-body">
          <div style={{fontSize:9,letterSpacing:'.15em',textTransform:'uppercase',fontWeight:700,color:G.gold,marginBottom:4,display:'flex',alignItems:'center',gap:4,flexWrap:'wrap'}}>
            <Hi text={d.country} q={sq}/>
            <span style={{color:G.goldB}}>·</span>
            <span style={{color:G.soft,fontWeight:500}}>{d.continent}</span>
          </div>
          <p style={{fontFamily:'Georgia,serif',fontStyle:'italic',fontSize:11,color:G.soft,marginBottom:10,flexGrow:1,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',lineHeight:1.55}}>
            "{d.tagline}"
          </p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,marginBottom:10}}>
            <span style={{display:'flex',alignItems:'center',gap:4,fontSize:10,color:G.soft,textTransform:'uppercase',letterSpacing:'.04em'}}>
              <Clock size={9} style={{color:G.gold,flexShrink:0}}/>{d.time}
            </span>
            <span style={{display:'flex',alignItems:'center',gap:4,fontSize:10,color:G.soft,textTransform:'uppercase',letterSpacing:'.04em'}}>
              <Calendar size={9} style={{color:G.gold,flexShrink:0}}/>{d.days}d
            </span>
          </div>
          <div style={{paddingTop:10,borderTop:`1px solid ${G.goldP}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div style={{fontSize:8,letterSpacing:'.12em',textTransform:'uppercase',color:G.soft,marginBottom:1}}>Starting at</div>
              <div style={{fontFamily:'Georgia,serif',fontSize:'clamp(14px,2.2vw,17px)',color:G.dark,fontWeight:600}}>₹{d.price.toLocaleString('en-IN')}</div>
            </div>
            <button style={{width:33,height:33,borderRadius:'50%',background:hov?`linear-gradient(135deg,${G.goldL},${G.gold})`:G.goldP,border:`1.5px solid ${hov?G.gold:G.goldB}`,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .25s',flexShrink:0}}>
              <ArrowRight size={12} style={{color:hov?G.white:G.gold}}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━ ROOT APP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function WorldDestinationsExplorer(){
  const [open,setOpen]=useState(false);
  const [sq,setSQ]=useState('');
  const [sc,setSC]=useState([]);
  const [sp,setSP]=useState([]);
  const [sd,setSD]=useState([]);
  const [pr,setPR]=useState([0,150000]);

  const tog=(arr,setArr)=>val=>setArr(prev=>prev.includes(val)?prev.filter(x=>x!==val):[...prev,val]);
  const clearAll=()=>{setSC([]);setSP([]);setSD([]);setPR([0,150000]);setSQ('');};
  const afc=sc.length+sp.length+sd.length+(pr[0]>0||pr[1]<150000?1:0);

  const filtered=useMemo(()=>{
    const q=sq.trim().toLowerCase();
    return DEST.filter(d=>{
      if(q&&!(d.title.toLowerCase().includes(q)||d.country.toLowerCase().includes(q)||d.continent.toLowerCase().includes(q)||d.city.toLowerCase().includes(q)||d.place.toLowerCase().includes(q)||d.tagline.toLowerCase().includes(q)))return false;
      if(sc.length&&!sc.includes(d.continent))return false;
      if(sp.length&&!sp.includes(d.place))return false;
      if(sd.length&&!sd.includes(d.days))return false;
      if(d.price<pr[0]||d.price>pr[1])return false;
      return true;
    });
  },[sq,sc,sp,sd,pr]);

  const scp={pr,setPR,sc,setSC,sp,setSP,sd,setSD,afc,clearAll,tog,fc:filtered.length};

  return(
    <div className="W">
      <style>{CSS}</style>

      {/* ── HEADER ── */}
      <header className="hdr">
        <div style={{pointerEvents:'none',position:'absolute',top:-60,left:'50%',transform:'translateX(-50%)',width:'min(580px,110vw)',height:260,borderRadius:'50%',background:`radial-gradient(ellipse,${G.goldP} 0%,transparent 70%)`,opacity:.9}}/>
        <Globe size={19} style={{color:G.gold,display:'block',margin:'0 auto 9px'}}/>
        <h1 className="ttl">World <em style={{color:G.gold,fontStyle:'italic'}}>Escapes</em></h1>
        <p className="sub">Premium hand-picked destinations for the modern traveler.</p>
        <SearchBar sq={sq} setSQ={setSQ}/>
        {sq.trim()&&(
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:5,flexWrap:'wrap',marginTop:10}}>
            <span style={{fontSize:11,color:G.soft}}>Results for</span>
            <span className="qpill">
              "{sq}"
              <button onClick={()=>setSQ('')} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',padding:0,marginLeft:2}}>
                <X size={9} style={{color:G.goldD}}/>
              </button>
            </span>
          </div>
        )}
      </header>

      {/* ── BODY ── */}
      <div className="body">

        {/* mobile filter bar */}
        <div className="fbar">
          <button onClick={()=>setOpen(true)} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:G.goldD}}>
            <SlidersHorizontal size={14} style={{color:G.gold}}/>
            Filters
            {afc>0&&<span style={{background:G.gold,color:G.white,borderRadius:'50%',width:17,height:17,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700}}>{afc}</span>}
          </button>
          <span style={{fontSize:10,color:G.soft,fontWeight:600,textTransform:'uppercase',letterSpacing:'.07em'}}>{filtered.length} {filtered.length===1?'match':'matches'}</span>
        </div>

        {/* drawer backdrop */}
        {open&&<div onClick={()=>setOpen(false)} style={{position:'fixed',inset:0,background:'rgba(25,12,0,.5)',backdropFilter:'blur(5px)',WebkitBackdropFilter:'blur(5px)',zIndex:50}}/>}

        {/* mobile drawer */}
        <div className="noscroll" style={{position:'fixed',top:0,left:0,bottom:0,width:'min(285px,82vw)',zIndex:60,background:G.off,padding:'18px 14px 24px',transform:open?'translateX(0)':'translateX(-100%)',transition:'transform .3s ease',overflowY:'auto',boxShadow:`5px 0 30px ${G.shD}`}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
            <span style={{fontWeight:700,fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:G.dark}}>Filters</span>
            <button onClick={()=>setOpen(false)} style={{background:'none',border:'none',cursor:'pointer',padding:3,display:'flex',alignItems:'center'}}>
              <X size={17} style={{color:G.mid}}/>
            </button>
          </div>
          <SC {...scp} onApply={()=>setOpen(false)}/>
        </div>

        {/* layout */}
        <div className="layout">

          {/* desktop sidebar */}
          <div className="sdsk"><SC {...scp} onApply={null}/></div>

          {/* main */}
          <main style={{flex:1,minWidth:0,width:'100%'}}>
            {/* results bar */}
            <div className="rbar">
              <span style={{fontFamily:'Georgia,serif',fontStyle:'italic',fontSize:13,color:G.soft}}>
                Showing <strong style={{color:G.dark,fontStyle:'normal',fontFamily:'inherit'}}>{filtered.length}</strong> destination{filtered.length!==1?'s':''}
                {sq.trim()&&<> for <strong style={{color:G.gold,fontStyle:'normal'}}>"{sq}"</strong></>}
              </span>
              {(afc>0||sq.trim())&&(
                <button onClick={clearAll}
                  style={{display:'flex',alignItems:'center',gap:4,padding:'5px 13px',background:G.goldP,color:G.goldD,border:`1px solid ${G.goldB}`,borderRadius:999,fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.07em',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}
                  onMouseEnter={e=>e.currentTarget.style.background=G.goldB}
                  onMouseLeave={e=>e.currentTarget.style.background=G.goldP}
                ><X size={10}/> Clear All</button>
              )}
            </div>

            {/* empty state */}
            {filtered.length===0?(
              <div style={{textAlign:'center',padding:'52px 20px',background:G.white,borderRadius:18,border:`2px dashed ${G.goldB}`}}>
                <Compass size={38} style={{color:G.goldB,margin:'0 auto 12px',display:'block'}}/>
                <h3 style={{fontFamily:'Georgia,serif',fontSize:18,fontWeight:400,color:G.dark,marginBottom:7}}>No matches found</h3>
                <p style={{fontSize:13,color:G.soft,marginBottom:18}}>{sq.trim()?<>No destinations match <strong>"{sq}"</strong>. Try a different term.</>:'Try broadening your filters.'}</p>
                <button onClick={clearAll} style={{fontWeight:700,color:G.gold,background:'none',border:'none',borderBottom:`1.5px solid ${G.gold}`,cursor:'pointer',fontSize:13,paddingBottom:2}}>Reset All</button>
              </div>
            ):(
              <div className="grid">
                {filtered.map(d=><Card key={d.id} d={d} sq={sq}/>)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}