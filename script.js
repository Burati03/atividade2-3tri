const userListEl = document.getElementById("user-list");
const reloadBtn = document.getElementById("reload-btn");

// Função para buscar usuários da API
async function fetchUsers() {
  const url = "https://jsonplaceholder.typicode.com/users";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários: ${response.status}`);
    }
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error("Erro:", error);
    userListEl.innerHTML = "<p>Não foi possível carregar usuários.</p>";
  }
}

// Função para exibir os usuários no HTML
function displayUsers(users) {
  if (!Array.isArray(users) || users.length === 0) {
    userListEl.innerHTML = "<p>Não há usuários para exibir.</p>";
    return;
  }

  const html = users.map(user => {
    return `
      <div class="user-card">
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Telefone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
      </div>
    `;
  }).join("");

  userListEl.innerHTML = html;
}

// Event Listener para botão de recarregar
reloadBtn.addEventListener("click", () => {
  fetchUsers();
});

// Buscar usuários quando a página carrega
window.addEventListener("DOMContentLoaded", fetchUsers);
