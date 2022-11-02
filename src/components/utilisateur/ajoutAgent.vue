<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side">
      <div class="bloc-modale" v-if="finishForm">
        <div class="overlay"></div>
        <transition name="fadeSecond">
          <div v-if="finishForm" class="bloc-modale">
            <div class="popup-contenu">
              <div class="icon-warning">
                <i class="fa fa-warning"></i>
              </div>
              <div class="title">
                Confirmer la création de l'Agent!!!
              </div>
              <hr />
              <div class="dismiss-v-btn">
                <v-btn v-on:click="annuler()" class="val red">
                  Annuler
                </v-btn>
                <v-btn v-on:click="ajouterAdmin()" class="val green">
                  Envoyer
                </v-btn>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Ajouter un Agent
          <small>Création d'un Agent</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Agent</a></li>
          <li class="active">Ajouter</li>
        </ol>
      </div>

      <div id="page-inner">
        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default tab">
              <div class="panel-body">
                <div class="table-responsive">
                  <div class="titre">
                    <h3>Création d'un Agent</h3>
                  </div>
                  <form v-on:submit.prevent="submit">
                    <div class="form-group col-md-6">
                      <label
                        class="col-form-label col-form-label-lg"
                        for="validationCustom01"
                        >Nom l'Agence <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model="agenceName"
                        class="form-control"
                        disabled
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label
                        class="col-form-label col-form-label-lg"
                        for="validationCustom01"
                        >Role de l'Agent
                        <span class="text-danger">*</span></label
                      >
                      <select required v-model="roleAgent" class="form-control">
                        <option selected>Choose...</option>
                        <option v-for="type in allRole" :key="type.name">{{
                          type.name
                        }}</option>
                      </select>
                    </div>
                   
                    <div class="form-group col-md-6">
                      <label
                        class="col-form-label col-form-label-lg"
                        for="validationCustom01"
                        >Nom & Prénom <span class="text-danger">*</span></label
                      >
                      <input
                        required
                        type="text"
                        v-model.trim="nomAdmin"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label
                        class="col-form-label col-form-label-lg"
                        for="validationCustom01"
                        >Adresse <span class="text-danger">*</span></label
                      >
                      <input
                        required
                        type="text"
                        v-model.trim="adrAdmin"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label
                        class="col-form-label col-form-label-lg"
                        for="validationCustom01"
                        >Téléphone <span class="text-danger">*</span></label
                      >
                      <input
                        required
                        minlength="8"
                        maxlength="12"
                        type="number"
                        v-model.trim="phoneAdmin"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label
                        class="col-form-label col-form-label-lg"
                        for="validationCustom01"
                        >Email <span class="text-danger">*</span></label
                      >
                      <input
                        required
                        type="email"
                        v-model.trim="emailAdmin"
                        class="form-control"
                      />
                    </div>
                     <div class="form-group col-md-4">
                      <label
                        class="col-form-label col-form-label-lg"
                        for="validationCustom01"
                        >Nom Utilisateur
                        <span class="text-danger">*</span></label
                      >
                      <input
                        required
                        type="text"
                        v-model="userName"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="password">Mot de passe</label>
                        <input type="password" v-model="password" class="form-control"
                        :class="{ 'is-invalid': isSubmitted && $v.password.$error }" placeholder="saisir le mot de passe">
                    <div v-if="isSubmitted && $v.password.$error" class="invalid-feedback">
                        <span v-if="!$v.password.required">Password field is required</span>
                    </div>
                    </div>

                    <div class="form-group col-md-4">
                        <label for="cpassword">Confirmer mot de passe</label>
                        <input type="password" v-model="c_password" class="form-control" 
                         :class="{ 'is-invalid': isSubmitted && $v.c_password.$error }" placeholder="resaisir le mot de passe">
                        <div v-if="isSubmitted && $v.c_password.$error" class="invalid-feedback">
                        <span v-if="!$v.c_password.required">Confirm Password field is required</span>
                    </div>
                    </div>
                    <div class="dismiss-v-btn">
                      <v-btn class="val red" @click="annuler()">
                        Annuler
                      </v-btn>
                      <v-btn type="submit" class="val green">
                        Envoyer
                      </v-btn>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "../navigation";
import {
        required,
        sameAs
    } from "vuelidate/lib/validators";

