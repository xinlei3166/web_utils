<template>
    <div>
        <ButtonGroup :size="btnSize" class="btn-group">
            <Button :size="btnSize" @click="onAdd">新增</Button>
            <Button :size="btnSize" @click="onDel">删除</Button>
        </ButtonGroup>
        <EditTable :border="tableBorder" :size="tableSize" :height="tableHeight" :columns="columns" :data="data" @on-selection-change="onSelectionChange"></EditTable>
        <div class="bottom-btn">
            <Button type="primary" :size="btnSize" @click="onSave">保存</Button>
            <Button type="default" :size="btnSize" @click="onCancel">取消</Button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from "vue-class-component";
    import EditTable from '@/components/table/EditTable'

    @Component({
        components: {EditTable},
        props: {
            columns: {type: Array, required: true},
            data: {type: Array, required: true},
            row: {type: Object, required: true},
            btnSize: {type: String, default: 'default'},
            tableBorder: {type: Boolean, default: true},
            tableHeight: {type: [String, Number], default: 450},
            tableSize: {type: String, default: 'small'},
        }
    })
    export default class DynamicEditTable extends Vue {

        selection = [];

        created() {
            this.addData();
        }

        addData() {
            this.data.push(this.row);
        }
        onAdd() {
            this.addData();
        }

        onDel() {
            for (let i of this.selection) {
                this.data.splice(this.data.findIndex(x => x['_index'] === i['_index']), 1)
            }
        }

        onSelectionChange(selection) {
            this.selection = selection;
        }

        onSave() {
            this.$emit('on-save', this.data)
        }

        onCancel() {
            this.$emit('on-cancel', this.data)
        }
    }
</script>

<style lang="stylus" scoped>
    .btn-group
        margin-bottom 5px
    .bottom-btn
        margin-top 50px
        text-align center
        button
            width 220px
            margin-right 50px
</style>

