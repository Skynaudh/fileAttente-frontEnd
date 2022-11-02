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
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="table-responsive tab">
                  <div class="titre">
                    <h3>Création d'un Role</h3>
                  </div>
                  <form v-on:submit.prevent="ajoutRole()">
                    <div class="form-group col-md-12">
                      <label
                        class="col-form-label col-form-label-lg"
                        for="validationCustom01"
                        >Nom du Role <span class="text-danger">*</span></label
                      >
                      <input
                        type="text"
                        v-model.trim="desc"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-md-12">
                      <label>Cocher les Permissions</label>
                    </div>
                    <div
                      class="form-group col-md-3"
                      v-for="type in allPermission"
                      :key="type.name"
                    >
                     
                      <label> {{ type.name }}</label>
                        <input type="checkbox" v-model="permission" :value="type.name"/>
                      
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

export default {
  data() {
    return {
      desc: "",
      permission: [],
      submitted: false
    };
  },
  components: {
    navigation
  },
  // validations: {
  //   desc: { required }
  // },
  computed: {
    allPermission() {
      return this.$store.getters.allPermission;
    }
  },
  created() {
    this.$store.dispatch("getListePermission");
    return this.$store.getters.allPermission;
  },

  methods: {
    ajoutRole() {
        alert(this.permission);
      this.$store.dispatch("ajoutRole", { role: this.desc, permission: this.permission })
      .then(()=> {
      this.$router.push("role");
      })
      .catch((error) => {
        console.log(error);
      });
    },
    annuler() {
      this.$router.push("role");
    }
  }
};
</script>

<style scoped>
.bloc {
  background-color: rgb(71, 128, 109);
  color: #fff;
}
.titre {
  top: 0;
  text-align: center;
  color: green;
  text-decoration: underline;
  padding-bottom: 20px;
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
