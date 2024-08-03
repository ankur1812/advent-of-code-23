<template>
  <div class="day-view">
    <div class="problem" v-html="problem"></div>
    <CodeEditor
      :sample-input="sampleInput"
      :puzzle-input="puzzleInput"
      :solution="solution"
      :sample-answer="sampleAnswer"
      :final-answer="finalAnswer"
    ></CodeEditor>
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
</style>
