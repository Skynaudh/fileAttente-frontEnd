<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side"></nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Ajouter une Institution
          <small>Différents traitements liés aux Admins Institutions</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Institution</a></li>
          <li class="active">Ajouter</li>
        </ol>
      </div>

      <div id="page-inner">
        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default tab">
              <div class="panel-body">
                <div class="table-responsive">
                  <form v-on:submit.prevent="ajoutInst()">
                    <div class="titre">
                      <h3>Création d'une Institution</h3>
                    </div>
                    <div class="form-group">
                      <div class="form-group col-md-6">
                        <label
                          class="col-form-label col-form-label-lg"
                          for="validationCustom01"
                          >Nom Complet <span class="text-danger">*</span></label
                        >
                        <input
                          required
                          type="text"
                          v-model.trim="Inst"
                          class="form-control "
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label class="col-form-label col-form-label-lg"
                          >Sélectionner le Pays
                          <span class="text-danger">*</span></label
                        >
                        <select
                          required
                          class="form-control"
                          v-model.trim="nicename"
                          @change="SelectPays()"
                        >
                          <option selected>Choose...</option>
                          <option v-for="type in allPays" :key="type.id">{{
                            type.nicename
                          }}</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <label class="col-form-label col-form-label-lg"
                          >Sélectionner votre Ville
                          <span class="text-danger">*</span></label
                        >
                        <select
                          required
                          v-model.trim="ville"
                          class="form-control"
                        >
                          <option v-for="type in allVille" :key="type.id">{{
                            type.name
                          }}</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <label class="col-form-label col-form-label-lg"
                          >Type d'Institution
                          <span class="text-danger">*</span></label
                        >
                        <select
                          required
                          v-model.trim="TypeInst"
                          class="form-control"
                        >
                          <option selected>Choose...</option>
                          <option
                            v-for="type in allTypeInstitution"
                            :key="type.id"
                            >{{ type.name }}</option
                          >
                        </select>
                      </div>
                    </div>
                    <div class="titre">
                      <h3>Création de Agence Centrale</h3>
                    </div>

                    <div class="form-group col-md-6">
                      <label
                        class="col-form-label col-form-label-lg"
                        for="validationCustom01"
                        >Nom de l'Agence Mère<span class="text-danger"
                          >*</span
                        ></label
                      >
                      <input
                        required
                        type="text"
                        v-model.trim="agenceName"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-md-6 ">
                      <label class="col-form-label col-form-label-lg"
                        >Numéro Télephone
                        <span class="text-danger">*</span></label
                      >
                      <input
                        required
                        minlength="8"
                        maxlength="12"
                        type="number"
                        v-model.trim="telephone"
                        class="form-control "
                      />
                    </div>
                    <div class="form-group col-md-4 ">
                      <label class="col-form-label col-form-label-lg"
                        >Adresse <span class="text-danger">*</span></label
                      >
                      <input
                        required
                        type="text"
                        v-model.trim="adress"
                        class="form-control"
                      />
                    </div>
                    
                    <div class="form-group col-md-4 ">
                      <label for="validationCustom01">Longitude</label>
                      <input
                        required
                        type="text"
                        v-model="longitude"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-md-4 ">
                      <label for="validationCustom01">Latitude</label>
                      <input
                        required
                        type="text"
                        v-model="latitude"
                        class="form-control "
                      />
                    </div>

                    <div class="titre">
                      <h3>Administrateur d'institution</h3>
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
                        type="number"
                        minlength="8"
                        maxlength="12"
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
                        type="text"
                        v-model.trim="userName"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label for="password">Mot de passe</label>
                      <input
                        type="password"
                        v-model="password"
                        class="form-control"
                        placeholder="saisir le mot de passe"
                      />
                      
                    </div>

                    <div class="form-group col-md-4">
                      <label for="cpassword">Confirmer mot de passe</label>
                      <input
                        type="password"
                        v-model="c_password"
                        class="form-control"
                        
                        placeholder="resaisir le mot de passe"
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
// import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      TypeInst: "",
      pays: "",
      Inst: "",
      ville: "",
      agenceName: "",
      nicename: "",
      adress: "",
      longitude: "",
      latitude: "",
      telephone: "",
      userName: "",
      password: "",
      c_password: "",
      nomAdmin: "",
      adrAdmin: "",
      phoneAdmin: "",
      type: "admin",
      emailAdmin: "",
      name: localStorage.getItem("name"),
      submitted: false
    };
  },
  components: {
    navigation
  },
  // validations: {
  //   TypeInst: { required },
  //   pays: { required },
  //   Inst: { required },
  //   ville: { required },
  //   agenceName: { required },
  //   nicename: { required },
  //   telephone: { required }
  // },

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
    SelectPays() {
      this.$store.dispatch("getVilleByPays", {
        country: this.nicename
      });
      return this.$store.getters.allVille;
    },
    ajoutInst() {
      // this.submitted = true;
      // this.$v.$touch();
      // if (this.$v.$invalid) {
      //   return;
      // }
      this.$store
        .dispatch("ajoutInst", {
          typeInstitution: this.TypeInst,
          institution: this.Inst,
          ville: this.ville
        })
        .then(() => {
          this.$store
            .dispatch("ajoutAgence", {
              agence: this.agenceName,
              longitude: this.longitude,
              latitude: this.latitude,
              phone: this.telephone,
              address: this.adress,
              institution: this.Inst
            })
            .then(() => {
               this.$store
        .dispatch("ajoutAdmin", {
          agence: this.agenceName,
          username: this.userName,
          password: this.password,
          name: this.nomAdmin,
          adress: this.adrAdmin,
          number: this.phoneAdmin,
          email: this.emailAdmin,
          type: this.type
        })
        .then(() => {
              this.confime = !this.confirme;
              this.$router.push("Institution");
        })
             .catch(error => {
              console.log(error);
            });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    annuler() {
      this.$router.push("Institution");
    }
  }
};
</script>

<style scoped>
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
  margin: 30px;
  text-align: center;
  color: green;
  text-decoration: underline;
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
