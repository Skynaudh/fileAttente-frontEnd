<template>
  <div class="bloc-modale" v-if="show">
    <div class="overlay" v-on:click="Supprimer()"></div>

    <div class="modale card">
      <div v-on:click="Supprimer()" class="btn-modale btn-danger">
        X
      </div>
      <div class="titre"><h3>Suppression d'Institution</h3></div>

      <form>
        <div class="form-group">
          <label
            class="col-form-label col-form-label-lg"
            for="validationCustom01"
            >Nom Complet <span class="text-danger">*</span></label
          >
          <input
            type="text"
            v-model.trim="InstSend"
            class="form-control"
            disabled
          />
        </div>
        <div class="form-group">
          <label
            class="col-form-label col-form-label-lg"
            for="validationCustom01"
            >Taper à nouveau le nom Complet
            <span class="text-danger">*</span></label
          >
          <input type="text" v-model="Inst" class="form-control " />
        </div>
        <div class="form-group">
          <label class="col-form-label col-form-label-lg"
            >Ville de l'institution <span class="text-danger">*</span></label
          >
          <input type="text" v-model="VilleSend" class="form-control" />
        </div>

        <div class="form-group">
          <label class="col-form-label col-form-label-lg"
            >Type d'Institution <span class="text-danger">*</span></label
          >
          <input type="text" v-model="TypeSend" disabled class="form-control" />
        </div>
        <button @click.prevent="SupprimerInst()" class="btn red">
          Supprimer
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "deleteInstitution",
  props: ["show", "Supprimer", "InstSend", "TypeSend", "VilleSend"],
  data() {
    return {
      Inst: ""
    };
  },

  methods: {
    SupprimerInst() {
      this.$store.dispatch("supprimerInstitution", {
        institution: this.Inst
      });
      this.show = false;
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
  height: 400px;
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
