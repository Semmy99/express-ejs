class Users {
  authenticationUser() {
    return { id: 1, mail: "test@mail.ru" }
  }
}

const users = new Users();

module.exports = users;