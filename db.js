/// ==========================================
// CARRITO Y PRECIOS EXTERNO
// ==========================================

const WA = "5491132060339";

const PRECIOS_FOTOS = {
  "Bowl de quinoa y salmón": {
    precio: 19000,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85"
  },
  "Pollo al limón con puré de camote": {
    precio: 16500,
    img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&q=85"
  },
  "Wrap integral de pavo": {
    precio: 17000,
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80"
  },
  "Pechuga grillada con cuscús y vegetales": {
    precio: 16500,
    img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&q=80"
  },
  "Penne rigate con pollo y cherrys": {
    precio: 16500,
    img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80"
  },
  "Pastel de carne magra y calabaza": {
    precio: 17000,
    img: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&q=80"
  },
  "Lasagna de berenjenas y espinaca": {
    precio: 16000,
    img: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&q=80"
  },
  "Omelette soufflé de queso y tomates secos": {
    precio: 16000,
    img: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=500&q=80"
  },
  "Quiche de puerro y queso azul": {
    precio: 18000,
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80"
  },
  "Curry de garbanzos y tofu": {
    precio: 16500,
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80"
  },
  "Burger de lentejas y portobello": {
    precio: 17000,
    img: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&q=80"
  },
  "Pad Thai de arroz y vegetales": {
    precio: 17500,
    img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&q=80"
  },
  "Risotto de hongos": {
    precio: 16500,
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&q=80"
  },
  "Milanesitas con rebozado de maíz": {
    precio: 16500,
    img: "https://images.unsplash.com/photo-1599921841143-819065a55cc6?w=500&q=80"
  },
  "Tarta en masa de garbanzos": {
    precio: 16500,
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&q=80"
  }
};

document.addEventListener("DOMContentLoaded", () => {

  // Botón del carrito
  const header = document.querySelector("header");

  if (header && !document.getElementById("cart-btn")) {
    header.insertAdjacentHTML(
      "beforeend",
      `<button id="cart-btn" class="ghost" style="margin-left:auto;">
        🛒 <span id="cart-count">0</span>
      </button>`
    );
  }

  // Panel lateral del carrito
  if (!document.getElementById("cart-drawer")) {
    document.body.insertAdjacentHTML("beforeend", `
      <aside id="cart-drawer">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #d4ded3; padding-bottom:10px;">
          <h3 style="margin:0; color:#1a4a1c;">🛒 Tu Carrito</h3>
          <button id="cart-close" class="ghost" style="padding:4px 10px;">✕</button>
        </div>

        <div id="cart-items" style="flex:1; overflow-y:auto; margin:12px 0;"></div>

        <div style="border-top:1px solid #d4ded3; padding-top:10px;">
          <div style="display:flex; justify-content:space-between; font-weight:800; margin-bottom:10px;">
            <span>Total:</span>
            <span id="cart-total">$0</span>
          </div>

          <button class="orange" style="width:100%; margin-bottom:6px; background:#fc9750; color:#fff; border:0; padding:10px; border-radius:10px; font-weight:600; cursor:pointer;" onclick="pedirWhatsApp()">
            Pedir por WhatsApp
          </button>
        </div>
      </aside>
    `);
  }

  const btn = document.getElementById("cart-btn");
  const drawer = document.getElementById("cart-drawer");
  const close = document.getElementById("cart-close");
  const ov = document.getElementById("ov");

  const burger = document.getElementById("burger");
  const sideDrawer = document.getElementById("drawer");

  // Menú lateral de navegación
  if (burger && sideDrawer && ov) {
    burger.onclick = () => {
      sideDrawer.classList.add("open");
      ov.classList.add("open");
    };
  }

  // Cerrar paneles al tocar el fondo
  if (ov) {
    ov.onclick = () => {
      if (drawer) drawer.classList.remove("open");
      if (sideDrawer) sideDrawer.classList.remove("open");
      ov.classList.remove("open");
    };
  }

  // Abrir y cerrar carrito
  if (btn && drawer && ov) {
    btn.onclick = () => {
      drawer.classList.add("open");
      ov.classList.add("open");
    };

    if (close) {
      close.onclick = () => {
        drawer.classList.remove("open");
        ov.classList.remove("open");
      };
    }
  }

  // Agregar fotografías, precios y botones
  document.querySelectorAll(".dish").forEach(dish => {

    const title = dish.querySelector(".dish-title");

    if (!title) return;

    const name = title.textContent.trim();
    const info = PRECIOS_FOTOS[name];

    if (!info) return;

    const fotoSegura = info.img ||
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=85";

    title.insertAdjacentHTML(
      "beforebegin",
      `<img
        src="${fotoSegura}"
        alt="${name}"
        loading="lazy"
        onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=85'"
        style="width:100%; height:150px; object-fit:cover; border-radius:8px; margin-bottom:8px;"
      >`
    );

    title.insertAdjacentHTML(
      "afterend",
      `<div style="font-weight:800; color:#1a4a1c; margin:4px 0 8px;">
        $${info.precio.toLocaleString('es-AR')}
      </div>`
    );

    dish.insertAdjacentHTML(
      "beforeend",
      `<button
        style="width:100%; background:#1a4a1c; color:#fff; border:0; padding:8px; border-radius:8px; font-weight:600; cursor:pointer; margin-top:6px;"
        onclick="agregarItem('${name}', ${info.precio}, '${fotoSegura}')"
      >
        🛒 Agregar al carrito
      </button>`
    );

  });

  actualizarCarritoUI();

});
// ==========================================
// FUNCIONES DEL CARRITO
// ==========================================

