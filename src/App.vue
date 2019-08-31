<template>
  <div id="app">
    <header class="header">
      My Store
    </header>
    <main class="main">
      <main-content :products="products" v-if="products.length"/>
      <div class="noDataMsg" v-else>
          No data to display
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import MainContent from './components/MainContent.vue';
import axios from "axios";
import VeeValidate, {Validator} from 'vee-validate';
import validationRules from './validation/validationRules';
import { VueMaskDirective } from 'v-mask';
import {deliveryTypes} from './util/deliveryTypes';
import VanillaTilt from 'vanilla-tilt';
import Paginate from 'vuejs-paginate';

Vue.component('paginate', Paginate)
Vue.directive('mask', VueMaskDirective);
Vue.directive('tilt', {
  inserted: function (el) {
    VanillaTilt.init(el);
  }
})
Vue.use(VeeValidate);
validationRules(Validator);

export default Vue.extend({
  name: 'app',
  components: {
    MainContent
  },
  data() {
    return {
      products: []
    }
  },
  mounted(){
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      const vm = this;
      axios.get("https://msbit-exam-products-store.firebaseio.com/deliveryProducts/products.json")
      .then(response => {
        vm.products = vm.arrangeProducts(response.data);   
      })
    },
    deliveryType(product){
        return deliveryTypes[product.type];
    },
    arrangeProducts(products){
      let productInfos = [];
      products.forEach(element => {
        let deliveryType = this.deliveryType(element);
        let productInfo = deliveryType ? element[this.deliveryType(element)] : element;
        if(Array.isArray(productInfo)){
          productInfo.forEach(element1 => {
            productInfos.push(element1);
          });
        }
        else{
            productInfos.push(productInfo);
        }
      });
      return productInfos;
    }
  }
});
</script>

<style lang="less">
@import "assets/style/styles.less";
</style>
