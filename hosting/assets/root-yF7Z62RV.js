import{r as n,j as e}from"./index-BSN27Gx1.js";import{r as h,g as u,i as f,a as y,b as S,c as x}from"./index.esm2017-DaJykjhl.js";import{l as w,n as j,o as b,p as M,_ as k,O as I,M as v,L as A,S as L}from"./components-WD2RKb1X.js";/**
 * @remix-run/react v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let l="positions";function O({getKey:t,...s}){let{isSpaMode:p}=w(),i=j(),c=b();M({getKey:t,storageKey:l});let m=n.useMemo(()=>{if(!t)return null;let r=t(i,c);return r!==i.key?r:null},[]);if(p)return null;let g=((r,d)=>{if(!window.history.state||!window.history.state.key){let o=Math.random().toString(32).slice(2);window.history.replaceState({key:o},"")}try{let a=JSON.parse(sessionStorage.getItem(r)||"{}")[d||window.history.state.key];typeof a=="number"&&window.scrollTo(0,a)}catch(o){console.error(o),sessionStorage.removeItem(r)}}).toString();return n.createElement("script",k({},s,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${g})(${JSON.stringify(l)}, ${JSON.stringify(m)})`}}))}var R="firebase",W="10.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */h(R,W,"app");const E=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}];function H({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, height=device-height initial-scale=1"}),e.jsx(v,{}),e.jsx(A,{})]}),e.jsxs("body",{children:[t,e.jsx(O,{}),e.jsx(L,{})]})]})}function J(){const t={apiKey:"AIzaSyAHmbgMW5yYRjhUMrdS-Ux3k9bq4WlRCXM",authDomain:"deimos-gdg.firebaseapp.com",projectId:"deimos-gdg",storageBucket:"deimos-gdg.appspot.com",messagingSenderId:"405314543577",appId:"1:405314543577:web:1280a71c799c9cb8e443c8",measurementId:"G-SK2WLD4WKP"};let s;return u().length?s=y():s=f(t),S(s),x(s),e.jsx(I,{})}export{H as Layout,J as default,E as links};
