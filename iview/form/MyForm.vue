<template>
    <Form id="form" ref="form" :model="form" :rules="rules" :label-width="labelWidth" :inline="inline">
        <FormItem :prop="item.prop" :label="item.label" v-for="item in items" :key="item.label" :style="{width: item.itemWidth ? item.itemWidth : 'auto', minWidth: item.itemMinWidth? item.itemMinWidth : 'auto'}">
            <Input v-if="item.itemType === 'Input'" :type="item.type" v-model="form[item.prop]" :placeholder="item.placeholder"></Input>
            <Select v-else-if="item.itemType === 'Select'" v-model="form[item.prop]" :multiple="item.multiple">
<!--        <FormItem :prop="item.prop" :label="item.label" v-for="item in items">-->
<!--            <Input v-if="item.itemType === 'Input'" :type="item.type" v-model="form[item.prop]" :placeholder="item.placeholder" :style="{width: item.itemWidth ? item.itemWidth : 'auto', minWidth: item.itemMinWidth? item.itemMinWidth : 'auto'}"></Input>-->
<!--            <Select v-else-if="item.itemType === 'Select'" v-model="form[item.prop]" :multiple="item.multiple" :style="{width: item.itemWidth ? item.itemWidth : 'auto', minWidth: item.itemMinWidth? item.itemMinWidth : 'auto'}">-->
                <Option :value="option.value" v-for="option in item.options" :key="option.name">{{option.name}}</Option>
            </Select>
        </FormItem>
        <div class="bottom-btn">
            <Button type="primary" @click="onSubmit('form')">提交</Button>
            <Button type="default" @click="onReset('form')">重置</Button>
        </div>
    </Form>
</template>

<script>
    import Vue from 'vue'
    import Component from "vue-class-component";

    @Component({
        props: {
            inline: {type: Boolean, default: true},   // inline, 表单元素可以水平排列
            labelWidth: {type: Number, default: 100},   // label-width
            form: {type: Object, required: true},   // form对象
            rules: {type: Object, required: true},  // rules对象
            items: {type: Array, required: true},   // form组件的formitem
        }
    })
    export default class OperatorMaintain extends Vue {

        onReset(name) {
            this.$refs[name].resetFields();
        }

        onSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit('on-submit', true);
                    this.$Message.success('Success!');
                } else {
                    this.$emit('on-submit', false);
                    this.$Message.error('Fail!');
                }
            })
        }
    }
</script>

<style lang="stylus" scoped>
    #form
        margin-top 20px

    .bottom-btn
        text-align center
        margin-top 50px
        button
            width 220px
            margin-right 50px
</style>

