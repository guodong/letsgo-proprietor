<template>
  <transition name="message">
    <div :class="`message-box text-${type}`">
      <span :class="`message-icon glyphicon glyphicon-${type == 'success' ? 'ok-sign' : type == 'warning' ? 'info-sign' : 'remove-sign'}`"></span>
      <span>{{text}}</span>
      <button class="remove-message glyphicon glyphicon-remove"></button>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Message',
    props: {
      text: String,
      type: String
    }
  }
</script>

<style>
  /**
   * text-danger     remove-sign
   * text-warning    info-sign
   * text-primary
   * text-info
   * text-success    ok-sign
   * text-gray-dark
   */
  .message-enter, .message-leave-active {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
  .message-box {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    min-width: 300px;
    box-sizing: border-box;
    border-radius: 2px;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    background-color: #fff;
    transition: opacity 0.3s, transform 0.4s;
    overflow: hidden;
    /*color: #bfcbd9;*/
  }
  .message-warning {
    color: #f7ba2a;
  }
  .message-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
  }
  .message-icon:before {
    line-height: 40px;
    display: block;
    text-align: center;
  }
  .remove-message {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    display: inline-block;
    float: right;
    width: 40px;
    height: 40px;
  }
  .remove-message:hover {
    color: #97a8be;
  }
</style>
