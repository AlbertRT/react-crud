import Account from './AccountController.js'
import Auth from "./AuthController.js";
import Carts from "./CartController.js"
class Controller {
    constructor() {
        this.Account = new Account()
        this.Auth = new Auth()
        this.Cart = new Carts()
    }
}
export default Controller