export default {
  name: "ajoutAgent",
  components: {
    navigation
  },

  data() {
    return {
      agenceName: localStorage.getItem("agence"),
      userName: "",
      password: "",
      c_password: "",
      nomAdmin: "",
      adrAdmin: "",
      phoneAdmin: "",
      emailAdmin: "",
      roleAgent: "",
      type: "user",
      isSubmitted: false,
      finishForm: false
    };
  },
   validations: {
   password: {
                    required,
                },
     c_password: {
                    required,
                    sameAsPassword: sameAs('password')
                },
   },
  computed: {
    allRole() {
      return this.$store.getters.allRole;
    },
    allAgence() {
      return this.$store.getters.allAgence;
    }
  },

  created() {
    this.$store.dispatch("getListeRole");
    this.$store.dispatch("getListeAgenceByInstitut", {
      institution: localStorage.getItem("institut")
    });
    return this.$store.getters.allRole, this.$store.getters.allAgence;
  },

  methods: {
    submit() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      else{
      this.$store
        .dispatch("ajoutAgent", {
          agence: this.agenceName,
          username: this.userName,
          password: this.password,
          name: this.nomAdmin,
          role: this.roleAgent,
          adress: this.adrAdmin,
          number: this.phoneAdmin,
          email: this.emailAdmin,
          type: this.type
        })
        .then(() => {
          this.$router.push("Agent");
        })
        .catch(error => {
          console.log(error);
        });
       }
    },

    retour() {
      this.$router.push("Agent");
      this.confirme = !this.confirme;
    },

    annuler() {
      this.$router.push("Agent");
    }
  }
};
</script>

<style scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #f1f1f1;
  color: #333;
  padding: 20px 10px;
  position: fixed;
  top: 15%;
  margin-left: 10%;
  width: 40%;
  min-height: 200px;
}
.modale-second {
  background: #f1f1f1;
  color: #333;
  padding: 20px 10px;
  position: fixed;
  top: 15%;
  margin-left: 10%;
  width: 50%;
  min-height: 200px;
}

.titre {
  top: 0;
  text-align: center;
  padding-bottom: 20px;
}

.popup-contenu {
  background: #fff;
  color: #333;
  position: fixed;
  width: 30%;
}
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.popup-enter,
.popup-leave-active {
  transform: translateX(100px);
}

.invalid-feedback {
  color: red;
}

.form-group {
  padding: 0px 10px;
}

.btn-modale {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 20px;
  padding: 10px 20px;
  cursor: pointer;
}
.icon {
  margin: 5px 0px;
  width: 50px;
  height: 50px;
  border: 2px solid #34f234;
  margin-left: 45%;
  display: inline-block;
  border-radius: 50%;
  line-height: 60px;
}
.icon-warning {
  margin: 5px 0px;
  width: 80px;
  height: 80px;
  border: 2px solid #e6e93c;
  margin-left: 40%;
  padding: 5px 5px;
  display: inline-block;
  border-radius: 50%;
  line-height: 60px;
}
.icon i.fa {
  font-size: 45px;
  color: #34f234;
}
.icon-warning i.fa {
  font-size: 60px;
  color: yellow;
}
.title {
  text-align: center;
  font-size: 20px;
  font-weight: 300;
}
.dismiss-btn {
  text-align: center;
  margin-right: 3px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.dismiss-v-btn {
  float: right;
  margin-top: 5px;
  margin-bottom: 5px;
}
.dismiss-v-btn .val {
  padding: 2px 5px;
  margin: 3px;
  color: hsl(0, 0%, 96%);
  font-size: 15px;
  cursor: pointer;
}

.dismiss-btn button {
  padding: 5px 10px;
  background: #34f234;
  color: hsl(0, 0%, 96%);
  font-size: 18px;
  cursor: pointer;
}

.titre {
  margin: 10px;
  text-align: center;
  color: green;
  text-decoration: underline;
}
.tab {
  background: rgb(187, 177, 177);
}
.fadeSecond-enter-active,
.fadeSecond-leave-active {
  transition: opacity 1s, transform 1s;
}

.fadeSecond-enter,
.fadeSecond-leave-active {
  opacity: 0;
  transform: translateX(300px);
}
.fadeThird-enter-active,
.fadeThird-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fadeThird-enter,
.fadeThird-leave-active {
  opacity: 0;
  transform: translateY(-300px);
}
</style>
