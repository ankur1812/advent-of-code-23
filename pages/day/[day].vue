<template>
  <div>
    <Problem
      :day="day"
      :problem="problem"
      :puzzle-input="puzzleInput"
      :solution="solution"
      :solution2="solution2"
      :final-answer="finalAnswer"
      :sample-input="sampleInput"
      :sample-answer="sampleAnswer"
      :sample-input2="sampleInput2 || sampleInput"
      :sample-answer2="sampleAnswer2"
      :final-answer2="finalAnswer2"
    ></Problem>
  </div>
</template>

<script setup>
import { defineComponent } from "@vue/composition-api";
import { ref } from "vue";
import { useRoute } from "vue-router";

import Problem from "~/components/Problem.vue";
import { day1 } from "~/puzzles/data/1";
import { day2 } from "~/puzzles/data/2";

const route = useRoute();
const dayNo = route.params.day;

let data = dayNo == "1" ? day1 : day2;

const day = ref(dayNo);
const puzzleInput = ref(data.puzzle);
const sampleInput = ref(data.sampleInput);
const sampleAnswer = ref(data.sampleAnswer);
const finalAnswer = ref(data.finalAnswer);

const solution = ref(data.solution);
const sampleInput2 = ref(data.sampleInput2);
const sampleAnswer2 = ref(data.sampleAnswer2);
const finalAnswer2 = ref(data.finalAnswer2);
const solution2 = ref(data.solution2);
const problem = ref(data.problem);
// .replace(/\n/g, "<br><br>")
</script>
