<template>
  <div>
    <navigation />
    <div id="page-wrapper">
      <div class="header">
       <!-- <h2 class="page-header">
          Dashboard
          <small>Bienvenue M.{{ name }}</small>
        </h2> -->
        <ol class="breadcrumb">
          <span>Statistique Journalière</span>
        </ol>
      </div>

      <div id="page-inner">
        <div class="row">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <div class="board">
              <div class="panel panel-primary">
                <div class="number">
                  <h3>
                    <h3>65</h3>
                    <small>Tickets</small>
                  </h3>
                </div>
                <div class="icon">
                  <i class="fa fa-ticket red"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-12 col-xs-12">
            <div class="board">
              <div class="panel panel-primary">
                <div class="number">
                  <h3>
                    <h3>23</h3>
                    <small>Reservations</small>
                  </h3>
                </div>
                <div class="icon">
                  <i class="fa fa-credit-card fa-5x blue"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-12 col-xs-12">
            <div class="board">
              <div class="panel panel-primary">
                <div class="number">
                  <h3>
                    <h3>4</h3>
                    <small>Guichets</small>
                  </h3>
                </div>
                <div class="icon">
                  <i class="fa fa-comments fa-5x green"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-12 col-xs-12">
            <div class="board">
              <div class="panel panel-primary">
                <div class="number">
                  <h3>
                    <h3>20</h3>
                    <small>Agents</small>
                  </h3>
                </div>
                <div class="icon">
                  <i class="fa fa-users fa-5x yellow"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-6 col-md-3">
            <div class="panel panel-default">
              <div class="panel-body easypiechart-panel">
                <h4>Ticket servit</h4>
                <div
                  class="easypiechart"
                  id="easypiechart-blue"
                  data-percent="62"
                >
                  <span class="percent">62%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-6 col-md-3">
            <div class="panel panel-default">
              <div class="panel-body easypiechart-panel">
                <h4>Reservations Validées</h4>
                <div
                  class="easypiechart"
                  id="easypiechart-orange"
                  data-percent="55"
                >
                  <span class="percent">55%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-6 col-md-3">
            <div class="panel panel-default">
              <div class="panel-body easypiechart-panel">
                <h4> Guichet en service</h4>
                <div
                  class="easypiechart"
                  id="easypiechart-teal"
                  data-percent="100"
                >
                  <span class="percent">100%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-6 col-md-3">
            <div class="panel panel-default">
              <div class="panel-body easypiechart-panel">
                <h4>Ticket En Attente</h4>
                <div
                  class="easypiechart"
                  id="easypiechart-red"
                  data-percent="15"
                >
                  <span class="percent">15%</span>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div class="row">
          <div class="col-md-6">
            <!--    Hover Rows  -->
            <div class="panel panel-default pad">
              <div class="panel-heading prad">
                Ticket Servis par Guichet
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Guichet</th>
                        <th>Nombre</th>
                        <th>Pourcentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>B3</td>
                        <td>7</td>
                        <td>35%</td>
                      </tr>
                      <tr>
                        <td>C2</td>
                        <td>11</td>
                        <td>40%</td>
                      </tr>
                      <tr>
                        <td>A3</td>
                        <td>4</td>
                        <td>25%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- End  Hover Rows  -->
          </div>
          <div class="col-md-6 ">
            <!--    Hover Rows  -->
            <div class="panel panel-default trero">
              <div class="panel-heading retro">
                Ticket Mis en Attente par Guichet
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Guichet</th>
                        <th>Nombre</th>
                        <th>Pourcentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>B3</td>
                        <td>2</td>
                        <td>20%</td>
                      </tr>
                      <tr>
                        <td>C2</td>
                        <td>5</td>
                        <td>50%</td>
                      </tr>
                      <tr>
                        <td>A3</td>
                        <td>3</td>
                        <td>30%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- End  Hover Rows  -->
          </div>
          <div class="col-md-6">
            <!--    Hover Rows  -->
            <div class="panel panel-default SmA">
              <div class="panel-heading SmAE">
                Service Mis en Attente
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Nombre</th>
                        <th>Pourcentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Création de Compte</td>
                        <td>7</td>
                        <td>35%</td>
                      </tr>
                      <tr>
                        <td>Sppression Compte</td>
                        <td>11</td>
                        <td>40%</td>
                      </tr>
                      <tr>
                        <td>Retrait</td>
                        <td>4</td>
                        <td>25%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- End  Hover Rows  -->
          </div>
          <div class="col-md-6">
            <!--    Hover Rows  -->
            <div class="panel panel-default TnS">
              <div class="panel-heading TnsE">
                Ticket Non Servit par Guichet
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Guichet</th>
                        <th>Nombre</th>
                        <th>Pourcentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>B3</td>
                        <td>7</td>
                        <td>35%</td>
                      </tr>
                      <tr>
                        <td>C2</td>
                        <td>11</td>
                        <td>40%</td>
                      </tr>
                      <tr>
                        <td>A3</td>
                        <td>4</td>
                        <td>25%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- End  Hover Rows  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import LineChart from "vue-chartkick";
import navigation from "./navigation";

export default {
  components: {
    navigation
    // LineChart
  },
  data() {
    return {
      name: localStorage.getItem("name")
    };
  },
  created(){
  }
};
</script>

<style scoped>
.breadcrumb {
  background: rgb(51, 45, 45);
  color: white;
  font-weight: 800;
  text-align: center;
  font-size: 20px;
}
.row {
  margin-bottom: 2%;
}
.col-md-6 {
  margin-bottom: 2%;
}
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #d2d8d3;
}
.retro {
  background: rgb(159, 159, 204);
}
.trero {
  background: rgb(184, 184, 199);
}
.pad {
  background: rgb(173, 162, 171);
}
.prad {
  background: rgb(194, 152, 181);
}
.TnS {
  background: rgb(178, 193, 197);
}
.TnsE {
  background: rgb(169, 208, 219);
}
.SmA {
  background: rgb(168, 185, 185);
}
.SmAE {
 background: rgb(167, 226, 167);
}
</style>
