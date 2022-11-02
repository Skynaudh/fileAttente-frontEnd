<template>
  <div>
    <navigation />
    <div id="page-wrapper">
      <div id="page-inner">
        <div class="row">
          <div class="form-login">
            <h4>Welcome back {{ name }}</h4>
            <label for="">Confirmer votre Guichet</label>
            <select required v-model="guichet" class="form-control input-sm chat-input">
              <option v-for="type in getGuichet" :key="type.id">{{
                type.name
              }}</option>
            </select>
            <br />
            <label for="">Agent</label>
            <input
              disabled
              type="text"
              v-model="name"
              class="form-control input-sm chat-input"
            />
            <div class="wrapper">
              <span class="group-btn" @click="ecranAgent()">
                <a href="#" class="btn btn-primary btn-md"
                  >login <i class="fa fa-sign-in"></i
                ></a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "./navigation";

export default {
  components: {
    navigation
  },
  data() {
    return {
      guichet: "",
      name: localStorage.getItem("name")
    };
  },
  computed: {
    getGuichet() {
      return this.$store.getters.getGuichet;
    }
  },
  created() {
    this.$store.dispatch("getGuichet", {
      agence: localStorage.getItem("agence")
    });
    return this.$store.getters.getGuichet;
  },
  methods: {
    ecranAgent() {
      this.$store
        .dispatch("affecterAgentGuichet", {
          agent: this.name,
          counter: this.guichet
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.row {
}
.form-login {
  margin-top: 5%;
  min-height: 300px;
  margin-left: 35%;
  width: 40%;
  background-color: #868181;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 15px;
  border-color: #d2d2d2;
  border-width: 5px;
  box-shadow: 0 1px 0 #cfcfcf;
}
.form-login label {
  margin-top: 15px;
  font-size: 20px;
}
.form-login select {
  margin: 0;
}
.form-login input {
  margin: 10px 0px;
}
h4 {
  border: 0 solid #fff;
  border-bottom-width: 1px;
  padding-bottom: 10px;
  text-align: center;
}

.form-control {
  padding: 0px;
  border-radius: 10px;
}

.wrapper {
  text-align: center;
}
</style>
