<template>
  <button @click="loadDataProfile">Load profile data</button>
  {{ JSON.stringify(profileData) }}
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Query } from '@/generated/graphql'
import gql from 'graphql-tag'
export default class Profile extends Vue {
  profileData: any = {}
  // $store: any
  async loadDataProfile() {
    const res = await this.$apollo.query<Pick<Query, 'checkAuthorizationUser'>>(
      {
        query: gql`
          query {
            checkAuthorizationUser {
              userName
              created
            }
          }
        `,
        context: {
          // headers: {
          //   Authorization: this.$store.state.token,
          // },
        },
      }
    )
    this.profileData = res.data.checkAuthorizationUser
  }
}
</script>

<style scoped></style>
