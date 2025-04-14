<template>
  <tr>
    <td :colspan="columnLength" class="px-0">
      <v-table class="w-100 bg-grey-lighten-5 border-b-lg">
        <tbody>
          <tr>
            <td>
              <ProtocolImage :image="protocol.image" :alt="protocol.title" />
            </td>
            <td colspan="4">
              <span class="font-weight-bold">Description:</span>
              <ProtocolDescription
                v-if="protocol.description"
                :description="protocol.description"
              />
            </td>
          </tr>

          <tr>
            <td v-if="protocol.creator.affiliation">
              <span class="font-weight-bold">Affiliation:</span>
              <p>{{ protocol.creator.affiliation }}</p>
            </td>

            <td v-if="protocol.guidelines">
              <span class="font-weight-bold">Guidelines:</span>
            </td>

            <td v-if="protocol.image?.source">
              <span class="font-weight-bold">Image Source:</span>
              <p>{{ protocol.image.source }}</p>
            </td>

            <td v-if="protocol.link">
              <span class="font-weight-bold">Link:</span>
              <a :href="protocol.link" target="_blank">{{ protocol.link }}</a>
            </td>

            <td v-if="protocol.stats" class="flex-2-0">
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
  import ProtocolDescription from '@/components/protocol/ProtocolDescription.vue';
  import ProtocolImage from '@/components/protocol/ProtocolImage.vue';
  import ProtocolStats from '@/components/protocol/ProtocolStats.vue';

  import type { Protocol } from '@/types/protocol';

  defineProps<{
    protocol: Protocol;
    columnLength: number;
  }>();
</script>
