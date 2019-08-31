<template>
    <div :class="[className,{'error': errors.has(name)}]">
        <label :for="generatedId" class="formLabel">
            {{label}}
        </label>
        <input  v-if="input"
                :name="name" 
                :type="type" 
                :id="generatedId"
                v-model="val" 
                @input="$emit('input', $event.target.value)"
                @blur="$emit('blur', $event.target.value)"
                :maxlength="maxChar"
                class="formInput"
        />
        <textarea    v-else
                    :name="name" 
                    :id="generatedId"
                    v-model="val" 
                    @input="$emit('input', $event.target.value)"
                    @blur="$emit('blur', $event.target.value)"
                    :maxlength="maxChar"
                    class="formTextarea"
        />


        <span class="errorMsg" v-show="errors.has(name)">{{ errors.first(name) }}</span>
    </div>
</template>

<script>

import Vue from 'vue';

export default Vue.extend({
    name: 'BaseInput',
    props: {
        name:{
            type:String,
            required:true
        },
        label:{
            type:String
        },        
        value:{
            type:[String, Number]
        },
        placeholder:{
            type:String
        },
        type:{
            default:"text"
        },
        maxChar:{
            type:Number
        },
        className:{
            type: String
        },
        input:{
            type: Boolean,
            default: true
        }
    },
    inject: ['$validator'],
    computed:{
        val:{
            get(){
                return this.value
            },
            set(v){
                this.$emit("input",v)
            }
        },
        generatedId(){
            return `${this.name}_${this._uid}`;
        },
    }
});

</script>