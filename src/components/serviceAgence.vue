<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side">
      <!--   <voirAgence
        :vueAgence="vueAgence"
        :Agence="Agence"
        :desc="description"
      ></voirAgence>
      <div v-if="vueService" class="bloc-modale">
        <div class="overlay "></div>
      </div>
      <transition name="fade">
        <div v-if="vueService" class="bloc-modale">
          <div class="AjoutService-contenu" v-if="vueAjoutService">
            <div v-on:click="AjouterService()" class="btn-modale btn-danger">
              X
            </div>
            <div class="form-group">
              <form v-on:submit.prevent="AjoutService()">
                <label for="">Nom du Service</label>
                <input
                  type="text"
                  v-model="$v.nomService.$model"
                  class="form-control"
                />
                <span
                  v-if="submitted && !$v.nomService.required"
                  class="invalid-feedback"
                >
                  The name service is required
                </span>
                <button class="btn green">Ajouter</button>
              </form>
            </div>
          </div>
        </div>
      </transition> -->
      <div v-if="vueGuichet" class="bloc-modale">
        <div class="overlay "></div>
      </div>

      <transition name="fade">
        <div v-if="vueGuichet" class="bloc-modale">
          <div class="AjoutService-contenu">
            <div v-on:click="Guichet()" class="btn-modale btn-danger">
              X
            </div>
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Guichet</th>
                  <th>Affectations</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="type in getGuichet" :key="type.id">
                  <td>{{ type.name }}</td>
                  <td>
                    <button
                      @click="confirmeAffectation(type.name)"
                      class="btn-click green"
                    >
                      Affecter
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </transition>

      <transition name="popup">
        <div v-if="confirme" class="bloc-modale">
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
    </nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Services
          <small>Différents traitements liés aux Services Agence</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Services</a></li>
          <li class="active">Traitements</li>
        </ol>
      </div>

      <div id="page-inner">
        <div class="row">
          <div class="col-md-4" v-for="type in allService" :key="type.id">
            <div class="notice notice-lg">
              <strong>{{ type.service }}</strong
              ><br /><small v-if="type.statut=='Actif'" class="badge-success badge">
                Service {{ type.statut }}</small
              >
              <small v-if="type.statut=='Inactif'" class="badge-danger badge">
                Service {{ type.statut }}</small
              >
            </div>
            <hr />
            <div class="bas">
              <button
                type="button"
                v-if="type.statut == 'Inactif'"
                @click="activer(type.service)"
                class="btn btn-success ml-1 btn-fw"
              >
                Activer
              </button>
              <button
                type="button"
                @click="desactiver(type.service)"
                v-if="type.statut == 'Actif'"
                class="btn btn-danger ml-1 btn-fw"
              >
                Désactiver
              </button>
              <button
                type="button"
                @click="Guichet(type.service)"
                class="btn btn-warning ml-1 btn-fw"
              >
                Affecter Guichet
              </button>
            </div>
          </div>
        </div>

        <!--  <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3>Service d'Agence</h3>
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table class="table table-striped table-bordered table-hover">
                    <thead>
                      <tr class="entete">
                        <th>Description Service</th>
                        <th>Statuts</th>
                        <th>Affecter à guichet</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="type in allService" :key="type.id">
                        <td>{{ type.service }}</td>
                        <td>{{ type.statut }}</td>
                        <td>
                          <i
                            @click="Guichet(type.service)"
                            class="fa fa-external-link icon-mod"
                            aria-hidden="true"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <!--   <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3>Service d'Institution</h3>
              </div>
              <div class="panel-heading">
                <v-btn class="btn-click blue" v-on:click="AjouterService()"
                  >Ajouter</v-btn
                >
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table class="table table-striped table-bordered table-hover">
                    <thead>
                      <tr class="entete">
                        <th>Description Service</th>
                        <th>Affecter à agence</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="type in getService" :key="type.id">
                        <td>{{ type.description }}</td>
                        <td>
                          <i
                            @click="Agence(type.description)"
                            class="fa fa-external-link icon-mod"
                            aria-hidden="true"
                          ></i>
                        </td>
                        <td>
                          <a href="#" v-on:click="Modifier()"
                            ><i class="fa fa-edit icon-mod"></i
                          ></a>

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
        </div> -->
      </div>
    </div>
    <!-- /. ROW  -->
  </div>
</template>

<script>
import navigation from "./navigation";
import { required } from "vuelidate/lib/validators";
// import voirAgence from "./service/voirAgence";

