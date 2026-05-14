/* ========================= */
/* MENU */
/* ========================= */

const menuToggle =
document.getElementById("menu-toggle");

const navLinks =
document.getElementById("nav-links");

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        menuToggle.classList.toggle("active");

        navLinks.classList.toggle("active");

    });

}

/* ========================= */
/* CARRITO */
/* ========================= */

let carrito =
JSON.parse(localStorage.getItem("carrito")) || [];

function agregarProducto(nombre,precio){

    carrito.push({

        nombre,
        precio

    });

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    actualizarCarrito();

}

function actualizarCarrito(){

    const lista =
    document.getElementById("lista-carrito");

    const total =
    document.getElementById("total");

    if(!lista || !total) return;

    lista.innerHTML = "";

    let suma = 0;

    carrito.forEach(producto=>{

        suma += producto.precio;

        const li =
        document.createElement("li");

        li.innerHTML = `

            ${producto.nombre}

            <span>$${producto.precio}</span>

        `;

        lista.appendChild(li);

    });

    total.textContent =
    "$" + suma;

}

actualizarCarrito();

/* ========================= */
/* CARRUSEL */
/* ========================= */

const track =
document.getElementById("track");

if(track){

    const slides =
    document.querySelectorAll(".slide");

    const dotsContainer =
    document.getElementById("dots");

    const fill =
    document.getElementById("fill");

    let current = 0;

    let timer;

    slides.forEach((_,i)=>{

        const dot =
        document.createElement("div");

        dot.className =
        "dot" + (i===0 ? " active" : "");

        dot.onclick = ()=>{

            goTo(i);

        };

        dotsContainer.appendChild(dot);

    });

    function goTo(n){

        current =
        (n + slides.length) % slides.length;

        track.style.transform =
        `translateX(-${current * 100}%)`;

        document
        .querySelectorAll(".dot")
        .forEach((d,i)=>{

            d.classList.toggle(
                "active",
                i===current
            );

        });

        resetTimer();

    }

    function resetTimer(){

        clearInterval(timer);

        if(fill){

            fill.style.animation =
            "none";

            void fill.offsetWidth;

            fill.style.animation =
            "progress 4s linear infinite";

        }

        timer =
        setInterval(()=>{

            goTo(current + 1);

        },4000);

    }

    const prev =
    document.getElementById("prev");

    const next =
    document.getElementById("next");

    if(prev){

        prev.onclick = ()=>{

            goTo(current - 1);

        };

    }

    if(next){

        next.onclick = ()=>{

            goTo(current + 1);

        };

    }

    resetTimer();

}

/* ========================= */
/* PAGO */
/* ========================= */

const resumen =
document.getElementById("resumen-pedido");

const totalFinal =
document.getElementById("total-final");

if(resumen){

    let total = 0;

    carrito.forEach(producto=>{

        total += producto.precio;

        const div =
        document.createElement("div");

        div.classList.add("item-pago");

        div.innerHTML = `

            <span>${producto.nombre}</span>

            <span>$${producto.precio}</span>

        `;

        resumen.appendChild(div);

    });

    totalFinal.textContent =
    "$" + total;

}

/* METODOS */

const botonesMetodo =
document.querySelectorAll(".metodo-btn");

botonesMetodo.forEach(btn=>{

    btn.addEventListener("click",()=>{

        botonesMetodo.forEach(b=>{

            b.classList.remove("active");

        });

        btn.classList.add("active");

    });

});

/* CONFIRMAR */

function confirmarPago(){

    const modal =
    document.getElementById("modal-exito");

    const folio =
    document.getElementById("folio");

    const cliente =
    document.getElementById("cliente");

    if(cliente.value.trim()===""){

        alert("Ingresa tu nombre");

        return;

    }

    const codigo =
    Math.floor(
        100000 + Math.random() * 900000
    );

    folio.textContent =
    "Folio #" + codigo;

    modal.style.display = "flex";

    localStorage.removeItem("carrito");

}