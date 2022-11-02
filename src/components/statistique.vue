<template>
  <div>
    <navigation />
    <div id="page-wrapper">
      <div class="header">
        <h2 class="page-header">
          Statistiques
        </h2>
      </div>

      <div id="page-inner">

      <div class="row">
                        <div class="col-sm-6 col-xs-12">  
                            <div class="panel panel-default chartJs">
                                <div class="panel-heading">
                                    <div class="card-title">
                                        <div class="title">Line Chart</div>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <canvas id="line-chart" class="chart"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-xs-12">
                            <div class="panel panel-default chartJs">
                                <div class="panel-heading">
                                    <div class="card-title">
                                        <div class="title">Bar Chart</div>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <canvas id="bar-chart" class="chart"></canvas>
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
                Agents Ayant le plus servit de Ticket
              </div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Nom d'Agent</th>
                        <th>Nombre Ticket</th>
                        <th>Pourcentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Kakashi</td>
                        <td>2</td>
                        <td>20%</td>
                      </tr>
                      <tr>
                        <td>Obito</td>
                        <td>5</td>
                        <td>50%</td>
                      </tr>
                      <tr>
                        <td>Shishui</td>
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
        </div>
        <div class="row"></div>
      </div>
    </div>
  </div>
</template>

<script>
// $(function() {
//   var ctx, data, myLineChart, options;
//   Chart.defaults.global.responsive = true;
//   ctx = $('#line-chart').get(0).getContext('2d');
//   options = {
//     scaleShowGridLines: true,
//     scaleGridLineColor: "rgba(0,0,0,.05)",
//     scaleGridLineWidth: 1,
//     scaleShowHorizontalLines: true,
//     scaleShowVerticalLines: true,
//     bezierCurve: false,
//     bezierCurveTension: 0.4,
//     pointDot: true,
//     pointDotRadius: 4,
//     pointDotStrokeWidth: 1,
//     pointHitDetectionRadius: 20,
//     datasetStroke: true,
//     datasetStrokeWidth: 2,
//     datasetFill: true,
//     legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
//   };
//   data = {
//     labels: ['Janvier', 'Fevrier', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//     datasets: [
//       {
//         label: "My First dataset",
//         fillColor: "rgba(26, 188, 156,0.2)",
//         strokeColor: "#1ABC9C",
//         pointColor: "#1ABC9C",
//         pointStrokeColor: "#fff",
//         pointHighlightFill: "#fff",
//         pointHighlightStroke: "#1ABC9C",
//         data: [65, 59, 80, 81, 56, 55, 40]
//       }, {
//         label: "My Second dataset",
//         fillColor: "rgba(34, 167, 240,0.2)",
//         strokeColor: "#22A7F0",
//         pointColor: "#22A7F0",
//         pointStrokeColor: "#fff",
//         pointHighlightFill: "#fff",
//         pointHighlightStroke: "#22A7F0",
//         data: [28, 48, 40, 19, 86, 27, 90]
//       }
//     ]
//   };
// });
</script>
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
    };
  }
};
</script>

<style scoped>
.row {
  margin-bottom: 1%;
}
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #d2d8d3;
} 
.retro {
  background: rgb(202, 202, 240);
}
.trero {
  background: rgb(148, 148, 153);
}
.pad {
  background: rgb(165, 162, 167);
}
.prad {
  background: rgb(165, 162, 164);
} 
</style>
