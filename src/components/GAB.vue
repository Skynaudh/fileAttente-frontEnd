<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side">
      <div class="bloc-modale" v-if="visible">
        <div class="overlay" v-on:click="Ajouter"></div>

        <div class="modale card">
          <div v-on:click="Ajouter" class="btn-modale btn-danger">X</div>
          <div class="titre"><h3>Création d'un Guichet Auto</h3></div>
          <form v-on:submit.prevent="submit">
            <div class="form-group col-md-6">
              <label
                class="col-form-label col-form-label-lg"
                for="validationCustom01"
                >Description du GAB<span class="text-danger">*</span></label
              >
              <input
                type="text"
                v-model.trim="$v.desc.$model"
                :class="{ 'is-invalid': submitted && $v.desc.$error }"
                class="form-control"
              />
              <span
                v-if="submitted && !$v.desc.required"
                class="invalid-feedback"
              >
                The Description field is required.
              </span>
            </div>
            <div class="form-group col-md-6">
              <label
                class="col-form-label col-form-label-lg"
                for="validationCustom01"
                >Adresse <span class="text-danger">*</span></label
              >
              <input
                type="text"
                v-model.trim="$v.adresse.$model"
                :class="{ 'is-invalid': submitted && $v.adresse.$error }"
                class="form-control"
              />
              <span
                v-if="submitted && !$v.adresse.required"
                class="invalid-feedback"
              >
                The Adresse field is required.
              </span>
            </div>
            <div class="form-group col-md-6">
              <label
                class="col-form-label col-form-label-lg"
                for="validationCustom01"
                >Longitude <span class="text-danger">*</span></label
              >
              <input
                type="text"
                v-model.trim="$v.longitude.$model"
                :class="{ 'is-invalid': submitted && $v.longitude.$error }"
                class="form-control"
              />
              <span
                v-if="submitted && !$v.longitude.required"
                class="invalid-feedback"
              >
                The Longitude field is required.
              </span>
            </div>
            <div class="form-group col-md-6">
              <label
                class="col-form-label col-form-label-lg"
                for="validationCustom01"
                >Latitude <span class="text-danger">*</span></label
              >
              <input
                type="text"
                v-model.trim="$v.latitude.$model"
                :class="{ 'is-invalid': submitted && $v.latitude.$error }"
                class="form-control"
              />
              <span
                v-if="submitted && !$v.latitude.required"
                class="invalid-feedback"
              >
                The Latitude field is required.
              </span>
            </div>
            <div class="form-group">
              <button class="btn green">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          GAB
          <small>Différents traitements liés aux GAB</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">GAB</a></li>
          <li class="active">Traitements</li>
        </ol>
      </div>

      <div id="page-inner">
        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default">
              <div class="panel-heading">
                <v-btn class="btn-click blue" v-on:click="Ajouter()"
                  >Ajouter</v-btn
                >
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table
                    class="table table-striped table-bordered table-hover"
                    id=""
                  >
                    <thead>
                      <tr class="entete">
                        <th>Description GAB</th>
                        <th>Adresse</th>
                        <th>Localisation</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="type in allGAB" :key="type.id">
                        <td>{{ type.name }}</td>
                        <td>{{type.address}}</td>
                        <td>
                          Long:{{ type.longitude }} . Lat:{{ type.latitude }}
                        </td>
                        <td>
                          <a
                            href="#"
                            v-on:click="
                              Modifier(
                                type.name,
                                type.phone,
                                type.longitude,
                                type.latitude
                              )
                            "
                            ><i class="fa fa-edit icon-mod"></i>
                          </a>
                          <a href="#" v-on:click="Supprimer()"
                            ><i class="fa fa-times-circle icon-del"></i
                          ></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import { required } from "vuelidate/lib/validators";
import navigation from "./navigation";

export default {
  data() {
    return {
      visible: false,
      submitted: false,
      longitude: "",
      latitude: "",
      agence: "",
      desc: "",
      adresse: ""
    };
  },
  components: {
    navigation
  },
  validations: {
    desc: { required },
    adresse: { required },
    longitude: { required },
    latitude: { required }
  },
  created() {
    this.$store.dispatch("listeGAB", {
      institution: localStorage.getItem("institut")
    });
    return this.$store.getters.allGAB;
  },

  computed: {
    // allService() {
    //   return this.$store.getters.allService;
    // },
    allGAB() {
      return this.$store.getters.allGAB;
    }
  },

  methods: {
    Ajouter: function() {
      this.visible = !this.visible;
    },
    submit() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.Ajouter();
      this.$store.dispatch("ajoutGAB", {
        institution: localStorage.getItem("institut"),
        gab: this.desc,
        address: this.adresse,
        longitude: this.longitude,
        latitude: this.latitude
      }).then(() => {
        this.$store.dispatch("listeGAB", {
      institution: localStorage.getItem("institut")
    });
    return this.$store.getters.allGAB;
      });
    },

    // VoirService: function(nameSend) {
    //   this.name = nameSend;
    //   this.vueService = !this.vueService;
    //   this.$store.dispatch("getListeService", {
    //     agence: this.name
    //   });
    //   return this.$store.getters.allService;
    // },
    Fermer() {
      this.vueService = !this.vueService;
      this.name = "";
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
.btn {
  right: 2%;
  position: absolute;
  bottom: 1%;
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
  padding: 10px 20px;
  position: fixed;
  top: 15%;
  margin-left: 10%;
  min-height: 100px;
  width: 40%;
}

.titre {
  top: 0;
  text-align: center;
  padding-bottom: 20px;
}

p {
  display: inline;
  margin-left: 15%;
}
form {
  display: inline;
  float: right;
  padding: 10px 10px;
}
.select {
  display: inline;
  width: 40%;
  margin-left: 10px;
  height: 30px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid rgb(88, 71, 110);
  border-radius: 4px;
}
.btn-click {
  color: #fffd;
  font-size: 15px;
  font-weight: bold;
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
.span {
  margin-left: 40%;
  font-size: 30px;
}

.panel-tab {
  width: 90%;
}
.entete {
  font-size: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
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
.btn-modale {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 20px;
  padding: 10px 20px;
  cursor: pointer;
}
.overload {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 20%;
  right: 0;
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
.service-contenu {
  background: #fff;
  color: #333;
  text-align: center;
  position: fixed;
  margin-left: 10%;
  width: 30%;
  padding-top: 4%;
  padding-bottom: 1%;
  padding-right: 1%;
  padding-left: 1%;
  min-height: 200px;
}
</style>
