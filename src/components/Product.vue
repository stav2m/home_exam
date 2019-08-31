<template>
    <div class="productItem" @click="selectProduct">
        <img class="pic" :src="product.thumbnailUrl" v-tilt/>
        <div class="infoContainer">
            <div class="name">{{product.name}}</div>
            <div class="description">{{product.description}}</div>
        </div>
        <button class="btn orange">Delete</button>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Product',
  props: {
    product: Object
  },
  methods: {
      selectProduct(){
        this.$emit('select',this.product);
      },
  },
});
</script>