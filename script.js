window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
    const tasksContainer = document.querySelector("#tasks");
    const taskChecks = document.querySelectorAll(".task-check");

	form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const task = input.value;
    
        // Create the main task container
        const task_el = document.createElement('div');
        task_el.classList.add('task');
    
        // ✅ Create the checkbox
        const task_checkbox = document.createElement('input');
        task_checkbox.classList.add('task-check');
        task_checkbox.type = 'checkbox';

        // Create a "Completed" message (hidden by default)
        const completed_msg = document.createElement('span');
        completed_msg.classList.add('completed-msg');
        completed_msg.innerText = '✅ Completed!';
        completed_msg.style.display = 'none'; // Hide it initially
        task_el.appendChild(completed_msg);
    
        // Add checkbox before the task content
        task_el.prepend(task_checkbox);
    
        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');
        task_el.appendChild(task_content_el);
    
        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');
    
        task_content_el.appendChild(task_input_el);
    
        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
    
        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';
    
        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';
    
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
    
        task_el.appendChild(task_actions_el);
    
        list_el.appendChild(task_el);
    
        input.value = '';
    
        // ✅ Checkbox event — check completion on change
        task_checkbox.addEventListener('change', checkAllTasksComplete);
    
        // ✅ Edit button functionality
        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() === "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });
    
        // ✅ Delete button functionality
        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);
            checkAllTasksComplete(); // Ensure confetti checks after deletion
        });
    
        // ✅ Ensure all tasks checked triggers confetti
        function checkAllTasksComplete() {
            const allChecked = [...document.querySelectorAll('.task-check')].every(
                (checkbox) => checkbox.checked
            );
    
            if (allChecked && document.querySelectorAll('.task-check').length > 0) {
                launchConfetti();
            }
        }
    
        // ✅ Confetti celebration
        function launchConfetti() {
            const duration = 5 * 1000;
            const end = Date.now() + duration;
    
            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                });
    
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        }
        // Create a completion message for the whole list
const completionMessage = document.createElement('div');
completionMessage.classList.add('completion-message');
completionMessage.innerText = "🎉 Yayyy! Your to-do list for today is completed!";
completionMessage.style.display = 'none'; // Hide it initially
list_el.appendChild(completionMessage);

// Function to check if all tasks are complete
function checkAllTasksComplete() {
    const allTasks = document.querySelectorAll('.task-check');
    const allChecked = [...allTasks].every(task => task.checked);

    if (allChecked && allTasks.length > 0) {
        completionMessage.style.display = 'block';  // Show the final message
        launchConfetti();  // Optional confetti effect if you kept that from before 🎉
    } else {
        completionMessage.style.display = 'none';  // Hide if a task gets unchecked
    }
}

// Add this listener to new tasks' checkboxes
task_checkbox.addEventListener('change', checkAllTasksComplete);

    });
    
	});
