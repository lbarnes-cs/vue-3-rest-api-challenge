<template>
  <tr>
    <td :colspan="columnLength" class="px-0">
      <v-table
        :class="{ 'custom-row--is-mobile': smAndDown }"
        class="custom-row w-100 bg-grey-lighten-5 border-b-lg"
      >
        <tbody>
          <tr>
            <td width="200" class="vertical-baseline">
              <ProtocolImage
                :image="protocol.image"
                :alt="protocol.title"
                :width="200"
              />
            </td>
            <td colspan="2">
              <span class="font-weight-bold">Description:</span>
              <ProtocolDescription
                v-if="protocol.description"
                :description="protocol.description"
              />
            </td>
          </tr>

          <tr>
            <td
              v-if="protocol.creator.affiliation"
              width="200"
              class="vertical-baseline"
            >
              <span class="font-weight-bold">Affiliation:</span>
              <p>{{ protocol.creator.affiliation }}</p>
            </td>

            <td v-if="protocol.authors" class="vertical-baseline">
              <span class="font-weight-bold">Authors:</span>

              <ProtocolAuthorsList :authors="protocol.authors" />
            </td>

            <td v-if="protocol.stats" width="300" class="vertical-baseline">
              <span class="font-weight-bold">Stats:</span>
              <ProtocolStats :stats="protocol.stats" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </td>
  </tr>
</template>

<script setup lang="ts">
  import { useDisplay } from 'vuetify';

  import ProtocolAuthorsList from '@/components/protocol/ProtocolAuthorsList.vue';
  import ProtocolDescription from '@/components/protocol/ProtocolDescription.vue';
  import ProtocolImage from '@/components/protocol/ProtocolImage.vue';
  import ProtocolStats from '@/components/protocol/ProtocolStats.vue';

  import type { Protocol } from '@/types/protocol';

  defineProps<{
    protocol: Protocol;
    columnLength: number;
  }>();

  const { smAndDown } = useDisplay();
</script>

<style lang="scss" scoped>
  .custom-row {
    &--is-mobile {
      width: 95vw !important;
      overflow: hidden;
    }
  }
</style>
