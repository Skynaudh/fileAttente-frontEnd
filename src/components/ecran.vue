<template>
  <div>
    <navigation />
        <nav class="navbar navbar-default top-navbar" role="navigation">
          <div class="navbar-header">
            <a class="navbar-brand" href="#"
              ><strong><i class="fa fa-home"></i> {{ name }}</strong></a
            >
            <div id="sideNav" href="">
              <h2>{{ agence }}</h2>
            </div>
          </div>

          <ul class="nav navbar-top-links navbar-right">
            <!-- /.dropdown -->
            <li @click="Deconnect()">
              <a
                class="deconnect"
                href="#"
              >
                Déconnexion <i class="fa fa-sign-out fa-fw"></i
              ></a>

              <!-- /.dropdown-user -->
            </li>
            <!-- /.dropdown -->
          </ul>
        </nav>
    <!-- <navigation /> -->
    <div id="page-wrapper">
      <div class="header">
        <div class="form-group">
          <label
            class="col-form-label  col-form-label-lg"
            for="validationCustom01"
            >Changer Service
          </label>

          <select
            v-model="serve"
            @change="SelectService(serve)"
            class="form-control"
          >
            <option v-for="type in allService" :key="type.id">{{
              type.service
            }}</option>
          </select>
          <h1 class="page-header">Mr/Mme. {{ name }}</h1>
        </div>
      </div>

      <div id="page-inner">
        <span class="spDuree">
          {{ "Durée Normal de service =  " + dureeService }}</span
        >

        <!--  <BaseTimer :timeLeft="timeLeft"></BaseTimer> -->
        <v-btn class="debut blue" v-if="active" @click="Start()">
          Commencer
        </v-btn>
        <v-btn class="debut red" v-else @click="Stop()">
          Fin Service
        </v-btn>
        <div class="row raw">
          {{ formattedTimeLeft }}
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-16 ecran">
            <div class="panel panel-default">
              <div class="panel-heading">
                Guichet: {{ guichet }}
                <hr />
              </div>
              <div class="panel-body">
                <span v-if="vueTicket">{{ allEcran.numero | NumTicket }}</span>
                <!-- <span v-if="vueSkipTicket">{{ allEcran.numero | NumTicket }}</span>  -->
              </div>
              <div class="panel-footer">
                {{ service }}
              </div>
            </div>
          </div>
        </div>
        <div class="dismiss-v-btn">
          <v-btn class="val pre" @click="skip()">
            En attente
          </v-btn>
          <v-btn class="val suiv" @click="suivant()">
            Suivant
          </v-btn>
        </div>
        <div class="dismiss-v-btn">
          <div>
            Allez à ticket
            <select
              @change="SelectTicket()"
              v-model="number"
              class="form-control"
              aria-placeholder="Aller à Ticket"
            >
              <option v-for="type in allSkipTicket" :key="type.id">{{
                type.number
              }}</option>
            </select>

            <select
              @change="SelectGuichet(type.guichet)"
              class="form-control selectGuichet"
              disabled
            >
              <option selected>Transferer vers Guichet</option>
              <option v-for="type in allGuichet" :key="type.id">{{
                type.name
              }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "./navigation";
// import BaseTimer from "./countdown";
import axios from "axios";

import { loggedOut } from "../Auth.js";

export default {
  components: {
    navigation
    // BaseTimer
  },
  data() {
    return {
      name: localStorage.getItem("name"),
      service: localStorage.getItem("service"),
      idAgent: localStorage.getItem("idAgent"),
      dureeService: localStorage.getItem("duree"),
      guichet: localStorage.getItem("guichet"),
      agence: localStorage.getItem("agence"),
      vueTicket: false,
      active: true,
      number: "0",
      allEcran: "",
      allEcranSkip: "",
      allSkipTicket: "",
      serve: "",
      timeLimit: localStorage.getItem("dureeSecond"),
      timePassed: 0,
      timeInterval: null
    };
  },
  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      seconds = seconds < 10 ? `0${seconds}` : seconds;
      if (timeLeft > 0) {
        return `${minutes}:${seconds}`;
      } else {
        return "Time Over!!!";
      }
    },
    // allEcranSkip() {
    //   return this.$store.getters.allEcranSkip;
    // },
    // allSkipTicket() {
    //   return this.$store.getters.allSkipTicket;
    // },
    // allEcran() {
    //   return this.$store.getters.allEcran;
    // },
    allService() {
      return this.$store.getters.allService;
    },
    allGuichet() {
      return this.$store.getters.getGuichet;
    },
    timeLeft() {
      return this.timeLimit - this.timePassed;
    }
  },
  created() {
    this.$store.dispatch("getGuichet", {
      agence: localStorage.getItem("agence")
    });
    this.$store.dispatch("getServiceByAgence", {
      agence: localStorage.getItem("agence")
    });
    return this.$store.getters.allService, this.$store.getters.getGuichet;
  },
  mounted() {
  },
  methods: {
    startTimer() {
      this.timeInterval = setInterval(() => (this.timePassed += 1), 1000);
    },
    suivant() {
     if(this.active){
      alert("Cliquez sur le bouton 'Commencer' pour démarrer votre service !")
     }
     else{
              clearInterval(this.timeInterval);
      axios.post("/api/nextEcran", {
         agence: this.agence,
          service: this.service,
          counters: this.guichet,
          agent_id: this.idAgent,
          NumeroTicket: this.number
      }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((response) => {
             this.allEcran = response.data.data;
              this.ListeTicketSkiped();
            if (this.allEcran.numero > 0) {
            
              this.timeLimit = localStorage.getItem("dureeSecond");
              this.timePassed = 0;
              this.active = false;
                  
              this.startTimer();
            }
              this.vueTicket = true;
        })
        .catch(error => { console.log(error) });
     }
    },
    Start() {

      axios.post("/api/nextEcran", {
         agence: this.agence,
          service: this.service,
          counters: this.guichet,
          agent_id: this.idAgent,
          NumeroTicket: this.number
      }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((response) => {
             this.allEcran = response.data.data;
            if (this.allEcran.numero == 0) {
              clearInterval(this.timeInterval);
            }
            else{
              this.active = false;
                  
              this.startTimer();
            }
              this.vueTicket = true;
        })
        .catch(error => { console.log(error) });

      
    },
    Stop(){
      this.timeLimit = localStorage.getItem("dureeSecond");
            this.timePassed = 0;
            clearInterval(this.timeInterval);
            this.active = true;
      this.vueTicket = false;
    },
    ListeTicketSkiped(){
       axios.post("/api/listeskipTicket", {
          agence: this.agence,
            service: this.service
      }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((response) => {
          this.allSkipTicket = response.data.data;
        })
    },
    skip() {
      this.$store
        .dispatch("skipTicket", {
          agence: this.agence,
          service: this.service,
          counters: this.guichet,
          agent_id: this.idAgent
        })
        .then(() => {
          this.suivant();

          this.ListeTicketSkiped();         
          // this.$store.dispatch("listeTicketSkip", {
          //   agence: this.agence,
          //   service: this.service
          // });
          // return this.$store.getters.allSkipTicket;
        });
    },
    SelectTicket() {
              clearInterval(this.timeInterval);
       axios.post("/api/nextEcran", {
         agence: this.agence,
          service: this.service,
          counters: this.guichet,
          agent_id: this.idAgent,
          NumeroTicket: this.number
      }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((response) => {
      
      this.allEcran = response.data.data;
              this.ListeTicketSkiped();
      this.timeLimit = localStorage.getItem("dureeSecond");
              this.timePassed = 0;
              this.active = false;
                  
              this.startTimer();
      
          this.number = "0";
              this.vueTicket = true;
      
     
        })
          .catch(error => { console.log(error) });
    },
    SelectService(serve) {
      this.serve = serve;
      this.$store
        .dispatch("ChangeService", {
          ancienservice: this.service,
          service: this.serve,
          counter: this.guichet
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    },
    Deconnect() {
      loggedOut({
        name: null,
        password: null
      }).then(() => {
        this.$router.push("/");
      });
    },
    retour() {
      this.confirme = !this.confirme;
    }
  }
};
</script>

<style scoped>

.deconnect {
  color: rgb(255, 51, 0) !important;
}
.page-header {
  padding: 0 !important;
  font-size: 35px;
  font-weight: bold;
}
.form-group {
  padding-top: 3%;
}
.form-group h1 {
  display: inline;
  float: right;
}
.form-control {
  margin-left: 10px;
  background: #b9d6bd;
  display: inline !important;
  width: 20%;
}
.ecran {
  margin-left: 30%;
  text-align: center;
  background: gray;
}
.panel-heading,
.panel-body,
.panel-footer {
  color: black;
}
.spDuree {
  font-size: 15px;
  font-weight: bold;
}
.selectGuichet {
  display: inline;
  float: right;
}
.panel-heading {
  color: black;
  font-size: 20px;
}
.panel-footer {
  color: black;
}
.panel-body {
  top: 0;
  color: blue;
  font-size: 20px;
}
.dismiss-v-btn {
  height: 80px;
  width: 100%;
}
.raw {
  margin-left: 6%;
  text-align: center;
  font-size: 35px;
  color: rgb(177, 69, 69);
  margin-bottom: 0px !important;
}
.row {
  margin-bottom: 40px;
  margin-top: 5px;
}
.debut {
  float: right;
}
.dismiss-v-btn .pre {
  background: red;
  float: left;
  margin-left: 20%;
}
.dismiss-v-btn .suiv {
  background: green;
  float: right;
  margin-right: 30%;
}
.btn {
  display: inline !important;
  float: right !important;
  color: aliceblue;
}
.dismiss-v-btn .num {
  float: left;
  margin-left: 17%;
  background: rgb(43, 41, 41);
}
.dismiss-v-btn .transf {
  float: right;
  margin-right: 16%;
  background: rgb(43, 41, 41);
}
.dismiss-v-btn .val {
  padding: 2px 5px;
  color: hsl(0, 0%, 96%);
  font-size: 15px;
  cursor: pointer;
}
</style>
