const API_URL = 'http://localhost:8080/api/tareas';

let localTasks = [];
let notifPermission = ('Notification' in window && Notification.permission === 'granted');

// Elementos del DOM
const container = document.getElementById("tasks");
const searchInput = document.getElementById("search");
const filterPriority = document.getElementById("filterPriority");
const showCompleted = document.getElementById("showCompleted");
const statsEl = document.getElementById("stats");

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
const cancelEditBtn = document.getElementById("cancelEdit");

// 1. Cargar tareas desde el servidor
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        localTasks = await response.json();
        renderTasks();
        scheduleReminders();
    } catch (error) {
        console.error("Error al cargar tareas:", error);
    }
}

// 2. Renderizar tareas con filtros y orden
function renderTasks() {
    const query = searchInput.value.trim().toLowerCase();
    const priorityFilter = filterPriority.value;
    const showComp = showCompleted.checked;

    container.innerHTML = "";

    const filtered = localTasks.filter(t => {
        if (!showComp && t.completed) return false;
        if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
        if (query) {
            return (t.title + ' ' + (t.description || '')).toLowerCase().includes(query);
        }
        return true;
    });

    // Ordenar: No completadas primero, prioridad alta arriba, fechas próximas
    filtered.sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        const pVal = { "Alta": 0, "Media": 1, "Baja": 2 };
        if (pVal[a.priority] !== pVal[b.priority]) return pVal[a.priority] - pVal[b.priority];
        if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
        if (a.dueDate) return -1;
        if (b.dueDate) return 1;
        return 0;
    });

    filtered.forEach(task => {
        let div = document.createElement("div");
        div.className = `task priority-${task.priority} ${task.completed ? 'completed' : ''}`;
        
        let dateStr = task.dueDate ? task.dueDate.split('T')[0] : 'Sin fecha';
        
        div.innerHTML = `
            <div class="task-header">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete('${task.id}', this.checked)">
                <div class="task-content">
                    <h3>${task.title}</h3>
                    <p>${task.description || ''}</p>
                    <div class="task-meta">
                        <span><strong>Prioridad:</strong> ${task.priority}</span>
                        <span><strong>Fecha:</strong> ${dateStr}</span>
                    </div>
                </div>
            </div>
            <button class="edit-btn" onclick="openEditModal('${task.id}')" title="Editar">✏️</button>
            <button class="delete-btn" onclick="deleteTask('${task.id}')" title="Eliminar">×</button>
        `;
        container.appendChild(div);
    });

    // Actualizar Estadísticas
    const total = localTasks.length;
    const pending = localTasks.filter(t => !t.completed).length;
    
    // Calcular próximas 48h
    const now = new Date();
    const upcoming = localTasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const diff = new Date(t.dueDate) - now;
        return diff >= 0 && diff <= 1000 * 60 * 60 * 24 * 2;
    }).length;

    statsEl.textContent = `Total: ${total} · Pendientes: ${pending} · Próximas 48h: ${upcoming}`;
}

// 3. Agregar tarea
async function addTask(e) {
    e.preventDefault();
    let task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        dueDate: document.getElementById("dueDate").value,
        completed: false
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
        document.getElementById("taskForm").reset();
        fetchTasks();
    } catch (error) {
        console.error("Error al guardar tarea:", error);
    }
}

// 4. Eliminar tarea
async function deleteTask(id) {
    if (!confirm("¿Seguro que deseas eliminar esta tarea?")) return;
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTasks();
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}

// 5. Marcar completada (PUT)
async function toggleComplete(id, completed) {
    const task = localTasks.find(t => t.id === id);
    if (!task) return;
    task.completed = completed;
    renderTasks(); // Update UI immediately
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
        fetchTasks();
    } catch (error) {
        console.error("Error al actualizar:", error);
    }
}

// 6. Editar Tarea (Modal)
function openEditModal(id) {
    const task = localTasks.find(t => t.id === id);
    if (!task) return;
    document.getElementById("editId").value = task.id;
    document.getElementById("editTitle").value = task.title;
    document.getElementById("editDescription").value = task.description || '';
    document.getElementById("editPriority").value = task.priority;
    if (task.dueDate) {
        document.getElementById("editDueDate").value = task.dueDate.split('T')[0];
    } else {
        document.getElementById("editDueDate").value = '';
    }
    editModal.classList.remove("hidden");
}

cancelEditBtn.addEventListener("click", () => {
    editModal.classList.add("hidden");
});

editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("editId").value;
    const task = localTasks.find(t => t.id === id);
    
    let updatedTask = {
        ...task,
        title: document.getElementById("editTitle").value,
        description: document.getElementById("editDescription").value,
        priority: document.getElementById("editPriority").value,
        dueDate: document.getElementById("editDueDate").value
    };

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        });
        editModal.classList.add("hidden");
        fetchTasks();
    } catch (error) {
        console.error("Error al actualizar:", error);
    }
});

// 7. Borrar Todo (DELETE /all)
document.getElementById("btnClearAll").addEventListener("click", async () => {
    if (!confirm("¿ESTÁS SEGURO DE BORRAR TODAS LAS TAREAS? Esta acción no se puede deshacer.")) return;
    try {
        await fetch(`${API_URL}/all`, { method: 'DELETE' });
        fetchTasks();
    } catch (error) {
        console.error("Error al borrar todo:", error);
    }
});

// 8. Notificaciones
document.getElementById("btnRequestNotif").addEventListener("click", async () => {
    if (!('Notification' in window)) return alert('Tu navegador no soporta notificaciones.');
    const p = await Notification.requestPermission();
    notifPermission = (p === 'granted');
    if (notifPermission) alert('Notificaciones activadas con éxito.');
});

function scheduleReminders() {
    if (!notifPermission) return;
    const now = new Date();
    
    localTasks.forEach(task => {
        if (!task.dueDate || task.completed) return;
        const dueDate = new Date(task.dueDate);
        const ms = dueDate - now;
        
        // Si vence hoy, mostrar alerta si está la página abierta
        if (ms > 0 && ms < 1000 * 60 * 60 * 24) {
            setTimeout(() => {
                const stillNotCompleted = localTasks.find(t => t.id === task.id && !t.completed);
                if (stillNotCompleted) {
                    new Notification(`¡Atención! Vence hoy: ${task.title}`, { 
                        body: task.description || 'No olvides completar tu tarea.'
                    });
                }
            }, ms);
        }
    });
}

// Listeners de filtros
searchInput.addEventListener("input", renderTasks);
filterPriority.addEventListener("change", renderTasks);
showCompleted.addEventListener("change", renderTasks);

// Iniciar app
window.onload = function() {
    fetchTasks();
    document.getElementById("taskForm").onsubmit = addTask;
};