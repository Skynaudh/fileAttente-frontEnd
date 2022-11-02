<template>
  <transition name="fade">
    <div class="bloc-modale" v-if="revele">
      <div class="overlay" v-on:click="Modifier"></div>

      <div class="modale card">
        <div v-on:click="Modifier" class="btn-modale btn-danger">X</div>
        <div class="titre"><h3>Modification des infos Utilisateurs</h3></div>
        <form>
          <div class="form-group ">
            <div class="form-group ">
              <label for="inputEmail4">Nom Complet</label>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                placeholder="Entrez le nom complet de la nouvelle institution"
              />
            </div>
            <div class="form-group ">
              <label for="inputPilassword4"> Identifiant</label>
              <input
                type="text"
                class="form-control"
                id="inputPassword4"
                placeholder="Modifier le code d'identification de l'utilisateur"
              />
            </div>
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Modifier l'adresse email"
            />
          </div>
          <div class="form-group">
            <label for="inputAddress">Modifier l'Adresse</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="123 Adjidoadin St"
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Modifier</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modifierUtilisateur",
  props: ["revele", "Modifier"]
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
  padding: 20px 80px;
  position: fixed;
  top: 15%;
  margin-left: 10%;
  width: 60%;
  bottom: 10%;
}

.titre {
  top: 0;
  text-align: center;
  padding-bottom: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s, transform 0.8s;
}

.fade-enter,
.fade-leave-active {
  transform: translateY(10px);
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
