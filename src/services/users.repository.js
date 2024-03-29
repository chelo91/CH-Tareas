
export default class UsersRepository {
    constructor(dao) {
        this.dao = dao
    }
    addUser = async (newUser) => { return await this.dao.addUser(newUser) }
    getUserByEmail = async (email) => { return await this.dao.getUserByEmail(email) }
    getUser = async (id) => { return await this.dao.getUser(id) }
    updateUser = async (id, user) => { return await this.dao.updateUser(id, user) }
    refreshLastLoginUser = async (id) => { return await this.dao.refreshLastLoginUser(id) }

}