<template>
  <div>
    <div class="row" v-if="isEnter">
      <div class="col-md-12">
        <div class="card">
          <h3 class="card-header">Chat Room</h3>
          <div class="card-body">
            <ul v-for="(chat, id) in data" :key="id">
              <li>{{ chat.user.userName }}</li>
              <li>{{ chat.message }}</li>
              <li>{{ chat.createdAt }}</li>
            </ul>
            <hr />
            <form method="post" class="form-inline">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="message"
                  placeholder="Type your message..."
                />
                <div class="input-group-btn">
                  <button class="btn btn-primary">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-else>
      <div class="col-md-12">
        <h1>Live Chat</h1>
        <div class="container">
          <form>
            <div class="form-group">
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control"
                  v-model="username"
                  placeholder="user name"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control"
                  v-model="password"
                  placeholder="password"
                />
              </div>
            </div>
            <div class="btn-group" style="margin-bottom: 20px">
              <button class="btn btn-primary" type="button" @click="SignUp">
                Sign up
              </button>
              <button class="btn btn-primary" type="button" @click="SignIn">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div>
      <span v-for="(msg, index) in errorMessages" :key="index">{{ msg }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import gql from 'graphql-tag'
import {
  Mutation,
  MutationUserLoginArgs,
  MutationUserRegisterArgs,
  Query,
} from '@/generated/graphql'

export default class LiveChat extends Vue {
  username = ''
  password = ''
  message = ''
  userChatName = ''

  userId = 0
  data: any = []
  private $store: any
  errorMessages: any = []
  isEnter = false

  async SignIn() {
    this.errorMessages.length = 0
    const res = await this.$apollo
      .mutate<Pick<Mutation, 'userLogin'>, MutationUserLoginArgs>({
        mutation: gql`
          mutation ($data: UserRegisterInputGraphQL!) {
            userLogin(data: $data) {
              token
              user {
                id
                userName
                created
              }
            }
          }
        `,
        variables: {
          data: {
            userName: this.username,
            password: this.password,
          },
        },
      })
      .then((res) => {
        if (res.data?.userLogin.user.userName) {
          this.isEnter = true
          this.userChatName = res.data?.userLogin.user.userName
          this.userId = res.data?.userLogin.user.id
          this.$store.commit('setToken', res.data?.userLogin?.token || '')
        }
      })
      .catch((error) => {
        this.errorMessages.length = 0
        LiveChat.graphQLErrorMessages(error).forEach((it: any) => {
          this.errorMessages.push(it)
        })
      })
  }

  async SignUp() {
    this.errorMessages.length = 0
    const res = await this.$apollo
      .mutate<Pick<Mutation, 'userRegister'>, MutationUserRegisterArgs>({
        mutation: gql`
          mutation ($data: UserRegisterInputGraphQL!) {
            userRegister(data: $data) {
              token
              user {
                id
                userName
                created
              }
            }
          }
        `,
        variables: {
          data: {
            userName: this.username,
            password: this.password,
          },
        },
      })
      .then((res) => {
        this.isEnter = true
        if (res.data?.userRegister.user.userName) {
          this.$store.commit('setToken', res.data?.userRegister?.token || '')
        }
      })
      .then(() => {
        this.createChat()
      })
      .catch((error) => {
        this.errorMessages.length = 0
        LiveChat.graphQLErrorMessages(error).forEach((it: any) => {
          this.errorMessages.push(it)
        })
      })
  }

  async loadData() {
    const res = await this.$apollo.query<Pick<Query, 'userChatInfo'>>({
      query: gql`
        query {
          userChatInfo {
            user {
              id
              userName
            }
            message
            createdAt
            chat {
              chatName
            }
          }
        }
      `,
    })
    this.data.push(...res.data?.userChatInfo)
  }

  async createChat() {
    const res = await this.$apollo.mutate<Pick<Mutation, 'createChat'>>({
      mutation: gql`
        mutation {
          createChat {
            id
            chatName
            createdAt
          }
        }
      `,
    })
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static graphQLErrorMessages(errorsFromCatch: any): never[] {
    const errors = errorsFromCatch.graphQLErrors[0]
    const messages: any = []
    // eslint-disable-next-line no-prototype-builtins
    if (errors.hasOwnProperty('functionError')) {
      const customErrors = JSON.parse(errors.functionError)
      messages.push(...customErrors.errors)
    } else {
      messages.push(errors.message)
    }
    return messages
  }
  created(): void {
    this.loadData()
  }
}
</script>
<style>
button {
  background: #2c3e50;
  border-radius: 3px;
  border-width: 0;
  color: white;
  margin: 0 10px 0 0;
  padding: 5px;
}
input {
  margin-bottom: 20px;
}
</style>
