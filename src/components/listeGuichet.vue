<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side">
      <ajoutGuichet :visibleGuichet="visibleGuichet" :Ajouter="Ajouter">
      </ajoutGuichet>
      <modifierGuichet :revele="revele" :Modifier="Modifier"> </modifierGuichet>
    </nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Guichets
          <small>Différents opérations concernant les Guichets</small>
        </h1>
      </div>

      <div id="page-inner">
        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default">
              <div class="panel-heading">
                <v-btn class="btn-click blue" v-on:click="Ajouter()"
                  >Creer</v-btn
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
                        <th>Numéro Guichet</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="type in getGuichet"
                        :key="type.id"
                        class="sizing"
                      >
                        <td>{{ type.name }}</td>
                        <td>
                          <a href="#" v-on:click="Modifier()"
                            ><i class="fa fa-edit icon-mod"></i>
                          </a>
                          <a href="#" v-on:click="Supprimer()"
                            ><i class="bi bi-trash"></i
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
import ajoutGuichet from "./Guichets/ajoutGuichet";
import modifierGuichet from "./Guichets/modifierGuichet";

export default {
  components: {
    navigation,
    ajoutGuichet: ajoutGuichet,
    modifierGuichet: modifierGuichet
  },
  data() {
    return {
      visibleGuichet: false,
      revele: false,
      name: ""
    };
  },
  computed: {
    getGuichet() {
      return this.$store.getters.getGuichet;
    }
  },
  created() {
    this.$store.dispatch("getGuichet", {
      agence: localStorage.getItem("agence")
    });
    return this.$store.getters.getGuichet;
  },
  methods: {
    Ajouter() {
      this.visibleGuichet = !this.visibleGuichet;
    },
    Modifier() {}
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
.entete{
  font-size: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
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
</style>
