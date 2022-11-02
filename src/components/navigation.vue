<template>
  <div>
    <div>
      <div id="wrapper">
        <nav class="navbar navbar-default top-navbar" role="navigation">
          <div class="navbar-header">
            <a class="navbar-brand" href="#"
              ><strong><i class="fa fa-home"></i> {{ name }}</strong></a
            >
            <div id="sideNav" href="">
              <h2>{{ agence }}</h2>
            </div>
          </div>

          <ul class="nav navbar-top-links navbar-right">
            <!-- /.dropdown -->
            <li class="dropdown" @click="Deconnect()">
              <a
                class="dropdown-toggle deconnect"
                data-toggle="dropdown"
                href="#"
              >
                Déconnexion <i class="fa fa-sign-out fa-fw"></i
              ></a>

              <!-- /.dropdown-user -->
            </li>
            <!-- /.dropdown -->
          </ul>
        </nav>
        <!--/. NAV TOP  -->
        <nav class="navbar-default navbar-side" role="navigation">
          <transition name="popup">
            <div v-if="confirme" class="bloc-modale">
              <div class="overlay "></div>
              <div class="popup-contenu">
                <div class="icon">
                  <i class="fa fa-check"></i>
                </div>
                <div class="title">
                  Opération éffectuée avec Succes!!!
                </div>
                <hr />
                <div class="dismiss-btn">
                  <button v-on:click="retour()">
                    Retour
                  </button>
                </div>
              </div>
            </div>
          </transition>
           <div class="sidebar-collapse">
            <ul class="nav" id="main-menu">
              <li v-if="visibleSuper || visibleAdmin || visibleChef">
                <a
                  v-if="
                    $Portail.isSuper ||
                      $Portail.isAdmin ||
                      $Portail.isChefAgence
                  "
                  active-class="active-menu"
                  href="/dashboard"
                  ><i class="fa fa-dashboard"></i> Dashboard</a
                >
              </li>
              <li v-if="visibleSuper || visibleAdmin || visibleChef">
                <a
                  v-if="
                    $Portail.isSuper ||
                      $Portail.isAdmin ||
                      $Portail.isChefAgence
                  "
                  active-class="active-menu"
                  href="/statistique"
                  ><i class="fa fa-dashboard"></i> Statistiques</a
                >
              </li>
              <li v-if="visibleAdmin || visibleChef">
                <router-link
                  v-if="
                  $Portail.isAdmin ||
                      $Portail.isChefAgence
                  "
                  active-class="active-menu"
                  to="/GAB"
                  ><i class="fa fa-desktop"></i> GAB</router-link
                >
              </li>
              <li v-if="visibleAdmin">
                <router-link
                  v-if="$Portail.isAdmin"
                  active-class="active-menu"
                  to="/EspaceGuichetAdmin"
                  ><i class="fa fa-sitemap"></i> Espace Guichets
                </router-link>
              </li>
              <li v-if="visibleAgent">
                <router-link
                  v-if="$Portail.isAgent"
                  active-class="active-menu"
                  to="/ecran"
                  ><i class="fa fa-desktop"></i> Ecran</router-link
                >
              </li>
              <li v-if="visibleSuper">
                <router-link
                  v-if="$Portail.isSuper"
                  active-class="active-menu"
                  to="/TypeInstitution"
                  ><i class="fa fa-desktop"></i> Type
                  d'Institutions</router-link
                >
              </li>
              <li v-if="visibleSuper">
                <router-link
                  v-if="$Portail.isSuper"
                  active-class="active-menu"
                  to="/institution"
                  ><i class="fa fa-university"></i> Institutions</router-link
                >
              </li>

              <li v-if="visibleAdmin">
                <router-link
                  v-if="$Portail.isAdmin"
                  active-class="active-menu"
                  to="/agence"
                  ><i class="fa fa-sitemap"></i> Agences</router-link
                >
              </li>

              <li v-if="visibleAdmin">
                <router-link
                  v-if="$Portail.isAdmin"
                  active-class="active-menu"
                  to="/Utilisateur"
                  ><i class="fa fa-user"></i> Agents d'institution</router-link
                >
              </li>
              <li v-if="visibleChef">
                <router-link
                  v-if="$Portail.isChefAgence"
                  active-class="active-menu"
                  to="/EspaceGuichet"
                  ><i class="fa fa-sitemap"></i> Espace Guichets
                </router-link>
              </li>
              <li v-if="visibleChef">
                <router-link
                  v-if="$Portail.isChefAgence"
                  active-class="active-menu"
                  to="/Agent"
                  ><i class="fa fa-users"></i> Les Agents d'Agence</router-link
                >
              </li>

              <li v-if="visibleSuper">
                <router-link
                  v-if="$Portail.isSuper"
                  active-class="active-menu"
                  to="/ville"
                  ><i class="fa fa-table"></i> Les Villes</router-link
                >
              </li>
              <li v-if="visibleSuper">
                <router-link
                  v-if="$Portail.isSuper"
                  active-class="active-menu"
                  to="/Administration"
                  ><i class="fa fa-users"></i> Espace
                  Administrateur</router-link
                >
              </li>
              <li v-if="visibleSuper">
                <router-link
                  v-if="$Portail.isSuper"
                  active-class="active-menu"
                  to="/role"
                  ><i class="fa fa-form"></i> Les Roles</router-link
                >
              </li>

              <li v-if="visibleChef">
                <router-link
                  v-if="$Portail.isChefAgence"
                  active-class="active-menu"
                  to="/serviceAgence"
                  ><i class="fa fa-sitemap"></i> Services
                </router-link>
              </li>
              <li v-if="visibleAdmin">
                <router-link
                  v-if="$Portail.isAdmin"
                  active-class="active-menu"
                  to="/serviceInstitution"
                  ><i class="fa fa-sitemap"></i> Services Institution
                </router-link>
              </li>
              <li v-if="visibleChef">
                <router-link
                  v-if="$Portail.isChefAgence"
                  active-class="active-menu"
                  to="/listeGuichet"
                  ><i class="fa fa-desktop"></i> Liste des Guichets</router-link
                >
              </li>
              <li v-if="visibleChef">
                <router-link
                  v-if="$Portail.isChefAgence"
                  active-class="active-menu"
                  to="/Guichet"
                  ><i class="fa fa-desktop"></i> Differents
                  Guichets</router-link
                >
              </li>
              
              <li @click="Deconnect()">
                <router-link to="#"
                  ><i class="fa fa-sign-out fa-fw"></i> Déconnexion</router-link
                >
              </li>
            </ul>
          </div> 
        
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { loggedOut } from "../Auth.js";

export default {
  name: "navigation",
  data() {
    return {
      confirme: false,
      visibleSuper: false,
      visibleAdmin: false,
      visibleChef: false,
      visibleAgent: false,
      name: localStorage.getItem("name"),
      agence: localStorage.getItem("agence"),
      role: localStorage.getItem("role")
    };
  },
  created() {
    if (this.role == "SuperAdministrateur") {
      this.visibleSuper = true;
    } else if (this.role == "AdministrateurInstitution") {
      this.visibleAdmin = true;
    } else if (this.role == "ChefAgence") {
      this.visibleChef = true;
    } else if (this.role == "Agent") {
      this.visibleAgent = true;
    }
  },
  methods: {
    Deconnect() {
      loggedOut({
        name: null,
        password: null
      }).then(() => {
        this.$router.push("/");
      });
    },
    retour() {
      this.confirme = !this.confirme;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.deconnect {
  font-size: 17px;
  color: cornflowerblue;
}
</style>
