<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side">
      <div class="bloc-modale" v-if="visible">
        <div class="overlay"></div>
      </div>
      <transition name="fade">
        <div class="bloc-modale" v-if="visible">
          <div class="modale">
            <div v-on:click="Ajouter()" class="btn-modale btn-danger">X</div>
            <div class="titre"><h3>Création d'un Role</h3></div>
            <form v-on:submit.prevent="submit">
              <div class="form-group ">
                <label
                  class="col-form-label col-form-label-lg"
                  for="validationCustom01"
                  >Description du role <span class="text-danger">*</span></label
                >
                <input type="text" v-model="nomRole" class="form-control" />
              </div>
              <div class="form-group " id="checkboxes">
                <label
                  class="col-form-label col-form-label-lg"
                  for="validationCustom01"
                  >Selectionner les permissions
                  <span class="text-danger">*</span></label
                >
                <!-- <div class="boxes">
                <input type="checkbox" id="box-1">
                <label for="box-1">Sustainable typewriter cronut</label> -->

                <select v-model="permission" class="form-control">
                  <option selected>Choose...</option>
                  <option v-for="type in allPermission" :key="type.name"
                    ><input type="checkbox" id="box" />{{ type.name }}</option
                  >
                </select>
              </div>
              <button class="btn green">
                Creer
              </button>
            </form>
          </div>
        </div>
      </transition>
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
          Roles
          <small>Différents opérations concernant les roles</small>
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
                        <th>Description du role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="type in allRole"
                        :key="type.name"
                        class="sizing"
                      >
                        <td>{{ type.name }}</td>
                        <td>
                           <a href="#" title="Modifier" v-on:click="Modifier()"
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
import modifierVille from "./Villes/modifierVille";

export default {
  components: {
    navigation,
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
    allPermission() {
      return this.$store.getters.allPermission;
    },
    allRole() {
      return this.$store.getters.allRole;
    }
  },
  created() {
    this.$store.dispatch("getListePermission");
    this.$store.dispatch("getListeRole");
    return this.$store.getters.allPermission, this.$store.getters.allRole;
  },
  methods: {
    Ajouter: function() {
      this.visible = !this.visible;
      this.$router.push('ajoutRole');
    },
    Modifier: function(villeSend, paysSend) {
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

.icon-mod {
  font-size: 20px;
  color: green;
  margin-right: 15px;
}
.icon-del {
  font-size: 20px;
  color: red;
}
.fade-enter-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter {
  opacity: 0;
  transform: translateY(300px);
}
.modale {
  background: #f1f1f1;
  color: #333;
  position: fixed;
  top: 15%;
  padding: 20px 10px;
  width: 40%;
  min-height: 200px;
}
.titre {
  text-align: center;
}
</style>
