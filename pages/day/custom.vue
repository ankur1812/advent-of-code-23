<template>
  <div>
    <Problem
      :day="day"
      :problem="problem"
      :puzzle-input="puzzleInput"
      :solution="solution"
      :sample-input="sampleInput"
      :sample-answer="sampleAnswer"
    >
      <template v-slot:problem>
        <div class="problem">
          <p>Enter the sample input and expected outputs.</p>
          <label for="custom-inputs"></label>
          <textarea id="custom-inputs" v-model="customInput" rows="30" cols="100" />
          <label for="custom-outputs"></label>
          <textarea id="custom-outputs" v-model="customOutput" rows="30" cols="100" />

        </div>

      </template>
    </Problem>
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
const problem = ref('Enter sample input and output');

let fnCode = ref('');

// .replace(/\n/g, "<br><br>")
</script>

<style scoped>
  textarea {
    background: black;
    color: white;
  }
</style>