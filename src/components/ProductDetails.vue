<template>
    <div class="productDetails">
        <div class="name">{{currentProduct.name}} details</div>
        <img class="pic":src="currentProduct.url"/>

        <form @submit.prevent="submit">
            <base-input label="ID:" 
                        name="idNumber" 
                        :value="currentProduct.id"
                        v-validate="{required:true,uniqueId:{productsIds:this.productsIds,id}}"
                        data-vv-as="ID number"
                        v-model="currentProduct.id"
                        className="formDiv small"
            />
            <base-input label="Name:" 
                        name="name" 
                        :value="currentProduct.name"
                        v-validate="'required'"
                        data-vv-as="Name"
                        v-model="currentProduct.name"
                        className="formDiv"
            />
            <base-input label="Description:" 
                        name="description" 
                        :value="currentProduct.description"
                        data-vv-as="Description"
                        v-model="currentProduct.description"
                        className="formDiv"
                        :input="false"
            />
            <base-input label="Price:" 
                        name="price" 
                        :value="currentProduct.price"
                        v-validate="'required|min_value:0'"
                        data-vv-as="Price"
                        v-model="currentProduct.price"
                        className="formDiv small"
            />
            <div class="formDiv">
                <label for="creationDate" class="formLabel">
                    Creation Date:
                </label>
                <input  name="creationDate" 
                        type="text" 
                        id="creationDate"
                        v-model="currentProduct.creationDate" 
                        v-mask="'XX/XX/XX'"
                        v-validate="'required|date_format:DD/MM/YY'"
                        data-vv-as="Creation Date"
                        class="formInput"
                />
                <span class="errorMsg" v-show="errors.has('creationDate')">{{ errors.first('creationDate') }}</span>
            </div>

            <div class="btnContainer">
                <button class="btn submitBtn" type="submit" :disabled="errors.items.length > 0 || !isDirty">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import Vue from 'vue';
import BaseInput from './BaseInput.vue';

export default Vue.extend({
  name: 'ProductDetails',
  data() {
    return {
      currentProduct: {
          id: this.id,
          creationDate: this.creationDate,
          description: this.description,
          name: this.name,
          price: this.price,
          thumbnailUrl: this.thumbnailUrl,
          url: this.url
      },
      isDirty: false
    }
  },
  components: {
    BaseInput
  },
  props: {
    id: Number,
    creationDate: Number,
    description: String,
    name: String,
    price: Number,
    thumbnailUrl: String,
    url: String,
    products: Array
  },
  computed:{
    productsIds(){
        return this.products.map(x => x.id);
    },
    filteredCreationDate(){
        return this.$options.filters.dayMonthYear(this.currentProduct.creationDate);
    },
    dirty(){
        const vm = this;
        return Object.keys(this.$props).forEach(element => {
            return vm.currentProduct[element] && (vm.currentProduct[element] != vm.$props[element]);
        });
    }
  },
  methods:{
    submit(){
        this.$emit('submit', this.currentProduct);
    }
  },
  watch: {
    creationDate: {
        handler(v) {
            if(v){
                this.currentProduct.creationDate = this.filteredCreationDate;
            }
        },
        immediate: true
    },
    currentProduct: {
        handler(v) {
            if(v){
                const vm = this;
                let dirty = false;
                const result = Object.keys(this.$props).forEach(element => {
                    let origValue = vm.$props[element];
                    if(element == 'creationDate'){
                        origValue =  this.$options.filters.dayMonthYear(origValue);
                    }
                    if(vm.currentProduct[element] && (vm.currentProduct[element] != origValue)){
                        dirty = true;
                    }
                });
                this.isDirty = dirty;
            }
        },
        deep: true
    }
  }
});
</script>