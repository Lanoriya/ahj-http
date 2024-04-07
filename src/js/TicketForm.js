export default class TicketForm {
  constructor(onSubmit) {
    this.container = document.getElementById('ticket-list-container');
    this.onSubmit = onSubmit;
  }

  renderForm() {
    const formElement = document.createElement('form');
    formElement.id = 'ticket-form'
    formElement.innerHTML = `
      <input type="text" name="name" placeholder="Name">
      <textarea name="description" placeholder="Description"></textarea>
      <button type="submit">Submit</button>
    `;
    formElement.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = {
        name: formData.get('name'),
        description: formData.get('description'),
        status: false, // Assuming status is always false for a new ticket
        created: Date.now(), // Setting current timestamp for created
      };
      this.onSubmit(data);
    });
    this.container.appendChild(formElement);
  }
}