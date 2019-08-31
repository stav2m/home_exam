<template>
  <div class="container">

    <div class="manageOptions">
      <button class="filterOption btn">+ Add</button>
      <div class="filterOption searchWrapper">
        <input type="search" 
                class="searchInput" 
                placeholder="search products" 
                v-model="search"
        />
        <div class="searchIcon">
          <div class="searchIcon__circle"></div>
          <div class="searchIcon__rectangle"></div>
        </div>
      </div>
      <div class="filterOption sortSelect">
        <label for="sort" class="sortLabel">Sort by</label>
        <select name="sort" id="sort" v-model="sortSelection">
          <option disabled selected value> -- select an option -- </option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>
    </div>

    <div class="leftSide">  
      <div class="productContainer">
        <ul class="products">
          <li v-for="product in currentPageProducts" v-if="currentPageProducts">
            <product :product="product" @select="changeCurrent"/>
          </li>
          
        </ul>
      </div>
    </div>

    <div class="rightSide" v-if="currentProduct">
      <div>
        <product-details v-bind="currentProduct" :products="filteredList" @submit="submit" :key="currentProduct.id"/>
      </div>
    </div>

    <paginate
      v-model="currentPage"
      :page-count="pageCount"
      :prev-text="'< Prev Page'"
      :next-text="'Next Page >'"
      :container-class="'paginationContainer'">
    </paginate> 

    <success-modal @close="showModal = false" v-show="showModal" :productName="savedProduct"/>    
  </div>
</template>

<script>
import Vue from 'vue';
import Product from './Product.vue';
import ProductDetails from './ProductDetails.vue';
import SuccessModal from './SuccessModal.vue';

export default Vue.extend({
  name: 'MainContent',
  components: {
    Product,
    ProductDetails,
    SuccessModal
  },
  data() {
    return {
      currentProduct: null,
      showModal: false,
      savedProduct: "",
      filteredProducts: this.products,
      search: "",
      currentPage: 1,
      sortSelection: ""
    }
  },
  props: {
    products: Array
  },
  methods: {
    changeCurrent(product){
      this.currentProduct = product;
    },
    submit(productDetails){
      this.showModal = true;
      this.savedProduct = productDetails.name;
    },
    sortProducts(){
      let term = this.sortSelection;
      this.filteredProducts = this.filteredProducts.slice().sort(function(a, b) {
        if ( a[term] < b[term] ){
          return -1;
        }
        if ( a[term] > b[term] ){
          return 1;
        }
        return 0;
      });
    }
  },
  computed:{
    filteredList() {
      const searchVal = this.search.toLowerCase();
      let products = this.filteredProducts.filter(post => {
        return post.name.toLowerCase().includes(searchVal)
              || post.description.toLowerCase().includes(searchVal);
      });
      return products;
    },
    currentPageProducts(){
      const products = this.filteredList ? this.filteredList : this.products;
      const startIndex = ((products.length / 5) + 1) * (this.currentPage -1);
      const endIndex = startIndex + 5;
      return products.slice(startIndex,endIndex);
    },
    pageCount() {
      return this.filteredList.length / 5;
    }
  },
  watch:{ 
    products: { 
      handler(v) {
        if(v){
          this.filteredProducts = v;
        }
      },
      immediate: true
    },
    search:{
      handler(v) {
        if(v){
          this.currentPage = 1;
        }
      }
    },
    sortSelection:{
      handler(v) {
        if(v){
          this.sortProducts();
        }
      }
    }
  }
});
</script>
