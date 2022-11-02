<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side">
      <modifierAgence
        v-bind:revele="revele"
        v-bind:Modifier="Modifier"
        v-bind:agenceNameSend="name"
        v-bind:telephoneSend="phone"
        v-bind:longitudeSend="longitude"
        v-bind:latitudeSend="latitude"
      ></modifierAgence>

      <transition name="popup">
        <div v-if="vueService" class="bloc-modale">
          <div class="overlay"></div>
          <div class="service-contenu">
            <div v-on:click="Fermer()" class="btn-modale btn-danger">
              X
            </div>
            <div class="form-group form-service">
              <table class="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Noms des Services</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="type in allService" :key="type.id">
                    <td>{{ type.service }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </transition>
    </nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Agences
          <small>Différents traitements liés aux Agences</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Agences</a></li>
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
                        <th>Nom d'Agence</th>
                        <th>Localisation</th>
                        <th>Numéro Télephone</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="type in getListeAgenceByInstitut"
                        :key="type.id"
                      >
                        <td>{{ type.name }}</td>
                        <td>
                          Long:{{ type.longitude }} . Lat:{{ type.latitude }}
                        </td>
                        <td>{{ type.phone }}</td>
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
import modifierAgence from "./agence/modifierAgence";
import navigation from "./navigation";

export default {
  data() {
    return {
      visible: false,
      revele: false,
      longitude: "",
      latitude: "",
      agence: "",
      vueService: false,
      name: "",
      phone: ""
    };
  },
  components: {
    navigation,
    modifierAgence: modifierAgence
  },
  created() {
    this.$store.dispatch("getListeInst");
    this.$store.dispatch("getListeAgenceByInstitut", {
      institution: localStorage.getItem("institut")
    });
    return (
      this.$store.getters.allInstitution,
      this.$store.getters.getListeAgenceByInstitut
    );
  },

  computed: {
    // allService() {
    //   return this.$store.getters.allService;
    // },
    allInstitution() {
      return this.$store.getters.allInstitution;
    },
    getListeAgenceByInstitut() {
      return this.$store.getters.getListeAgenceByInstitut;
    }
  },

  methods: {
    Ajouter: function() {
      this.$router.push("ajoutAgence");
    },
    Modifier: function(
      agenceNameSend,
      telephoneSend,
      longitudeSend,
      latitudeSend
    ) {
      this.revele = !this.revele;
      this.name = agenceNameSend;
      this.phone = telephoneSend;
      this.longitude = longitudeSend;
      this.latitude = latitudeSend;
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
