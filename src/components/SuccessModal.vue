<template>
    <div class="modalMask" @click="close">
        <div class="modalWrapper">
            <button class="closeBtn" @click="close">X</button>
            <p class="text">
                Thank you for updating product <b>{{productName}}</b>
            </p>
        </div>
    </div>
</template>


<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'SuccessModal',
  props: {
      productName: String
  },
  methods: {
      close(event){
          let target = event.target.className;
          if(target == 'modalMask' || target == 'closeBtn'){
            this.$emit('close');
          }
      }
  },
});
</script>