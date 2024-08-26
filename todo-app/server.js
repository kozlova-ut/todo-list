async function getList(owner) {
	const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
	if (response.ok) {
		return await response.json();
	}
	else {
		return []
	}
}

async function createItem(owner, array, name) {
	const response = await fetch('http://localhost:3000/api/todos', {
		method: 'POST',
		body: JSON.stringify({
			name,
			owner
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await response.json();
}

function switchDone(owner, array, item) {
  let indexValue;
	let itemValue = item.childNodes[0].data;

	for (let a of array) {
		if (a.name == itemValue) {
			indexValue = array.indexOf(a);
		};
	};

  array[indexValue].done = !array[indexValue].done;

	fetch(`http://localhost:3000/api/todos/${array[indexValue].id}`, {
		method: 'PATCH',
		body: JSON.stringify({done: array[indexValue].done}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

function deleteItem(owner, array, item) {
  if (!confirm('Вы уверены?')) {
    return
  };

  let indexValue = undefined;
  let itemValue = item.childNodes[0].data;

  for (let a of array) {
    if (a.name == itemValue) {
      indexValue = array.indexOf(a);
    };
  };

	fetch(`http://localhost:3000/api/todos/${array[indexValue].id}`, {
		method: 'DELETE'
	})

  item.remove();
  array.splice(indexValue, 1);
}

export default {getList, createItem, switchDone, deleteItem};
