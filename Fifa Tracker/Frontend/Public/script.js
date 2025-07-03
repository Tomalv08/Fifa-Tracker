const apiBase = '/api';

function showStatus(message) {
  const statusBox = document.getElementById('status');
  statusBox.textContent = message;
  statusBox.classList.add('show');
  setTimeout(() => statusBox.classList.remove('show'), 3000);
}

async function createUser() {
  const username = document.getElementById('username').value;
  const team = document.getElementById('team').value;
  if (!username || !team) return;

  await fetch(`${apiBase}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, team }),
  });

  loadUsers();
  showStatus('✅ Spieler erstellt!');
}

async function submitMatch() {
  const player1_id = document.getElementById('player1Select').value;
  const player2_id = document.getElementById('player2Select').value;
  const result = document.getElementById('result').value;
  if (!player1_id || !player2_id || !result) return;

  await fetch(`${apiBase}/matches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player1_id, player2_id, result }),
  });

  loadMatches();
  showStatus('🎉 Match gespeichert!');
}

async function loadUsers() {
  const res = await fetch(`${apiBase}/users`);
  const users = await res.json();

  const userList = document.getElementById('userList');
  const player1Select = document.getElementById('player1Select');
  const player2Select = document.getElementById('player2Select');

  userList.innerHTML = '';
  player1Select.innerHTML = '';
  player2Select.innerHTML = '';

  users.forEach(user => {
    userList.innerHTML += `<div>👤 ${user.username} (${user.team})</div>`;
    const option = `<option value="${user.id}">${user.username}</option>`;
    player1Select.innerHTML += option;
    player2Select.innerHTML += option;
  });
}

async function loadMatches() {
  const res = await fetch(`${apiBase}/matches`);
  const matches = await res.json();

  const matchList = document.getElementById('matchList');
  matchList.innerHTML = '';

  matches.forEach((match, index) => {
    const div = document.createElement('div');
    div.innerHTML = `⚽ ${match.player1} vs ${match.player2} → <strong>${match.result}</strong> <span>(${new Date(match.date).toLocaleDateString()})</span>`;
    div.classList.add('match-entry');
    matchList.appendChild(div);

    if (index === matches.length - 1) {
      div.classList.add('new-match');
      setTimeout(() => div.classList.remove('new-match'), 1500);
    }
  });
}

loadUsers();
loadMatches();
