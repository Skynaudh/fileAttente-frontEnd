<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side"></nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Espace d'Administration
          <small>Différents opérations concernant les Administrateurs</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Adminstration</a></li>
          <li class="active">Traitements</li>
        </ol>
      </div>

      <div id="page-inner">
        <div class="row">
          <div class="col-md-12">
            <!-- Advanced Tables -->
            <div class="panel panel-default">
              <div class="panel-heading">
                <v-btn class="btn-click blue" @click="Ajouter">Creer</v-btn>
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table
                    class="table table-striped table-bordered table-hover"
                    id=""
                  >
                    <thead>
                      <tr>
                        <th>Nom de l'Adminstrateur</th>
                        <th>Type d'Institution</th>
                        <th>Téléphone</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="type in allAdmin" :key="type.id">
                        <td>{{ type.name }}</td>
                        <td>{{ type.institution }}</td>
                        <td>{{ type.number }}</td>
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
          <!--End Advanced Tables -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "./navigation";

export default {
  components: {
    navigation
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    allAdmin() {
      return this.$store.getters.allAdmin;
    }
  },
  created() {
    this.$store.dispatch("getListeAdmin");
    return this.$store.getters.allAdmin;
  },
  methods: {
    Ajouter: function() {
      this.$router.push("ajoutAdmin");
    }
  }
};
</script>

<style scoped>
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
