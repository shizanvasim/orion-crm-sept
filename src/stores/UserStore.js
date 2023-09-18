import { makeObservable, observable, action } from 'mobx';



class UserStore {
    isAuthenticated = false

    userId

    username = ''

    email = ''

    role = ''

    createdAt = ''

    constructor() {
        makeObservable(this, {
            isAuthenticated: observable,
            username: observable,
            login: action.bound, // Bind the login function to the userStore instance
            setUserInfo: action.bound
        });
    }

    async login(username) {
        // const response = await login(username, password)
        // this.isAuthenticated = true
        this.username = username
        console.log(this.username)
    }

    setUserInfo(obj) {
        this.userId = obj.userId
        this.username = obj.username
        this.email = obj.email
        this.role = obj.role
        this.createdAt = obj.createdAt
    }

    logout() {
        this.isAuthenticated = false;
        this.username = '';
    }
}

const userStore = new UserStore();
export default userStore;