export default {
  data() {
    return {
      vueGuichet: false,
      confirme: false,
      description: "",
      nomService: "",
      guichet: "",
      visible: false,
      revele: false,
      vueService: false,
      vueAjoutService: true,
      serviceConfirme: false,
      vueAgence: false,
      submitted: false
    };
  },
  components: {
    navigation
    // voirAgence
  },
  validations: {
    nomService: { required }
  },
  computed: {
    allService() {
      return this.$store.getters.allService;
    },
    // getService() {
    //   return this.$store.getters.getService;
    // },
    getGuichet() {
      return this.$store.getters.getGuichet;
    }
  },
  created() {
    this.$store.dispatch("getServiceByAgence", {
      agence: localStorage.getItem("agence")
    });
    // this.$store.dispatch("getServiceByInstitution", {
    //   institution: localStorage.getItem("institut")
    // });
    this.$store.dispatch("getGuichetService", {
      agence: localStorage.getItem("agence")
    });
    return (
      this.$store.getters.allService,
      // this.$store.getters.getService,
      this.$store.getters.getGuichet
    );
  },
  methods: {
    Guichet(desc) {
      this.description = desc;
      this.vueGuichet = !this.vueGuichet;
      this.$store.dispatch("getGuichet", {
        agence: localStorage.getItem("agence")
      });
      return this.$store.getters.getGuichet;
    },
    confirmeAffectation(nom) {
      this.guichet = nom;
      this.$store.dispatch("affecterGuichet", {
        service: this.description,
        counter: this.guichet
      });
      this.vueGuichet = false;
    },
    desactiver(service) {
      this.$store.dispatch("changerStatut", {
        service: service,
        agence: localStorage.getItem("agence"),
        active: false
      })
      .then(() => {
        this.$store.dispatch("getServiceByAgence", {
      agence: localStorage.getItem("agence")
    });
    return this.$store.getters.allService;
      }).catch((err) => {
        console.log(err);
      });
    },
    activer(service) {
      this.$store.dispatch("changerStatut", {
        service: service,
        agence: localStorage.getItem("agence"),
        active: true
      })
      .then(() => {
        this.$store.dispatch("getServiceByAgence", {
      agence: localStorage.getItem("agence")
    });
    return this.$store.getters.allService;
      }).catch((err) => {
        console.log(err);
      });
    }
    // AjouterService: function() {
    //   if (this.$Portail.isAdmin()) {
    //     this.vueService = !this.vueService;
    //   } else
    //     alert("Désolé vous n'avez la permission requis pour cette action!!!");
    // },
    // AjoutService: function() {
    //   this.submitted = true;
    //   this.$v.$touch();
    //   if (this.$v.$invalid) {
    //     return;
    //   } else {
    //     this.AjouterService();
    //     this.$store.dispatch(
    //       "AjoutService",
    //       {
    //         service: this.nomService,
    //         institution: localStorage.getItem("institut")
    //       },
    //       {
    //         institution: localStorage.getItem("institut")
    //       }
    //     );
    //   }
    // },
    // Modifier: function() {
    //   if (this.$Portail.isAdmin()) {
    //     this.revele = !this.revele;
    //     this.vueRegister = true;
    //   } else
    //     alert("Désolé vous n'avez la permission requis pour cette action!!!");
    // },
    // Agence: function(desc) {
    //   this.description = desc;
    //   this.vueAgence = !this.vueAgence;
    // }
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
.row {
  margin-bottom: 100px;
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
.notice {
  margin-top: 1%;
  padding: 10px;
  background-color: #c4ddcc;
  border-left: 20px solid #4f4f6b;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 10px;
  -webkit-box-shadow: 0 5px 8px -6px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 5px 8px -6px rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 8px -6px rgba(0, 0, 0, 0.2);
}

.notice-lg > strong {
  font-size: 20px;
}
.notice-lg {
  padding: 10px;
  font-size: large;
}
.col-md-4 {
  width: 31.33333333%;
}
.col-md-4 {
  margin: 1%;
  background: #a2aed6;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.bas {
  min-height: 20px;
}
.bas button {
  display: inline;
  margin: 1%;
}
.bas .btn {
  position: relative;
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
.badge-warning {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
.badge-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.badge-danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
}
.panel {
  margin: 0;
}
.panel-heading h3 {
  text-align: center;
}

.panel-tab {
  width: 100%;
}
.overlay {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.AjoutService-contenu {
  background: #fff;
  color: #333;
  position: fixed;
  width: 40%;
  margin-left: 10%;
  padding-top: 4%;
  padding-left: 1%;
  padding-right: 1%;
  min-height: 200px;
}
.fade-enter-active {
  transition: opacity 1s, transform 1s;
}

.fade-enter {
  opacity: 0;
  transform: translateX(300px);
}
.btn {
  right: 2%;
  position: absolute;
  bottom: 1%;
}
.span {
  margin-left: 40%;
  font-size: 30px;
}
.btn-modale {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 15px;
  padding: 8px 15px;
  cursor: pointer;
}
.icon-mod {
  font-size: 20px;
  color: green;
  margin-right: 15px;
}

.switch {
  text-align: center;
}
.switch-wrapper {
  width: 44px;
  min-height: 22px;
  display: flex;
  cursor: pointer;
  border-radius: 22px;
  align-items: center;
  padding: 2px;
  transition: all 0.5s;
  background: green;
}

.btn-click {
  border-radius: 5px;
  border: none;
  padding: 10px;
  font-size: 10px;
}
.entete {
  font-size: 20px;
}
</style>
