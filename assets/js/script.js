/* fonctions de la world map */
function  check_all_opacity() {
  var europe = document.querySelector('.Europe_div')
  var asie = document.querySelector('.Asie_div')
  var oceanie = document.querySelector('.Oceanie_div')
  var amerique_nord = document.querySelector('.Amerique_nord_div')
  var amerique_sud = document.querySelector('.Amerique_sud_div')
  var afrique = document.querySelector('.Afrique_div')

  if (europe.style.opacity == 0 && asie.style.opacity == 0
      && oceanie.style.opacity == 0 && amerique_nord.style.opacity == 0
      && amerique_sud.style.opacity == 0 && afrique.style.opacity == 0)
    return true;
  else
    return false;
}

function fadeIn(el, nb) {
      body.style.overflow = 'hidden';
      el.style.display = 'block';

      var tick_in = function() {
        if (el.style.opacity < nb)
        {
          setTimeout(tick_in, nb);
          el.style.opacity = +el.style.opacity + 0.01;
        }
      };
      tick_in();
}

function fadeOut(el) {
      var tick_out = function() {
        if (el.style.opacity > 0)
        {
          setTimeout(tick_out, 1);
          el.style.opacity = el.style.opacity - 0.01;
        }
      };
      tick_out();
}

    var body = document.querySelector('body');
    var el_country = document.querySelectorAll("svg path");
    var el_svg = document.querySelector("svg");

    for (var i = 0; i < el_country.length; i++)
    {
      el_country[i].addEventListener('click', function () {
        var name = this.className.baseVal;
        var string = ".window ." + name + "_div"; 

        var el = document.querySelector(string);

        if (check_all_opacity() == true)
        { 
          fadeIn(el, 1);
          scrollTo('section2', 500);
          var close = document.querySelector(string + " .close");
          window.onclick = function(event) {
          if ( (!(event.target == el)) && event.target.className != (name + '_picture') && el.style.opacity == 1)
            {
              fadeOut(el);
              setTimeout(function() {
                el.style.display = 'none';
            }, 1200);
          el_svg.style.display = 'block';
          body.style.overflow = 'scroll';
          }
        }
        };
      });
    }

/* fonction de transition pour le bouton section-down */
function scrollTo(to, duration) {
    var to = document.getElementById(to).offsetTop;
    

    if (document.body.scrollTop == to) return;
    
    var diff = to - document.body.scrollTop;
    var scrollStep = Math.PI / (duration / 10);
    var count = 0, currPos;
    start = window.pageYOffset;
    scrollInterval = setInterval(function(){
        if (document.body.scrollTop < to) {
            count = count + 1;
            currPos = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
            document.body.scrollTop = currPos;
        }else{
            clearInterval(scrollInterval);
        }
        
        /* le seul fix que j'ai trouvé LUL */
        document.body.scrollTop += 1;
    }, 10);
}

var btnDown = document.querySelectorAll('.btnGoTo').forEach(function(button){
    button.addEventListener('click', function(){
        scrollTo(button.getAttribute('data-target'), 1000);
    });
});