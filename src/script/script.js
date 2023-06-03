  // Função para adicionar tarefa
  function addTask(name, duration) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ name, duration });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTaskSummary();
    updateChart();
}

// Função para exibir resumo das tarefas
function showTaskSummary() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskSummary = document.getElementById('task-summary');
    taskSummary.innerHTML = '';

    tasks.forEach((task, index) => {
        let taskDiv = document.createElement('div');
        taskDiv.textContent = `${task.name} - ${task.duration} minutos`;
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => {
            deleteTask(index);
        });
        taskDiv.appendChild(deleteButton);
        taskSummary.appendChild(taskDiv);
    });
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTaskSummary();
    updateChart();
}

// Função para atualizar o gráfico
function updateChart() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let labels = tasks.map(task => task.name);
    let data = tasks.map(task => task.duration);

    let ctx = document.getElementById('time-chart').getContext('2d');
    if (window.timeChart) {
        window.timeChart.destroy();
    }

    window.timeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tempo gasto (minutos)',
                data: data,
                backgroundColor: '#4CAF50',
                borderColor: '#4CAF50',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Evento de envio do formulário
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let taskName = document.getElementById('task-name').value;
    let taskDuration = parseInt(document.getElementById('task-duration').value);
    addTask(taskName, taskDuration);
    e.target.reset();
});


showTaskSummary();
updateChart();
