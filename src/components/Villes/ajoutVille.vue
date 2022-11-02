<template>
  <div>
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

    <div class="bloc-modale" v-if="visible">
      <div class="overlay" v-on:click="Ajouter()"></div>

      <div class="modale card">
        <div v-on:click="Ajouter()" class="btn-modale btn-danger">
          X
        </div>
        <div class="titre"><h3>Création d'une Ville</h3></div>

        <form v-on:submit.prevent="ajoutVille()">
          <div class="form-group">
            <label
              class="col-form-label col-form-label-lg"
              for="validationCustom01"
              >Pays <span class="text-danger">*</span></label
            >
            <select
               v-model.trim="$v.pays.$model"
              :class="{ 'is-invalid': submitted && $v.pays.$error }"
              class="form-control"
            >
              <option selected>Choose...</option>
              <option v-for="type in allPays" :key="type.id">{{
                type.nicename
              }}</option>
            </select>
            <span
              v-if="submitted && !$v.pays.required"
              class="invalid-feedback "
            >
              The Country field is required.
            </span>
          </div>
          <div class="form-group">
            <label class="col-form-label col-form-label-lg"
              >Taper la Ville <span class="text-danger">*</span></label
            >
            <input
              type="text"
              v-model="$v.ville.$model"
              :class="{ 'is-invalid': submitted && $v.ville.$error }"
              class="form-control"
            />
            <span
              v-if="submitted && !$v.ville.required"
              class="invalid-feedback "
            >
              The City field is required.
            </span>
          </div>
          <button class="btn green">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "ajoutVille",
  props: ["visible", "Ajouter"],

  data() {
    return {
      pays: "",
      ville: "",
      confirme: false,
      submitted: false
    };
  },
  validations: {
    ville: { required },
    pays: { required }
  },

  computed: {
    allPays() {
      return this.$store.getters.allPays;
    }
  },

  created() {
    this.$store.dispatch("getListePays");
    return this.$store.getters.allPays;
  },

  methods: {
    ajoutVille() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        this.confirme = !this.confirme;
        this.Ajouter();
        this.$store.dispatch("ajoutVille", {
          country: this.pays,
          ville: this.ville
        });
      }
    },
    retour() {
      this.confirme = !this.confirme;
      this.pays = '';
      this.ville = '';
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

.popup-contenu {
  background: #fff;
  color: #333;
  position: fixed;
  width: 30%;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #f1f1f1;
  color: #333;
  padding: 10px 30px;
  position: fixed;
  top: 15%;
  margin-left: 10%;
  width: 50%;
  height: 250px;
}

.titre {
  top: 0;
  text-align: center;
  padding-bottom: 20px;
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.popup-enter,
.popup-leave-active {
  transform: translateY(40px);
}

.invalid-feedback {
  color: red;
}

.btn-modale {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 20px;
  padding: 10px 20px;
  cursor: pointer;
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
.icon i.fa {
  font-size: 40px;
  color: #34f234;
}
.title {
  text-align: center;
  font-size: 20px;
  font-weight: 300;
}
.dismiss-btn {
  text-align: center;
  margin-right: 3px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.dismiss-btn button {
  padding: 5px 10px;
  background: #34f234;
  color: hsl(0, 0%, 96%);
  font-size: 18px;
  cursor: pointer;
}
</style>
