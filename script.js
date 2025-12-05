current = null;

  activate = (panel) => {
    if(window.innerWidth > 900){
      stageRect = document.getElementById('stage').getBoundingClientRect();
      pRect = panel.getBoundingClientRect();

      sx = (stageRect.width) / pRect.width;
      sy = (stageRect.height) / pRect.height;

      tx = (stageRect.left + stageRect.width  / 2) - (pRect.left + pRect.width  / 2);
      ty = (stageRect.top  + stageRect.height / 2) - (pRect.top  + pRect.height / 2);

      panel.style.transform = `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;
      panel.classList.add('active');

      current = panel;
      if(current.classList.contains("tr")){
        document.querySelector(".divjeu").style.visibility="visible";
        setTimeout(function() {
                document.querySelector(".divjeu").style.opacity=1;
        }, 400);
      }
    }
}

onTransitionEnd = (e) => {
    if (e.propertyName === 'transform') {
      current.classList.remove('active');
      current.removeEventListener('transitionend', onTransitionEnd);
      current = null;
    }
  };

deactivate = () => {
  if(window.innerWidth > 900){
    if (!current) return;
    if(current.classList.contains("tr")){
      document.querySelector(".divjeu").style.opacity="0";
      setTimeout(function() {
              document.querySelector(".divjeu").style.visibility = "hidden";
      }, 200);
      setTimeout(function() {
              current.style.transform = '';
              current.addEventListener('transitionend', onTransitionEnd);
      }, 160);
    }else{
      current.style.transform = '';
      current.addEventListener('transitionend', onTransitionEnd);
    }
  }
}


[...document.querySelectorAll('.panel')].forEach(p => {
  p.addEventListener('click', e => {
    e.stopPropagation();
    (current === p) ? deactivate() : (deactivate(), activate(p));
  });
});

document.querySelector("iframe").addEventListener('click', e => {
    e.stopPropagation();
    (current === document.querySelector("iframe").parentElement) ? deactivate() : (deactivate(), activate(document.querySelector("iframe").parentElement));
  });

window.onresize = () => {
  if(document.querySelector('.active')) {
      deactivate(document.querySelector('.active'));
  }
}