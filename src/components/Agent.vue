<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side">
      <modifierUtilisateur
        v-bind:revele="revele"
        v-bind:Modifier="Modifier"
      ></modifierUtilisateur>
      <div v-if="vueGuichet" class="bloc-modale">
        <div class="overlay"></div>

        <transition name="fade">
          <div v-if="vueGuichet" class="bloc-modale">
            <div class="AjoutService-contenu">
              <div v-on:click="Guichet()" class="btn-modale btn-danger">X</div>
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
                      <v-btn
                        @click="confirmeAffectation(type.name)"
                        class="green"
                      >
                        Affecter
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </transition>
      </div>
    </nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Les Agents de l'Agence
          <v-btn class="btn-click blue" v-on:click="Ajouter()"
            >Creer Agent</v-btn
          >
        </h1>
        <ol class="breadcrumb">
          <li><a href="#">Accueil</a></li>
          <li class="active">Agents</li>
          <li><a href="#" v-on:click="Ajouter()">Creer Agent</a></li>
        </ol>
      </div>

      <div id="page-inner">
        <div class="row">
          <div
            class="col-lg-3 col-sm-6"
            v-for="type in allAgent"
            :key="type.id"
          >
            <div class="card hovercard">
              <div class="cardheader"></div>
              <div class="inscrire-logo">
                <i class="fa fa-user"></i>
              </div>
              <div class="info">
                <div class="title">
                  <span>{{ type.name }}</span>
                </div>
                <div class="desc">{{ type.email }}</div>
                <div class="desc">{{ type.number }}</div>
              </div>
              <div class="bottom">
                <a href="#" title="Modifier" @click="Guichet(type.name)"
                  ><i
                    class="fa fa-external-link icon-mod"
                    aria-hidden="true"
                  ></i
                ></a>
                <a href="#" title="Supprimer" v-on:click="Supprimer()"
                  ><i class="fa fa-times-circle icon-del"></i
                ></a>
              </div>
            </div>
          </div>
        </div>

       

      </div>
    </div>
  </div>
</template>

<script>
import modifierUtilisateur from "./utilisateur/modifierUtilisateur";
import navigation from "./navigation";

export default {
  data() {
    return {
      visible: false,
      revele: false,
      vueGuichet: false,
      guichet: "",
      name: "",
    };
  },
  components: {
    navigation,
    modifierUtilisateur: modifierUtilisateur,
  },
  computed: {
    allAgent() {
      return this.$store.getters.allAgent;
    },
    getGuichet() {
      return this.$store.getters.getGuichet;
    }
  },
  created() {
    this.$store.dispatch("getListeAgentAgence", {
      agence: localStorage.getItem("agence"),
    });

    return this.$store.getters.allAgent;
  },
  methods: {
    Guichet(name) {
      this.name = name;
      this.vueGuichet = !this.vueGuichet;
      this.$store.dispatch("getGuichet", {
        agence: localStorage.getItem("agence"),
      });
      return this.$store.getters.getGuichet;
    },
    confirmeAffectation(nom) {
      this.guichet = nom;
      this.$store.dispatch("affecterAgentGuichet", {
        agent: this.name,
        counter: this.guichet,
      }).then(() => {
           this.$store.dispatch("getListeAgentAgence", {
      agence: localStorage.getItem("agence"),
    });

    return this.$store.getters.allAgent;
      });
      this.vueGuichet = false;
    },
    Ajouter: function () {
      this.$router.push("ajoutAgent");
    },
    Modifier: function () {
      // this.revele = !this.revele;
      // this.vueRegister = true;
    },
  },
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

.bloc {
  background-color: rgb(71, 128, 109);
  color: #fff;
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

.btn-modale {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 15px;
  padding: 8px 15px;
  cursor: pointer;
}

.header {
  padding-bottom: 0px;
}

.btn-click {
  display: inline;
  float: right;
  color: #fffd;
  padding: 5px;
  font-size: 10px;
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

.overlay {
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
  max-width: 90%;
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
