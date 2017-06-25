<template>
  <main>
    <router-view/>
    <message v-if="message" :text="message.text" :type="message.type"/>
  </main>
</template>

<script>
  import Message from './components/Message'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'App',
    components: {
      Message
    },
    methods: mapActions([
      'removeMessage'
    ]),
    computed: mapState({
      message: function (state) {
        let message = state.messages[0]
        if (!message) {
          return null
        }
        let _this = this
        setTimeout(() => {
          _this.removeMessage()
        }, message.time)
        return state.messages[0]
      }
    })
  }
</script>

<style>

</style>
