import firebase from "firebase/app";
import "firebase/firestore";

export class Firebase {

    constructor(){ 

        this._config = {
            
            apiKey: "AIzaSyAWmR79Cj8RaCkIWhi3jow_zda76gF9ZYY",
            authDomain: "whatsapp-clone-28539.firebaseapp.com",
            projectId: "whatsapp-clone-28539",
            storageBucket: "whatsapp-clone-28539.appspot.com",
            messagingSenderId: "1079830230128",
            appId: "1:1079830230128:web:cc1088c7dcd88f3f5270b5"

            };

            this.init();

    };

    init(){
        
        if(!this._initialized){
            firebase.initializeApp(this._config);
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
            this._initialized = true;   
        }
    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }

    initAuth(){

        return new Promise((s,f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result=>{
                
                let token = result.credential.accesToken;
                let user = result.user;

                s(user, token);

            })
            .catch(err=>{
                f(err);
            });

        });

    }

}