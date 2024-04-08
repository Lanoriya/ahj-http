import TicketService from "./TicketService";

export default class TicketView {
  constructor() {
    this.container = document.getElementById('ticket-list-container');
    this.ticketService = new TicketService();
  }

  renderTicket(ticket) {
    const ticketRow = document.createElement('tr');
    ticketRow.innerHTML = `
      <td>
        <button class="toggle-status-button" id="ticket-btn" data-id="${ticket.id}" data-status="${ticket.status}">
          ${ticket.status ? '✓' : 'ㅤ'}
        </button>
      </td>
      <td class="ticket-name">${ticket.name}</td>
      <td>${new Date(ticket.created).toLocaleString()}</td>
      <td>
        <button class="update-button" id="ticket-btn" data-id="${ticket.id}">✎</button>
        <button class="delete-button" id="ticket-btn" data-id="${ticket.id}">☓</button>
      </td>
    `;
    
    const deleteButton = ticketRow.querySelector('.delete-button');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Предотвращает всплытие события
      if (document.getElementById('ticket-form')) {
        return;
      }
      this.confirmDeleteTicket(ticket.id);
    });

    const updateButton = ticketRow.querySelector('.update-button');
    updateButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Предотвращает всплытие события
      if (document.getElementById('ticket-form')) {
        return;
      }
      this.openEditModal(ticket.id, ticket.name, ticket.description);
    });

    const toggleStatusButton = ticketRow.querySelector('.toggle-status-button');
    toggleStatusButton.addEventListener('click', () => {
      const currentStatus = toggleStatusButton.dataset.status === 'true';
      const newStatus = !currentStatus;
      toggleStatusButton.dataset.status = newStatus.toString();
      toggleStatusButton.textContent = '✓';
      this.updateTicket(ticket.id, { status: newStatus });
    });

    ticketRow.addEventListener('click', () => {
      this.toggleTicketDescription(ticketRow, ticket.description);
    });

    return ticketRow;
  }

  toggleTicketDescription(ticketRow, description) {
    const descriptionRow = ticketRow.nextElementSibling;
    if (descriptionRow && descriptionRow.classList.contains('ticket-description')) {
      descriptionRow.remove();
    } else {
      const newDescriptionRow = document.createElement('tr');
      newDescriptionRow.classList.add('ticket-description');
      const descriptionCell = document.createElement('td');
      descriptionCell.setAttribute('colspan', '4');
      descriptionCell.textContent = description;
      newDescriptionRow.appendChild(descriptionCell);
      ticketRow.after(newDescriptionRow);
    }
  }

  renderTickets(tickets) {
    this.container.innerHTML = '';
    const table = document.createElement('table');
    table.innerHTML = `
      <tbody></tbody>
    `;
    const tbody = table.querySelector('tbody');
    tickets.forEach(ticket => {
      const ticketRow = this.renderTicket(ticket);
      tbody.appendChild(ticketRow);
    });
    this.container.appendChild(table);
  }

  confirmDeleteTicket(id) {
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal');
    modalElement.id = 'ticket-form';
    modalElement.innerHTML = `
      <div class="modal-content">
        <h5 class="form-title">Удалить тикет</h5>
        <p class="form-confirm-p">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
        <div class="form-btns">
          <button class="modal-cancel form-btn">Отмена</button>
          <button class="modal-confirm form-btn">Ok</button>
        </div>
      </div>
    `;

    const confirmButton = modalElement.querySelector('.modal-confirm');
    confirmButton.addEventListener('click', () => {
      this.deleteTicket(id);
      modalElement.remove();
    });

    const cancelButton = modalElement.querySelector('.modal-cancel');
    cancelButton.addEventListener('click', () => {
      modalElement.remove();
    });

    document.body.appendChild(modalElement);
  }

  openEditModal(id, name, description) {
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal');
    modalElement.id = 'ticket-form';
    modalElement.innerHTML = `
      <div class="modal-content">
        <h5 class="form-title">Редактировать тикет</h5>
        <div class="form-type">
          <div class="form-type-block">
            <label for="name">Краткое описание</label>
            <textarea type="text" id="edit-name" name="name">${name}</textarea>
          </div>
          <div class="form-type-block">
            <label for="description">Подробное описание</label>
            <textarea id="edit-description" name="description">${description}</textarea>
          </div>
          <div class="form-btns">
            <button class="modal-cancel form-btn">Отмена</button>
            <button class="modal-confirm form-btn">Ok</button>
          </div>
        </div>
      </div>
    `;

    const confirmButton = modalElement.querySelector('.modal-confirm');
    confirmButton.addEventListener('click', () => {
      const newName = modalElement.querySelector('#edit-name').value;
      const newDescription = modalElement.querySelector('#edit-description').value;
      const newData = { name: newName, description: newDescription };
      this.updateTicket(id, newData);
      modalElement.remove();
    });

    const cancelButton = modalElement.querySelector('.modal-cancel');
    cancelButton.addEventListener('click', () => {
      modalElement.remove();
    });

    document.body.appendChild(modalElement);
  }

  deleteTicket(id) {
    this.ticketService.delete(id, () => {
      this.ticketService.list(tickets => {
        this.renderTickets(tickets);
      });
    });
  }

  updateTicket(id, newData) {
    this.ticketService.update(id, newData, () => {
      this.ticketService.list(tickets => {
        this.renderTickets(tickets);
      });
    });
  }
}
