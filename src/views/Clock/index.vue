<template>
  <v-container align-center>
    <v-layout text-xs-center>
      <v-flex xs12>
        <Timer :color='color' :progress='progress' />
      </v-flex>
    </v-layout>
    <v-layout text-xs-center>
      <v-flex>
        <v-btn @click="stop" fab dark small>
          <i class="material-icons">stop</i>
        </v-btn>
        <template v-if="timer.inPause">
          <v-btn @click="play" fab dark small>
            <i class="material-icons">play_arrow</i>
          </v-btn>
        </template>
        <template v-else>
          <v-btn @click="pause" fab dark small>
            <i class="material-icons">pause</i>
          </v-btn>
        </template>
        <template v-if="this.lastPomodoro">
          <v-btn fab dark small :to="{
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
    <v-layout>
      <v-flex d-flex xs4>
        <TablePomodoro :pomodoros="pomodoroList" />
      </v-flex>
      <v-flex d-flex xs8>
        <VueMarkdown :source="lastPomodoro.message" style='padding:50px' />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts" src='./script'>
