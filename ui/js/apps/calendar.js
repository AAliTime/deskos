export function initCalendarContent(container) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const todayDate = now.getDate();

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    // Calcular días del mes
    const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; // Ajustar para que la semana empiece en Lunes
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    let daysHTML = "";
    
    // Días vacíos previos al inicio del mes
    for (let i = 0; i < firstDayIndex; i++) {
        daysHTML += `<div class="calendar-day empty"></div>`;
    }

    // Días del mes
    for (let day = 1; day <= totalDays; day++) {
        const isToday = (day === todayDate && currentMonth === now.getMonth() && currentYear === now.getFullYear());
        daysHTML += `<div class="calendar-day ${isToday ? 'today' : ''}">${day}</div>`;
    }

    container.innerHTML = `
        <div class="calendar-container">
            <div class="calendar-header">
                <span>${monthNames[currentMonth]} ${currentYear}</span>
            </div>
            <div class="calendar-grid">
                ${dayNames.map(d => `<div class="calendar-day-name">${d}</div>`).join('')}
                ${daysHTML}
            </div>
        </div>
    `;
}