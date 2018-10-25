<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <Timer />
      </v-flex>
      <v-flex mb-4>
        <v-btn @click="stop" fab dark>
          <i class="material-icons">stop</i>
        </v-btn>
        <template v-if="timer.inPause">
          <v-btn @click="play" fab dark>
            <i class="material-icons">play_arrow</i>
          </v-btn>
        </template>
        <template v-else>
          <v-btn @click="pause" fab dark>
            <i class="material-icons">pause</i>
          </v-btn>
        </template>
        <template v-if="this.lastPomodoro">
          <v-btn fab dark :to="{
          name: 'pomodoroDetail',
          params: { timestamp: lastPomodoro.timestamp},
          }">
            <v-icon class="material-icons">create</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn fab dark disable>
            <v-icon class="material-icons">create</v-icon>
          </v-btn>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts" src='./script'>
