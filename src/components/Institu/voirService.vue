<!--   ******     Liste des Services par rapport à une Institution     ********    -->
<template>
  <div>
    <div v-if="vueService" class="bloc-modale">
      <div class="overlay "></div>
    </div>

    <transition name="popup">
      <div v-if="vueService" class="bloc-modale">
        <div class="service-contenu" v-if="arriereVoir">
          <div v-on:click="VoirService()" class="btn-modale btn-danger">X</div>
          <div class="form-group form-service scroller">
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Noms des Services</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="type in allService" :key="type.id">
                  <td>{{ type.description }}</td>
                  <td>
                    <a href="#" title="Modifier" v-on:click="ModifierService()"
                      ><i class="fa fa-edit icon-mod"></i
                    ></a>
                    <a
                      href="#"
                      title="Suppression"
                      v-on:click="SupprimerService()"
                      ><i class="fa fa-times-circle icon-del"></i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <v-btn class="btn-service green" v-on:click="AjouterService()">
            Ajouter Service
          </v-btn>
        </div>
      </div>
    </transition>

    <!--      *********       Ajouter un service       ***********        -->
    <transition name="fade">
      <div v-if="vueAjoutService" class="bloc-modale">
        <div class="AjoutService-contenu">
          <div v-on:click="AjouterService()" class="btn-modale btn-danger">
            X
          </div>
          <div class="form-group">
            <form v-on:submit.prevent="AjoutService()">
              <label for="">Nom du Service</label>
              <input
                type="text"
                v-model="$v.nomService.$model"
                class="form-control"
              />
              <span
                v-if="submitted && !$v.nomService.required"
                class="invalid-feedback"
              >
                The name service is required
              </span>
              <button class="btn green">Ajouter</button>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "voirService",
  props: ["institutSend", "vueService", "VoirService"],
  data() {
    return {
      arriereVoir: true,
      vueAjoutService: false,
      nomService: "",
      submitted: false
    };
  },
  validations: {
    nomService: { required }
  },
  created() {
    this.$store.dispatch("getServiceByInstitution", {
      institution: this.institutSend
    });
    return this.$store.getters.allService;
  },
  computed: {
    allService() {
      return this.$store.getters.allService;
    }
  },
  methods: {
    AjouterService: function() {
      this.vueAjoutService = !this.vueAjoutService;
      this.arriereVoir = !this.arriereVoir;
    },
    active: function() {
      console.log("blabla");
      this.$store.dispatch("getServiceByInstitution", {
        institution: this.institutSend
      });
      return this.$store.getters.allService;
    }
  },
  AjoutService: function() {
    this.submitted = true;
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    } else {
      this.$store.dispatch("AjoutService", {
        service: this.nomService,
        institution: this.institutSend
      });
      this.vueAjoutService = false;
      this.arriereVoir = true;
    }
  }
};
</script>

<style scoped>
.service-contenu {
  background: #fff;
  color: #333;
  text-align: center;
  position: fixed;
  margin-left: 10%;
  width: 50%;
  padding-top: 4%;
  padding-bottom: 1%;
  padding-right: 1%;
  padding-left: 1%;
  min-height: 200px;
}
.form-service {
  margin-bottom: 10%;
}

.scroller {
  width: 100%;
  min-height: 0px;
  overflow-y: scroll;
}

.AjoutService-contenu {
  background: #fff;
  color: #333;
  position: fixed;
  width: 30%;
  margin-left: 10%;
  padding-top: 4%;
  padding-left: 1%;
  padding-right: 1%;
  min-height: 200px;
}
.fade-enter-active {
  transition: opacity 1s, transform 1s;
}

.fade-enter {
  opacity: 0;
  transform: translateX(300px);
}

.fade-leave-active {
  transition: opacity 0;
  transform: translateX(200px);
}

.invalid-feedback {
  color: red;
}

.popup-enter-active {
  transition: opacity 1s, transform 1s;
}
.popup-leave-active {
  transition: 0s;
}

.popup-enter {
  transform: translateX(-300px);
}
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.bloc-modale {
  position: fixed;
  top: 15%;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}
.btn-modale {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 15px;
  padding: 8px 15px;
  cursor: pointer;
}
</style>
