// script.js
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total-display");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

expenseForm.addEventListener("submit", addExpense);

function addExpense(event) {
    event.preventDefault();

    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const category = document.getElementById("expense-category").value;

    if (name && amount && category) {
        const expense = {
            id: new Date().getTime(),
            name: name,
            amount: amount,
            category: category,
        };

        expenses.push(expense);
        updateExpenseList();
        updateTotalDisplay();
        saveExpensesToLocalStorage();

        // Limpa os campos de entrada
        document.getElementById("expense-name").value = "";
        document.getElementById("expense-amount").value = "";
        document.getElementById("expense-category").selectedIndex = 0;
    }
}

function updateExpenseList() {
    expenseList.innerHTML = "";

    expenses.forEach(expense => {
        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";
        expenseItem.innerHTML = `
            <h3>${expense.name}</h3>
            <p>Categoria: ${expense.category}</p>
            <p>Valor: R$ ${expense.amount.toFixed(2)}</p>
            <button class="edit-btn" data-id="${expense.id}">Editar</button>
            <button class="delete-btn" data-id="${expense.id}">Excluir</button>
        `;

        expenseList.appendChild(expenseItem);

        const editButton = expenseItem.querySelector(".edit-btn");
        editButton.addEventListener("click", () => editExpense(expense.id));

        const deleteButton = expenseItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => deleteExpense(expense.id));
    });
}

function editExpense(id) {
    const expenseToEdit = expenses.find(expense => expense.id === id);

    if (expenseToEdit) {
        const newName = prompt("Digite o novo nome:", expenseToEdit.name);
        if (newName !== null) {
            expenseToEdit.name = newName;
            updateExpenseList();
            saveExpensesToLocalStorage();
        }
    }
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpenseList();
    updateTotalDisplay();
    saveExpensesToLocalStorage();
}

function updateTotalDisplay() {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    totalDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function saveExpensesToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Atualização inicial
updateExpenseList();
updateTotalDisplay();
