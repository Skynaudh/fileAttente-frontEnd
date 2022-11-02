<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side"></nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Activités Temps réel des Guichets
        </h1>
      </div>

      <div id="page-inner">
        <div class="row">
          <div
            v-for="type in allGuichetReel"
            :key="type.counter"
            class="col-md-4"
          >
            <h3>Guichet: {{ type.counter }}</h3>
            <small v-if="type.actif == null" class="badge-danger badge"
              >Pas en Service</small
            >
            <small v-else-if="type.actif == 'oui'" class="badge-success badge"
              >En Service</small
            >
            <hr />
            <small v-if="type.service!==null">Service: {{ type.service }}</small><br>
            <small v-if="type.numero!==null">Ticket en cours: {{ type.numero}}</small><br>
            <small v-if="type.duree!==null">Durée Service: {{ type.duree }}</small>
            <h4 v-if="type.nomAgent==null">Agent: Non affecté</h4>
            <h4 v-else>Agent: {{ type.nomAgent }}</h4>
          </div>
          <!--    <div class="col-md-4">
          <h3>Guichet A-4 </h3>
          <small>En Service</small>
          <hr>
            <h4>Agent: M. Kakashi</h4>
          </div>
        <div class="col-md-4">
          <h3>Guichet A-4 </h3>
          <small>Pas Service</small>
          <hr>
            <h4>Agent: M. Jiraya</h4>
          </div>
        <div class="col-md-4">
          <h3>Guichet A-4 </h3>
          <small>En Service</small>
          <hr>
            <h4>Agent: Mme. Sarada</h4>
          </div> 
        
        <div class="col-md-4">
          <h3>Guichet A-4 </h3>
          <small>Pas Service</small>
          <hr>
            <h4>Agent: M. Obito</h4>
          </div> -->
        </div>
      </div>
    </div>
    <!-- /. ROW  -->
  </div>
</template>

<script>
import navigation from "./navigation";

export default {
  data() {
    return {};
  },
  components: {
    navigation
  },
  computed: {
    allGuichetReel() {
      return this.$store.getters.allGuichetReel;
    }
  },
  created() {
    this.$store.dispatch("getGuichetReel", {
      agence: localStorage.getItem("agence")
    });
    return this.$store.getters.allGuichetReel;
  },
  methods: {}
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
  margin-right: 0px;
  width: 100%;
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
.col-md-4 {
  width: 30%;
  margin: 1%;
  color: #fff;
  background: #3f4041;
  min-height: 100px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.col-md-4 small {
  margin-top: 10px;
}
.col-md-4 h4 {
  color: #fff;
  bottom: 0;
  float: right;
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
#page-inner {
  padding-top: 0px;
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

.btn-click {
  border-radius: 5px;
  border: none;
  padding: 20px;
  font-size: 10px;
}
.entete {
  font-size: 20px;
}
</style>
