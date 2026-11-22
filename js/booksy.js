(function(){
  var btns=document.querySelectorAll('a[data-booksy]');
  if(!btns.length)return;
  var cur=null,timer=null,busy=null;
  var st=document.createElement('style');st.textContent='.booksy-widget-button{display:none!important}';document.head.appendChild(st);
  var live=document.createElement('div');
  live.setAttribute('aria-live','polite');
  live.style.cssText='position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)';
  document.body.appendChild(live);
  function setBusy(a){
    clearBusy();
    busy=a;a.dataset.label=a.textContent;a.textContent='Ouverture…';
    a.setAttribute('aria-busy','true');a.classList.add('is-chargement');
    live.textContent='Chargement de la réservation…';
  }
  function clearBusy(){
    if(!busy)return;
    busy.textContent=busy.dataset.label||'Réserver';
    busy.removeAttribute('aria-busy');busy.classList.remove('is-chargement');
    busy=null;live.textContent='';
  }
  function clean(){
    if(timer){clearInterval(timer);timer=null;}
    clearBusy();
    document.querySelectorAll('.booksy-widget-container').forEach(function(e){e.remove()});
    document.querySelectorAll('.booksy-widget-dialog').forEach(function(e){var p=e.parentElement;(p&&p.tagName==='DIV'&&!p.className?p:e).remove()});
    document.querySelectorAll('script[src*="booksy.com/widget"]').forEach(function(e){e.remove()});
  }
  btns.forEach(function(a){
    a.addEventListener('click',function(ev){
      ev.preventDefault();
      var id=a.getAttribute('data-booksy');
      if(cur===id){var b=document.querySelector('.booksy-widget-button');if(b){b.click();return;}}
      clean();cur=id;setBusy(a);
      var sc=document.createElement('script');
      sc.src='https://booksy.com/widget/code.js?id='+id+'&country=ca&lang=fr';
      document.body.appendChild(sc);
      var n=0;
      timer=setInterval(function(){
        var b=document.querySelector('.booksy-widget-button');
        if(b){clearInterval(timer);timer=null;clearBusy();b.click();}
        else if(++n>26){clearInterval(timer);timer=null;clearBusy();window.location.href=a.href;}
      },150);
    });
  });
})();
