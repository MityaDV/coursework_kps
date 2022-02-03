<template>
  <div>
    <div class="row" v-if="isEnter">
      <div class="col-md-12">
        <div class="card">
          <h3 class="card-header">Chat Room</h3>
          <div class="card-body"></div>
        </div>
      </div>
    </div>

    <div class="row" v-else>
      <div class="col-md-12">
        <h1>Login</h1>
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

      <div>
        <span v-for="(msg, index) in messages" :key="index">{{ msg }}</span>
      </div>
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
} from '@/generated/graphql'

export default class Login extends Vue {
  username = ''
  password = ''
  private $store: any
  messages: any = []
  isEnter = false

  async SignIn() {
    this.messages.length = 0
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
        localStorage.setItem('token', res.data?.userLogin.token || '')
        this.$store.commit('setToken', res.data?.userLogin?.token || '')
      })
      .catch((error) => {
        this.messages.length = 0
        Login.graphQLErrorMessages(error).forEach((it) => {
          this.messages.push(it)
        })
      })
  }

  async SignUp() {
    this.messages.length = 0
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
        this.$store.commit('setToken', res.data?.userRegister?.token || '')
      })
      .catch((error) => {
        this.messages.length = 0
        Login.graphQLErrorMessages(error).forEach((it) => {
          this.messages.push(it)
        })
      })
  }

  static graphQLErrorMessages(errorsFromCatch: any): any[] {
    const errors = errorsFromCatch.graphQLErrors[0]
    const messages = []
    // eslint-disable-next-line no-prototype-builtins
    if (errors.hasOwnProperty('functionError')) {
      const customErrors = JSON.parse(errors.functionError)
      messages.push(...customErrors.errors)
    } else {
      messages.push(errors.message)
    }
    return messages
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
