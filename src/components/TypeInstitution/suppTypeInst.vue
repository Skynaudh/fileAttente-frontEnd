<template>
  <transition name="fade">
    <div class="bloc-modale" v-if="show">
      <div class="overlay" v-on:click="Supprimer"></div>

      <div class="modale card">
        <div v-on:click="Supprimer" class="btn-modale btn-danger">X</div>
        <div class="titre"><h3>Suppression d'un type d'Institution</h3></div>
        <form>
          <div class="form-group ">
            <div class="form-group ">
              <label for="inputEmail4">Nom Complet</label>
              <input
                type="text"
                class="form-control"
                v-model="nameSend"
                disabled
              />
            </div>
            <div class="form-group ">
              <label for="inputEmail4">Confirmer le nom</label>
              <input
                type="text"
                class="form-control"
                id="SuppName"
                v-model="SuppName"
                placeholder="Entrez le nom complet de l'institution à supprimer"
              />
            </div>
          </div>
          <div class="form-group">
            <button @click.prevent="SupprimeType()" class="btn btn-primary">
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "suppTypeInst",
  props: ["show", "Supprimer", "nameSend"],

  data() {
    return {
      SuppName: ""
    };
  },

  methods: {
    SupprimeType() {
      this.$store.dispatch("supprimeType", { typeInstitution: this.SuppName });
      this.show = !this.show;
    }
  }
};
</script>
!

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
  padding: 20px 30px;
  position: fixed;
  top: 15%;
  margin-left: 10%;
  width: 40%;
  bottom: 50%;
}

.titre {
  top: 5%;
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
