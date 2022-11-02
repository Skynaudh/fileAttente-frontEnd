<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side">
      <transition name="popup">
        <div v-if="success" class="bloc-modale">
          <div class="overlay "></div>
          <div class="popup-contenu">
            <div class="icon">
              <i class="fa fa-check"></i>
            </div>
            <div class="title">
              Opération éffectuée avec Succes!!!
            </div>
            <hr />
            <div class="dismiss-btn">
              <button v-on:click="retour()">
                Retour
              </button>
            </div>
          </div>
        </div>
      </transition>
      <transition name="popup">
        <div v-if="erreur" class="bloc-modale">
          <div class="overlay "></div>
          <div class="popup-contenu">
            <div class="icon">
              <i class="fa fa-check"></i>
            </div>
            <div class="title">
              Une Erreur s'est produite!!!
            </div>
            <hr />
            <div class="dismiss-btn">
              <button v-on:click="retour()">
                Retour
              </button>
            </div>
          </div>
        </div>
      </transition>
    </nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Ajouter une Agence
          <small>Création de l'Agence et Chef Agence</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Agence</a></li>
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
                    <h3>Création d'un Guichet Automatique</h3>
                  </div>
                  <form v-on:submit.prevent="ajoutGAB()">
                    <div class="form-group col-md-6">
                      <label
                        class="col-form-label col-form-label-lg"
                        for="validationCustom01"
                        >Description GAB
                        <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model.trim="$v.descGAB.$model"
                        :class="{
                          'is-invalid': submitted && $v.descGAB.$error
                        }"
                        class="form-control"
                      />
                      <span
                        v-if="submitted && !$v.descGAB.required"
                        class="invalid-feedback"
                      >
                        The description field is required.
                      </span>
                    </div>
                    <div class="form-group col-md-6">
                      <label
                        class="col-form-label col-form-label-lg"
                        for="validationCustom01"
                        >Adresse d'Agence
                        <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model.trim="$v.adressAgence.$model"
                        :class="{
                          'is-invalid': submitted && $v.adressAgence.$error
                        }"
                        class="form-control"
                      />
                      <span
                        v-if="submitted && !$v.adressAgence.required"
                        class="invalid-feedback"
                      >
                        The Adress field is required.
                      </span>
                    </div>
                    <div class="form-group col-md-6 ">
                      <label for="validationCustom01">Longitude</label>
                      <input
                        type="text"
                        v-model="longitude"
                        class="form-control "
                      />
                    </div>
                    <div class="form-group col-md-6 ">
                      <label for="validationCustom01">Latitude</label>
                      <input
                        type="text"
                        v-model="latitude"
                        class="form-control "
                      />
                    </div>
                   
                    <div class="dismiss-v-btn">
                      <v-btn class="val red" @click="annuler()">
                        Annuler
                      </v-btn>
                      <v-btn type="submit" class="val green">
                        Soumettre
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
    <!-- /. ROW  -->
  </div>
</template>

<script>
import navigation from "../navigation";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      agenceName: "",
      longitude: "",
      latitude: "",
      institut: localStorage.getItem("institut"),
      telephone: "",
      userName: "",
      Stelephone: "",
      password: "",
      adressAgence: "",
      submitted: false,
      confirme: false,
      success: false,
      erreur: false,
      phoneAdmin: "",
      role: "ChefCicursalle",
      type: "user",
      nomAdmin: "",
      adrAdmin: "",
      emailAdmin: ""
    };
  },
  components: {
    navigation
  },
  validations: {
    agenceName: { required },
  },

  computed: {
    allTypeInstitution() {
      return this.$store.getters.allTypeInstitution;
    },
    allPays() {
      return this.$store.getters.allPays;
    },
    allVille() {
      return this.$store.getters.allVille;
    }
  },
  created() {
    this.$store.dispatch("getListePays");
    this.$store.dispatch("getListe");
    return this.$store.getters.allPays, this.$store.getters.allTypeInstitution;
  },
  methods: {
    ajoutAgence() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.$store
          .dispatch("ajoutAgence", {
            institution: this.institut,
            agence: this.agenceName,
            address: this.adressAgence,
            longitude: this.longitude,
            latitude: this.latitude,
            phone: this.telephone
          })
          .then(() => {
            this.$store
              .dispatch("ajoutAgent", {
                agence: this.agenceName,
                username: this.userName,
                password: this.password,
                name: this.nomAdmin,
                role: this.role,
                adress: this.adrAdmin,
                number: this.phoneAdmin,
                email: this.emailAdmin,
                type: this.type
              })
              .then(() => {
                this.$router.push("agence");
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // validation() {
    //   this.success = !this.success;
    // },
    // echec() {
    //   this.erreur = !this.erreur;
    // },
    // retour() {
    //   this.success = false;
    //   this.erreur = false;
    // },
    annuler() {
      this.$router.push("agence");
    }
  }
};
</script>

<style scoped>
.bloc-modale {
  position: fixed;
  top: 15%;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
.popup-contenu {
  background: #fff;
  color: #333;
  position: fixed;
  width: 30%;
}
.bloc {
  background-color: rgb(71, 128, 109);
  color: #fff;
}

.header {
  padding-bottom: 0px;
}
.btn-click {
  color: #fffd;
  font-size: 15px;
  font-weight: bold;
}

#page-inner {
  padding-top: 0px;
}

.creer {
  color: #fff;
  padding: 5px 2;
  background: #4187ce;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  line-height: 1.428571429;
}
th,
td {
  border: 1px solid black;
  text-align: center;
  width: 10px;
}

.panel {
  margin: 0;
}

.panel-tab {
  width: 100%;
}
.overload {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.invalid-feedback {
  color: red;
}
.icon-mod {
  font-size: 20px;
  color: green;
  margin-right: 15px;
}
.icon-del {
  font-size: 20px;
  color: red;
}
.titre {
  top: 0;
  text-align: center;
  color: green;
  text-decoration: underline;
  padding-bottom: 20px;
}
.tab {
  background: rgb(187, 177, 177);
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
</style>
