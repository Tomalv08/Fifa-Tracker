const apiBase = '/api';

async function createUser() {
  const username = document.getElementById('username').value;
  const team = document.getElementById('team').value;

  await fetch(`${apiBase}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, team }),
  });

  loadUsers();
}

async function submitMatch() {
  const player1_id = document.getElementById('player1Select').value;
  const player2_id = document.getElementById('player2Select').value;
  const result = document.getElementById('result').value;

  await fetch(`${apiBase}/matches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player1_id, player2_id, result }),
  });

  loadMatches();
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

  matches.forEach(match => {
    matchList.innerHTML += `<div>⚽ ${match.player1} vs ${match.player2} → <strong>${match.result}</strong> (${new Date(match.date).toLocaleDateString()})</div>`;
  });
}

loadUsers();
loadMatches();
