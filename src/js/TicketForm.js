export default class TicketForm {
  constructor(onSubmit) {
    this.container = document.getElementById('ticket-list-container');
    this.onSubmit = onSubmit;
  }

  renderForm() {
    const formElement = document.createElement('form');
    formElement.id = 'ticket-form'
    formElement.innerHTML = `
      <h5 class="form-title">Добавить тикет</h5>
      <div class="form-type">
        <div class="form-type-block">
          <label for="name">Краткое описание</label>
          <textarea type="text" id="name" name="name"></textarea>
        </div>
        <div class="form-type-block">
          <label for="description">Подробное описание</label>
          <textarea id="description" name="description"></textarea>
        </div>
        <div class="form-btns">
          <button class="form-btn" id="form-close">Отмена</button>
          <button class="form-btn" type="submit">Ok</button>
        </div>
      </div>
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

    const closeButton = formElement.querySelector('#form-close');
    closeButton.addEventListener('click', () => {
      formElement.remove();
    });
  }
}