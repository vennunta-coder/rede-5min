
document.addEventListener("DOMContentLoaded", function(){
  // Hamburger (all pages)
  var btn = document.getElementById("menuBtn");
  var mobile = document.getElementById("menuMobile");
  if (btn && mobile){ btn.addEventListener("click", function(){ mobile.classList.toggle("hidden"); }); }

  // Protect internal pages
  var internal = ["feed.html","videos.html","perfil.html","amigos.html","mensagens.html","notificacoes.html","config.html"];
  var onInternal = internal.some(function(p){ return location.pathname.endsWith(p); });
  if (onInternal){
    var nome = localStorage.getItem("r5m_nome");
    var email = localStorage.getItem("r5m_email");
    var genero = localStorage.getItem("r5m_genero");
    if(!nome || !email || !genero){ location.href = "index.html"; return; }
  }

  // Config: theme + logout
  var toggleTema = document.getElementById("toggleTema");
  if (toggleTema){ toggleTema.addEventListener("click", function(){ document.documentElement.classList.toggle("light"); }); }
  var sair = document.getElementById("sair");
  if (sair){ sair.addEventListener("click", function(){ localStorage.clear(); location.href = "index.html"; }); }

  // Feed: welcome + post
  var boas = document.getElementById("boasVindas");
  if (boas){
    var nome = localStorage.getItem("r5m_nome") || "Usuário";
    var genero = localStorage.getItem("r5m_genero") || "";
    boas.textContent = "Bem-vindo(a), " + nome + " (" + genero + ")!";
    var publicarBtn = document.getElementById("publicarBtn");
    var feed = document.getElementById("feedPosts");
    var postInput = document.getElementById("postInput");
    if (publicarBtn && feed && postInput){
      publicarBtn.addEventListener("click", function(){
        var t = postInput.value.trim();
        if (!t || t.length>200) return;
        var el = document.createElement("div");
        el.className = "p-4 rounded-xl border border-neutral-800 bg-neutral-950";
        el.textContent = t;
        feed.prepend(el);
        postInput.value = "";
      });
    }
  }

  // Perfil
  var generoPerfil = document.getElementById("generoPerfil");
  if (generoPerfil){
    generoPerfil.textContent = "Gênero: " + (localStorage.getItem("r5m_genero") || "Não informado");
    var bioInput = document.getElementById("bio");
    var salvarBio = document.getElementById("salvarBio");
    if (bioInput && salvarBio){
      bioInput.value = localStorage.getItem("r5m_bio") || "";
      salvarBio.addEventListener("click", function(){ localStorage.setItem("r5m_bio", bioInput.value); alert("Bio salva!"); });
    }
  }

  // Mensagens
  var enviarMsg = document.getElementById("enviarMsg");
  if (enviarMsg){
    enviarMsg.addEventListener("click", function(){
      var box = document.getElementById("msgInput");
      var list = document.getElementById("mensagensLista");
      var txt = (box.value||"").trim();
      if (!txt) return;
      var item = document.createElement("div");
      item.className = "p-3 rounded-xl border border-neutral-800 bg-neutral-950";
      item.textContent = txt;
      list.prepend(item);
      box.value = "";
    });
  }

  // Stories
  (function(){
    var bar = document.getElementById("storiesBar");
    var add = document.getElementById("addStoryBtn");
    if (!bar || !add) return;
    var KEY = "R5M_STORIES_V1";
    function get(){ try { return JSON.parse(localStorage.getItem(KEY)||"[]"); } catch(e){ return []; } }
    function set(v){ localStorage.setItem(KEY, JSON.stringify(v)); }
    function render(){
      var arr = get(); bar.innerHTML="";
      arr.forEach(function(s){
        var b = document.createElement("button"); b.className="flex flex-col items-center gap-2";
        b.innerHTML = "<div class='w-[62px] h-[62px] rounded-full border-2 border-orange-500 grid place-items-center bg-neutral-950 text-neutral-100 font-semibold'>"+(s.type==="text"?(s.content||"..."):"IMG")+"</div><span class='text-xs text-neutral-400 max-w-[70px] text-center'>"+(s.title||"Story")+"</span>";
        b.addEventListener("click", function(){ open(s); }); bar.appendChild(b);
      });
    }
    function open(s){
      var modal = document.createElement("div"); modal.className="fixed inset-0 bg-black/80 grid place-items-center z-50";
      var card = document.createElement("div"); card.className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900 w-[min(92vw,560px)]";
      card.innerHTML = "<h3 class='text-xl font-semibold mb-3 text-orange-500'>Story</h3><div class='min-h-[240px] grid place-items-center rounded-xl border border-neutral-800 bg-neutral-950 p-3'>"+(s.type==="text"?"<p class='text-2xl text-center'>"+(s.content||"...")+"</p>":"<img alt='story' src='"+(s.dataUrl||"")+"' class='max-w-full h-auto rounded-lg'/>")+"</div><div class='mt-3 flex justify-end'><button id='closeStory' class='px-3 py-2 rounded-xl border border-neutral-700 bg-neutral-950 hover:bg-neutral-800'>Fechar</button></div>";
      modal.appendChild(card); document.body.appendChild(modal);
      card.querySelector("#closeStory").addEventListener("click", function(){ modal.remove(); });
    }
    add.addEventListener("click", function(){
      var choice = prompt("Novo Story: T texto / I imagem"); if(!choice) return;
      var arr = get();
      if (choice.toLowerCase()==="t"){
        var c = prompt("Texto do story (curto):")||""; arr.unshift({type:"text", content:c.slice(0,24), title:"Você"});
      } else if (choice.toLowerCase()==="i"){
        var input = document.createElement("input"); input.type="file"; input.accept="image/*";
        input.onchange=function(){ var f=input.files&&input.files[0]; if(!f) return;
          var r=new FileReader(); r.onload=function(){ arr.unshift({type:"image", dataUrl:r.result, title:"Você"}); set(arr); render(); }; r.readAsDataURL(f);
        }; input.click(); return;
      }
      set(arr); render();
    });
    if (get().length===0){ set([{type:"text", content:"👋 oi!", title:"Você"}]); }
    render();
  })();

  // TikTok-like videos
  (function(){
    var wrap = document.getElementById("tiktokFeed");
    if (!wrap) return;
    var file = document.getElementById("videoFile");
    var clear = document.getElementById("clearVideos");
    var KEY = "R5M_VIDEOS_V1";
    function get(){ try { return JSON.parse(localStorage.getItem(KEY)||"[]"); } catch(e){ return []; } }
    function set(v){ localStorage.setItem(KEY, JSON.stringify(v)); }
    function render(){
      wrap.innerHTML = "";
      var vids = get();
      if (vids.length===0){
        var empty = document.createElement("div");
        empty.className = "p-4 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-400";
        empty.textContent = "Nenhum vídeo ainda. Use “+ Adicionar vídeo”.";
        wrap.appendChild(empty); return;
      }
      vids.forEach(function(v,i){
        var card = document.createElement("article");
        card.className = "relative rounded-2xl border border-neutral-800 overflow-hidden bg-black min-h-[420px]";
        card.innerHTML = "<video playsinline preload='metadata' src='"+v.src+"' class='w-full h-full object-cover'></video>\
        <div class='absolute inset-0 flex items-end justify-between p-3 bg-gradient-to-b from-transparent via-black/40 to-black/70 text-white'>\
          <div class='text-sm opacity-90'><div>@"+(v.user||"voce")+"</div><div>"+(v.desc||"")+"</div></div>\
          <div class='flex flex-col gap-2 items-center'>\
            <button class='px-2 py-1 rounded bg-white/10 likeBtn'>❤️</button><div class='text-center text-xs likeCount'>"+(v.likes||0)+"</div>\
            <button class='px-2 py-1 rounded bg-white/10 commentBtn'>💬</button><div class='text-center text-xs commentCount'>"+((v.comments||[]).length)+"</div>\
          </div>\
        </div>";
        wrap.appendChild(card);
      });
      setupAutoPlay(); setupActions();
    }
    function setupAutoPlay(){
      var vids = wrap.querySelectorAll("video");
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting){ e.target.play().catch(function(){}); }
          else { e.target.pause(); }
        });
      }, { threshold: 0.65 });
      vids.forEach(function(v){ io.observe(v); });
    }
    function setupActions(){
      var cards = wrap.querySelectorAll("article");
      cards.forEach(function(card, idx){
        var likeBtn = card.querySelector(".likeBtn");
        var likeCount = card.querySelector(".likeCount");
        var commentBtn = card.querySelector(".commentBtn");
        likeBtn.addEventListener("click", function(){
          var vids = get(); vids[idx].likes = (vids[idx].likes||0)+1; set(vids); likeCount.textContent = vids[idx].likes;
        });
        commentBtn.addEventListener("click", function(){
          var txt = prompt("Comentário:"); if(!txt) return;
          var vids = get(); vids[idx].comments = vids[idx].comments||[]; vids[idx].comments.push(txt); set(vids);
          card.querySelector(".commentCount").textContent = vids[idx].comments.length;
        });
      });
    }
    if (file){ file.addEventListener("change", function(){
      var f = file.files && file.files[0]; if (!f) return;
      var url = URL.createObjectURL(f);
      var vids = get(); vids.unshift({ src:url, user:"voce", desc:"", likes:0, comments:[] });
      set(vids); render();
    });}
    if (clear){ clear.addEventListener("click", function(){ localStorage.removeItem(KEY); render(); }); }
    render();
  })();
});
