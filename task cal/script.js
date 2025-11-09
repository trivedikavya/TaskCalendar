// DEVLOPED BY KAVYA TRIVEDI
document.addEventListener("DOMContentLoaded", function () {
  const calendar = document.getElementById('calendar');
  // DEVLOPED BY KAVYA TRIVEDI
  const monthYearDisplay = document.getElementById('month-year');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const taskModal = document.getElementById('task-modal');
  const taskInput = document.getElementById('task-input');
  const saveTaskBtn = document.getElementById('save-task');
  const closeModalBtn = document.getElementById('close-modal');
  // DEVLOPED BY KAVYA TRIVEDI
  const selectedDateDisplay = document.getElementById('selected-date');

  let tasks = {};
  let currentMonth = new Date().getMonth();
  // DEVLOPED BY KAVYA TRIVEDI
  let currentYear = new Date().getFullYear();

  // Helper to format month name and year
  function updateMonthYear() {
    const date = new Date(currentYear, currentMonth);
    const options = { year: 'numeric', month: 'long' };
    // DEVLOPED BY KAVYA TRIVEDI
    monthYearDisplay.textContent = date.toLocaleDateString('en-US', options);
  }

  // Render the calendar for the current month and year
  function renderCalendar() {
    calendar.innerHTML = ''; // Clear the previous calendar
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // DEVLOPED BY KAVYA TRIVEDI
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    // Render empty divs for days of the previous month
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.classList.add('day');
      emptyDiv.style.visibility = 'hidden';
      // DEVLOPED BY KAVYA TRIVEDI
      calendar.appendChild(emptyDiv);
    }

    // Render days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDiv = document.createElement('div');
      // DEVLOPED BY KAVYA TRIVEDI
      dayDiv.classList.add('day');
      dayDiv.textContent = day;

      const fullDate = `${currentYear}-${currentMonth + 1}-${day}`;
      // DEVLOPED BY KAVYA TRIVEDI
      dayDiv.setAttribute('data-date', fullDate);

      // Add dot indicator (yellow for task, red if no task)
      const dotDiv = document.createElement('div');
      dotDiv.classList.add('dot'); // DEVLOPED BY KAVYA TRIVEDI
      dotDiv.style.backgroundColor = tasks[fullDate] ? 'yellow' : 'red';
      dayDiv.appendChild(dotDiv);

      // Open modal on clicking the day
      dayDiv.addEventListener('click', function () {
        // DEVLOPED BY KAVYA TRIVEDI
        openTaskModal(fullDate);
      });

      calendar.appendChild(dayDiv);
    }
  }

  // Open task modal and set selected date
  function openTaskModal(date) {
    selectedDateDisplay.textContent = date;
    // DEVLOPED BY KAVYA TRIVEDI
    taskInput.value = tasks[date] || ''; // Load existing task or empty
    taskModal.style.display = 'flex';
  }

  // Close task modal
  closeModalBtn.addEventListener('click', function () {
    taskModal.style.display = 'none';
    taskInput.value = ''; // Clear the input field when modal is closed
  });

  // Save the task to the selected date
  saveTaskBtn.addEventListener('click', function () {
    // DEVLOPED BY KAVYA TRIVEDI
    const selectedDate = selectedDateDisplay.textContent;
    const taskText = taskInput.value;

    if (taskText.trim()) {
      // DEVLOPED BY KAVYA TRIVEDI
      tasks[selectedDate] = taskText;
    } else {
      delete tasks[selectedDate]; // Remove task if empty
    }

    renderCalendar(); // Re-render the calendar to update dot color
    taskModal.style.display = 'none';
    taskInput.value = ''; // Clear the input field after saving
  });

  // Previous month button
  prevMonthBtn.addEventListener('click', function () {
    currentMonth--;
    if (currentMonth < 0) {
      // DEVLOPED BY KAVYA TRIVEDI
      currentMonth = 11;
      currentYear--;
    }
    updateMonthYear();
    renderCalendar();
  });

  // Next month button
  nextMonthBtn.addEventListener('click', function () {
    currentMonth++;
    if (currentMonth > 11) {
      // DEVLOPED BY KAVYA TRIVEDI
      currentMonth = 0;
      currentYear++;
    }
    updateMonthYear();
    // DEVLOPED BY KAVYA TRIVEDI
    renderCalendar();
  });

  // Initialize the calendar for the current month and year
  updateMonthYear();
  // DEVLOPED BY KAVYA TRIVEDI
  renderCalendar();
});