/*====================================================
        INVITATION SPA PREMIUM
====================================================*/

/********************
      ELEMENTS
********************/

const envelope = document.getElementById("envelope");

const home = document.getElementById("home");

const invitation = document.getElementById("invitation");

const success = document.getElementById("success");

const yes = document.getElementById("yes");

const no = document.getElementById("no");

const canvas = document.getElementById("confetti");

const ctx = canvas.getContext("2d");

const petals = document.getElementById("petals");

/********************
      CANVAS
********************/

function resizeCanvas(){

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/********************
      ENVELOPPE
********************/

envelope.addEventListener("click", () => {

    envelope.classList.add("open");

    setTimeout(() => {

        home.style.opacity = "0";

    },1500);

    setTimeout(() => {

        home.style.display = "none";

        invitation.style.display = "flex";

        invitation.classList.add("fade");

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    },2200);

});

/********************
    COMPTE A REBOURS
********************/

const targetDate = new Date("2026-08-01T11:30:00").getTime();

function countdown(){

    const now = new Date().getTime();

    const distance = targetDate - now;

    if(distance < 0){

        return;

    }

    const days = Math.floor(distance / (1000*60*60*24));

    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds = Math.floor((distance%(1000*60))/1000);

    document.getElementById("days").innerHTML = days;

    document.getElementById("hours").innerHTML = hours;

    document.getElementById("minutes").innerHTML = minutes;

    document.getElementById("seconds").innerHTML = seconds;

}

countdown();

setInterval(countdown,1000);

/********************
      PETALES
********************/

function petal(){

    const p = document.createElement("div");

    p.innerHTML = "🌸";

    p.style.position = "fixed";

    p.style.left = Math.random()*100+"vw";

    p.style.top = "-30px";

    p.style.fontSize = (16+Math.random()*16)+"px";

    p.style.opacity = .8;

    p.style.pointerEvents = "none";

    petals.appendChild(p);

    const duration = 6000+Math.random()*4000;

    p.animate([

        {

            transform:"translateY(0) rotate(0deg)"

        },

        {

            transform:`translate(${Math.random()*200-100}px,110vh)
            rotate(${360+Math.random()*360}deg)`

        }

    ],{

        duration:duration,

        easing:"linear"

    });

    setTimeout(()=>{

        p.remove();

    },duration);

}

setInterval(petal,350);

/*====================================================
        BOUTON NON (PC + TELEPHONE)
====================================================*/

const buttons = document.querySelector(".buttons");

function moveNoButton(){

    const container = buttons.getBoundingClientRect();

    const btnWidth = no.offsetWidth;
    const btnHeight = no.offsetHeight;

    const maxX = container.width - btnWidth - 10;
    const maxY = container.height - btnHeight - 10;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    no.style.left = randomX + "px";
    no.style.top = randomY + "px";

}

/* Ordinateur */

no.addEventListener("mouseenter", moveNoButton);

no.addEventListener("mouseover", moveNoButton);

/* Téléphone */

no.addEventListener("touchstart", function(e){

    e.preventDefault();

    moveNoButton();

});

no.addEventListener("touchmove", function(e){

    e.preventDefault();

    moveNoButton();

});

no.addEventListener("click", function(e){

    e.preventDefault();

    moveNoButton();

});


/*====================================================
            CONFETTIS
====================================================*/

let confettis=[];

function createConfetti(){

    confettis=[];

    for(let i=0;i<250;i++){

        confettis.push({

            x:Math.random()*canvas.width,

            y:-20,

            size:5+Math.random()*10,

            speed:2+Math.random()*6,

            rotation:Math.random()*360,

            color:[
                "#D4AF37",
                "#E8C27A",
                "#FFFFFF",
                "#F7B7C3",
                "#C9A227"
            ][Math.floor(Math.random()*5)]

        });

    }

}

function drawConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    confettis.forEach(c=>{

        ctx.save();

        ctx.translate(c.x,c.y);

        ctx.rotate(c.rotation);

        ctx.fillStyle=c.color;

        ctx.fillRect(-c.size/2,-c.size/2,c.size,c.size);

        ctx.restore();

        c.y+=c.speed;

        c.rotation+=0.05;

    });

    confettis=confettis.filter(c=>c.y<canvas.height+20);

    if(confettis.length){

        requestAnimationFrame(drawConfetti);

    }

}


/*====================================================
            PLUIE DE COEURS
====================================================*/

function heart(){

    const h=document.createElement("div");

    h.innerHTML="❤️";

    h.style.position="fixed";

    h.style.left=Math.random()*100+"vw";

    h.style.top="-40px";

    h.style.fontSize=(18+Math.random()*20)+"px";

    h.style.pointerEvents="none";

    h.style.zIndex="999";

    document.body.appendChild(h);

    const duration=4000+Math.random()*3000;

    h.animate([

        {

            transform:"translateY(0) rotate(0deg)",

            opacity:1

        },

        {

            transform:`translateY(${window.innerHeight+80}px)
                       rotate(${360+Math.random()*360}deg)`,

            opacity:0

        }

    ],{

        duration:duration,

        easing:"linear"

    });

    setTimeout(()=>{

        h.remove();

    },duration);

}

/*====================================================
            BOUTON OUI
====================================================*/

yes.addEventListener("click", function(){

    /* Lance les confettis */

    createConfetti();

    drawConfetti();

    /* Lance une pluie de cœurs */

    for(let i=0;i<90;i++){

        setTimeout(function(){

            heart();

        },i*70);

    }

    /* Effet de disparition */

    invitation.style.opacity="0";

    invitation.style.transform="scale(.95)";

    invitation.style.transition="1s";

    /* Affiche le message Merci */

    setTimeout(function(){

        invitation.style.display="none";

        success.style.display="flex";

        success.classList.add("fade");

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    },1000);

});


/*====================================================
            LUEUR SUR LA CARTE
====================================================*/

const card=document.querySelector(".card");

card.addEventListener("mousemove",function(e){

    const rect=card.getBoundingClientRect();

    const x=e.clientX-rect.left;

    const y=e.clientY-rect.top;

    card.style.background=

    `radial-gradient(circle at ${x}px ${y}px,

    rgba(255,255,255,1),

    rgba(255,250,245,.98),

    rgba(252,248,242,1))`;

});

card.addEventListener("mouseleave",function(){

    card.style.background="#fffdf9";

});


/*====================================================
            TITRE ANIME
====================================================*/

const title=document.querySelector(".card h1");

setInterval(function(){

    title.animate([

        {

            transform:"scale(1)"

        },

        {

            transform:"scale(1.03)"

        },

        {

            transform:"scale(1)"

        }

    ],{

        duration:2500

    });

},3500);


/*====================================================
        EFFET PARALLAXE
====================================================*/

document.addEventListener("mousemove",function(e){

    const decor=document.querySelectorAll(".decor");

    decor.forEach(function(item,index){

        const speed=(index+1)*0.8;

        const x=(window.innerWidth/2-e.clientX)/90*speed;

        const y=(window.innerHeight/2-e.clientY)/90*speed;

        item.style.transform=`translate(${x}px,${y}px)`;

    });

});


/*====================================================
        SCINTILLEMENT DU SCEAU
====================================================*/

const seal=document.querySelector(".seal");

setInterval(function(){

    seal.animate([

        {

            transform:"translateX(-50%) scale(1)"

        },

        {

            transform:"translateX(-50%) scale(1.08)"

        },

        {

            transform:"translateX(-50%) scale(1)"

        }

    ],{

        duration:1800

    });

},2500);


/*====================================================
        FIN
====================================================*/

console.log("Invitation Spa Premium chargée ❤️");



