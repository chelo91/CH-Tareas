
export default class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }
    addUser = async (newUser) => { await this.dao.addUser(newUser) }
    getUserByEmail = async (email) => { await this.dao.getUserByEmail(email) }
    getUser = async (id) => { await this.dao.getUser(id) }
}