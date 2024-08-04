<template>
  <div class="editor">
    <label for="code"> Your solution for part {{ toSolve }}</label
    ><br />
    <!-- <label for="code"> Your solution </label><br /> -->
    <textarea id="code" v-model="fnCode" rows="30" cols="100" />
    <div>
      <button @click="runCode(true)">Run code on Test Data</button>
      <button @click="runCode(false)">Run code on Puzzle</button>
    </div>
    <hr />
    <div class="bottom-panel">
      <div v-if="computedAnswer" id="final-answer">
        <b>Output</b>
        <br />
        <br />
        <b>Expected:</b>
        <br />
        {{ executionMode == "sample" ? sampleAnswer : finalAnswer }}

        <br />
        <br />
        <b>Executed:</b><br />
        {{ computedAnswer }}
        <span v-if="resultMessage == 'Correct Answer'" class="success">
          &check;
        </span>
        <span v-else class="error"> &times; </span>

        <br />
        <br />
        <!-- <div id="result-output">
        {{ resultMessage }}
        <span v-if="resultMessage == 'Correct Answer'"> &check; </span>
        <span v-else> &times; </span>
      </div> -->
      </div>
      <div v-else>[Run code to test the output]</div>
      <div v-if="resultMessage" class="input-string-container">
        <b> Input String </b>
        <br />
        <br />

        <!-- {{ inputString }} -->
        <textarea id="input-str" v-model="inputString" rows="8" cols="10" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { LS_set, LS_get } from "~/utils/localStorage";

const route = useRoute();

const props = defineProps({
  toSolve: {
    type: Number,
    required: true,
  },
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
// let LS_KEY = route.path;
function LS_KEY() {
  return route.path + (props.toSolve == 2 ? "_PART_2" : "");
}

let inputString = ref("");
let computedAnswer = ref("");
let resultMessage = ref("");
let currentCode = LS_get(LS_KEY()) || props.solution;
let fnCode = ref(currentCode);
const executionMode = ref("sample");

function createFunction(funcDefinition) {
  try {
    return new Function("return " + funcDefinition)();
  } catch (error) {
    console.error("Error creating function:", error);
  }
}

const getInputString_short = (onTestData) => {
  let str = onTestData ? props.sampleInput : props.puzzleInput;
  return str
    .split("\n")
    .map((s) => s.substring(0, s.length))
    .join("\n");
};

const runCode = (onTestData) => {
  executionMode.value = onTestData ? "sample" : "puzzle";
  let execFn = createFunction(fnCode.value);
  const fnResults = execFn(onTestData ? props.sampleInput : props.puzzleInput);
  computedAnswer.value = fnResults || fnResults?.toString() || "N/A";
  inputString.value = getInputString_short(onTestData);
  resultMessage.value =
    fnResults == (onTestData ? props.sampleAnswer : props.finalAnswer)
      ? "Correct Answer"
      : "Incorrect Answer";
};

const updateEditor = (newVal, oldVal) => {
  fnCode.value = LS_get(LS_KEY()) || props.solution;
  computedAnswer.value = "";
  resultMessage.value = "";
  inputString.value = "";
};

watch(() => props.toSolve, updateEditor);

onMounted(() => {
  setInterval(() => {
    LS_set(LS_KEY(), fnCode.value);
  }, 10000);
});
</script>

<style scoped>
.editor {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.5rem 0;
  /* overflow-y: auto; */
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
.success {
  color: lightgreen;
}
.error {
  color: coral;
}
.bottom-panel {
  max-width: 100%;
  position: relative;
  /* display: flex; */
  /* gap: 12px; */
}
.bottom-panel #final-answer {
  /* border-right: 1px solid #f0f0f0; */
  width: 28%;
}
.input-string-container {
  width: 70%;
  position: absolute;
  top: 0;
  right: 0;
}
textarea#input-str {
  /* background: inherit; */
  background: #242424;
  border: none;
  width: 70%;
  height: 100%;
}
</style>
