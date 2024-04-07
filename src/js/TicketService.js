export default class TicketService {
  constructor() {
    this.baseUrl = 'http://localhost:7070/';
  }

  async list(callback) {
    try {
      const response = await fetch(this.baseUrl + '?method=allTickets');
      const data = await response.json();
      callback(data);
    } catch (error) {
      console.error('Ошибка при получении списка тикетов:', error);
    }
  }

  async get(id, callback) {
    try {
      const response = await fetch(this.baseUrl + `?method=ticketById&id=${id}`);
      const data = await response.json();
      callback(data);
    } catch (error) {
      console.error('Ошибка при получении тикета:', error);
    }
  }

  async create(data, callback) {
    try {
      const response = await fetch(this.baseUrl + '?method=createTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const newData = await response.json();
      callback(newData);
    } catch (error) {
      console.error('Ошибка при создании тикета:', error);
    }
  }

  async update(id, data, callback) {
    try {
      const response = await fetch(this.baseUrl + `?method=updateById&id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const newData = await response.json();
      callback(newData);
    } catch (error) {
      console.error('Ошибка при обновлении тикета:', error);
    }
  }

  async delete(id, callback) {
    try {
      const response = await fetch(this.baseUrl + `?method=deleteById&id=${id}`, {
        method: 'GET',
      });
      if (response.ok) {
        callback();
      } else {
        console.error('Ошибка при удалении тикета:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при удалении тикета:', error);
    }
  }
}