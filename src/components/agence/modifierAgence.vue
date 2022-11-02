<template>
  <transition name="fade">
    <div class="bloc-modale" v-if="revele">
      <div class="overlay" v-on:click="Modifier"></div>

      <div class="modale card">
        <div v-on:click="Modifier" class="btn-modale btn-danger">X</div>
        <div class="titre"><h3>Modification d'une Agence</h3></div>
        <form v-on:submit.prevent="modifierAgence()">
          <div class="form-group ">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Ancien nom</label>
              <input
                type="text"
                class="form-control"
                v-model="agenceNameSend"
                disabled
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPilassword4">Nouveau nom</label>
              <input
                type="text"
                class="form-control"
                v-model="agenceName"
                placeholder="Saisissez le nouveau nom de l'agence"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail4">Changer le Téléphone</label>
              <input type="text" class="form-control" v-model="telephoneSend" />
            </div>
            <div class="form-group col-md-6">
              <label for="inputState">Institus d'appartenance</label>
              <input
                type="text"
                v-model="institutSend"
                class="form-control"
                disabled
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail4">Longitude</label>
              <input type="text" class="form-control" v-model="longitudeSend" />
            </div>
            <div class="form-group col-md-6">
              <label for="inputEmail4">Latitutde</label>
              <input type="text" class="form-control" v-model="latitudeSend" />
            </div>
            <div class="form-group">
              <button class="btn green">Modifier</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "modifierAgence",
  props: [
    "revele",
    "Modifier",
    "telephoneSend",
    "agenceNameSend",
    "institutSend",
    "longitudeSend",
    "latitudeSend"
  ],
  data() {
    return {
      agenceName: ""
    };
  },
  validations: {
    agenceName: { required },
    telephoneSend: { required }
  },

  methods: {
    modifierAgence() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.$store.dispatch("modifierAgence", {
          ancienneAgence: this.agenceNameSend,
          institution: this.institutSend,
          agence: this.agenceName,
          longitude: this.longitudeSend,
          latitude: this.latitudeSend,
          phone: this.telephoneSend
        });
        this.revele = false;
      }
    }
  }
};
</script>

<style scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  right: 2%;
  position: absolute;
  bottom: 1%;
}
.overlay {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #f1f1f1;
  color: #333;
  padding: 20px 60px;
  position: fixed;
  top: 15%;
  margin-left: 10%;
  width: 50%;
  bottom: 20%;
}

.titre {
  top: 0;
  text-align: center;
  padding-bottom: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s, transform 0.6s;
}

.fade-enter,
.fade-leave-active {
  transform: translateY(20px);
}

.btn-modale {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 20px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
