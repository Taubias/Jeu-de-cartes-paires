
/*
var precedente = -1;
var attente    = 0;
var img;
var imgp;


//CACHE L'IMAGE ET RE-init attente
function cachephotos () {
  img.style.display = 'none';
  imgp.style.display = 'none';
  attente = 0;
}

document.querySelectorAll("div.cellule").forEach(cellule => cellule.addEventListener("click",function(e){
  //SI ATTENTE != 1 RIEN NE SE PASSE AU CLICS
    if (attente != 1) {
        //FIRSTELMENTCHILD = ELEMENT ENFANT EN EVITANT LES NOEUDS TEXTES VIDES
        img = this.firstElementChild;
        console.log(img);
        img.style.display = 'block';
        if (precedente<0) {
          precedente = (this.id).slice(1,3);
        } else {
          imgp  = document.querySelector("div#n"+precedente+" > img");
          if (imgp.src==img.src) {
            console.log('trouvé');  
          } else {
            //ATTENTE PERMET D'ATTENDRE QUE LA FONCTION CACHEPHOTOS SE REALISE
            attente = 1;
            setTimeout('cachephotos();',800);
          }
          precedente = -1;
        }
    }
}));


// Cette fonction permet d'intervertir deux images en elles on lance le process 200 fois pour simuler un vrai comportement aléatoire
function initgame () {
    console.log("--start--");
    for (var i=1 ; i<=200 ; i++) {
        //Math.random() donne une variable aleatoire en 0 et 1 sortant *16   
        //Math ceil -> arrondi entier sup    
        var n1    = Math.ceil(16*Math.random());
        var n2    = Math.ceil(16*Math.random());
        //> Enfant directe
        var img1  = document.querySelector("div#n"+n1+" > img");
        var img2  = document.querySelector("div#n"+n2+" > img");
        //INVERSION DE img 1 vers img 2
        var src1  = img1.src;
        var src2  = img2.src;
        img1.src = src2;
        img2.src = src1;
    }
}



*/




//METHODE 2 : OBJET
class game {
    constructor() {   
        this.attente    = 0;
        this.img;
        this.imgp;
        this.precedente = -1;
        //LE FAIT DE RETOURNER THIS PERMET DE CHAINER LES METHODES
        return this;
    }

    initgame(){
        console.log("--start--");
        for (let i=1 ; i<=200 ; i++) {
            let n1    = Math.ceil(16*Math.random());
            let n2    = Math.ceil(16*Math.random());
            let img1  = document.querySelector("div#n"+n1+" > img");
            let img2  = document.querySelector("div#n"+n2+" > img");
            let src1  = img1.src;
            let src2  = img2.src;
            img1.src = src2;
            img2.src = src1;
        }
        return this;
    }

    cachephotos(){
            //DATASET PERMET D'UTILISER LES DATA-* SUR LE DOM ( VARIABLE DYNAMIQUE D'ETAT DU COMPOSANT)
            this.img.dataset.affichage = false;
            this.img.style.display = 'none';
            this.imgp.dataset.affichage = false;
            this.imgp.style.display = 'none';
            this.attente = 0;
            return this;
          }

    click(){
        const that = this;
        document.querySelectorAll("div.cellule").forEach(cellule => cellule.addEventListener("click",function(e){
            
            if (that.attente != 1 &&  this.firstElementChild.dataset.affichage!="true") {
                that.img = this.firstElementChild;
                that.img.style.display = 'block';
                //DATASET PERMET DE SAVOIR SI ON A DEJA CLIQUE SUR UNE CARTE POUR EVITER LES BUG
                that.img.dataset.affichage = true;
                console.log(that.precedente);
                if (that.precedente<0) { 
                    that.precedente = (this.id).slice(1,3);
                    console.log(that,that.precedente);
                } else {
                    that.imgp  = document.querySelector("div#n"+that.precedente+" > img");
                  if (that.imgp.src==that.img.src) {
                    console.log('trouvé');  
                  } else {
                    that.attente = 1;
                    //A UTILISER
                    //setTimeout(that.cachephotos.bind(that),1000); //POURQUOI CA , car settimeout s'execute dans un contexte globale en asynchrone on est obligé d'utiliser bind pour préciser le contexte de la fonction. bind different de call et apply car il recrée une nouvelle fonction
                   setTimeout(function(){that.cachephotos()},1000);
                  }
                  that.precedente = -1;
                }
            }
            
        }));
        return this;
    }
}
