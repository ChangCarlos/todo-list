// Seleção de elementos
const todoForm = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')

let oldInputValue;

// Funções

// função para criar tarefa
const saveTodo = (text) => {

    const todo = document.createElement('div') ;
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);
    
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = '';
    todoInput.focus();

}

// função para alternar a tela de edição
const toggleForms = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
};

const updateTodo = (text) => {

    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3');

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        };
    });

}

// Eventos

// adicionando tarefa
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) {
        saveTodo(inputValue)
    }
});

// aplicando funcionalidade dos botões
document.addEventListener('click', (e) => {

    const targetEl = e.target;
    const parentEl = targetEl.closest('div'); // direcionando o click do botão para a div mais próxima a ele
    let todoTitle;

    if(parentEl && parentEl.querySelector('h3')) {
        todoTitle = parentEl.querySelector('h3').innerText;
    }

    if(targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done'); // alternando a div para 'done' ao clicar no botão 
    };

    if(targetEl.classList.contains('remove-todo')) {
        parentEl.remove(); // removendo a tarefa ao clicar no botão
    };

    if(targetEl.classList.contains('edit-todo')) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    };


});

// evento para cancelar a edição
cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
});

// evento para submeter a edição
editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateTodo(editInputValue);
    };

    toggleForms();
});