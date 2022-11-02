<template>
  <transition name="fade">
    <div class="bloc-modale" v-if="revele">
      <div class="overlay" v-on:click="Modifier"></div>

      <div class="modale card">
        <div v-on:click="Modifier" class="btn-modale btn-danger">X</div>
        <div class="titre"><h3>Modification d'un type d'institution</h3></div>
        <form>
          <div class="form-group ">
            <div class="form-group ">
              <label for="inputEmail4">Nom </label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                v-model="nameSend"
              />
            </div>

            <div class="form-group ">
              <label for="inputEmail4">Description </label>
              <input
                type="text"
                class="form-control"
                id="Updatedesc"
                v-model="descSend"
              />
            </div>

            <!-- <div class="form-group ">
              <label for="inputEmail4">Nouveau Nom</label>
              <input
                type="text"
                class="form-control"
                id="UpdateName"
                v-model="UpdateName"
                placeholder="Saisissez le nouveau nom complet"
              />
            </div> -->

            <div class="form-group">
              <button @click.prevent="modifierType()" class="btn btn-primary">
                Modifier
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modifierTypeInst",
  props: ["revele", "Modifier", "nameSend", "descSend", "idSend"],

  data() {
    return {
    };
  },

  methods: {
    modifierType: function() {
      this.$store.dispatch("modifierInstitutItem", {
        id: this.idSend,
        typeInstitution: this.nameSend,
        description: this.descSend
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
  padding: 20px 40px;
  position: fixed;
  top: 15%;
  margin-left: 10%;
  width: 50%;
  bottom: 40%;
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
