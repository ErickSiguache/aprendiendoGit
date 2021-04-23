// Initialize Firebase
var config = {
    apiKey: "AIzaSyAImEV2I47UXFXIcil5r-IfKhpOAvTAIG0",
    authDomain: "registro-ebbb5.firebaseapp.com",
    projectId: "registro-ebbb5",
    storageBucket: "registro-ebbb5.appspot.com",
    messagingSenderId: "907787028765",
    appId: "1:907787028765:web:8d2a446d54aa3889fc79f4",
    measurementId: "G-L78R3J2WFQ"
  };
firebase.initializeApp(config);
//Para tener acceso al servicio de firestore
var db = firebase.firestore();
const colecion = db.collection('users')

new Vue({
    el: '#main',
    data:{
        name: "",
        surname: "",
        email: "",
        listUser:[]
    },
    
    mounted(){
        this.listUser=[];
        colecion.get().then((r) => r.docs.map((item => this.listUser.push({id:item.id, data:item.data()}))))
    },
    methods:{
        addUser(){
            colecion.add({
                name: this.name,
                surname: this.surname,
                email: this.email
            }).then( ()=> this.$mount())
        },
        updateUser(id){
            colecion.doc(id).set({name: this.name, surname:this.surname, email:this.email})
                .then( ()=> this.$mount())
        },
        deleteUser(id){
            colecion.doc(id).delete().then(()=> this.$mount())
        },
    }
});