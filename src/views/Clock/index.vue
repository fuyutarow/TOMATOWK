<template>
  <v-container align-center>
    <v-layout text-xs-center>
      <div style="margin: auto; padding-top:30px; padding-bottom:40px">
        <Timer :color='color' style="padding:10px" />
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
        <v-btn :to="{ name: 'vine' }" fab dark small>
          <i class="material-icons">create</i>
        </v-btn>
      </div>
    </v-layout>
    <v-layout>
      <TablePomodoro :pomodoros="pomodoroList" />
    </v-layout>
  </v-container>
</template>

<script lang="ts" src='./script'>
