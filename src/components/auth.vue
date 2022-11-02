<template>
  <div>
    <!-- <div class="overlay" v-if="erreur"></div>
    <transition name="fadeThird">
      <div v-if="erreur" class="bloc-modale">
        <div class="popup-contenu">
          <div class="icon-warning">
            <i class="fa fa-warning"></i>
          </div>
          <div class="title">
            Connexion Echoué!!!!!
          </div>
          <div class="dismiss-btn">
            <v-btn v-on:click="reessayer()" class="red">
              Retour
            </v-btn>
          </div>
        </div>
      </div>
    </transition> -->

    <div class="page">
      <div class="container">
        <!-- Outer Row -->
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="text-gray-900 mb-4">Bienvenue !</h1>
                      </div>
                      <form class="user">
                        <div class="form-group">
                          <input
                            required
                            type="text"
                            class="form-control form-control-user"
                            id="exampleInputEmail"
                            v-model="username"
                            placeholder="Votre identifiant..."
                          />
                        </div>
                        <div class="form-group">
                          <input
                            required
                            type="password"
                            class="form-control form-control-user"
                            id="exampleInputPassword"
                            v-model="password"
                            placeholder="Votre mot de passe..."
                          />
                        </div><a
                          href="#"
                          @click="login()"
                          class="btn btn-primary btn-user"
                        >
                          Connexion
                        </a>
                      </form>
                      <div class="text-center small">
                        <a href="#">Mot de passe oublié ?</a>
                      </div>
                      <div v-if="alertError" class="text-center error">
                        <span>Identifiant ou Mot de passe incorrect!!!</span>
                      </div>
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
// import axios from "axios";
import { loggedIn } from "../Auth.js";

export default {
  name: "auth",
  data() {
    return {
      username: "",
      password: "",
      alertError: false
    };
  },
  methods: {
    // login() {
    //   let name = this.username;
    //   let password = this.password;
    //   this.$store
    //     .dispatch("loginAdmin", { name, password })
    //     .then(() => {
    //       this.$router.push("/dashboard");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.alertError = true;
    //     });
    // },

    login() {
      const { username, password } = this;
      loggedIn({
        name: username,
        password: password
      })
        .then(response => {
          const role = response.data.data.role;
          localStorage.setItem("role", role);

          const institut = response.data.data.information.institution;
          const agence = response.data.data.information.agence;
          const duree = response.data.data.duree;
          const dureeSecond = response.data.data.dureeSecond;
          localStorage.setItem("duree", duree);
          localStorage.setItem("dureeSecond", dureeSecond);
          const idAgent = response.data.data.information.agentId;
          localStorage.setItem("idAgent", idAgent);
          const name = response.data.data.information.name;
          localStorage.setItem("institut", institut);
          localStorage.setItem("agence", agence);
          localStorage.setItem("name", name);

          if (role == "Agent") {
            const service = response.data.data.service;
            const guichet = response.data.data.guichet;
            if (guichet == null || service == null) {
              this.$router.push("/loginEcran");
            } else {
              const agentGuichet = response.data.data.guichet.name;
              localStorage.setItem("guichet", agentGuichet);
              localStorage.setItem("service", service);
              this.$router.push("/ecran");
            }
          } else {
            this.$router.push("/dashboard");
          }
        })
        .catch(error => {
          console.log(error);
          this.alertError = true;
        });
    },
    Erreur() {
      this.erreur = !this.erreur;
    },
    reessayer() {
      (this.username = ""), (this.password = ""), (this.erreur = !this.erreur);
    }
  }
};
</script>

<style scoped>
.container {
  width: 100% !important;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  margin-right: 0;
  margin-left: 0;
}
.justify-content-center {
  justify-content: center !important;
}
.row {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: rgb(77, 67, 122);
  background-clip: border-box;
  /* border: 1px solid #e3e6f0;
  border-radius: 0.35rem; */
}
.error {
  color: red;
  margin: 0;
  padding: 0;
}

.card > hr {
  margin-right: 0;
  margin-left: 0;
}
.o-hidden {
  overflow: hidden !important;
}
.shadow-lg {
  box-shadow: 0 1rem 3rem white !important;
}
.border-0 {
  border: 0 !important;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
}
.col-lg-6 {
  flex: 0 0 50%;
  max-width: 50%;
  background: white;
}
.d-none {
  display: none !important;
}
.d-lg-block {
  display: block !important;
}
.bg-login-image {
  background: url("../assets/image_search_1613158244286.png");
  background-position: center;
  background-size: cover;
}
.p-5 {
  padding: 2rem !important;
  margin-top: 50px;
}
.text-center {
  text-align: center !important;
}
.mb-4 {
  margin-bottom: 3.5rem !important;
}
form.user .custom-checkbox.small label {
  line-height: 10px;
}

form.user .form-control-user {
  font-size: 0.8rem;
  border-radius: 10rem;
  padding: 1.5rem 1.75rem;
}

form.user .btn-user {
  font-size: 0.8rem;
  margin-left: 20%;
  border-radius: 10rem;
  padding: 10px 200px;
}
.form-group {
  margin-bottom: 60px;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #28292c;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-block {
  margin-top: 0.5rem;
}
.small {
  font-size: 20px;
  font-weight: 400;
  padding: 30px;
}

</style>