function getCart() {
  return JSON.parse(localStorage.getItem("go_cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("go_cart", JSON.stringify(cart));
  actualizarCarritoUI();
}

// Agregar vianda al carrito
function agregarItem(nombre, precio, img) {

  const cart = getCart();

  const found = cart.find(i => i.nombre === nombre);

  if (found) {
    found.cant++;
  } else {
    cart.push({
      nombre,
      precio,
      img,
      cant: 1
    });
  }

  saveCart(cart);

  const drawer = document.getElementById("cart-drawer");
  const ov = document.getElementById("ov");

  if (drawer && ov) {
    drawer.classList.add("open");
    ov.classList.add("open");
  }
}

// Cambiar cantidad de viandas
function cambiarCantidadItem(nombre, delta) {

  let cart = getCart();

  const found = cart.find(i => i.nombre === nombre);

  if (!found) return;

  found.cant += delta;

  if (found.cant <= 0) {
    cart = cart.filter(i => i.nombre !== nombre);
  }

  saveCart(cart);
}

// Actualizar visualización del carrito
function actualizarCarritoUI() {

  const cart = getCart();

  const count = document.getElementById("cart-count");

  if (count) {
    count.textContent = cart.reduce(
      (acc, i) => acc + i.cant,
      0
    );
  }

  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!itemsEl || !totalEl) return;

  if (!cart.length) {

    itemsEl.innerHTML =
      `<p style="color:#5a6659; text-align:center;">
        Tu carrito está vacío.
      </p>`;

    totalEl.textContent = "$0";

    return;
  }

  let total = 0;

  itemsEl.innerHTML = cart.map(i => {

    total += i.precio * i.cant;

    const imagen = i.img ||
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=85";

    return `
      <div style="display:flex; gap:8px; align-items:center; margin-bottom:10px; border-bottom:1px solid #d4ded3; padding-bottom:8px;">

        <img
          src="${imagen}"
          style="width:45px; height:45px; object-fit:cover; border-radius:6px;"
        >

        <div style="flex:1; font-size:0.85rem;">

          <b>${i.nombre}</b>

          <br>

          <span style="color:#1a4a1c; font-weight:700;">
            $${(i.precio * i.cant).toLocaleString('es-AR')}
          </span>

          <div style="display:flex; gap:6px; margin-top:4px;">

            <button
              onclick="cambiarCantidadItem('${i.nombre}', -1)"
              style="padding:2px 6px;"
            >-</button>

            <span>${i.cant}</span>

            <button
              onclick="cambiarCantidadItem('${i.nombre}', 1)"
              style="padding:2px 6px;"
            >+</button>

          </div>
        </div>
      </div>
    `;

  }).join("");

  totalEl.textContent =
    `$${total.toLocaleString('es-AR')}`;
}

// Consultas por WhatsApp
function pedirWhatsApp() {

  document.querySelectorAll("[data-wa]").forEach(link => {

    const mensaje =
      "Hola Green Office! Quisiera recibir más información sobre sus viandas y realizar una consulta.";

    link.href =
      `https://wa.me/${WA}?text=${encodeURIComponent(mensaje)}`;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

  });

}