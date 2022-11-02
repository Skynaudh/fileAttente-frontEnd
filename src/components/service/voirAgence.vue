<template>
  <div>
    <div v-if="vueAgence" class="bloc-modale">
      <div class="overlay "></div>
    </div>
    <transition name="fade">
      <div v-if="vueAgence" class="bloc-modale">
        <div class="AjoutService-contenu" v-if="vueAffecter">
          <div v-on:click="Agence()" class="btn-modale btn-danger">
            X
          </div>
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Noms de Agence</th>
                <th>Affectations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="type in getListeAgenceByInstitut" :key="type.id">
                <td>{{ type.name }}</td>
                <td>
                  <button
                    @click="confirmeAffectation(type.name)"
                    class="btn-click green"
                  >
                    Affecter
                  </button>
                  <!--    <div class="switch" >
                        <div class="switch-wrapper" @click="changeSwitchValue()" :class="{ 'on': value, 'off': !value }">
                          <div class="circle"></div>
                        </div>
                       </div> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
    <transition name="fadeThird">
      <div v-if="finishForm" class="bloc-modale">
        <div class="popup-contenu">
          <form v-on:submit.prevent="submit">
            <div class="form-group ">
              <label
                class="col-form-label col-form-label-lg"
                for="validationCustom01"
                >Durée du Service= 00 : 00 : 00
                <span class="text-danger">*</span></label
              >
              <input type="text" v-model="duree" class="form-control" />
            </div>
            <div class="form-group">
              <button type="submit" class="btn green">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!--  <transition name="fadeThird">
      <div v-if="finishForm" class="bloc-modale">
        <div class="popup-contenu">
          <div class="icon-warning">
            <i class="fa fa-warning"></i>
          </div>
          <div class="title">
            Voulez-vous affecter ce service!!!!!
          </div>
          <hr />
          <div class="dismiss-v-btn">
            <v-btn v-on:click="retour()" class="val red">
              Annuler
            </v-btn>
            <v-btn v-on:click="affecterService()" class="val green">
              Affecter
            </v-btn>
          </div>
        </div>
      </div>
    </transition> -->
  </div>
</template>

<script>
export default {
  name: "voirAgence",
  props: ["vueAgence", "Agence", "desc"],
  data() {
    return {
      finishForm: false,
      name: "",
      vueAffecter: true,
      value: false,
      active: "true",
      duree: "",
      averageDuration: "00:02:00"
    };
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
    return this.$store.getters.getListeAgenceByInstitut;
  },

  methods: {
    submit() {
      this.$store
        .dispatch("affecterService", {
          service: this.desc,
          agence: this.name,
          active: this.active,
          averageDuration: this.duree
        })
        .then(() => {
          this.$store.dispatch("getServiceByInstitution", {
            institution: localStorage.getItem("institut")
          });
          return this.$store.getters.getService;
        })
        .catch(err => {
          console.log(err);
        });
      this.finishForm = false;
      this.Agence();
      this.vueAffecter = true;
    },
    confirmeAffectation(nameSend) {
      this.name = nameSend;
      this.vueAffecter = !this.vueAffecter;
      this.finishForm = !this.finishForm;
    },
    retour() {
      this.finishForm = !this.finishForm;
    }
  }
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
.overlay {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
.btn-click {
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 5px;
  font-size: 15px;
}
.fade-enter-active {
  transition: opacity 1s, transform 1s;
}

.fade-enter {
  opacity: 0;
  transform: translateX(300px);
}
.fadeThird-enter-active {
  transition: opacity 1s, transform 1s;
}

.fadeThird-enter {
  opacity: 0;
  transform: translateX(300px);
}
.popup-contenu {
  background: #fff;
  color: #333;
  position: fixed;
  width: 30%;
  padding: 30px;
}
.icon {
  margin: 5px 0px;
  width: 50px;
  height: 50px;
  border: 2px solid #34f234;
  margin-left: 45%;
  display: inline-block;
  border-radius: 50%;
  line-height: 60px;
}
.icon-warning {
  margin: 5px 0px;
  width: 80px;
  height: 80px;
  border: 2px solid #e6e93c;
  margin-left: 40%;
  padding: 5px 5px;
  display: inline-block;
  border-radius: 50%;
  line-height: 60px;
}
.icon i.fa {
  font-size: 45px;
  color: #34f234;
}
.icon-warning i.fa {
  font-size: 60px;
  color: yellow;
}
.title {
  text-align: center;
  font-size: 20px;
  font-weight: 300;
}
.btn-modale {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 20px;
  padding: 10px 20px;
  cursor: pointer;
}
.dismiss-btn {
  text-align: center;
  margin-right: 3px;
  margin-top: 5px;
  margin-bottom: 5px;
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

.dismiss-btn button {
  padding: 5px 10px;
  background: #34f234;
  color: hsl(0, 0%, 96%);
  font-size: 18px;
  cursor: pointer;
}
</style>
