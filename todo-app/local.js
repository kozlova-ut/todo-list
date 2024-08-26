function getList (owner) {
	if (JSON.parse(localStorage.getItem(owner)) != null) {
		return JSON.parse(localStorage.getItem(owner));
	}
	else {
		return []
	}
}

function createItem(owner, array, name) {
	localStorage.setItem(owner, JSON.stringify(array));
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

	localStorage.setItem(owner, JSON.stringify(array));
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

  item.remove();
  array.splice(indexValue, 1);

	localStorage.setItem(owner, JSON.stringify(array));
}

export default {getList, switchDone, deleteItem, createItem};
