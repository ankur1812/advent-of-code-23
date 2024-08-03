<template>
  <div class="day-view">
    <div class="problem" v-html="problem"></div>
    <div class="solution">
      <label for="code"> Your solution </label><br />
      <textarea id="code" v-model="fnCode" rows="30" cols="100" />
      <button @click="runCode(true)">Run code on Test Data</button>
      <hr />
      <b>Output:</b><br />
      <span id="final-answer">
        {{ computedAnswer }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
// import RadioButton from "~/components/RadioButton.vue";
import { LS_set, LS_get } from "~/utils/localStorage";

const route = useRoute();

const props = defineProps({
  day: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  sampleInput: {
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

let computedAnswer = ref("[Run code to test the output]");
let currentCode =
  LS_get(LS_KEY) ||
  `function x (input) {
  const rows= input.split('\\n');

  let digits = '1234567890'.split('');
  let sum = 0;
  rows.forEach ( r=> {
    const found= [];
    r.split('').forEach( c=> {
      if (digits.indexOf(c) > -1) found.push(c);
    })
  sum += parseInt(found[0] + found[found.length - 1]);
  })
return sum;
}`;
let fnCode = ref(currentCode);
const sampleInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

function createFunction(funcDefinition) {
  try {
    return new Function("return " + funcDefinition)();
  } catch (error) {
    console.error("Error creating function:", error);
  }
}
const runCode = (onTestData) => {
  let execFn = createFunction(fnCode.value);
  const fnResults = execFn(onTestData ? sampleInput : "");
  let finalAnswerElem = document.querySelector("#final-answer");
  finalAnswerElem.innerText = fnResults;
  if (props.sampleAnswer == fnResults)
    finalAnswerElem.innerHTML += "<br/>&check; Correct Answer";
  else finalAnswerElem.innerHTML += "<br/>&times; Incorrect Answer";

  debugger;
};

onMounted(() => {
  setInterval(() => {
    LS_set(LS_KEY, fnCode.value);
  }, 5000);
});
</script>
<style scoped>
.day-view {
  font-family: "Source Code Pro", monospace;
  display: flex;
  gap: 1rem;
}
.problem {
  width: 50%;
  max-height: 82vh;
  overflow-y: scroll;
}
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
</style>
