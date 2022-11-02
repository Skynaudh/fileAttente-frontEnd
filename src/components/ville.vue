<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side">
      <ajoutVille
        v-bind:visible="visible"
        v-bind:Ajouter="Ajouter"
      ></ajoutVille>
      <modifierVille
        v-bind:revele="revele"
        v-bind:Modifier="Modifier"
        :villeSend="name"
        :paysSend="pays"
      ></modifierVille>
    </nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Villes
          <small>Différents opérations concernant les villes</small>
        </h1>
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
                      <tr>
                        <th>Nom de la ville</th>
                        <th>Pays d'appartenance</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="type in allVille"
                        :key="type.id"
                        class="sizing"
                      >
                        <td>{{ type.name }}</td>
                        <td>{{ type.country }}</td>
                        <td>
                           <a href="#" title="Modifier" v-on:click="Modifier(type.country, type.name)"
                            ><i class="fa fa-edit icon-mod"></i
                          ></a>
                          <a href="#" title="Supprimer" v-on:click="Supprimer()"
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
  </div>
</template>

<script>
import navigation from "./navigation";
import ajoutVille from "./Villes/ajoutVille";
import modifierVille from "./Villes/modifierVille";

export default {
  components: {
    navigation,
    ajoutVille: ajoutVille,
    modifierVille: modifierVille
  },
  data() {
    return {
      nicename: "",
      country: "",
      name: "",
      pays: "",
      visible: false,
      revele: false
    };
  },
  computed: {
    allPays() {
      return this.$store.getters.allPays;
    },
    allVille() {
      return this.$store.getters.allVille;
    }
  },
  created() {
    this.$store.dispatch("getVille", { country: this.country });
    this.$store.dispatch("getListePays");
    return this.$store.getters.allVille, this.$store.getters.allPays;
  },
  methods: {
    SelectPays: function() {
      this.$store.dispatch("getListeVilleByPays", { country: this.country });
    },
    Ajouter: function() {
      this.visible = !this.visible;
    },
    Modifier: function(paysSend, villeSend) {
      this.name = villeSend;
      this.pays = paysSend;
      this.revele = !this.revele;
    }
  }
};
</script>

<style scoped>
p {
  display: inline;
  margin-left: 40%;
}
form {
  display: inline;
  margin-left: 5%;
  padding: 10px 10px;
}
.select {
  display: inline;
  width: 20%;
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

.panel-tab {
  width: 90%;
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
</style>
