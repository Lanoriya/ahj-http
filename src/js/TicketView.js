export default class TicketView {
  constructor() {
    this.container = document.getElementById('ticket-list-container');
  }

  renderTicket(ticket) {
    const ticketElement = document.createElement('div');
    ticketElement.innerHTML = `
      <div>ID: ${ticket.id}</div>
      <div>Name: ${ticket.name}</div>
      <div>Description: ${ticket.description}</div>
      <div>Status: ${ticket.status ? 'Done' : 'Pending'}</div>
      <div>Created: ${new Date(ticket.created).toLocaleString()}</div>
    `;
    this.container.appendChild(ticketElement);
  }

  renderTickets(tickets) {
    this.container.innerHTML = '';
    console.log(tickets)
    tickets.forEach(ticket => {
      this.renderTicket(ticket);
    });
  }
  
}