<template>
  <v-app>
    <div class="d-flex flex-column fill-height">
      <v-app-bar flag color="primary">
        <slot name="header" />
      </v-app-bar>

      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </div>

    <v-footer>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            class="align-center text-center text-sm-left text-body-2"
          >
            <span class="text-grey-darken-1">Your time is apprivated by:</span>
            <br />
            Laurence Barnes
          </v-col>

          <v-spacer />
          <v-col
            cols="12"
            sm="auto"
            class="d-sm-flex align-center ga-3 text-center"
          >
            <v-btn
              href="https://www.linkedin.com/in/laurencebarnes/"
              variant="text"
              color="grey-darken-2"
            >
              <v-icon class="mr-2">mdi-linkedin</v-icon>
              LinkedIn
            </v-btn>
            <v-btn
              href="https://github.com/lbarnes-cs"
              variant="text"
              color="grey-darken-2"
            >
              <v-icon class="mr-2">mdi-github</v-icon>
              Github
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>
