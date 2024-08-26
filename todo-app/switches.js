export function createSwitchButtons() {
	let container = document.getElementById('storage-switch');
	let group = document.createElement('div');
	group.classList.add('btn-group', 'mb-3');

	let localBtn = btnConstructor(1, 'local', 'Локальное хранилище').button;
	let localBtnLabel = btnConstructor(1, 'local', 'Локальное хранилище').label;
	localBtn.setAttribute('checked', true)
	let serverBtn = btnConstructor(2, 'server', 'Серверное хранилище').button;
	let serverBtnLabel = btnConstructor(2, 'server', 'Серверное хранилище').label;
	group.append(localBtn);
	group.append(localBtnLabel);
	group.append(serverBtn);
	group.append(serverBtnLabel);
	container.append(group);
}

function btnConstructor(n, storage, name) {
	let button = document.createElement('input');
	let label = document.createElement('label');

	button.setAttribute('type', 'radio');
	button.setAttribute('name', 'btnradio');
	button.setAttribute('id', `btnradio${n}`);
	button.classList.add('btn-check', 'switch', `${storage}-switch`);
	label.setAttribute('for', `btnradio${n}`);
	label.setAttribute('id', `button-${storage}`);
	label.classList.add('btn', 'btn-outline-primary');
	label.innerHTML = name;

	return {
		button,
		label
	}
}

export function clearContent() {
	let todoApp = document.getElementById('todo-app');
	todoApp.innerHTML = '';
}

export function saveSelectedStorage(storage) {
  localStorage.setItem('storage', JSON.stringify(storage));
}

export function getCurrentStorage() {
	return JSON.parse(localStorage.getItem('storage'));
}
