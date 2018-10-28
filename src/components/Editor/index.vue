<template>
  <div id="editor">
    <textarea :value="text" :style="style" @input='_input' @keydown.tab.prevent="tabber" @keydown.enter.prevent="enterer" @focusout="$emit('done', true)" v-focus></textarea>
  </div>
</template>

<script lang='ts' src='./script' />

<style>
#editor {
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;

}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0;

}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 0;

}

code {
  color: #f66;

}

</style>
