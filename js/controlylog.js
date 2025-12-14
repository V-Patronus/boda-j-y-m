// ---------- seguridad simple ----------
if (localStorage.getItem('autorizado') !== 'si') {
  window.location.href = 'index.html';
}

// ---------- cargar JSON ----------
fetch('data/invitados.json')
  .then(res => {
    if (!res.ok) throw new Error('No se pudo cargar el JSON');
    return res.json();
  })
  .then(invitados => {
    pintarTablas(invitados);
    // después de pintar, enganchamos los clicks
    engancharBotonesCopiar();
  })
  .catch(err => {
    console.error(err);
    alert('Error al cargar los invitados');
  });

// ---------- pintar tablas ----------
function pintarTablas(invitados) {
  const mesas = {};
  invitados.forEach(inv => {
    if (!mesas[inv.mesa]) mesas[inv.mesa] = [];
    mesas[inv.mesa].push(inv);
  });

  const contenedor = document.getElementById('tablas');
  contenedor.innerHTML = '';

  Object.keys(mesas)
    .sort((a, b) => a - b)
    .forEach(numMesa => {
      const lista = mesas[numMesa];
      const totalMesa = lista.reduce((sum, inv) => sum + inv.total, 0);

      const html = `
        <div class="mesa-box">
          <h2>Mesa ${numMesa} <span class="total">(${totalMesa} personas)</span></h2>
          <table>
            <thead>
              <tr>
                <th>Invitado</th>
                <th>Total</th>
                <th>Enlace</th>
              </tr>
            </thead>
            <tbody>
              ${lista.map(inv => `
                <tr>
                  <td>${inv.nombre}</td>
                  <td>${inv.total}</td>
                  <td>
                    <button class="btn-copiar" data-id="${inv.id}">Copiar</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      contenedor.innerHTML += html;
    });
}

// ---------- delegación de eventos ----------
function engancharBotonesCopiar() {
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('btn-copiar')) {
      const id = e.target.dataset.id;
      const url = `${window.location.origin}/invitaciones/${id}.html`;
      navigator.clipboard.writeText(url).then(() => {
        alert('Enlace copiado:\n' + url);
      }).catch(() => {
        alert('Error al copiar');
      });
    }
  });
}