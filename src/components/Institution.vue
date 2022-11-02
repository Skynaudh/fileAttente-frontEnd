<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side">
      <!-- <voirService
        :institutSend="Institution"
        v-bind:vueService="vueService"
        :VoirService="VoirService"
      ></voirService> -->
      <modifierInst
        :idSend="id"
        :TypeSend="Type"
        :InstSend="Institution"
        v-bind:revele="revele"
        v-bind:Modifier="Modifier"
      ></modifierInst>
      <deleteInstitution
        :VilleSend="Ville"
        :TypeSend="Type"
        :InstSend="Institution"
        v-bind:show="show"
        v-bind:Supprimer="Supprimer"
      ></deleteInstitution>
   
    </nav>
    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Institutions
          <small>Différents opérations concernant les Institutions</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Institutions</a></li>
          <li class="active">Traitements</li>
        </ol>
      </div>

      <div id="page-inner">
        <div class="row">
          <div class="col-md-12">
            <!-- Advanced Tables -->
            <div class="panel panel-default">
              <div class="panel-heading">
                <v-btn v-on:click="ajouter()" class="btn-click blue"
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
                      <tr>
                        <th>Nom d'Institution</th>
                        <th>Type d'Institution</th>
                        <th>Ville de l'Institution</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="type in allInstitution"
                        :key="type.Institution"
                      >
                        <td>{{ type.Institution }}</td>
                        <td>{{ type.Type }}</td>
                        <td>{{ type.Ville }}</td>
                        <td>
                          <v-btn class="btn-click green" 
                          @click="parametrer(type.Institution)">Parametrer</v-btn>
                        </td>
                        <!-- <td>
                          <v-btn
                            class="btn-clik green"
                            @click="VoirService(type.Institution)"
                            ><i
                              class="fa fa-external-link"
                              aria-hidden="true"
                            ></i>
                            Voir</v-btn
                          >
                        </td> -->
                        <td>
                          <a
                            href="#"
                            v-on:click="
                              Modifier(type.Institution, type.Type, type.id)
                            "
                            ><i class="fa fa-edit icon-mod"></i>
                          </a>
                          <a
                            href="#"
                            v-on:click="
                              Supprimer(type.Institution, type.Type, type.Ville)
                            "
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
          <!--End Advanced Tables -->
        </div>
      </div>
    </div>
  </div>
  <!-- /. ROW  -->
</template>

<script>
import modifierInst from "./Institu/modiferInst";
import deleteInstitution from "./Institu/deleteInstitution";
// import voirService from "./Institu/voirService";
import navigation from "./navigation";
import { loggedIn } from "../Auth.js";

export default {
  data() {
    return {
      visible: false,
      revele: false,
      show: false,
      confirmed: false,
      submitted: false,
      vueService: false,
      Ville: "",
      Type: "",
      id: "",
      Institution: ""
    };
  },
  components: {
    // voirService: voirService,
    navigation,
    modifierInst: modifierInst,
    deleteInstitution: deleteInstitution
  },
  computed: {
    allInstitution() {
      return this.$store.getters.allInstitution;
    }
  },

  created() {
    this.$store.dispatch("getListeInst");
    return this.$store.getters.allInstitution;
  },

  methods: {
    parametrer: function() {
      // window.open("/");  
       loggedIn({
        name: "skynaudh",
        password: "skynaudh"
      })
      .then(response => {
        console.log(response);
        this.$router.push("/dashboard");

      });
    },
    ajouter: function() {
      this.$router.push("ajoutInst");
    },

    Modifier: function(InstSend, TypeSend, VilleSend) {
      this.Institution = InstSend;
      this.Type = TypeSend;
      this.Ville = VilleSend;
      this.id = VilleSend;
      this.revele = !this.revele;
    },
    Supprimer: function(InstSend, TypeSend, VilleSend) {
      this.Institution = InstSend;
      this.Type = TypeSend;
      this.Ville = VilleSend;
      this.show = !this.show;
    },
    VoirService: function(institutSend) {
      this.Institution = institutSend;
      this.vueService = !this.vueService;
    }
  }
};
</script>

<style scoped>
.bloc {
  background-color: rgb(71, 128, 109);
  color: #fff;
}

th,
td {
  border: 1px solid black;
  text-align: center;
  width: 10px;
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
  border: 1px solid #ccc;
  border-radius: 4px;
}

.bloc-modale {
  position: fixed;
  top: 30%;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
.btn-modale {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 15px;
  padding: 8px 15px;
  cursor: pointer;
}
.btn-click {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}
.popup-contenu {
  background: #fff;
  color: #333;
  position: fixed;
  width: 30%;
  padding-top: 5%;
  padding-left: 1%;
  height: 180px;
}
.invalid-feedback {
  color: red;
}

label {
  font-size: 20px;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.panel {
  margin: 0;
}

.panel-tab {
  width: 90%;
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
</style>
