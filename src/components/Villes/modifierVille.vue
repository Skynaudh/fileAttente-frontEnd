<template>
  <transition name="fade">
    <div class="bloc-modale" v-if="revele">
      <div class="overlay" v-on:click="Modifier"></div>

      <div class="modale card">
        <div v-on:click="Modifier" class="btn-modale btn-danger">X</div>
        <div class="titre"><h3>Modification de la ville</h3></div>
        <form v-on:submit.prevent="modifierVille()">
           <div class="form-group ">
              <label for="inputEmail4">Pays</label>
              <input
                type="text"
                class="form-control"
                disabled
                v-model="paysSend"
              />
            </div>
          <div class="form-group ">
              <label for="inputEmail4">Ancien Nom de la Ville</label>
              <input
                type="text"
                class="form-control"
                v-model="villeSend"
                disabled
              />
            </div>
            <div class="form-group ">
              <label for="inputEmail4">Modifier Nom</label>
              <input
                type="text"
                class="form-control"
                v-model.trim="$v.ville.$model"
                :class="{ 'is-invalid': submitted && $v.ville.$error}"
              />
               <span v-if="submitted && !$v.ville.required"
                        class="invalid-feedback"
                      >
                        The city field is required.
                </span>
          </div>

              <button class="btn btn-primary">
                Modifier
              </button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "modifierVille",
  props: ["revele", "Modifier", "villeSend", "paysSend"],

  data() {
    return {
      ville: "",
      submitted: false
    };
  },
  validations: {
    ville: {required}
  },

  methods: {
    modifierVille: function() {
      this.$store.dispatch("modifierVille", {
        ville: this.ville,
        country: this.paysSend,
        ancienVille: this.villeSend
      });
      this.Modifier();
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
  padding: 20px 40px;
  position: fixed;
  top: 15%;
  margin-left: 10%;
  width: 50%;
  min-height: 200px;
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
