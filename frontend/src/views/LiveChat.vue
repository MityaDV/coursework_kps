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
            <form class="form-inline" @submit.prevent>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="message"
                  placeholder="Type your message..."
                />
                <div class="input-group-btn">
                  <button class="btn btn-primary" @click="sendMessage">
                    Send
                  </button>
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
  MutationSendMessageArgs,
  MutationUserLoginArgs,
  MutationUserRegisterArgs,
  Query,
  Subscription,
} from '@/generated/graphql'

export default class LiveChat extends Vue {
  username = ''
  password = ''

  message = ''

  userId: any = 0
  chatId: any = 0
  userName: any = ''

  data: any = []
  subscription: any
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
          this.userId = res.data?.userLogin.user.id
          this.chatId = 1
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
        if (res.data?.userRegister.user.userName) {
          this.createChat()
          this.isEnter = true
          this.userId = res.data?.userRegister.user.id
          this.userName = res.data?.userRegister.user.userName
          this.$store.commit('setToken', res.data?.userRegister?.token || '')
        }
      })
      .catch((error) => {
        this.errorMessages.length = 0
        LiveChat.graphQLErrorMessages(error).forEach((it: any) => {
          this.errorMessages.push(it)
        })
      })
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
    this.chatId = res.data?.createChat.id
  }

  async sendMessage() {
    const res = await this.$apollo
      .mutate<Pick<Mutation, 'sendMessage'>, MutationSendMessageArgs>({
        mutation: gql`
          mutation ($data: UserMessageInputGraphQL!) {
            sendMessage(data: $data) {
              user {
                id
              }
              message
              createdAt
              chat {
                id
              }
            }
          }
        `,
        variables: {
          data: {
            userId: this.userId,
            chatId: this.chatId,
            message: this.message,
            createdAt: new Date(),
          },
        },
      })
      .then((res) => {
        this.userName = res.data?.sendMessage.user?.userName
        this.message = ''
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

  async created() {
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
              id
              chatName
            }
          }
        }
      `,
    })
    this.data?.push(...res.data?.userChatInfo)

    // const newData = res.data.userChatInfo.forEach((it) => {
    //   let t = new Date(it.createdAt)
    //   it.createdAt = t.getHours() + ':' + t.getMinutes()
    // })
    // this.data?.push(...newData)
    // console.log(newData)

    this.subscription = this.$apollo
      .subscribe<Pick<Subscription, 'chatUpdates'>>({
        query: gql`
          subscription {
            chatUpdates {
              user {
                id
                userName
              }
              message
              createdAt
              chat {
                id
              }
            }
          }
        `,
      })

      .subscribe((v) => {
        this.data.push(v.data?.chatUpdates)
      })
  }
  unmounted(): void {
    this.subscription.unsubscribe()
  }
}
</script>
<style>
ul {
  margin: 0 0 5px 0;
  padding: 0;
  list-style: none;
  border: black 1px solid;
}

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
