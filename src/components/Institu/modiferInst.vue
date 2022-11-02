<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="Modifier"></div>
    <div class="modale card">
      <div v-on:click="Modifier" class="btn-modale btn-danger">X</div>
      <div class="titre">
        <h3>Modification d'une institution</h3>
      </div>
      <form v-on:submit.prevent="ModifierInst()">
        <div class="form-group ">
          <label for="inputEmail4">Type d'Institution </label>
          <select required v-model.trim="TypeSend" class="form-control">
            <option v-for="type in allTypeInstitution" :key="type.id">{{ type.name }}</option>
          </select>

        </div>
        <div class="form-group">
          <label class="col-form-label col-form-label-lg" for="validationCustom01">Modifier le nom <span
              class="text-danger">*</span></label>
          <input type="text" v-model="InstSend" class="form-control " />
        </div>



        <div class="form-group">
          <button class="btn btn-primary">
            Modifier
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import { required } from "vuelidate/lib/validators";

export default {
  name: "modifierInst",
  props: ["revele", "Modifier", "InstSend", "TypeSend", "idSend"],
  data() {
    return {
      Inst: "",
      submitted: false
    };
  },

  // validations: {
  //   Inst: { required }
  // },

    computed: {
    allTypeInstitution() {
      return this.$store.getters.allTypeInstitution;
    },
  },
  created() {
    this.$store.dispatch("getListe");
    return this.$store.getters.allTypeInstitution;
  },
  methods: {
    ModifierInst() {
      // this.submitted = true;
      // this.$v.$touch();
      // if (this.$v.$invalid) {
      //   return;
      // }
      this.$store.dispatch("ModifierInst", {
        typeInstitution: this.TypeSend,
        institution: this.InstSend,
        id: this.idSend
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
  padding: 10px 30px;
  position: fixed;
  top: 15%;
  margin-left: 10%;
  width: 50%;
  bottom: 30%;
}

.titre {
  top: 0;
  text-align: center;
  padding-bottom: 20px;
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
