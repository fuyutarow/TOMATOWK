<template>
  <div id="editor">
    <textarea :value="text" :style="style" @input='_input' @keydown.tab.prevent="tabber" @keydown.enter.prevent="enterer" @focusout="$emit('done', true)" v-focus></textarea>
  </div>
</template>

<script lang='ts' src='./script' />
