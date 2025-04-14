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
          <v-col cols="12" class="d-flex align-center ga-3">
            <span>
              <span class="text-grey-darken-1">Challenge completed by:</span>
              Laurence Barnes
            </span>

            <v-spacer />
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
