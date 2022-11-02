<template>
  <div>
    <navigation />
    <!-- /. NAV SIDE  -->
    <nav class="navbar-default navbar-side">
      <ajoutTypeInst
        v-bind:visible="visible"
        v-bind:Ajouter="Ajouter"
      ></ajoutTypeInst>
      <modifierTypeInst
        :nameSend="name"
        :descSend="desc"
        :idSend="id"
        v-bind:revele="revele"
        v-bind:Modifier="Modifier"
      ></modifierTypeInst>
      <suppTypeInst
        :nameSend="name"
        v-bind:show="show"
        v-bind:Supprimer="Supprimer"
      ></suppTypeInst>
    </nav>

    <div id="page-wrapper">
      <div class="header">
        <h1 class="page-header">
          Types Institution <small>Bienvenue Mr. Skynaudh</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Type d'institution</a></li>
          <li class="active">Données</li>
        </ol>
      </div>
      <div id="page-inner">
        <div class="row">
          <div class="panel-tab">
            <div class="panel panel-default">
              <div class="panel-heading">
                <v-btn class="btn-click blue" v-on:click="Ajouter()"
                  >Créer</v-btn
                >
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table
                    class="table table-striped table-bordered table-hover"
                    id=""
                  >
                    <thead>
                      <tr>
                        <th class="text-center fw-bold">
                          Nom du Type d'institution
                        </th>
                        <th class="text-center fw-bold">
                          Description
                        </th>
                        <th class="text-center fw-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="type in allTypeInstitution"
                        :key="type.id"
                        class="sizing"
                      >
                        <td>{{ type.name }}</td>
                        <td>{{ type.description }}</td>
                        <td>
                          <a href="#" v-on:click="Modifier(type.name, type.description, type.id)">
                            <i class="fa fa-edit icon-mod"></i
                          ></a>
                          <a href="#" v-on:click="Supprimer(type.name)"
                            ><i class="fa fa-times-circle icon-del"></i
                          ></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ajoutTypeInst from "./TypeInstitution/ajoutTypeInst";
import modifierTypeInst from "./TypeInstitution/modifierTypeInst";
import suppTypeInst from "./TypeInstitution/suppTypeInst";
import navigation from "./navigation";

export default {
  data() {
    return {
      visible: false,
      revele: false,
      show: false,
      name: "",
      desc: "",
      id: "",
    };
  },

  components: {
    navigation,
    ajoutTypeInst: ajoutTypeInst,
    modifierTypeInst: modifierTypeInst,
    suppTypeInst: suppTypeInst
  },

  computed: {
    allTypeInstitution() {
      return this.$store.getters.allTypeInstitution;
    }
  },

  methods: {
    Ajouter: function() {
      // this.$Portail.isAdmin()
    //   if () {
    //     this.visible = !this.visible;
    //   } else {
    //     alert("Impossible");
    //   }
    this.visible = !this.visible;
     },
    Modifier: function(nameSend, descSend, idSend) {
      this.name = nameSend;
      this.desc = descSend;
      this.id = idSend;
      this.revele = !this.revele;
    },
    Supprimer: function(nameSend) {
      this.name = nameSend;
      this.show = !this.show;
    }
  },
  created() {
    this.$store.dispatch("getListe");
    return this.$store.getters.allTypeInstitution;
  }
};
</script>

<style>
.institu-enter-active,
.institu-leave-active {
  transition: opacity 1s, transform 1s;
}

.institu-enter,
.institu-leave-active {
  transform: translateX(10px);
}
.btn-click {
  color: #fffd;
  font-size: 15px;
  font-weight: bold;
}
.bloc {
  background-color: rgb(71, 128, 109);
  color: #fff;
}
th,
td {
  border: 1px solid black;
  text-align: center;
  width: 10px;
}

.panel-heading h3 {
  cursor: pointer;
}

.panel {
  margin: 0;
}

.panel-tab {
  width: 90%;
}
.sizing {
  font-size: 20px;
}
.icon-mod {
  font-size: 20px;
  color: green;
  margin-right: 15px;
}
.icon-del {
  font-size: 20px;
  color: red;
}
</style>
