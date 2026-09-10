function e(e){let t=new DataView(e);if(e.byteLength<8||t.getUint32(0,!0)!==1095127882)throw Error(`Arquivo JSFA inválido: assinatura ausente.`);let n=t.getUint32(4,!0),r=8+n;if(r>e.byteLength)throw Error(`Arquivo JSFA inválido: cabeçalho maior que o arquivo.`);let i=new TextDecoder(`utf-8`).decode(new Uint8Array(e,8,n)),a=JSON.parse(i);function o(t){let n=a.vistas[t];if(n===void 0)throw Error(`Vista ausente no arquivo: ${t}`);let i=r+n.off;if(i+n.bytes>e.byteLength)throw Error(`Vista fora do arquivo: ${t}`);switch(n.tipo){case`float32`:return new Float32Array(e,i,n.n);case`int16`:return new Int16Array(e,i,n.n);case`uint16`:return new Uint16Array(e,i,n.n);case`int8`:return new Int8Array(e,i,n.n);case`uint8`:return new Uint8Array(e,i,n.n);case`uint32`:return new Uint32Array(e,i,n.n);case`int32`:return new Int32Array(e,i,n.n);default:throw Error(`Tipo de vista desconhecido: ${n.tipo}`)}}return{cabecalho:a,vista:o,temVista:e=>a.vistas[e]!==void 0}}async function t(t,n){let r=await fetch(t);if(!r.ok)throw Error(`HTTP ${r.status} em ${t}`);let i=await r.arrayBuffer();return n!==void 0&&(n.bytes+=i.byteLength),e(i)}function n(){let e=new Float32Array(16);return e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function r(e,t,n=new Float32Array(16)){let r=e[0],i=e[1],a=e[2],o=e[3],s=e[4],c=e[5],l=e[6],u=e[7],d=e[8],f=e[9],p=e[10],m=e[11],h=e[12],g=e[13],_=e[14],v=e[15];for(let e=0;e<4;e+=1){let y=t[e*4],b=t[e*4+1],x=t[e*4+2],S=t[e*4+3];n[e*4]=r*y+s*b+d*x+h*S,n[e*4+1]=i*y+c*b+f*x+g*S,n[e*4+2]=a*y+l*b+p*x+_*S,n[e*4+3]=o*y+u*b+m*x+v*S}return n}function i(e,t=new Float32Array(16)){let r=e[0],i=e[1],a=e[2],o=e[3],s=e[4],c=e[5],l=e[6],u=e[7],d=e[8],f=e[9],p=e[10],m=e[11],h=e[12],g=e[13],_=e[14],v=e[15],y=r*c-i*s,b=r*l-a*s,x=r*u-o*s,S=i*l-a*c,C=i*u-o*c,w=a*u-o*l,T=d*g-f*h,E=d*_-p*h,D=d*v-m*h,O=f*_-p*g,k=f*v-m*g,A=p*v-m*_,j=y*A-b*k+x*O+S*D-C*E+w*T;return j===0?(t.set(n()),t):(j=1/j,t[0]=(c*A-l*k+u*O)*j,t[1]=(a*k-i*A-o*O)*j,t[2]=(g*w-_*C+v*S)*j,t[3]=(p*C-f*w-m*S)*j,t[4]=(l*D-s*A-u*E)*j,t[5]=(r*A-a*D+o*E)*j,t[6]=(_*x-h*w-v*b)*j,t[7]=(d*w-p*x+m*b)*j,t[8]=(s*k-c*D+u*T)*j,t[9]=(i*D-r*k-o*T)*j,t[10]=(h*C-g*x+v*y)*j,t[11]=(f*x-d*C-m*y)*j,t[12]=(c*E-s*O-l*T)*j,t[13]=(r*O-i*E+a*T)*j,t[14]=(g*b-h*S-_*y)*j,t[15]=(d*S-f*b+p*y)*j,t)}function a(e,t,n=[1,1,1],r=new Float32Array(16)){let[i,a,o,s]=e,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,[b,x,S]=n;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=t[0],r[13]=t[1],r[14]=t[2],r[15]=1,r}function o(e,t,n,r,i,a=new Float32Array(16)){let o=1/e;return a.fill(0),a[0]=o/t,a[5]=o,a[8]=-i,a[10]=(r+n)/(n-r),a[11]=-1,a[14]=2*r*n/(n-r),a}function s(e,t,n){let r=e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3],i=t[0],a=t[1],o=t[2],s=t[3];r<0&&(r=-r,i=-i,a=-a,o=-o,s=-s);let c=1-n,l=n;if(r<.9995){let e=Math.acos(Math.min(1,r)),t=Math.sin(e);c=Math.sin((1-n)*e)/t,l=Math.sin(n*e)/t}let u=c*e[0]+l*i,d=c*e[1]+l*a,f=c*e[2]+l*o,p=c*e[3]+l*s,m=Math.hypot(u,d,f,p)||1;return[u/m,d/m,f/m,p/m]}function c(e,t){let n=t[0],r=t[1],i=t[2],a=e[3]*n+e[7]*r+e[11]*i+e[15];return[(e[0]*n+e[4]*r+e[8]*i+e[12])/a,(e[1]*n+e[5]*r+e[9]*i+e[13])/a,(e[2]*n+e[6]*r+e[10]*i+e[14])/a]}var l=class{cabecalho;quat;pos;origemQuadro;escala;escalaColuna;escalaLargura;camera;transl;cabeca;bola;realce;atenua;mapaOssos;inversasRepouso;nOssos;poseTemp=new Float32Array(16);constructor(e){this.cabecalho=e.cabecalho,this.nOssos=this.cabecalho.ossos.length,this.quat=e.vista(`quat`),this.pos=e.vista(`pos`),this.origemQuadro=e.vista(`origemQuadro`),this.escala=this.cabecalho.comEscala?e.vista(`escala`):null;let t=this.cabecalho.escalaOssos??(this.cabecalho.comEscala?[...Array(this.nOssos).keys()]:[]);this.escalaLargura=t.length,this.escalaColuna=new Int32Array(this.nOssos).fill(-1),t.forEach((e,t)=>{this.escalaColuna[e]=t}),this.camera=e.vista(`camera`),this.transl=e.vista(`translucidez`),this.cabeca=e.vista(`cabeca`),this.bola=e.temVista(`bola`)?e.vista(`bola`):null,this.realce=this.cabecalho.realce.map(t=>[t,e.vista(`realce:${t}`)]),this.atenua=this.cabecalho.atenua.map(t=>[t,e.vista(`atenua:${t}`)]),this.mapaOssos=new Int32Array(this.nOssos).fill(-1),this.inversasRepouso=[]}get aspecto(){return this.cabecalho.aspecto??16/9}get totalDeQuadros(){return this.cabecalho.quadroFinal-this.cabecalho.quadroInicial+1}quadroDoMarcador(e){let t=this.cabecalho.marcadores.find(t=>t[0]===e);return t===void 0?null:t[1]}amarrar(e,t){this.mapaOssos=new Int32Array(this.nOssos),this.inversasRepouso=[];for(let n=0;n<this.nOssos;n+=1){let r=this.cabecalho.ossos[n],a=e.indexOf(r);this.mapaOssos[n]=a;let o=new Float32Array(16);a>=0&&i(t.subarray(a*16,a*16+16),o),this.inversasRepouso.push(o)}}amostras(e){let{quadroInicial:t,passo:n,quadros:r}=this.cabecalho,i=(e-t)/n,a=Math.max(0,Math.min(r-1,Math.floor(i)));return{a,b:Math.min(r-1,a+1),t:Math.max(0,Math.min(1,i-a))}}amostrar(e,t){let{a:n,b:i,t:o}=this.amostras(e),c=this.nOssos,l=this.cabecalho.escalaPos,u=[this.origemQuadro[n*3],this.origemQuadro[n*3+1],this.origemQuadro[n*3+2]],d=[this.origemQuadro[i*3],this.origemQuadro[i*3+1],this.origemQuadro[i*3+2]];for(let e=0;e<c;e+=1){let f=this.mapaOssos[e];if(f<0)continue;let p=this.quatDe(n,e),m=this.quatDe(i,e),h=o===0?p:s(p,m,o),g=[u[0]+this.pos[(n*c+e)*3]*l,u[1]+this.pos[(n*c+e)*3+1]*l,u[2]+this.pos[(n*c+e)*3+2]*l],_=[d[0]+this.pos[(i*c+e)*3]*l,d[1]+this.pos[(i*c+e)*3+1]*l,d[2]+this.pos[(i*c+e)*3+2]*l],v=[g[0]+(_[0]-g[0])*o,g[1]+(_[1]-g[1])*o,g[2]+(_[2]-g[2])*o],y=[1,1,1],b=this.escalaColuna[e];if(this.escala!==null&&b>=0){let e=1/8192,t=(n*this.escalaLargura+b)*3,r=(i*this.escalaLargura+b)*3;y=[(this.escala[t]+(this.escala[r]-this.escala[t])*o)*e,(this.escala[t+1]+(this.escala[r+1]-this.escala[t+1])*o)*e,(this.escala[t+2]+(this.escala[r+2]-this.escala[t+2])*o)*e]}a(h,v,y,this.poseTemp),r(this.poseTemp,this.inversasRepouso[e],t.subarray(f*16,f*16+16))}let f=this.cameraNo(n,i,o),p=(this.transl[n]+(this.transl[i]-this.transl[n])*o)/255,m=new Map;for(let[e,t]of this.realce)m.set(e,(t[n]+(t[i]-t[n])*o)/255);let h=new Map;for(let[e,t]of this.atenua)h.set(e,(t[n]+(t[i]-t[n])*o)/255);let g=null;if(this.bola!==null){let e=this.bola.subarray(n*7,n*7+7),t=this.bola.subarray(i*7,i*7+7);g={posicao:[e[0]+(t[0]-e[0])*o,e[1]+(t[1]-e[1])*o,e[2]+(t[2]-e[2])*o],orientacao:s([e[3],e[4],e[5],e[6]],[t[3],t[4],t[5],t[6]],o)}}let _=[this.cabeca[n*3]+(this.cabeca[i*3]-this.cabeca[n*3])*o,this.cabeca[n*3+1]+(this.cabeca[i*3+1]-this.cabeca[n*3+1])*o,this.cabeca[n*3+2]+(this.cabeca[i*3+2]-this.cabeca[n*3+2])*o];return{skins:t,camera:f,translucidez:p,realce:m,atenua:h,bola:g,cabeca:_}}quatDe(e,t){let n=(e*this.nOssos+t)*4,r=1/32767;return[this.quat[n]*r,this.quat[n+1]*r,this.quat[n+2]*r,this.quat[n+3]*r]}cameraNo(e,t,n){let r=this.camera.subarray(e*8,e*8+8),i=this.camera.subarray(t*8,t*8+8),a=n>0&&u(r,i)>1.5?0:n;return{posicao:[r[0]+(i[0]-r[0])*a,r[1]+(i[1]-r[1])*a,r[2]+(i[2]-r[2])*a],orientacao:s([r[3],r[4],r[5],r[6]],[i[3],i[4],i[5],i[6]],a),fovVertical:r[7]+(i[7]-r[7])*a}}};function u(e,t){return Math.hypot(e[0]-t[0],e[1]-t[1],e[2]-t[2])}async function d(e,n){return new l(await t(e,n))}var f=[`osso`,`cartilagem`,`ligamento`,`tendao`,`musculo`],p={pele:0,musculo:1,osso:2,tendao:3,ligamento:4,cartilagem:5},m=1024,h=class{cabecalho;ossos;repouso;partes;indicePorNome;pos;nrm;idx;pes;peca;tri;faixas;texturaDePecas;constructor(e){this.cabecalho=e.cabecalho,this.ossos=this.cabecalho.ossos,this.repouso=e.vista(`repouso`),this.partes=this.cabecalho.partes;let t=new Map;this.partes.forEach((e,n)=>t.set(e.nome,n)),this.indicePorNome=t,this.pos=e.vista(`pos`),this.nrm=e.vista(`nrm`),this.idx=e.vista(`idx`),this.pes=e.vista(`pes`),this.peca=e.vista(`peca`);let{tri:n,faixas:r}=g(e.vista(`tri`),this.partes);this.tri=n,this.faixas=r,this.texturaDePecas=_(this.partes)}faixa(e){return this.faixas.find(t=>t.classe===e)??null}origemDoOsso(e){let t=e*16;return[this.repouso[t+12],this.repouso[t+13],this.repouso[t+14]]}};function g(e,t){let n=e instanceof Uint16Array?new Uint16Array(e.length):new Uint32Array(e.length),r=[],i=0;for(let a of[`pele`,...f]){let o=i;for(let r of t)r.classe===a&&r.ni!==0&&(n.set(e.subarray(r.i0,r.i0+r.ni),i),i+=r.ni);i>o&&r.push({classe:a,inicio:o,quantidade:i-o})}return{tri:n,faixas:r}}function _(e){let t=new Float32Array(m*2*4);return e.forEach((e,n)=>{if(n>=1024)return;let r=n*4;t[r]=e.fibra[0],t[r+1]=e.fibra[1],t[r+2]=e.fibra[2],t[r+3]=p[e.classe];let i=(m+n)*4;t[i]=e.centro[0],t[i+1]=e.centro[1],t[i+2]=e.centro[2],t[i+3]=0}),t}async function v(e,n){return new h(await t(e,n))}var y=[`uOssos`,`uPecasDado`,`uPecas`,`uVista`,`uProj`,`uModelo`,`uPosMin`,`uPosEscala`,`uSkin`,`uPapel`,`uCamada`,`uTransl`,`uFrente`,`uLuz`,`uCorCaixa`,`uTempo`,`uVirilha`,`uVirilhaX`],b=/^DEF-(spine\.00[456]|shoulder|upper_arm|forearm|hand|palm|f_|thumb|breast)/,x={A4_obst_barra:[.22,.741,.973],A4_obst_metal:[.35,.55,.85],A4_raia:[.086,.408,.89],A4_maca_estofado:[.1,.28,.58],A4_maca_pe:[.16,.32,.58],bola:[.55,.8,1]},S=class{tela;gl;programa;loc;vaoCorpo;vaoBola;bolaIndices;vaoSombra;vaoCaixas=null;caixasCores=[];texOssos;texPecasDado;texPecas;pecasBytes;vista=n();proj=n();vistaProj=n();modelo=n();largura=1;altura=1;contextoPerdido=!1;enquadramento={tanMeioVertical:0,tanMeioVerticalDaCena:0,deslocamento:0,fracaoDaLargura:1,figuraCabe:!0};tipoIndice;bytesPorIndice;corpo;constructor(e,t,n){this.tela=e,this.corpo=t;let r=e.getContext(`webgl2`,{alpha:!0,antialias:!0,premultipliedAlpha:!0,depth:!0,stencil:!1,powerPreference:`high-performance`,preserveDrawingBuffer:!1});if(r===null)throw Error(`WebGL2 indisponível`);this.gl=r,e.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.contextoPerdido=!0}),e.addEventListener(`webglcontextrestored`,()=>{this.contextoPerdido=!0}),this.programa=T(r,n.vertex,n.fragmento);let i={};for(let e of y)i[e]=r.getUniformLocation(this.programa,e);this.loc={aPos:r.getAttribLocation(this.programa,`aPos`),aNrm:r.getAttribLocation(this.programa,`aNrm`),aIdx:r.getAttribLocation(this.programa,`aIdx`),aPes:r.getAttribLocation(this.programa,`aPes`),aPeca:r.getAttribLocation(this.programa,`aPeca`),uniformes:i},this.vaoCorpo=C(r.createVertexArray()),r.bindVertexArray(this.vaoCorpo),this.buffer(t.pos,this.loc.aPos,3,r.SHORT,!1),this.buffer(t.nrm,this.loc.aNrm,3,r.BYTE,!0),this.buffer(t.idx,this.loc.aIdx,4,r.UNSIGNED_BYTE,!1),this.buffer(t.pes,this.loc.aPes,4,r.UNSIGNED_BYTE,!0),this.buffer(t.peca,this.loc.aPeca,1,r.UNSIGNED_SHORT,!1);let a=C(r.createBuffer());r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,a),r.bufferData(r.ELEMENT_ARRAY_BUFFER,t.tri,r.STATIC_DRAW),this.tipoIndice=t.tri instanceof Uint16Array?r.UNSIGNED_SHORT:r.UNSIGNED_INT,this.bytesPorIndice=t.tri instanceof Uint16Array?2:4,r.bindVertexArray(null);let o=D(28,18);this.vaoBola=this.vaoEstatico(o.pos,o.nrm,o.tri),this.bolaIndices=o.tri.length;let s=O(40);this.vaoSombra=this.vaoEstatico(s.pos,s.nrm,s.tri),this.texOssos=this.texturaFloat(5,t.ossos.length,null);let c=new Float32Array(t.ossos.length*4);t.ossos.forEach((e,t)=>{c[t*4]=+!!b.test(e)}),r.texSubImage2D(r.TEXTURE_2D,0,4,0,1,t.ossos.length,r.RGBA,r.FLOAT,c),this.texPecasDado=this.texturaFloat(m,2,t.texturaDePecas),this.pecasBytes=new Uint8Array(m*4),this.texPecas=C(r.createTexture()),r.bindTexture(r.TEXTURE_2D,this.texPecas),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,m,1,0,r.RGBA,r.UNSIGNED_BYTE,this.pecasBytes),w(r),r.useProgram(this.programa),r.uniform1i(i.uOssos??null,0),r.uniform1i(i.uPecasDado??null,1),r.uniform1i(i.uPecas??null,2),r.uniform3f(i.uPosMin??null,t.cabecalho.posMin[0],t.cabecalho.posMin[1],t.cabecalho.posMin[2]),r.uniform1f(i.uPosEscala??null,t.cabecalho.posEscala),r.uniform3f(i.uLuz??null,.35,.55,.75);let l=t.ossos.indexOf(`DEF-thigh.L`),u=t.ossos.indexOf(`DEF-spine`);if(l>=0&&u>=0){let e=t.origemDoOsso(l),n=t.origemDoOsso(u);r.uniform4f(i.uVirilha??null,e[1]-.01,e[1]-.13,n[2]+.12,n[2]+.05),r.uniform1f(i.uVirilhaX??null,.08)}else r.uniform4f(i.uVirilha??null,0,0,0,0),r.uniform1f(i.uVirilhaX??null,0)}get perdido(){return this.contextoPerdido}erro(){return this.gl.getError()}get triangulos(){return this.corpo.cabecalho.triangulos}buffer(e,t,n,r,i){let a=this.gl;if(t<0)return;let o=C(a.createBuffer());a.bindBuffer(a.ARRAY_BUFFER,o),a.bufferData(a.ARRAY_BUFFER,e,a.STATIC_DRAW),a.enableVertexAttribArray(t),a.vertexAttribPointer(t,n,r,i,0,0)}vaoEstatico(e,t,n){let r=this.gl,i=C(r.createVertexArray());r.bindVertexArray(i),this.buffer(e,this.loc.aPos,3,r.FLOAT,!1),this.buffer(t,this.loc.aNrm,3,r.FLOAT,!1);let a=C(r.createBuffer());return r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,a),r.bufferData(r.ELEMENT_ARRAY_BUFFER,n,r.STATIC_DRAW),r.bindVertexArray(null),i}texturaFloat(e,t,n){let r=this.gl,i=C(r.createTexture());return r.bindTexture(r.TEXTURE_2D,i),r.texImage2D(r.TEXTURE_2D,0,r.RGBA32F,e,t,0,r.RGBA,r.FLOAT,n),w(r),i}definirCaixas(e){let t=this.gl;if(this.vaoCaixas!==null&&(t.deleteVertexArray(this.vaoCaixas),this.vaoCaixas=null),this.caixasCores=[],e.length===0)return;let n=[],r=[],i=[],a=[[0,1,2,3],[4,7,6,5],[0,4,5,1],[3,2,6,7],[0,3,7,4],[1,5,6,2]],o=new Map;for(let t of e){let e=t.cantos,i=[0,1,2].map(t=>[0,1,2,3,4,5,6,7].reduce((n,r)=>n+e[r*3+t],0)/8),s=[];for(let t of a){let a=t.map(t=>[e[t*3],e[t*3+1],e[t*3+2]]),o=E(a[0],a[1],a[2]),c=[(a[0][0]+a[2][0])/2,(a[0][1]+a[2][1])/2,(a[0][2]+a[2][2])/2],l=(c[0]-i[0])*o[0]+(c[1]-i[1])*o[1]+(c[2]-i[2])*o[2]>=0,u=l?o:[-o[0],-o[1],-o[2]],d=n.length/3;for(let e of a)n.push(e[0],e[1],e[2]),r.push(u[0],u[1],u[2]);let f=l?[0,1,2,0,2,3]:[0,2,1,0,3,2];for(let e of f)s.push(d+e)}let c=o.get(t.material)??[];c.push(...s),o.set(t.material,c)}for(let[e,t]of o)this.caixasCores.push({inicio:i.length,quantidade:t.length,cor:x[e]??x.A4_raia}),i.push(...t);this.vaoCaixas=this.vaoEstatico(new Float32Array(n),new Float32Array(r),new Uint16Array(i))}medir(e,t,n){let r=this.tela;return r.width=Math.max(1,Math.round(e*n)),r.height=Math.max(1,Math.round(t*n)),this.largura=r.width,this.altura=r.height,r.width>=2&&r.height>=2}projetar(e,t){let n=c(this.vistaProj,e);return this.vistaProj[3]*e[0]+this.vistaProj[7]*e[1]+this.vistaProj[11]*e[2]+this.vistaProj[15]<=0?null:[(n[0]+1)/2*(this.largura/t),(1-n[1])/2*(this.altura/t)]}posicaoDoOsso(e,t){return c(e.subarray(t*16,t*16+16),this.corpo.origemDoOsso(t))}desenhar(e){let t=this.gl;if(this.contextoPerdido)return;let{amostra:s}=e,c=this.loc.uniformes;t.viewport(0,0,this.largura,this.altura),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.useProgram(this.programa),i(a(s.camera.orientacao,s.camera.posicao),this.vista);let l=this.enquadrar(s,e.aspectoDaCena);o(l.tanMeioVertical,this.largura/this.altura,.05,300,l.deslocamento,this.proj),r(this.proj,this.vista,this.vistaProj),t.uniformMatrix4fv(c.uVista??null,!1,this.vista),t.uniformMatrix4fv(c.uProj??null,!1,this.proj),t.uniform1f(c.uCamada??null,e.camada),t.uniform1f(c.uTransl??null,e.translucidez),t.uniform1f(c.uTempo??null,e.tempo),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.texOssos),t.texSubImage2D(t.TEXTURE_2D,0,0,0,4,this.corpo.ossos.length,t.RGBA,t.FLOAT,s.skins),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.texPecasDado),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,this.texPecas),this.pecasBytes.fill(0);for(let[e,t]of s.realce){let n=this.corpo.indicePorNome.get(e);n!==void 0&&(this.pecasBytes[n*4]=Math.round(Math.min(1,Math.max(0,t))*255))}for(let[e,t]of s.atenua){let n=this.corpo.indicePorNome.get(e);n!==void 0&&(this.pecasBytes[n*4+1]=Math.round(Math.min(1,Math.max(0,t))*255))}t.texSubImage2D(t.TEXTURE_2D,0,0,0,m,1,t.RGBA,t.UNSIGNED_BYTE,this.pecasBytes),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.CULL_FACE),t.cullFace(t.BACK),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),this.loc.aPeca>=0&&t.vertexAttrib1f(this.loc.aPeca,m-1),t.uniform1i(c.uSkin??null,0),t.uniform1i(c.uPapel??null,3),t.depthMask(!1),t.disable(t.DEPTH_TEST);let u=this.pesNoChao(s.skins);if(a([0,0,0,1],[u.x,.003,u.z],[u.rx,1,u.rz],this.modelo),t.uniformMatrix4fv(c.uModelo??null,!1,this.modelo),t.bindVertexArray(this.vaoSombra),t.drawElements(t.TRIANGLES,120,t.UNSIGNED_SHORT,0),t.enable(t.DEPTH_TEST),t.depthMask(!0),t.uniform1i(c.uPapel??null,2),this.vaoCaixas!==null){t.uniformMatrix4fv(c.uModelo??null,!1,n()),t.bindVertexArray(this.vaoCaixas);for(let e of this.caixasCores)t.uniform3f(c.uCorCaixa??null,e.cor[0],e.cor[1],e.cor[2]),t.drawElements(t.TRIANGLES,e.quantidade,t.UNSIGNED_SHORT,e.inicio*2)}if(s.bola!==null){let e=.11;a(s.bola.orientacao,s.bola.posicao,[e,e,e],this.modelo),t.uniformMatrix4fv(c.uModelo??null,!1,this.modelo);let n=x.bola;t.uniform3f(c.uCorCaixa??null,n[0],n[1],n[2]),t.bindVertexArray(this.vaoBola),t.drawElements(t.TRIANGLES,this.bolaIndices,t.UNSIGNED_SHORT,0)}if(t.uniform1i(c.uSkin??null,1),t.bindVertexArray(this.vaoCorpo),e.translucidez>.01||e.camada>.01){t.uniform1i(c.uPapel??null,1);for(let e of f){let n=this.corpo.faixa(e);n!==null&&t.drawElements(t.TRIANGLES,n.quantidade,this.tipoIndice,n.inicio*this.bytesPorIndice)}}let d=this.corpo.faixa(`pele`);if(d!==null){t.uniform1i(c.uPapel??null,0);let n=e.translucidez<.02&&e.camada<.02;t.depthMask(n),t.cullFace(t.FRONT),t.uniform1f(c.uFrente??null,0),t.drawElements(t.TRIANGLES,d.quantidade,this.tipoIndice,d.inicio*this.bytesPorIndice),t.cullFace(t.BACK),t.uniform1f(c.uFrente??null,1),t.drawElements(t.TRIANGLES,d.quantidade,this.tipoIndice,d.inicio*this.bytesPorIndice),t.depthMask(!0)}t.bindVertexArray(null)}enquadrar(e,t){let n=Math.tan(e.camera.fovVertical*Math.PI/360),r=this.largura/this.altura,i=n*t;if(r>=t-.001)return this.enquadramento={tanMeioVertical:n,tanMeioVerticalDaCena:n,deslocamento:0,fracaoDaLargura:1,figuraCabe:!0},this.enquadramento;let a=1/0,o=-1/0;for(let t=0;t<this.corpo.ossos.length;t+=1){let n=c(this.vista,this.posicaoDoOsso(e.skins,t));if(n[2]<-.05){let e=n[0]/-n[2];a=Math.min(a,e),o=Math.max(o,e)}}let s=i/r,l=n,u=0,d=0;a<o&&(d=(o-a)/2,u=(a+o)/2,l=Math.min(s,Math.max(n,d/(.92*r))));let f=l*r,p=Math.max(0,i-f),m=Math.min(p,Math.max(-p,u));return this.enquadramento={tanMeioVertical:l,tanMeioVerticalDaCena:n,deslocamento:-m/f,fracaoDaLargura:Math.min(1,f/i),figuraCabe:d<=.92*f+1e-6},this.enquadramento}pesNoChao(e){let t=this.corpo.ossos.indexOf(`DEF-foot.L`),n=this.corpo.ossos.indexOf(`DEF-foot.R`);if(t<0||n<0)return{x:0,z:0,rx:.5,rz:.5};let r=this.posicaoDoOsso(e,t),i=this.posicaoDoOsso(e,n),a=(r[0]+i[0])/2,o=(r[2]+i[2])/2,s=Math.abs(r[0]-i[0]),c=Math.abs(r[2]-i[2]);return{x:a,z:o,rx:.32+s*.6,rz:.32+c*.6}}destruir(){let e=this.gl;e.deleteProgram(this.programa),e.deleteVertexArray(this.vaoCorpo),e.deleteVertexArray(this.vaoBola),e.deleteVertexArray(this.vaoSombra),this.vaoCaixas!==null&&e.deleteVertexArray(this.vaoCaixas),e.deleteTexture(this.texOssos),e.deleteTexture(this.texPecasDado),e.deleteTexture(this.texPecas),e.getExtension(`WEBGL_lose_context`)?.loseContext()}};function C(e){if(e===null)throw Error(`WebGL: recurso não criado`);return e}function w(e){e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}function T(e,t,n){let r=C(e.createProgram());for(let[i,a]of[[e.VERTEX_SHADER,t],[e.FRAGMENT_SHADER,n]]){let t=C(e.createShader(i));if(e.shaderSource(t,a),e.compileShader(t),!e.getShaderParameter(t,e.COMPILE_STATUS)){let n=e.getShaderInfoLog(t)??`erro desconhecido`;throw e.deleteShader(t),Error(`Shader não compilou: ${n}`)}e.attachShader(r,t)}if(e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS))throw Error(`Programa não ligou: ${e.getProgramInfoLog(r)??``}`);return r}function E(e,t,n){let r=t[0]-e[0],i=t[1]-e[1],a=t[2]-e[2],o=n[0]-e[0],s=n[1]-e[1],c=n[2]-e[2],l=[i*c-a*s,a*o-r*c,r*s-i*o],u=Math.hypot(l[0],l[1],l[2])||1;return[l[0]/u,l[1]/u,l[2]/u]}function D(e,t){let n=[],r=[];for(let r=0;r<=t;r+=1){let i=r/t*Math.PI;for(let t=0;t<=e;t+=1){let r=t/e*Math.PI*2;n.push(Math.sin(i)*Math.cos(r),Math.cos(i),Math.sin(i)*Math.sin(r))}}for(let n=0;n<t;n+=1)for(let t=0;t<e;t+=1){let i=n*(e+1)+t,a=i+e+1;r.push(i,a,i+1,a,a+1,i+1)}let i=new Float32Array(n);return{pos:i,nrm:new Float32Array(i),tri:new Uint16Array(r)}}function O(e){let t=[0,0,0],n=[0,1,0],r=[];for(let r=0;r<e;r+=1){let i=r/e*Math.PI*2;t.push(Math.cos(i),0,Math.sin(i)),n.push(0,1,0)}for(let t=0;t<e;t+=1)r.push(0,1+(t+1)%e,1+t);return{pos:new Float32Array(t),nrm:new Float32Array(n),tri:new Uint16Array(r)}}var k={vertex:`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;

in vec3 aPos;
in vec3 aNrm;
in vec4 aIdx;
in vec4 aPes;
in float aPeca;

uniform sampler2D uOssos;
uniform sampler2D uPecasDado;
uniform sampler2D uPecas;
uniform mat4 uVista;
uniform mat4 uProj;
uniform mat4 uModelo;
uniform vec3 uPosMin;
uniform float uPosEscala;
uniform int uSkin;
/* A virilha do manequim: (y de cima, y de baixo, z de cima, z de baixo) no repouso, e a meia largura
   em x. A pele exportada e a malha nua do CharMorph; a referencia do dono e um manequim liso. Entre
   o pubis e o entrepernas a pele e achatada contra um plano inclinado, como a lycra de um short:
   nada e escondido por material opaco, porque o adutor longo aceso do chute mora exatamente ai. */
uniform vec4 uVirilha;
uniform float uVirilhaX;

out vec3 vNrm;
out vec3 vPosV;
out vec3 vRest;
out vec3 vFibra;
out vec3 vCentro;
out vec4 vPeca;
out float vClasse;
out float vCobertura;

/* Quinta coluna da textura de ossos: 1 onde a pele cobre uma região SEM anatomia
   exportada (cabeça, pescoço, braços e mãos). No écorché essa pele fica opaca, um
   manequim azul, em vez de um fantasma vazio. */
float cobertura(float i) {
  return texelFetch(uOssos, ivec2(4, int(i + 0.5)), 0).x;
}

mat4 osso(float i) {
  int y = int(i + 0.5);
  return mat4(
    texelFetch(uOssos, ivec2(0, y), 0),
    texelFetch(uOssos, ivec2(1, y), 0),
    texelFetch(uOssos, ivec2(2, y), 0),
    texelFetch(uOssos, ivec2(3, y), 0));
}

void main() {
  vec3 p = uSkin == 1 ? uPosMin + (aPos + 32767.0) * uPosEscala : aPos;
  if (uSkin == 1 && aPeca < 0.5 && p.y < uVirilha.x && p.y > uVirilha.y && abs(p.x) < uVirilhaX) {
    float t = (p.y - uVirilha.y) / (uVirilha.x - uVirilha.y);
    float zLim = mix(uVirilha.w, uVirilha.z, t);
    float peso = smoothstep(uVirilhaX, uVirilhaX * 0.55, abs(p.x)) * smoothstep(0.0, 0.15, t) * smoothstep(1.0, 0.85, t);
    p.z = mix(p.z, min(p.z, zLim), peso);
  }
  mat4 M = uModelo;
  vCobertura = 0.0;
  if (uSkin == 1) {
    M = aPes.x * osso(aIdx.x) + aPes.y * osso(aIdx.y) + aPes.z * osso(aIdx.z) + aPes.w * osso(aIdx.w);
    vCobertura = aPes.x * cobertura(aIdx.x) + aPes.y * cobertura(aIdx.y) + aPes.z * cobertura(aIdx.z) + aPes.w * cobertura(aIdx.w);
  }
  vec4 pw = M * vec4(p, 1.0);
  vec3 nw = normalize(mat3(M) * aNrm);
  vec4 pv = uVista * pw;
  vPosV = pv.xyz;
  vNrm = mat3(uVista) * nw;
  vRest = p;
  int k = int(aPeca + 0.5);
  vec4 d0 = texelFetch(uPecasDado, ivec2(k, 0), 0);
  vec4 d1 = texelFetch(uPecasDado, ivec2(k, 1), 0);
  vFibra = d0.xyz;
  vClasse = d0.w;
  vCentro = d1.xyz;
  vPeca = texelFetch(uPecas, ivec2(k, 0), 0);
  gl_Position = uProj * pv;
}
`,fragmento:`#version 300 es
precision highp float;

in vec3 vNrm;
in vec3 vPosV;
in vec3 vRest;
in vec3 vFibra;
in vec3 vCentro;
in vec4 vPeca;
in float vClasse;
in float vCobertura;

uniform int uPapel;
uniform float uCamada;
uniform float uTransl;
uniform float uFrente;
uniform vec3 uLuz;
uniform vec3 uCorCaixa;
uniform float uTempo;

out vec4 saida;


const vec3 ABISSAL = vec3(0.024, 0.102, 0.200);
const vec3 PROFUNDO = vec3(0.043, 0.235, 0.478);
const vec3 PRIMARIO = vec3(0.086, 0.408, 0.890);
const vec3 ELETRICO = vec3(0.220, 0.741, 0.973);
const vec3 CLARO = vec3(0.949, 0.969, 0.992);


float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float ruido(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}

float luminancia(vec3 c) {
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

/* A fibra: feixes a cada 2,5 mm perpendiculares ao eixo da peça, um ruído fino
   por cima, os mesmos números da receita A4_musculo (perp x420, ao longo x5,
   fino x1400 / x25 a 20%). */
float fibra() {
  vec3 d = vRest - vCentro;
  float par = dot(d, vFibra);
  vec3 perp = d - vFibra * par;
  float grosso = ruido(perp * 420.0 + vFibra * par * 5.0);
  float fino = ruido(perp * 1400.0 + vFibra * par * 25.0);
  return grosso * 0.8 + fino * 0.2;
}

void main() {
  vec3 n = normalize(vNrm);
  if (!gl_FrontFacing) {
    n = -n;
  }
  vec3 v = normalize(-vPosV);
  float nv = max(dot(n, v), 0.0);
  float fres = pow(1.0 - nv, 2.2);
  vec3 l = normalize(uLuz);
  float dif = max(dot(n, l), 0.0);
  float spec = pow(max(dot(reflect(-l, n), v), 0.0), 48.0);
  float realce = vPeca.r;
  float atenua = vPeca.g;
  int classe = int(vClasse + 0.5);

  // ---------------------------------------------------------------- sombra de contato
  if (uPapel == 3) {
    float r = length(vRest.xz);
    float a = smoothstep(1.0, 0.15, r) * 0.55;
    saida = vec4(0.0, 0.0, 0.0, a);
    return;
  }

  // ---------------------------------------------------------------- caixas e bola: vidro sólido azul
  if (uPapel == 2) {
    vec3 cor = uCorCaixa * (0.3 + 0.7 * dif) + ELETRICO * fres * 0.45 + vec3(spec) * 0.2;
    float a = 0.4 + 0.45 * fres;
    saida = vec4(cor * a, a);
    return;
  }

  // ---------------------------------------------------------------- a pele
  if (uPapel == 0) {
    // opaco: um corpo azul da marca, iluminado, com borda elétrica e pouco brilho (nada de plástico)
    vec3 opaco = mix(PROFUNDO * 0.7, PRIMARIO * 0.95, dif * 0.8 + 0.2) + ELETRICO * fres * 0.45 + vec3(spec) * 0.18;
    // vidro: só a borda existe, mais forte quanto mais rasante, quase branca no pico
    vec3 borda = mix(ELETRICO, CLARO, pow(fres, 3.0));
    vec3 vidro = borda * fres * 1.25 + PRIMARIO * 0.04 + vec3(spec) * 0.5;
    float aVidro = fres * 0.7 + 0.03;
    // atrás (faces de costas) o vidro é mais fraco, um volume interno
    float lado = mix(0.4, 1.0, uFrente);
    // no écorché a pele vira um fantasma fino onde há anatomia por baixo, e fica
    // o manequim opaco onde não há (cabeça, braços): o Z-Anatomy exportado é tronco e pernas
    float coberta = clamp(vCobertura * uCamada, 0.0, 1.0);
    float ecorche = 1.0 - 0.8 * uCamada;
    vec3 cor = mix(opaco, vidro * lado * ecorche, uTransl);
    float a = mix(1.0, aVidro * lado * ecorche, uTransl);
    cor = mix(cor, opaco * mix(0.55, 1.0, uFrente), coberta);
    a = mix(a, 1.0, coberta);
    saida = vec4(cor * a, a);
    return;
  }

  // ---------------------------------------------------------------- a anatomia
  float s = fibra();
  // vidro: azul monocromático, o músculo um pouco mais escuro que o osso, fibra sutil
  // a familia e uma so, azul sobre azul (a referencia): osso e tendao mais claros que o musculo,
  // mas nunca brancos; o branco fica para a borda da pele e o pico do brilho
  vec3 baseVidro = vec3(0.16, 0.50, 0.96);
  float aVidro = 0.7;
  if (classe == 2) { baseVidro = vec3(0.56, 0.78, 1.0); aVidro = 0.86; }
  else if (classe == 3) { baseVidro = vec3(0.46, 0.74, 1.0); aVidro = 0.75; }
  else if (classe == 4) { baseVidro = vec3(0.34, 0.62, 0.98); aVidro = 0.65; }
  else if (classe == 5) { baseVidro = vec3(0.42, 0.70, 1.0); aVidro = 0.72; }
  if (classe == 1) { baseVidro *= 0.66 + 0.6 * s; }
  vec3 corVidro = baseVidro * (0.42 + 0.58 * dif) + ELETRICO * fres * 0.75 + vec3(spec) * 0.2;
  aVidro = aVidro + 0.25 * fres;

  // écorché: a receita da A4
  vec3 baseEc;
  float rug;
  if (classe == 1) {
    vec3 vinho = vec3(0.38, 0.075, 0.06);
    vec3 meio = vec3(0.56, 0.15, 0.115);
    vec3 salmao = vec3(0.70, 0.26, 0.20);
    baseEc = s < 0.5 ? mix(vinho, meio, s * 2.0) : mix(meio, salmao, (s - 0.5) * 2.0);
    rug = 0.55;
  } else if (classe == 2) { baseEc = vec3(0.90, 0.86, 0.76); rug = 0.4; }
  else if (classe == 3) { baseEc = vec3(0.93, 0.91, 0.84) * (0.92 + 0.08 * s); rug = 0.25; }
  else if (classe == 4) { baseEc = vec3(0.86, 0.80, 0.70); rug = 0.35; }
  else { baseEc = vec3(0.78, 0.84, 0.86); rug = 0.3; }
  vec3 preench = vec3(0.55, 0.65, 0.85) * 0.22 * max(dot(n, normalize(vec3(-0.7, 0.2, 0.5))), 0.0);
  float sss = classe == 1 ? 0.28 * pow(1.0 - nv, 1.0) : 0.0;
  vec3 corEc = baseEc * (0.16 + 0.84 * dif) + preench * baseEc + vec3(1.0, 0.45, 0.35) * sss * 0.35
    + vec3(spec) * mix(0.35, 0.10, rug) + ELETRICO * pow(fres, 2.0) * 0.18;

  vec3 cor = mix(corVidro, corEc, uCamada);
  float a = mix(aVidro, 1.0, uCamada);

  // atenuação dos vizinhos: valor cai 40%, saturação 55% (regra 3, item 4)
  float lum = luminancia(cor);
  cor = mix(cor, vec3(lum), 0.55 * atenua) * (1.0 - 0.40 * atenua);

  // o realce: a cor vai ao vermelho pela luminância, a fibra sobrevive
  if (realce > 0.001) {
    // a fibra manda na cor E na emissao: feixe claro vai ao laranja-vermelho, sulco fica no vinho
    // (regra 3, item 2: sombra, relevo e direcao de fibra visiveis dentro do vermelho)
    float faixa = clamp((luminancia(mix(baseVidro, baseEc, uCamada)) * (0.55 + 0.9 * s) - 0.03) / 0.27, 0.0, 1.0);
    vec3 vermelho = mix(vec3(0.40, 0.025, 0.015), vec3(1.0, 0.22, 0.05), faixa);
    vec3 tingida = mix(cor, vermelho * (0.30 + 0.85 * dif + 0.4 * fres), 0.8 * realce);
    vec3 emissao = vermelho * realce * (1.3 + 0.5 * fres) * 0.40 * (0.45 + 1.1 * s);
    cor = tingida + emissao;
    a = max(a, 0.9 * realce);
  }

  // a anatomia só existe quando a pele deixa de ser opaca
  float presenca = mix(clamp(uTransl * 1.4, 0.0, 1.0), 1.0, uCamada);
  a *= presenca;
  saida = vec4(cor * a, a);
}
`},A=`(min-width: 60rem)`,j=.09,ee=.5;function M(e){let t=ae(e);if(t===null)return()=>{};let{trilho:n,palco:r,poster:i,andamento:a,andamentoBarra:o,estado:s,chamada:c,chamadaLinha:l,chamadaRotulo:u,versoes:f}=t,p=window.matchMedia(A),m={bytes:0},h=null,g=null,_=null,y=!1,b=re(e,f),x=+(ie(e)===`ecorche`),C=x,w=1,T=1,E=0,D=Math.min(window.devicePixelRatio||1,2),O=0,M=-1,N=!1,P=[],F=new Float32Array(16),I=0,L=1,R=null,z=-1,B=0,V=ne(p.matches);Y();function H(e){s!==null&&(s.textContent=e)}async function oe(){try{H(`Carregando o corpo (`+V+`)`);let t=e.dataset[V===`leve`?`corpoLeve`:`corpoCheio`]??`/laboratorio/corpo-${V}.bin`,[n,a]=await Promise.all([v(t,m),U(b)]);if(y)return;g=n,F=new Float32Array(n.ossos.length*16);for(let e=0;e<n.ossos.length;e+=1)F[e*16]=1,F[e*16+5]=1,F[e*16+10]=1,F[e*16+15]=1;a.amarrar(n.ossos,n.repouso),_=document.createElement(`canvas`),_.setAttribute(`aria-hidden`,`true`),_.className=`lab-tela`,r.insertBefore(_,i===null?r.firstChild:i.nextSibling),h=new S(_,n,k),h.definirCaixas(a.cabecalho.caixas),W(),N=!0,e.dataset.carregado=`sim`,H(``),q()}catch(t){H(``),e.dataset.carregado=`falhou`,e.dataset.erro=t instanceof Error?t.message.slice(0,120):`erro`,$(),document.documentElement.dataset.lab=`parado`}}async function U(e){if(e.animacao!==null)return e.animacao;let t=await d(e.arquivo,m);return e.animacao=t,g!==null&&t.amarrar(g.ossos,g.repouso),t}function W(){let e=r.getBoundingClientRect();I=n.getBoundingClientRect().top+window.scrollY,L=Math.max(1,n.offsetHeight-r.offsetHeight),h!==null&&_!==null&&(h.medir(Math.max(1,e.width),Math.max(1,e.height),D)||_.remove()),q()}function G(){let e=window.scrollY-I;return Math.min(1,Math.max(0,e/L))}function K(e){let t=e*b.pesoTotal,n=0,r=b.planos[b.planos.length-1];for(let e of b.planos){let i=n+e.peso;if(t<=i||e===r){let i=Math.min(1,Math.max(0,(t-n)/e.peso));return{quadro:e.quadroInicial+i*(e.quadros-+(e===r)),plano:e,fracao:i}}n=i}return{quadro:1,plano:b.planos[0],fracao:0}}function se(e,t,n){let r=e.translucidez;return r===`trilha`?n.translucidez:typeof r==`number`?r:r[0]+(r[1]-r[0])*te(t)}function q(){O===0&&(O=window.requestAnimationFrame(J))}function J(t){if(O=0,y)return;let n=E===0?.016:Math.min(.1,(t-E)/1e3);E=t;let r=G(),{quadro:a,plano:s,fracao:c}=K(r);w=a;let l=1-Math.exp(-n/j);T+=(w-T)*l,Math.abs(w-T)<.02&&(T=w);let u=1-Math.exp(-n/(ee/3));if(C+=(x-C)*u,Math.abs(x-C)<.005&&(C=x),s.numero!==M){for(let e of b.planos)e===s?e.el.setAttribute(`data-ativo`,``):e.el.removeAttribute(`data-ativo`);M=s.numero,e.dataset.plano=String(s.numero)}if(o!==null&&(o.style.width=`${(r*100).toFixed(2)}%`),e.dataset.quadro=T.toFixed(1),e.dataset.progresso=r.toFixed(3),z=r,h!==null&&g!==null&&b.animacao!==null&&N){let n=performance.now(),r=b.animacao.amostrar(T,F);R=r;let a=se(s,c,r);h.desenhar({amostra:r,camada:C,translucidez:a,tempo:t/1e3,aspectoDaCena:b.animacao.aspecto}),e.dataset.translucidez=a.toFixed(2),e.dataset.camadaValor=C.toFixed(2),de(r),i!==null&&e.dataset.desenhado!==`sim`&&(e.dataset.desenhado=`sim`),ce(performance.now()-n)}T!==w||C!==x?O=window.requestAnimationFrame(J):E=0}function ce(t){if(P.push(t),P.length<30)return;let n=P.reduce((e,t)=>e+t,0)/P.length;P=[],B=n,n>28&&D>1&&(D=Math.max(1,D-.5),e.dataset.razao=String(D),W())}function le(e,t){if(g===null)return null;let n=g.indicePorNome.get(t);if(n===void 0)return null;let r=g.partes[n],i=e.skins.subarray(r.osso*16,r.osso*16+16),a=r.centro,o=i[3]*a[0]+i[7]*a[1]+i[11]*a[2]+i[15];return[(i[0]*a[0]+i[4]*a[1]+i[8]*a[2]+i[12])/o,(i[1]*a[0]+i[5]*a[1]+i[9]*a[2]+i[13])/o,(i[2]*a[0]+i[6]*a[1]+i[10]*a[2]+i[14])/o]}function ue(e,t,n,r){if(g===null||h===null)return null;let i=g.indicePorNome.get(t);if(i===void 0)return null;let a=g.partes[i],{posMin:o,posEscala:s}=g.cabecalho,c=Math.min(a.nv,48),l=Math.max(1,Math.floor(a.nv/c)),u=0,d=0,f=0,p=1/0,m=-1/0,_=1/0,v=-1/0;for(let t=0;t<c;t+=1){let i=a.v0+t*l,c=o[0]+(g.pos[i*3]+32767)*s,y=o[1]+(g.pos[i*3+1]+32767)*s,b=o[2]+(g.pos[i*3+2]+32767)*s,x=0,S=0,C=0;for(let t=0;t<4;t+=1){let n=g.pes[i*4+t]/255;if(n===0)continue;let r=e.skins.subarray(g.idx[i*4+t]*16,g.idx[i*4+t]*16+16);x+=n*(r[0]*c+r[4]*y+r[8]*b+r[12]),S+=n*(r[1]*c+r[5]*y+r[9]*b+r[13]),C+=n*(r[2]*c+r[6]*y+r[10]*b+r[14])}let w=h.projetar([x,S,C],D);w!==null&&w[0]>=0&&w[0]<=n&&w[1]>=0&&w[1]<=r&&(u+=w[0],d+=w[1],f+=1,p=Math.min(p,w[0]),m=Math.max(m,w[0]),_=Math.min(_,w[1]),v=Math.max(v,w[1]))}if(f===0)return null;let y=Math.min(1,Math.max(m-p,v-_)/(.5*Math.min(n,r)));return{ponto:[u/f,d/f],espalhamento:y}}function de(t){if(c===null||l===null||u===null||h===null||g===null)return;let n=r.clientWidth,i=r.clientHeight,a=null;for(let[e,r]of t.realce){if(r<=.08||!b.rotulos.has(e))continue;let o=ue(t,e,n,i),s=o===null?le(t,e):null,c=o?.ponto??(s===null?null:h.projetar(s,D));if(c===null||c[0]<-n/2||c[0]>n*1.5||c[1]<-i/2||c[1]>i*1.5)continue;let l=r+(o===null?0:1+.3*o.espalhamento);(a===null||l>a.nota)&&(a={nome:e,valor:r,px:c,nota:l})}if(a===null){c.removeAttribute(`data-visivel`),u.removeAttribute(`data-visivel`);return}let o=Math.round(Math.min(n,i)*.06),s=[Math.min(n-o,Math.max(o,a.px[0])),Math.min(i-o,Math.max(o,a.px[1]))];e.dataset.chamadaPresa=s[0]!==a.px[0]||s[1]!==a.px[1]?`sim`:`nao`;let d=b.rotulos.get(a.nome)??a.nome;u.textContent!==d&&(u.textContent=d);let f=s[0]>n/2;u.dataset.lado=f?`esquerda`:`direita`;let p=u.getBoundingClientRect(),m=r.getBoundingClientRect(),_=f?p.right-m.left:p.left-m.left,v=p.top-m.top+p.height/2;c.setAttribute(`viewBox`,`0 0 ${n} ${i}`),l.setAttribute(`x1`,_.toFixed(1)),l.setAttribute(`y1`,v.toFixed(1)),l.setAttribute(`x2`,s[0].toFixed(1)),l.setAttribute(`y2`,s[1].toFixed(1)),c.style.setProperty(`--realce`,a.valor.toFixed(2)),c.setAttribute(`data-visivel`,``),u.setAttribute(`data-visivel`,``),u.style.setProperty(`--realce`,a.valor.toFixed(2))}function Y(){e.dataset.versao=b.id,e.style.setProperty(`--lab-pesos`,b.pesoTotal.toFixed(2)),M=-1;for(let e of f)for(let t of e.planos)t.el.removeAttribute(`data-ativo`)}async function fe(e){let t=f.find(t=>t.id===e);if(t===void 0||t===b)return;let n=G();if(b=t,Y(),W(),window.scrollTo({top:I+n*L,behavior:`instant`}),T=K(n).quadro,t.animacao===null){H(`Carregando a outra versão`);try{await U(t)}catch{H(`A outra versão não carregou`);return}if(y||b!==t)return;H(``)}h!==null&&t.animacao!==null&&h.definirCaixas(t.animacao.cabecalho.caixas),q()}function pe(t){e.dataset.camada=t,x=+(t===`ecorche`),q()}let me=e=>{let t=e.target;!(t instanceof HTMLInputElement)||!t.checked||(t.name===`lab-versao`?fe(t.value):t.name===`lab-camada`&&pe(t.value))};e.addEventListener(`change`,me);let he=()=>q();window.addEventListener(`scroll`,he,{passive:!0});let X=new ResizeObserver(()=>W());X.observe(r),X.observe(n);let Z=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&!N&&h===null&&(Z.disconnect(),oe())},{rootMargin:`100% 0px 100% 0px`});Z.observe(e);let Q=window.matchMedia(`(prefers-reduced-motion: reduce)`),ge=()=>{Q.matches&&($(),document.documentElement.dataset.lab=`parado`)};Q.addEventListener(`change`,ge),i!==null&&i.setAttribute(`aria-hidden`,`true`),a!==null&&a.setAttribute(`aria-hidden`,`true`),W(),q();let _e=window;_e.__lab={lod:V,versao:()=>b.id,camada:()=>e.dataset.camada,bytes:()=>m.bytes,carregado:()=>N,quadro:()=>T,quadroAlvo:()=>w,plano:()=>M,progresso:()=>G(),progressoAplicado:()=>z,enquadramento:()=>h?.enquadramento??null,msPorQuadro:()=>B,triangulos:()=>h?.triangulos??0,erroGl:()=>h?.erro()??-1,desenhado:()=>e.dataset.desenhado===`sim`,razao:()=>D,realce:()=>R===null?{}:Object.fromEntries(R.realce),translucidez:()=>e.dataset.translucidez,pronto:()=>N&&e.dataset.desenhado===`sim`&&Math.abs(z-G())<1e-6&&T===w&&C===x,trocarVersao:e=>fe(e),trocarCamada:e=>pe(e)};function $(){if(!y){y=!0,window.removeEventListener(`scroll`,he),e.removeEventListener(`change`,me),X.disconnect(),Z.disconnect(),Q.removeEventListener(`change`,ge),O!==0&&window.cancelAnimationFrame(O),h?.destruir(),h=null,_?.remove(),_=null;for(let e of f)for(let t of e.planos)t.el.removeAttribute(`data-ativo`);i?.removeAttribute(`aria-hidden`),a?.removeAttribute(`aria-hidden`),delete _e.__lab,delete e.dataset.ligado,delete e.dataset.carregado,delete e.dataset.desenhado}}return $}function te(e){let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)}function ne(e){let t=navigator.deviceMemory;return t!==void 0&&t<4?`leve`:e?`cheio`:`leve`}function re(e,t){let n=e.querySelector(`input[name="lab-versao"]:checked`)?.value??e.dataset.versao??`corredor`;return t.find(e=>e.id===n)??t[0]}function ie(e){return e.querySelector(`input[name="lab-camada"]:checked`)?.value??`vidro`}function N(e){if(e===void 0||e===`trilha`)return`trilha`;let t=e.split(`,`).map(Number);if(t.length===2&&t.every(e=>Number.isFinite(e)))return[t[0],t[1]];let n=Number(e);return Number.isFinite(n)?n:`trilha`}function ae(e){let t=e.querySelector(`[data-trilho]`),n=e.querySelector(`[data-palco]`);if(t===null||n===null)return null;let r=[];for(let t of e.querySelectorAll(`[data-planos]`)){let e=t.dataset.planos,n=t.dataset.arquivo;if(e===void 0||n===void 0)continue;let i=[...t.querySelectorAll(`[data-plano]`)].map(e=>({el:e,numero:Number(e.dataset.plano),quadroInicial:Number(e.dataset.quadroInicial),quadros:Number(e.dataset.quadros),peso:Number(e.dataset.peso),translucidez:N(e.dataset.transl)}));if(i.length===0)continue;let a=new Map;for(let e of t.querySelectorAll(`[data-peca]`))a.set(e.dataset.peca??``,e.textContent?.trim()??``);r.push({id:e,arquivo:n,planos:i,pesoTotal:i.reduce((e,t)=>e+t.peso,0),rotulos:a,animacao:null})}return r.length===0?null:{raiz:e,trilho:t,palco:n,poster:n.querySelector(`[data-poster]`),andamento:e.querySelector(`[data-andamento]`),andamentoBarra:e.querySelector(`[data-andamento-barra]`),estado:e.querySelector(`[data-estado]`),chamada:e.querySelector(`svg[data-chamada]`),chamadaLinha:e.querySelector(`svg[data-chamada] line`),chamadaRotulo:e.querySelector(`[data-chamada-rotulo]`),versoes:r}}export{M as iniciarLaboratorio};