<template>
    <div>

        <div v-show="isEditMode" >
            <h1>User Profile</h1>
            <img :src="image" alt="User Profile Picture">

            <span>Name:</span>
            <input type="text" v-model="Name" id="NewName" />
            <hr />
            <span>Email:</span>
            <input type="email" v-model="Email" id="NewEmail" />
            <hr />
            <span>Interests:</span>
            <input type="text" v-model="Interests" id="NewInterests" />
            <hr />
 

            <button  @click="SaveProfile()">Save Profile</button>
        </div>

        <div v-show="!isEditMode" >
            <h1>User Profile</h1>
            <img :src="image" alt="User Profile Picture">

            <span>Name:</span><b id="Name">{{ Name }}</b>
            <hr />
            <span>Email:</span><b id="Email">{{ Email }}</b>
            <hr />
            <span>Interests:</span><b id="Interests">{{ Interests }}</b>
            <hr />
           
            <button @click="EditProfile()" id="Edit_Profile">Edit Profile</button>
        </div>

    </div>
</template>

<script>
import image from "./12082d516103bd912249a2b2e049a379.jpg"
    export default
    {
    name:'App',
    
    data()
    {
    return{
        image:image,
        Name:"",
        Email:"",
        Interests:"",
        isEditMode:false
        }
    },
   async created(){
      const userData =await this.fetchUserData();
        this.Name = userData.name;
        this.Email=userData.email;
        this.Interests=userData.interests;

    },
    methods:{
     EditProfile() 
     {
       this.isEditMode=true;
     },
     async SaveProfile() 
     {
        
        const payload=
            {
             name:this.Name,
             email:this.Email,
             interests:this.Interests
             }
             const resJson= await this.updatedUserData(payload);
             console.log(resJson);
             this.isEditMode=false;
     },
      async fetchUserData()
     {
       const res= await fetch('/getprofile');
        return await res.json();
     },
     async updatedUserData(payload) {
        const res= await fetch('/putprofile', {
         method: "POST", 
          headers: {
                    'Content-Type': 'application/json' ,
                    'Accept': 'application/json'
                },
         body:JSON.stringify(payload)
        });
        return await res.json(); 
     }
    }
    }
</script>

<style>
img {
    width: 320px;
    display: block;
    margin-bottom: 20px;
}

div {
    margin: 20px auto;
    width: 80%;
}

hr {
    width: 400px;
    margin: 25px 0;
}

button {
    width: 160px;
    height: 40px;
    font-size: 15px;
    border-radius: 5px;
}

button:hover {
    cursor: pointer;
}

input {
    width: 200px;
    font-size: 15px;
    padding: 10px
}



</style>       
       