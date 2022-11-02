<template>
  <div>
    <div class="bloc-modale" v-if="visibleGuichet">
      <div class="overlay"></div>

      <div class="modale card">
        <div v-on:click="Ajouter()" class="btn-modale btn-danger">
          X
        </div>
        <div class="titre"><h3>Création d'un Guichet</h3></div>

        <form v-on:submit.prevent="ajoutGuichet()">
          <div class="form-group">
            <label
              class="col-form-label col-form-label-lg"
              for="validationCustom01"
              >Nom de l'Agence <span class="text-danger">*</span></label
            >
            <input type="text" v-model="agence" class="form-control" disabled />
          </div>
          <div class="form-group">
            <label class="col-form-label col-form-label-lg"
              >Numéro/Reference du Guichet
              <span class="text-danger">*</span></label
            >
            <input
              type="text"
              v-model="$v.guichet.$model"
              :class="{ 'is-invalid': submitted && $v.guichet.$error }"
              class="form-control"
            />
            <span
              v-if="submitted && !$v.guichet.required"
              class="invalid-feedback "
            >
              The Counter field is required.
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
// import axios from "axios";

export default {
  name: "ajoutGuichet",
  props: ["visibleGuichet", "Ajouter"],

  data() {
    return {
      agence: localStorage.getItem("agence"),
      guichet: "",
      submitted: false
    };
  },
  validations: {
    guichet: { required }
  },

  methods: {
    ajoutGuichet() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        //   axios.post('http://192.168.1.181:8000/api/addCounter', {agence: this.agenceSend, counter: this.guichet})
        // .then(() => {
        //     axios.post('http://192.168.1.181:8000/api/listeCounterByAgence', {agence: this.agenceSend})
        // .then((response) => {
        //     console.log(response.data.data)
        // })
        // .catch(error => console.log(error));
        // })
        // .catch(error => console.log(error));
        this.$store.dispatch(
          "ajoutGuichet",
          {
            agence: this.agence,
            counter: this.guichet
          },
          {
            agence: this.agence
          }
        );
        this.Ajouter();
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
