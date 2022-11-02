<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
   

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Guichet en activités dans les différents agences
        </h1>

        <ol class="breadcrumb">
          <li><a href="#">Accueil</a></li>
          <li class="active">Guichets</li>
        </ol>
      </div>

      <div id="page-inner">
      
        <div class="container">
          <div class="row" v-for="type in getListeAgenceByInstitut" :key="type.id">
            <h1 style="margin: 10px">
              {{ type.agence }} 
            </h1>
            <div
              class="col-lg-3 col-sm-6"
              v-for="info in type.information"
              :key="info.id"
            >
              <div class="card hovercard">
                <div class="cardheader">
                  {{ type.agence }}
                </div>
                <div class="inscrire-logo">
                  <i class="fa fa-user"></i>
                </div>
                <div class="info">
                  <div class="title">
                    <span>{{ info.name }}</span>
                  </div>
                  <div class="desc">{{ info.email }}</div>
                  <div class="desc">{{ info.number }}</div>
                </div>
                <div class="bottom">
                  <a href="#" title="Affecter Guichet" v-on:click="Modifier()"
                    ><i class="fa fa-edit icon-mod"></i
                  ></a>
                  <a href="#" title="Supprimer" v-on:click="Supprimer()"
                    ><i class="fa fa-times-circle icon-del"></i
                  ></a>
                </div>
                -->
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
import modifierUtilisateur from "./utilisateur/modifierUtilisateur";
import navigation from "./navigation";

export default {
  data() {
    return {
      agence: "",
      visible: false,
      revele: false
    };
  },
  components: {
    navigation,
    modifierUtilisateur: modifierUtilisateur
  },
  computed: {
    
    getListeAgenceByInstitut() {
      return this.$store.getters.getListeAgenceByInstitut;
    }
  },
  created() {
   
    this.$store.dispatch("getListeAgenceByInstitut", {
      institution: localStorage.getItem("institut")
    });
    return (
      this.$store.getters.getListeAgenceByInstitut
    );
  },
  methods: {
    SelectAgence() {
      this.$store.dispatch("getListeAgentAgence", {
        agence: this.agence
      });
      return this.$store.getters.allAgents;
    },
    Ajouter: function() {
      this.$router.push("ajoutUtilisateur");
    },
    Modifier: function() {
      //  this.revele = !this.revele;
      //  this.vueRegister = true;
    }
  }
};
</script>

<style scoped>
.bloc {
  background-color: rgb(71, 128, 109);
  color: #fff;
}
.form-group {
  text-align: center;
  margin-bottom: 50px;
}
.form-control {
  margin-left: 10px;
  background: #b9d6bd;
  display: inline !important;
  width: 30%;
}
.header {
  padding-bottom: 0px;
}
.btn-click {
  display: inline;
  float: right;
  color: #fffd;
  font-size: 15px;
  font-weight: bold;
}

#page-inner {
  width: 100%;
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
.container {
  margin: 1%;
  width: 100%;
}

.panel {
  margin: 0;
}

.panel-tab {
  width: 100%;
}
.entete {
  font-size: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
}
.overload {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
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

.row {
  width: 100%;
}

.card {
  padding-top: 20px;
  margin: 10px 0 20px 0;
  background-color: rgba(214, 224, 226, 0.2);
  border-top-width: 0;
  border-bottom-width: 2px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.card.hovercard {
  position: relative;
  margin-bottom: 25px;
  padding-top: 0;
  overflow: hidden;
  text-align: center;
  max-height: 200px !important;
  background-color: rgba(142, 162, 167, 0.2);
}

.card.hovercard .cardheader {
  background: gray;
  background-size: cover;
  height: 90px;
  color: #e5e5e5;
  font-size: 20px;
}

.card.hovercard .info {
  padding: 4px 8px 10px;
}

.card.hovercard .info .title {
  margin-bottom: 4px;
  font-size: 24px;
  line-height: 1;
  color: #3c2d8f;
  vertical-align: middle;
}

.card.hovercard .info .desc {
  overflow: hidden;
  font-size: 12px;
  line-height: 20px;
  color: #737373;
  text-overflow: ellipsis;
}
.inscrire-logo {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 5px 5px #ccc;
  font-size: 1.8em;
  background-color: #66bbaa;
  color: #f0f6fb;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card.hovercard .bottom {
  padding: 0 20px;
  margin-bottom: 17px;
}
</style>
