<template>
  <v-card class="elevation-2" :style="cardStyle">
    <v-card-title style="padding-bottom:0">
      <Pomodot :color="pomodoro.color" />
      <span> {{datetime}} </span>
    </v-card-title>
    <template v-if='done'>
      <v-card-text>
        <span @click='done=false'><VueMarkdown :source="pomodoro.message" v-show="done" /></span>
      </v-card-text>
      <v-card-actions>
        <v-btn slot="activator" color="orange" small flat dark @click='done=false'>
          edit
        </v-btn>
      </v-card-actions>
    </template>
    <template v-else>
      <v-card-text>
        <Editor v-model:value="pomodoro.message" @done='done=true' v-show="!done" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn slot="activator" color="orange" small flat dark>
            show
          </v-btn>
          <span>ctrl+Enter</span>
        </v-tooltip>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script lang='ts' src='./script' />
