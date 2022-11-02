<template>
  <div class="base-timer">
    <svg
      class="base-timer__svg"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="46.5" />
        <path
          :stroke-dasharray="circleDasharray"
          :class="remainingPathColor"
          class="base-timer__path-remaining"
          d="
        M 50, 50
        m -45, 0
        a 45, 45 0 1, 0 90,0
        a 45, 45 0 1, 0 -90, 0 
        "
        ></path>
      </g>
    </svg>
    <span class="base-timer__label">
      {{ formattedTimeLeft }}
    </span>
  </div> 
</template>

<script>
export default {
  props: { timeLeft: { type: Number, required: true } },
  data() {
    return {};
  },
  computed: {
    colorCodes() {
      return {
        info: {
          color: "green"
        },
        warning: {
          color: "orange",
          threshold: this.warningThreshold
        },
        alert: {
          color: "red",
          threshold: this.alertThreshold
        }
      };
    },
    remainingPathColor() {
      const { alert, warning, info } = this.colorCodes;
      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    },
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
    circleDasharray() {
      return "${(this.timeFraction * 283).toFixed(0)}283";
    },
    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit
      
      return rawTimeFraction -
        (1 / this.timeLimit) * (1 - rawTimeFraction)
    }
    // timeFraction() {
    //   return this.timeLeft / this.timeLimit;
    // }
  }
};
</script>

<!-- BaseTimer.vue -->
<style scoped lang="scss">
.base-timer {
  left: 40%;
  margin: 0;
  position: relative;
  width: 100px;
  height: 100px;
  /* Removes SVG styling that would hide the time label */
  &__circle {
    fill: none;
    stroke: none;
  }
  /* The SVG path that displays the timer's progress */
  &__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }
  &__label {
   position: absolute; 
    color: red;
    /* Size should match the parent container */
    width: 100px;
    height: 100px;
    /* Keep the label aligned to the top */
    top: 0;
    /* Create a flexible box that centers content vertically and horizontally */
    display: flex;
    align-items: center;
    justify-content: center;
    /* Sort of an arbitrary number; adjust to your liking */
    font-size: 15px;
    font-weight: bold;
  }
  &__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;
    &.green {
      color: rgb(65, 184, 131);
    }
    &.orange {
      color: orange;
    }
    &.red {
      color: red;
    }
  }
}
</style>
