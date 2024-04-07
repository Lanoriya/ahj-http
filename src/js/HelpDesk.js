import TicketService from "./TicketService";
import TicketView from "./TicketView";
import TicketForm from "./TicketForm";

export default class HelpDesk {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.ticketService = new TicketService();
    this.ticketView = new TicketView('ticket-list');
    this.ticketForm = new TicketForm(this.handleFormSubmit.bind(this));
  }

  async init() {
    // Получаем и отображаем список тикетов при загрузке страницы
    this.ticketService.list(tickets => {
      this.ticketView.renderTickets(tickets);
    });
    // Отображаем форму для создания нового тикета
    this.ticketForm.renderForm();

    const addButton = document.getElementById('add-ticket-button');
    addButton.addEventListener('click', () => {
      this.ticketForm.renderForm();
    });
  }

  async handleFormSubmit(data) {
    // Создаем новый тикет
    this.ticketService.create(data, newData => {
      // Обновляем список тикетов после создания нового тикета
      this.ticketService.list(tickets => {
        this.ticketView.renderTickets(tickets);
      });
    });
  }
}