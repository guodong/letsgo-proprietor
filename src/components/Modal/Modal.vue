<template>
  <div class="modal fade in">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
          <h4 class="modal-title">Default Modal</h4>
        </div>
        <div class="modal-body">
          <p>Define a body...</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default pull-left" type="button" data-dismiss="modal">Close</button><button class="btn btn-primary" type="button">Save Change</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal'
  }
</script>