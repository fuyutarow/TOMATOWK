<template>
  <v-container align-center>
    <v-layout text-xs-center style="padding-top:15vh; padding-bottom:5vh;">
      <Timer :color='color' style="margin:auto; padding:10px" />
    </v-layout>
    <v-layout align-center justify-center row fill-height>
      <v-btn @click="stop" fab dark>
        <v-icon style="font-size:40px;">stop</v-icon>
      </v-btn>
      <template v-if="timer.inPause">
        <v-btn @click="play" fab dark>
          <v-icon style="font-size:40px;">play_arrow</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn @click="pause" fab dark>
          <v-icon style="font-size:40px;">pause</v-icon>
        </v-btn>
      </template>
      <v-btn :to="{ name: 'vine' }" fab dark>
        <v-icon style="font-size:40px;">create</v-icon>
      </v-btn>
    </v-layout>
    <v-layout>
      <v-flex xs4></v-flex>
      <v-flex xs8>
        <TablePomodoro :pomodoros="pomodoroList" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts" src='./script'></script>
