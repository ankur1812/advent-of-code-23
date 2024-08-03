<template>
  <div class="solution">
    <label for="code"> Your solution </label><br />
    <textarea id="code" v-model="fnCode" rows="30" cols="100" />
    <div>
      <button @click="runCode(true)">Run code on Test Data</button>
      <button @click="runCode(false)">Run code on Puzzle</button>
    </div>
    <hr />
    <b>Output:</b>
    <br />
    <br />
    <div v-if="computedAnswer" id="final-answer">
      {{ computedAnswer }}
      <div id="result-output">
        {{ resultMessage }}
        <span v-if="resultMessage == 'Correct Answer'"> &check; </span>
        <span v-else> &times; </span>
      </div>
    </div>
    <div v-else>[Run code to test the output]</div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { LS_set, LS_get } from "~/utils/localStorage";

const route = useRoute();

const props = defineProps({
  solution: {
    type: String,
    required: true,
  },
  sampleInput: {
    type: String,
    required: true,
  },
  puzzleInput: {
    type: String,
    required: true,
  },
  sampleAnswer: {
    type: Number,
    required: true,
  },
  finalAnswer: {
    type: Number,
    required: true,
  },
});
let LS_KEY = route.path;

let computedAnswer = ref("");
let resultMessage = ref("");
let currentCode = LS_get(LS_KEY) || props.solution;
let fnCode = ref(currentCode);

function createFunction(funcDefinition) {
  try {
    return new Function("return " + funcDefinition)();
  } catch (error) {
    console.error("Error creating function:", error);
  }
}
const runCode = (onTestData) => {
  let execFn = createFunction(fnCode.value);
  const fnResults = execFn(onTestData ? props.sampleInput : props.puzzleInput);
  computedAnswer.value = fnResults;
  resultMessage.value =
    fnResults == (onTestData ? props.sampleAnswer : props.finalAnswer)
      ? "Correct Answer"
      : "Incorrect Answer";
};

onMounted(() => {
  setInterval(() => {
    LS_set(LS_KEY, fnCode.value);
  }, 10000);
});
</script>

<style scoped>
.solution {
  border-left: 1px solid gray;
  width: 50%;
  padding: 0.5rem;
}
textarea {
  background: black;
  color: white;
  height: 40vh;
  width: 45vw;
  padding: 12px;
}
button {
  margin: 6px;
  padding: 8px;
}
button:hover,
button:focus {
  outline: none;
  background: #303030;
  color: #f0f0f0;
}
</style>
