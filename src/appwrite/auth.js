import conf from "../conf/conf";
import {Client,Account,ID} from 'appwrite'


export class AuthService {

    client = new Client()
    account

    constructor(){

      this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId)

      this.account = new Account(this.client)

    }


    // Create User Account
    async createAccount({email,password,name}){

        try {

            const userAccount = await this.account.create(ID.unique(),email,password,name);

        if(userAccount){

            //move to login
            console.log('Account created sucessfully')
            return this.login({email,password})
        
        }
        else {

            console.log("Account creation failed!");
            return userAccount
        }
            
        } 
        
        catch (error) {
            
          console.log('Appwrite authService :: createAccount :: error ::', error)

        }



    }


    // Login User 
    async login({email,password}){

        try {

            const loginSession = await this.account.createEmailPasswordSession(email,password)

            return loginSession

            
        } catch (error) {
            console.log('Appwrite services :: login :: error ::', error)
        }

    }


    // Get Current User
    async getCurrentUser(){

        try {
            
            const currentUser = await this.account.get()

            return currentUser

        } catch (error) {
            
            console.log('Appwrite service :: getCurrentUser :: error :: ',error);
        }

        return null

    }


    // Logout User

    async logout(){

        try {

            await this.account.deleteSessions()
            console.log("Logout Successfully")
            
        } catch (error) {
            
            console.log('Appwrite service :: logout :: error:: ', error)
        }

    }




}


const authService = new AuthService()

export default authService

