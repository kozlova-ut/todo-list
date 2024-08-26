function createAppTitle(title) {
	let appTitle = document.createElement('h2');
	appTitle.innerHTML = title;
	return appTitle;
};

function createTodoItemForm() {
	let form = document.createElement('form');
	let input = document.createElement('input');
	let buttonWrapper = document.createElement('div');
	let button = document.createElement('button');

	form.classList.add('input-group', 'mb-3');
	input.classList.add('form-control');
	input.placeholder = 'Введите название нового дела';
	buttonWrapper.classList.add('input-group-append');
	button.classList.add('btn', 'btn-primary');
	button.textContent = 'Добавить дело';
	button.disabled = true;

	buttonWrapper.append(button);
	form.append(input);
	form.append(buttonWrapper);

	return {
		form,
		input,
		button,
	};
};

function createTodoList() {
	let list = document.createElement('ul');
	list.classList.add('list-group');
	return list;
};

function doneButtonClick(item, array, owner, selectedStorage) {
	item.classList.toggle('list-group-item-success');

	selectedStorage.switchDone(owner, array, item);
}

function deleteButtonClick(item, array, owner, selectedStorage) {


  selectedStorage.deleteItem(owner, array, item);
  // selectedStorage.deleteItem(owner, array, deletingItem);
}

function createTodoItem(value, array, todoList, owner, selectedStorage) {
	let item = document.createElement('li');
	let buttonGroup = document.createElement('div');
	let doneButton = document.createElement('button');
	let deleteButton = document.createElement('button');

	item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

	switch (typeof(value)) {
		case 'object':
			item.textContent = value.name;

			if (value.done === true) {
				item.classList.add('list-group-item-success');
			}
			break;

		case 'string':
			item.textContent = value;
			break;
	}

	buttonGroup.classList.add('btn-group', 'btn-group-sm');
	doneButton.classList.add('btn', 'btn-success');
	doneButton.textContent = 'Готово';
	deleteButton.classList.add('btn', 'btn-danger');
	deleteButton.textContent = 'Удалить';

	buttonGroup.append(doneButton);
	buttonGroup.append(deleteButton);
	item.append(buttonGroup);
	todoList.append(item);

	doneButton.addEventListener('click', () => doneButtonClick(item, array, owner, selectedStorage));
	deleteButton.addEventListener('click', () => deleteButtonClick(item, array, owner, selectedStorage));

	return {
		name: value,
		done: false
	}
};

async function createTodoApp(container, title, owner, selectedStorage) {
	let array = await selectedStorage.getList(owner);

	let todoAppTitle = createAppTitle(title);
	let todoItemForm = createTodoItemForm();
	let todoList = createTodoList();

	container.append(todoAppTitle);
	container.append(todoItemForm.form);
	container.append(todoList);

	for (let a of array) {
		createTodoItem(a, array, todoList, owner, selectedStorage);
	};

	todoItemForm.form.addEventListener('submit', function(e) {
		e.preventDefault();

		if (!todoItemForm.input.value) {
			return;
		};

		let item = createTodoItem(todoItemForm.input.value, array, todoList, owner, selectedStorage);
		array.push(item);

		selectedStorage.createItem(owner, array, item.name);

		todoItemForm.input.value = '';
		todoItemForm.button.disabled = true;
	});

	todoItemForm.input.addEventListener('input', function() {
		if (todoItemForm.input.value) {
			todoItemForm.button.disabled = false;
		}
		else {
			todoItemForm.button.disabled = true;
		};
	});
};

export {createTodoApp};
