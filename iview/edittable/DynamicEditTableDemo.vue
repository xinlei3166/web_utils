<template>
    <DynamicEditTable :columns="columns" :row="row" :data="data" @on-save="onSave"></DynamicEditTable>
</template>

<script>
    import Vue from 'vue'
    import Component from "vue-class-component";
    import DynamicEditTable from '@/components/table/DynamicEditTable'

    @Component({
        components: {DynamicEditTable}
    })
    export default class DynamicEditTableDemo extends Vue {
        tableEditSize = 'small';
        tableColumnMinWidth = 130;

        columns = [
            {type: 'selection', width: 60, align: 'center'},
            {
                title: '用户姓名',
                key: 'name',
                minWidth: this.tableColumnMinWidth,
                edit: {
                    type: 'Input',
                    size: this.tableEditSize
                }
            },
            {
                title: '用户类型',
                key: 'name',
                minWidth: this.tableColumnMinWidth,
                edit: {
                    type: 'Input',
                    size: this.tableEditSize
                }
            },
            {
                title: '用户地址',
                key: 'name',
                minWidth: this.tableColumnMinWidth,
                edit: {
                    type: 'Input',
                    size: this.tableEditSize
                }
            },
            {
                title: '用户备注',
                key: 'name',
                minWidth: this.tableColumnMinWidth,
                edit: {
                    type: 'Input',
                    size: this.tableEditSize
                }
            },
            {
                title: '生效日期',
                key: 'name',
                minWidth: this.tableColumnMinWidth,
                edit: {
                    type: 'Input',
                    size: this.tableEditSize
                }
            },
            {
                title: '失效日期',
                key: 'name',
                minWidth: this.tableColumnMinWidth,
                edit: {
                    type: 'Input',
                    size: this.tableEditSize
                }
            },
        ];

        row = {
            'name': null,
            'pre': null,
            'serial': null,
            'status': null,
            'date': null,
        };

        data = [];

        onSave(data) {
            //
        }
    }
</script>

<style lang="stylus" scoped>
</style>

