import conf from "../conf/conf";
import {Client, ID, Databases,Storage, Query} from 'appwrite'


export class Service {

    client = new Client()
    databases
    bucket


    constructor(){

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)

        this.bucket = new Storage(this.client)
    }


    // Create Post
    async createPost({

        title, 
        slug, 
        content,
        featuredImage,
        status,
        userId

    }){

        try {


            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

            
        } catch (error) {
         
            console.log('Appwrite Service :: createPost :: error', error)
        }

    }


    // Update Post
    async updatePost(slug,{title,content,featuredImage,status}){
        

        try {


            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

            
        } catch (error) {
            
            console.log('Appwite Service :: updatePost :: error ::',error)
        }

    }


    // Delete Post
    async deletePost(slug){

        try {

            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true
            
        } catch (error) {
            
            console.log('Appwite Service :: deletePost :: error ::',error)  
            
            return false
        }

    }


    // Get Specific Post
    async getPost(slug){

        try {

            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug   
            )
            
        } catch (error) {
            
            console.log('Appwite Service :: getPost :: error ::',error) 
           
           return false
        }

    }


    // Get All Public Posts
    async getPosts(queries =[Query.equal('status','Public')]){

        try {

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            
        } catch (error) {
           
            console.log('Appwite Service :: getPosts :: error ::',error) 

            return false
        }

    }

    // Get All Drafts
    async getDrafts(queries =[Query.equal('status','Draft')]){

        try {

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            
        } catch (error) {
           
            console.log('Appwite Service :: getDrafts :: error ::',error) 

            return false
        }

    }


    // Upload File(Image)
    async uploadFile(file){

        try {

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            
            console.log('Appwite Service :: uploadFile :: error ::',error) 
            return false
        }

    }


    // Delete File
    async deleteFile(fileId){

        try {

            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            
        } catch (error) {
         
            console.log('Appwite Service :: deleteFile :: error ::',error) 
            return false
        }
    }


    // Get File preview -> no promise return
    getFilePreview(fileId){

        if(fileId){

            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )

        }
        else{
          
            console.log('Appwite Service :: getFilePrview :: error') 
            return false
        }
    }
     





}


const service = new Service()

export default service

