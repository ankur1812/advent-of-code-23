<template>
  <div>
    <iframe
      ref="iframe"
      :src="url"
      style="width: 100%; height: 100%; border: none"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    injectedCode: {
      type: String,
      default: "",
    },
    injectedCss: {
      type: String,
      default: "",
    },
  },
  methods: {
    onIframeLoad() {
      debugger;
      const iframe = this.$refs.iframe;
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDocument) {
        // Inject JavaScript code
        if (this.injectedCode) {
          const script = iframeDocument.createElement("script");
          script.type = "text/javascript";
          script.text = this.injectedCode;
          iframeDocument.head.appendChild(script);
        }

        // Inject CSS styles
        debugger;
        if (this.injectedCss) {
          const style = iframeDocument.createElement("style");
          style.type = "text/css";
          style.textContent = this.injectedCss;
          iframeDocument.head.appendChild(style);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add any styles you need for your iframe container */
</style>
