<template>
  <div class="day-view">
    <div class="problem">
      <slot name="problem">
        <div v-html="problem"></div>
      </slot>
    </div>
    <div class="right-panel">
      <select v-model="toSolve">
        <option value="1">Solve Part 1</option>
        <option v-if="finalAnswer2" value="2">Solve Part 2</option>
      </select>
      <CodeEditor
        :toSolve="toSolve"
        :sample-input="toSolve == 1 ? sampleInput : sampleInput2"
        :puzzle-input="puzzleInput"
        :solution="toSolve == 2 && solution2 ? solution2 : solution"
        :sample-answer="toSolve == 1 ? sampleAnswer : sampleAnswer2"
        :final-answer="toSolve == 1 ? finalAnswer : finalAnswer2"
      ></CodeEditor>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import CodeEditor from "~/components/CodeEditor.vue";

const props = defineProps({
  day: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  solution2: {
    type: String,
    required: true,
  },
  puzzleInput: {
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
  sampleInput2: {
    type: String,
  },
  sampleAnswer2: {
    type: Number,
  },
  finalAnswer2: {
    type: Number,
  },
});

const toSolve = ref(1);
</script>

<style scoped>
.day-view {
  font-family: "Source Code Pro", monospace;
  display: flex;
  gap: 1rem;
}
.problem {
  width: 50%;
  max-height: calc(100vh - 120px);
  overflow-y: scroll;
  border-right: 1px solid gray;
}
.right-panel {
  /* max-height: calc(100vh - 120px);
  overflow-y: scroll; */
}
select {
  padding: 9px;
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

@media only screen and (max-width: 728px) {
  .day-view {
    flex-direction: column;
  }
  .problem {
    width: 100%;
    height: 35vh;
    border-right: none;
    border-bottom: 1px solid gray;
  }
}
</style>
