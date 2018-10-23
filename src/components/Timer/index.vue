<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <h1 style="font-size:100px">
          {{ formatTime }}
        </h1>
      </v-flex>
      <v-flex mb-4>
        <v-btn @click="stop" fab dark>
          <v-icon class="material-icons">stop</v-icon>
        </v-btn>
        <template v-if="freeze">
          <v-btn @click="start" fab dark>
            <v-icon class="material-icons">play_arrow</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn @click="pause" fab dark>
            <v-icon class="material-icons">pause</v-icon>
          </v-btn>
        </template>
        <v-btn fab dark to="/note">
          <v-icon class="material-icons">create</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts' src='./script' />
